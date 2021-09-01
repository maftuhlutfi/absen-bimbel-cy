import getDoc from '../../../components/utils/gSheetDoc'

export default function handler(req, res) {
    (async function() {
        try {
            const doc = await getDoc()
            const sheets = await doc.sheetsByIndex.map(sh => sh.title)
            res.send(sheets)
        } catch (e) {
            res.send('error')
            console.log(e)
        }
      }())
  }