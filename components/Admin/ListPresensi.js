import axios from "axios";
import {useRouter} from "next/router";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context";
import Card from "../shared/Card";
import Message from "../shared/Message";

const ListPresensi = ({presensi, kelas, tanggal}) => {
    const router = useRouter()
    const {semester} = useContext(DataContext)

    const [filteredPresensi, setFilteredPresensi] = useState(presensi)

    const [message, setMessage] = useState(null)

    useEffect(() => {
        let presensiNew = presensi

        if (kelas != 'Semua') {
            presensiNew = presensi.filter(p => p.class == kelas.split(' ')[1])
        }

        setFilteredPresensi(presensiNew)
    }, [kelas, tanggal])

    const getPresensiByTanggal = presensiValues => {
        const tanggalArray = tanggal.split('/')
        const date = tanggalArray[1]
        const month = tanggalArray[0]

        const values = presensiValues.filter(val => val.month == month)[0].values
        return values.filter(val => val.date == date)[0].value
    }

    const valueToString = {
        0: 'Tidak Hadir',
        1: 'Hadir',
        2: 'Izin'
    }

    const valueToColor = {
        0: 'bg-cust-red',
        1: 'bg-cust-blue',
        2: 'bg-cust-orange'
    }

    const handleChangeKehadiran = (index, value) => {
        const newPresensi = [...filteredPresensi]

        const tanggalArray = tanggal.split('/')
        const date = +tanggalArray[1]
        const month = +tanggalArray[0]

        const monthIndex = newPresensi[index].presensi.findIndex(p => p.month == month)
        const dateIndex = newPresensi[index].presensi[monthIndex].values.findIndex(p => p.date == date)

        newPresensi[index].presensi[monthIndex].values[dateIndex].value = value != null ? (value + 1) % 3 : 1

        setFilteredPresensi(newPresensi)
    }

    const handleSimpan = async () => {
        let absensi = []
        filteredPresensi.forEach(p => {
            absensi = [...absensi, getPresensiByTanggal(p.presensi)]
        })

        const startIndex = presensi.findIndex(p => p.name == filteredPresensi[0].name)
        const endIndex = presensi.findIndex(p => p.name == filteredPresensi[filteredPresensi.length - 1].name)

        try {
            const semesterArray = semester.split(' ')
            const year = semesterArray[0].replace('/', ' ')
            const part = semesterArray[3]

            const res = await axios.post(`http://localhost:3000/api/presensi/${year}/${part}`, {
                absensi,
                tanggal,
                startIndex,
                endIndex
            })
            setMessage({
                type: 'success',
                text: res.data
            })
            router.reload()
        } catch(e) {
            setMessage({
                type: 'error',
                text: 'Ada masalah.'
            })
            router.reload()
        }
    }

    return (
        <div className='pb-20'>
            <Card addStyle='bg-white'>
                <table className='w-full text-sm table-fixed'>
                    <thead className='text-center font-semibold border-b-2 border-icon-light'>
                        <tr>
                            <td className='px-2 pb-3 w-2/12'>No</td>
                            <td className='px-2 pb-3 w-2/5'>Nama</td>
                            <td className='px-2 pb-3 w-2/12'>Kelas</td>
                            <td className='px-2 pb-3'>Kehadiran</td>
                        </tr>
                    </thead>
                    <tbody className='overflow-y-auto'>
                        {filteredPresensi.map((p, index) => 
                            <tr key={index}>
                                <td className='px-2 py-2 text-center'>{index+1}</td>
                                <td className='px-2 py-2'>{p.name}</td>
                                <td className='px-2 py-2 text-center'>{p.class}</td>
                                <td className='px-2 py-2'>
                                    <button 
                                        className={`w-full py-2 text-white rounded-full text-xs 
                                            ${getPresensiByTanggal(p.presensi) != null ? valueToColor[getPresensiByTanggal(p.presensi)] : 'bg-gray-600'}`}
                                        onClick={() => handleChangeKehadiran(index, getPresensiByTanggal(p.presensi))}
                                    >
                                        {getPresensiByTanggal(p.presensi) != null ? valueToString[getPresensiByTanggal(p.presensi)] : 'Belum'}
                                    </button>
                                </td>
                            </tr>    
                        )}
                    </tbody>
                </table>
            </Card>
            <div className='fixed bottom-0 left-0 w-full bg-white py-3 px-8' style={{boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'}}>
                <button onClick={handleSimpan} className='w-full py-3 text-center bg-cust-blue text-white font-semibold rounded-full'>
                    Simpan
                </button>
            </div>
            {message && <Message {...message} />}
        </div>
    );
}
 
export default ListPresensi;