import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../components/Context";
import Card from "../components/shared/Card"
import Message from "../components/shared/Message";

const PilihAnakPage = () => {
    const router = useRouter()
    const {setIsAdmin, isAdmin} = useContext(DataContext)

    const [errMsg, setErrMsg] = useState('')

    const [input, setInput] = useState('')


    const handleChange = e => {
        setInput(e.target.value)
        setErrMsg('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (input == 'arassoyooo') {
            setIsAdmin(true)
            router.push('dashboard-admin')
        } else {
            setErrMsg('Special words salah')
        }
        setInput('')
    }

    useEffect(() => {
        if (isAdmin) {
            router.push('/dashboard-admin')
        }
    }, [isAdmin])

    return (
        <>
            <div className='w-full h-screen flex items-center justify-center'>
                <Card addStyle='bg-white w-full text-center flex flex-col items-center py-8 -mt-40'>
                    <h3 className='text-primary text-2xl font-bold mb-2'>Login Admin</h3>
                    <p className='text-sm text-secondary'>Masukkan special words untuk membuka menu admin dan mulai mengabsen.</p>
                    <form onSubmit={handleSubmit} className='w-full mt-6 relative'>
                        <input 
                            type='text' 
                            className={`w-11/12 border border-icon-light rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-cust-blue`}
                            value={input}
                            onChange={handleChange}
                        />
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