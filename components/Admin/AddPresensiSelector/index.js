import Card from "../../shared/Card";

const AddPresensiSelector = ({listKelas, listTanggal, setActiveKelas, setActiveTanggal, activeKelas, activeTanggal}) => {
    const handleChangeTanggal = tgl => {
        setActiveTanggal(tgl)
    }

    const handleChangeKelas = kelas => {
        setActiveKelas(kelas)
    }

    return (
        <Card addStyle='mb-6 bg-white flex justify-between items-center'>
            <p className='font-semibold'>Presensi</p>
            <div className='flex gap-2'>
                <button className='group relative bg-cust-blue px-3 py-2 rounded-full flex text-white items-center text-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" viewBox="0 0 16 16">
                        <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M12.667 2.667H3.333C2.597 2.667 2 3.264 2 4v9.333c0 .737.597 1.334 1.333 1.334h9.334c.736 0 1.333-.597 1.333-1.334V4c0-.736-.597-1.333-1.333-1.333zM10.667 1.333V4M5.333 1.333V4M2 6.667h12" />
                    </svg>
                    <p className='text-xs mx-2'>{activeTanggal}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width={10} height={6} fill="none" viewBox="0 0 10 6" className='transform group-focus:rotate-180 transition-all ease-in duration-75'>
                        <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M1 1l4 4 4-4" />
                    </svg>
                    <div className='absolute top-full mt-2 bg-white rounded-xl shadow-2xl right-0 overflow-hidden overflow-y-auto max-h-48
                        hidden group-focus:flex flex-col'>
                        {listTanggal.map((tgl, index) => 
                            <p key={index} className={`text-primary text-xs py-2 px-4 ${tgl == activeTanggal && 'bg-icon-light'}`} onClick={() => handleChangeTanggal(tgl)}>
                                {tgl}
                            </p>
                        )}
                    </div>
                </button> 
                <button className='group relative border-2 border-cust-blue px-3 py-2 rounded-full flex text-primary items-center'>
                    <p className='text-xs mx-2'>{activeKelas}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width={10} height={6} fill="none" viewBox="0 0 10 6" className='transform group-focus:rotate-180 transition-all ease-in duration-75'>
                        <path stroke="#51C3FE" strokeLinecap="round" strokeLinejoin="round" d="M1 1l4 4 4-4" />
                    </svg>
                    <div className='absolute top-full mt-2 bg-white rounded-xl shadow-2xl right-0 overflow-hidden 
                        hidden group-focus:flex flex-col'>
                        {listKelas.map((kelas, index) => 
                            <p key={index} className={`text-primary text-xs py-2 px-4 ${kelas == activeKelas && 'bg-icon-light'}`} onClick={() => handleChangeKelas(kelas)}>
                                {kelas}
                            </p>
                        )}
                    </div>
                </button> 
            </div>
        </Card>
    );
}
 
export default AddPresensiSelector;