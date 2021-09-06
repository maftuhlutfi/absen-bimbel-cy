import axios from "axios"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { DataContext } from "../Context"

const WithAnak = (Component) => {
    function Protected({...otherProps}) {
        const {anak, loading, semester, clearAnak} = useContext(DataContext)
        const router = useRouter()

        if (loading) {
            return (
                <div className='z-50 w-screen h-screen flex items-center justify-center bg-white fixed top-0 left-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: 'auto', background: 'rgb(255, 255, 255)', display: 'block', shapeRendering: 'auto' }} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <circle cx={50} cy={50} r={0} fill="none" stroke="#222222" strokeWidth={2}>
                            <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s" />
                            <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s" />
                        </circle><circle cx={50} cy={50} r={0} fill="none" stroke="#9a9a9a" strokeWidth={2}>
                            <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.5s" />
                            <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.5s" />
                        </circle>
                    </svg>
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