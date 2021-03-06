import axios from "axios";

export default async function handler(req, res) {
    try {
        const host = req.rawHeaders[1]
        const {year, semester} = req.query
        const presensiRes = await axios.get(`${host.includes('localhost') ? 'http' : 'https'}://${host}/api/presensi/${year}/${semester}`)
        const presensiData = await presensiRes.data
        res.send(presensiData.map(d => d.name))
    } catch (e) {
        res.send(e)
    }
}