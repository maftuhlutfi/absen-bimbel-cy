import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context";

const SemesterSelect = () => {
    const {semester} = useContext(DataContext)
    const [semesterList, setSemesterList] = useState([])

    useEffect(() => {
        const getSemesterList = async () => {
            const res = await axios.get('/api/presensi/all-semester')
            const data = await res.data
            setSemesterList(data)
        }
        getSemesterList()
    }, [])

    const handleClick = sem => {
        setSemester(sem)
    }

    return (
        <button className='group relative bg-cust-blue px-3 py-2 rounded-full flex text-white items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" viewBox="0 0 16 16">
                <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M12.667 2.667H3.333C2.597 2.667 2 3.264 2 4v9.333c0 .737.597 1.334 1.333 1.334h9.334c.736 0 1.333-.597 1.333-1.334V4c0-.736-.597-1.333-1.333-1.333zM10.667 1.333V4M5.333 1.333V4M2 6.667h12" />
            </svg>
            <p className='text-sm mx-2'>{semester}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width={10} height={6} fill="none" viewBox="0 0 10 6" className='transform group-focus:rotate-180 transition-all ease-in duration-75'>
                <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M1 1l4 4 4-4" />
            </svg>
            <div className='absolute top-full mt-2 bg-white rounded-xl shadow-2xl right-0 overflow-hidden 
                hidden group-focus:flex flex-col'>
                {semesterList.map((sem, index) => 
                    <p key={index} className={`text-primary text-sm py-2 px-4 ${sem == semester && 'bg-icon-light'}`} onClick={() => handleClick(sem)}>
                        {sem}
                    </p>
                )}
            </div>
        </button> 
    );
}
 
export default SemesterSelect;