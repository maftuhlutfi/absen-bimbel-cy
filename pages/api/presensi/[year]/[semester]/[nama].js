import axios from "axios";

export default async function handler(req, res) {
    const host = req.rawHeaders[1]
    const {year, semester, nama} = req.query
    const presensiRes = await axios.get(`${host.includes('localhost') ? 'http' : 'https'}://${host}/api/presensi/${year}/${semester}`)
    const presensiData = await presensiRes.data
    res.send(presensiData.filter(data => data.name == nama)[0])
}