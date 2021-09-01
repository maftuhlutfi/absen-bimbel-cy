import { GoogleSpreadsheet } from "google-spreadsheet";

const getDoc = async () => {
  const doc = new GoogleSpreadsheet('1scYItwwtZUa9E_YspnQ8hwClbF2TifWGppCraYb8vPc')
        
  await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
  
  await doc.loadInfo();
  return doc
} 

export default getDoc