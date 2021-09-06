import axios from "axios"

export default function handler(req, res) {
    (async function() {
        try {
            const host = req.rawHeaders[1]
            const {year, semester} = req.query
            const presensiRes = await axios.get(`${host.includes('localhost') ? 'http' : 'https'}://${host}/api/presensi/${year}/${semester}`)
            const presensiData = await presensiRes.data
            res.send(getKelas(presensiData))
        } catch (e) {
            res.send('error')
            console.log(e)
        }
      }())
  }

const getKelas = presensi => {
    let listKelas = []

    presensi.forEach(p => {
        if (!listKelas.includes(p.class)) {
            listKelas = [...listKelas, p.class]
        }
    })

    return listKelas.map(kelas => 'Kelas ' + kelas)
}