import axios from "axios"
import { createContext, useEffect, useReducer } from "react"
import { clearAnak, setAnak, setIsAdmin, setLoading, setSemester } from "./dataAction"
import dataReducer from "./dataReducer"

const initDataState = {
    semester: '',
    anak: null,
    loading: false,
    isAdmin: false
}

export const DataContext = createContext(initDataState)

const AllContextProvider = ({children}) => {
    const [dataState, dataDispatch] = useReducer(dataReducer, initDataState)
    
    useEffect(() => {
        const getSemesterNow = async () => {
            const res = await axios.get('/api/presensi/all-semester')
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

    useEffect(() => {
        if (dataState.isAdmin) {
            if (!JSON.parse(window.localStorage.getItem('isAdmin'))) {
                window.localStorage.setItem('isAdmin', JSON.stringify(dataState.isAdmin))
            }
        } else {
            window.localStorage.setItem('isAdmin', JSON.stringify(dataState.isAdmin))
            dataDispatch(setIsAdmin(false))
        }
    }, [dataState.isAdmin])

    return (
        <DataContext.Provider value={{
            semester: dataState.semester,
            anak: dataState.anak,
            loading: dataState.loading,
            isAdmin: dataState.isAdmin,
            setSemester: data => dataDispatch(setSemester(data)),
            setAnak: data => dataDispatch(setAnak(data)),
            clearAnak: () => {
                dataDispatch(clearAnak())
                window.localStorage.removeItem('anak')
            },
            setLoading: data => dataDispatch(setLoading(data)),
            setIsAdmin: data => dataDispatch(setIsAdmin(data))
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default AllContextProvider