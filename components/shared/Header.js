import Image from 'next/image'

const Header = () => {
    return (
        <div className='bg-white fixed top-0 w-full z-10'>
            <div className='relative m-auto max-w-md py-4 px-8'>
                <Image src='/logo.png' width={35} height={35} />
            </div>
        </div>
    );
}
 
export default Header;