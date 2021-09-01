import getDoc from "../../../../components/utils/gSheetDoc";

export default function handler(req, res) {
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

const formatPresensi = (presensi) => {
    const monthsStringArray = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'November', 'October', 'December']

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