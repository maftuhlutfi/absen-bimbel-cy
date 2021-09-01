import getDoc from "../../../../../components/utils/gSheetDoc";

export default function handler(req, res) {
    (async function() {
        try {
            const {year, semester} = req.query
            const doc = await getDoc()
            const sheet = await doc.sheetsByIndex.filter(sh => sh.title == `${year.replace(' ', '/')} - Sem ${semester}`)[0]
            await sheet.loadHeaderRow()
            const allDate = await sheet.headerValues.slice(4)
            res.send(allDate)
        } catch (e) {
            res.send('error')
            console.log(e)
        }
      }())
  }