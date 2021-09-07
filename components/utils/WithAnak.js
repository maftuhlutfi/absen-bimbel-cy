import axios from "axios"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { DataContext } from "../Context"
import Spinner from "../shared/Spinner"

const WithAnak = (Component) => {
    function Protected({...otherProps}) {
        const {anak, loading, semester, clearAnak} = useContext(DataContext)
        const router = useRouter()

        if (loading) {
            return (
                <div className='h-screen bg-light-blue w-full flex items-center justify-center fixed left-0 top-0 z-20'>
                    <Spinner />
                </div>
            )
        }

        useEffect(() => {
            if (!loading && !window.localStorage.getItem('anak')) {
                router.push('/pilih-anak')
            } else {
                const checkAnak = async () => {
                    const semesterArray = semester.split(' ')
                    const year = semesterArray[0].replace('/', ' ')
                    const part = semesterArray[3]

                    const res = await axios.get(`/api/presensi/${year}/${part}/anak`)
                    const data = await res.data

                    if (!data.includes(anak.name)) {
                        clearAnak()
                        router.push('/pilih-anak')
                    }
                }
                if (semester) {
                    checkAnak()
                }
            }
        }, [anak, loading, semester])
    
        return (
            <Component {...otherProps} />
        );
    }

    return Protected
}
 
export default WithAnak;