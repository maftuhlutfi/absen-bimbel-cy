import axios from "axios";

export default async function handler(req, res) {
    const {year, semester, nama} = req.query
    const presensiRes = await axios.get(`http://localhost:3000/api/presensi/${year}/${semester}`)
    const presensiData = await presensiRes.data
    res.send(presensiData.filter(data => data.name == nama)[0])
}