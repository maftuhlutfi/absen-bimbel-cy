import { useRouter } from 'next/router';
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../Context';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false)

    const router = useRouter()

    const {anak, clearAnak, isAdmin, setIsAdmin} = useContext(DataContext)

    const handleKeluar = () => {
        if (isAdmin) {
            window.localStorage.removeItem('isAdmin')
            setIsAdmin(false)
            router.reload()
        }
    }

    const handlePilihAnak = () => {
        clearAnak()
        router.push('/pilih-anak')
    }

    useEffect(() => {
        setShowMenu(false)
    }, [router])

    return (
        <div className='bg-white fixed top-0 w-full z-10'>
            <div className='relative m-auto max-w-md py-4 px-8 flex justify-between items-center'>
                <Image src='/logo.png' width={35} height={35} />
                <div className='relative w-6 cursor-pointer z-10' onClick={() => setShowMenu(prev => !prev)}>
                    <div 
                        className={`relative w-full bg-gray-500 rounded-full transition-all ease-in duration-200 ${showMenu ? 'transform rotate-45 top-1' : 'mb-1.5'}`} 
                        style={{height: '2px'}} 
                    />
                    <div 
                        className={`relative w-10/12 bg-gray-500 rounded-full transition-all ease-in duration-200 right-0 ${showMenu ? 'right-full opacity-0' : 'ml-auto'}`} 
                        style={{height: '2px'}} 
                    />
                    <div 
                        className={`relative w-full bg-gray-500 rounded-full transition-all ease-in duration-200 ${showMenu ? 'transform -rotate-45' : 'mt-1.5'}`} 
                        style={{height: '2px'}} 
                    />
                </div>
            </div>
            <div className={`bg-black fixed top-0 left-0 bg-opacity-60 w-full h-screen transition-all ease-in duration-200 ${showMenu ? 'opacity-100' : 'opacity-0 hidden'}`}>
                <div className='bg-white h-screen w-full lg:max-w-md absolute left-1/2 transform -translate-x-1/2 pt-20 text-lg flex flex-col items-center'>
                    <div className='px-8 py-4 hover:bg-icon-light cursor-pointer flex gap-4 w-full justify-center' onClick={handlePilihAnak}>
                        <Image src='/icons/user.svg' width={20} height={20} />
                        Pilih Anak
                    </div>
                    {!isAdmin && <div className='px-8 py-4 hover:bg-icon-light cursor-pointer flex gap-4 w-full justify-center' onClick={() => router.push('/admin')}>
                        <Image src='/icons/admin.svg' width={20} height={20} />
                        Admin
                    </div>}
                    {isAdmin &&
                        <div className='px-8 py-4 hover:bg-icon-light cursor-pointer flex gap-4 w-full justify-center' onClick={handleKeluar}>
                            <Image src='/icons/logout.svg' width={20} height={20} />
                            Keluar Admin
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
 
export default Header;