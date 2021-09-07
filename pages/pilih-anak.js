import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../components/Context";
import Card from "../components/shared/Card"
import CustomHead from "../components/shared/CustomHead";
import Message from "../components/shared/Message";

const PilihAnakPage = () => {
    const [listAnak, setListAnak] = useState([])
    const {semester, setAnak} = useContext(DataContext)

    const router = useRouter()

    const [errMsg, setErrMsg] = useState('')

    const [input, setInput] = useState('')
    const [showList, setShowList] = useState(true)

    useEffect(() => {
        const getListAnak = async () => {
            const semesterArray = semester.split(' ')
            const year = semesterArray[0].replace('/', ' ')
            const part = semesterArray[3]

            const res = await axios.get(`/api/presensi/${year}/${part}/anak`)
            const data = await res.data
            setListAnak(data)
        }
        if(semester) {
            getListAnak()
        }
    }, [semester])

    if (!listAnak.length) {
        return <p>Loading...</p>
    }

    const handleChange = e => {
        setInput(e.target.value)
        setShowList(true)
        setErrMsg('')
    }

    const handleClick = anak => {
        setInput(anak)
        setShowList(false)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (listAnak.includes(input)) {
            setAnak({name: input})
            router.push('/')
        } else {
            setErrMsg('Nama anak tidak ditemukan.')
        }
    }

    return (
        <>
            <CustomHead 
                title='Pilih Anak'
                description='Cari nama anak anda dan mulai melihat presensi'
                url='https://absenbimbelcy.vercel.app/pilih-anak'
            />
            <div className='w-full h-screen flex items-center justify-center'>
                <Card addStyle='bg-white w-full text-center flex flex-col items-center py-8 -mt-40'>
                    <h3 className='text-primary text-2xl font-bold mb-2'>Pilih Buah Hati</h3>
                    <p className='text-sm text-secondary'>Silahkan cari nama buah hati anda dan tekan tombol Masuk.</p>
                    <form onSubmit={handleSubmit} className='w-full mt-6 relative'>
                        <input 
                            type='text' 
                            className={`w-11/12 border border-icon-light rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-cust-blue`}
                            value={input}
                            onChange={handleChange} 
                        />
                        {input && showList && 
                            <div className='bg-white w-11/12 absolute left-1/2 transform -translate-x-1/2 rounded-2xl shadow-md max-h-64 overflow-y-auto'>
                                {listAnak.filter(a => a.toLowerCase().includes(input.toLowerCase())).map((anak, index) => 
                                    <p 
                                        key={index} 
                                        className='py-2 px-4 hover:bg-icon-light cursor-pointer text-left' 
                                        onClick={() => handleClick(anak)}
                                    >
                                        {anak}
                                    </p>
                                )}
                            </div>
                        }
                        <button 
                            type='submit' 
                            className='mt-4 bg-cust-blue text-white w-11/12 py-3 rounded-full'
                        >
                            Masuk
                        </button>
                    </form>
                </Card>
            </div>
            {errMsg && <Message 
                type='error'
                text={errMsg}
            />}
        </>
    );
}
 
export default PilihAnakPage;