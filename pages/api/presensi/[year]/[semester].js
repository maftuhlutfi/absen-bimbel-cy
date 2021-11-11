import getDoc from "../../../../components/utils/gSheetDoc";

export default function handler(req, res) {
    if (req.method == 'GET') {
        (async function() {
            try {
                const {year, semester} = req.query
                const doc = await getDoc()
                const sheet = await doc.sheetsByIndex.filter(sh => sh.title == `${year.replace(' ', '/')} - Sem ${semester}`)[0]
                await sheet.loadHeaderRow()
                const rows = await sheet.getRows()
                const data = await rows.map(row => ({
                    no: row.no, 
                    name: row.name, 
                    sex: row.sex,
                    class: row.class,
                    presensi: sheet.headerValues.slice(4).map(val => ({
                        date: val.split('/')[1],
                        month: val.split('/')[0],
                        year: val.split('/')[2],
                        value: row[val]
                    }))
                }))
                res.send(data.map(d => ({
                    ...d,
                    presensi: formatPresensi(d.presensi),
                    total: d.presensi.reduce((total, p) => p.value ? total + 1 : total, 0),
                    hadir: d.presensi.reduce((total, p) => p.value == 1 ? total + 1 : total, 0),
                    izin: d.presensi.reduce((total, p) => p.value == 2 ? total + 1 : total, 0),
                    tidakHadir: d.presensi.reduce((total, p) => p.value == 0 ? total + 1 : total, 0)
                })))
            } catch (e) {
                res.send('error')
                console.log(e)
            }
          }())
    }

    if (req.method == 'POST') {
        (async function() {
            const {absensi, tanggal, startIndex} = req.body
            try {
                const {year, semester} = req.query
                const doc = await getDoc()
                const sheet = await doc.sheetsByIndex.filter(sh => sh.title == `${year.replace(' ', '/')} - Sem ${semester}`)[0]
                
                await sheet.loadHeaderRow()
                const headerIndex = await sheet.headerValues.findIndex(h => h == tanggal)
                const headerString = await getHeaderString(headerIndex)

                await sheet.loadCells(`${headerString}${startIndex+2}:${headerString}${absensi.length + 1 + startIndex}`)
                await absensi.forEach((value, index) => {
                    sheet.getCellByA1(`${headerString}${index+2+startIndex}`).value = value
                })
                await sheet.saveUpdatedCells()
                await res.send('Sukses update absen.')
            } catch (e) {
                res.send('error')
                console.log(e)
            }
          }())
    }
    
  }

const formatPresensi = (presensi) => {
    const monthsStringArray = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

    let listMonth = []

    presensi.forEach(p => {
        if (!listMonth.includes(p.month)) {
        listMonth = [...listMonth, p.month]
        }
    })

    listMonth = listMonth.map(m => ({month: +m, monthString: monthsStringArray[+m.split('/')[0] - 1]}))

    let formattedPresensi = []

    listMonth.forEach(m => {
        let x = {
            ...m,
            values: []
        }
        presensi.forEach(presensi => {
            if (presensi.month == m.month) {
            x.values = [...x.values, {
                date: +presensi.date,
                value: +presensi.value
            }]
            }
        })
        formattedPresensi = [...formattedPresensi, x]
    })

    return formattedPresensi
}

const getHeaderString = i => {
    if (!Math.floor(i/26)) {
        return String.fromCharCode(65 + i)
    }
    return `${String.fromCharCode(65 + Math.floor(i/26))}${String.fromCharCode(65 + i % 26)}`
}