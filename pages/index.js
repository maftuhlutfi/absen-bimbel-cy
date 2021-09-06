/api/api/api/apiimport axios from "axios"
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../components/Context"
import Note from "../components/Home/Note"
import PresensiCards from "../components/Home/PresensiCards"
import PresensiDot from "../components/Home/PresensiDot"
import Greeting from "../components/shared/Greeting"
import PresensiSelector from "../components/shared/PresensiSelector"
import WithAnak from "../components/utils/WithAnak"

const Home = () => {
  const {anak, semester, setLoading} = useContext(DataContext)

  const [presensi, setPresensi] = useState(null)

  useEffect(() => {
    const getPresensi = async () => {
      const semesterArray = semester.split(' ')
      const year = semesterArray[0].replace('/', ' ')
      const part = semesterArray[3]

      const res = await axios.get(`http://localhost:3000/api/presensi/${year}/${part}/${anak.name}`)
      const data = await res.data
      setPresensi(data)
    }
    if (semester) {
      getPresensi()
    }
  }, [semester])

  if (!presensi) {
    return <p>Loading...</p>
  }

  return (
    <div className='h-screen'>
      <Greeting name={anak.name} isAdmin={false} />
      <PresensiSelector isAdmin={true} />
      <PresensiCards {...presensi} />
      <PresensiDot {...presensi} />
      <Note />
    </div>
  )
}

export default WithAnak(Home)