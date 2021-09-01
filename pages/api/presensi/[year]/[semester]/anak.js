import axios from "axios";

export default async function handler(req, res) {
    const {year, semester} = req.query
    const presensiRes = await axios.get(`http://localhost:3000/api/presensi/${year}/${semester}`)
    const presensiData = await presensiRes.data
    res.send(presensiData.map(d => d.name))
}