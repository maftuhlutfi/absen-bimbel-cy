import axios from "axios"
import { useContext, useEffect, useState } from "react"
import AddPresensiSelector from "../components/Admin/AddPresensiSelector"
import DataAnakCard from "../components/Admin/DataAnakCard"
import ListPresensi from "../components/Admin/ListPresensi"
import { DataContext } from "../components/Context"
import CustomHead from "../components/shared/CustomHead"
import Greeting from "../components/shared/Greeting"
import PresensiSelector from "../components/shared/PresensiSelector"
import Spinner from "../components/shared/Spinner"
import getNearestNextDate from "../components/utils/getNearestNextDate"
import WithAdmin from "../components/utils/WithAdmin"

const DashboardAdmin = () => {
    const {isAdmin, semester} = useContext(DataContext)

    const [presensi, setPresensi] = useState(null)

    const [listTanggal, setListTanggal] = useState([])
    const [activeTanggal, setActiveTanggal] = useState('')

    const [listKelas, setListKelas] = useState([])
    const [activeKelas, setActiveKelas] = useState('')

    useEffect(() => {
        const getPresensi = async () => {
            const semesterArray = semester.split(' ')
            const year = semesterArray[0].replace('/', ' ')
            const part = semesterArray[3]

            const res = await axios.get(`/api/presensi/${year}/${part}`)
            const data = await res.data
            setPresensi(data)
        }
        const getListTanggal = async () => {
            const semesterArray = semester.split(' ')
            const year = semesterArray[0].replace('/', ' ')
            const part = semesterArray[3]

            const res = await axios.get(`/api/presensi/${year}/${part}/all-date`)
            const data = await res.data
            setActiveTanggal(getNearestNextDate(data))
            setListTanggal(data)
        }

        const getListKelas = async () => {
            const semesterArray = semester.split(' ')
            const year = semesterArray[0].replace('/', ' ')
            const part = semesterArray[3]

            const res = await axios.get(`/api/presensi/${year}/${part}/all-kelas`)
            const data = await res.data
            setActiveKelas('Semua')
            setListKelas(['Semua', ...data])
        }

        if (semester) {
            getPresensi()
            getListKelas()
            getListTanggal()
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
                title='Dashboard Admin'
                description='Mulai mengabsen sebagai admin'
                url='https://absenbimbelcy.vercel.app/dashboard-admin'
            />
            <div className='min-h-screen'>
                <Greeting name={''} isAdmin={isAdmin} />
                <DataAnakCard
                    total={presensi.length}
                    laki={presensi.reduce((total, anak) => anak.sex == 'L' ? total + 1 : total, 0)}
                    perempuan={presensi.reduce((total, anak) => anak.sex == 'P' ? total + 1 : total, 0)}
                />
                <AddPresensiSelector
                    listTanggal={listTanggal}
                    activeKelas={activeKelas}
                    activeTanggal={activeTanggal}
                    setActiveKelas={setActiveKelas}
                    setActiveTanggal={setActiveTanggal}
                    listKelas={listKelas}
                />
                <ListPresensi 
                    presensi={presensi}
                    kelas={activeKelas}
                    tanggal={activeTanggal}
                />
            </div>
        </>
    )
}

export default WithAdmin(DashboardAdmin)