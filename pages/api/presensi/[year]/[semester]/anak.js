import axios from "axios";

export default async function handler(req, res) {
    const host = req.rawHeaders[1]
    const {year, semester} = req.query
    const presensiRes = await axios.get(`/api/presensi/${year}/${semester}`)
    const presensiData = await presensiRes.data
    res.send(presensiData.map(d => d.name))
}