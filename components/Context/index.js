import axios from "axios"
import { createContext, useEffect, useReducer } from "react"
import { clearAnak, setAnak, setLoading, setSemester } from "./dataAction"
import dataReducer from "./dataReducer"

const initDataState = {
    semester: '',
    anak: null,
    loading: false
}

export const DataContext = createContext(initDataState)

const AllContextProvider = ({children}) => {
    const [dataState, dataDispatch] = useReducer(dataReducer, initDataState)
    
    useEffect(() => {
        const getSemesterNow = async () => {
            const res = await axios.get('http://localhost:3000/api/presensi/all-semester')
            const data = await res.data
            dataDispatch(setSemester(data[data.length - 1]))
        }
        getSemesterNow()
    }, [])

    useEffect(() => {
        if (dataState.anak) {
            if (!JSON.parse(window.localStorage.getItem('anak'))) {
                window.localStorage.setItem('anak', JSON.stringify(dataState.anak))
            }
            dataDispatch(setLoading(false))
        } else {
            dataDispatch(setLoading(true))
            dataDispatch(setAnak(JSON.parse(window.localStorage.getItem('anak')) || null))
        }
    }, [dataState.anak])

    return (
        <DataContext.Provider value={{
            semester: dataState.semester,
            anak: dataState.anak,
            loading: dataState.loading,
            setSemester: data => dataDispatch(setSemester(data)),
            setAnak: data => dataDispatch(setAnak(data)),
            clearAnak: () => {
                dataDispatch(clearAnak())
                window.localStorage.removeItem('anak')
            },
            setLoading: data => dataDispatch(setLoading(data))
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default AllContextProvider