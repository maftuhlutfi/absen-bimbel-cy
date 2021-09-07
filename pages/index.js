import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../components/Context"
import NextBimbelNote from "../components/Home/NextBimbelNote"
import Note from "../components/Home/Note"
import PresensiCards from "../components/Home/PresensiCards"
import PresensiDot from "../components/Home/PresensiDot"
import CustomHead from "../components/shared/CustomHead"
import Greeting from "../components/shared/Greeting"
import PresensiSelector from "../components/shared/PresensiSelector"
import Spinner from "../components/shared/Spinner"
import WithAnak from "../components/utils/WithAnak"

const Home = () => {
  const {anak, semester, setLoading} = useContext(DataContext)

  const [presensi, setPresensi] = useState(null)

  useEffect(() => {
    const getPresensi = async () => {
      const semesterArray = semester.split(' ')
      const year = semesterArray[0].replace('/', ' ')
      const part = semesterArray[3]

      const res = await axios.get(`/api/presensi/${year}/${part}/${anak.name}`)
      const data = await res.data
      setPresensi(data)
    }
    if (semester) {
      getPresensi()
    }
  }, [semester])

  if (!presensi) {
    return (
      <div className='h-screen'>
          <Spinner />
      </div>
    )
  }

  return (
    <>
      <CustomHead 
          title='Dashboard Orang Tua'
          description='Pantau presensi anak anda dalam mengikuti bimbel Cakra Yudha'
          url='https://absenbimbelcy.vercel.app/'
      />
      <div className='min-h-screen'>
        <Greeting name={anak.name} isAdmin={false} />
        <PresensiSelector isAdmin={true} />
        {/* <NextBimbelNote /> */}
        <PresensiCards {...presensi} />
        <PresensiDot {...presensi} />
        <Note />
      </div>
    </>
  )
}

export default WithAnak(Home)