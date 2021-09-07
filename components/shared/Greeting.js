import SemesterSelect from "./PresensiSelector/SemesterSelect"

const Greeting = ({name, isAdmin}) => {
    const getGreet = () => {
        const date = new Date()
        const hour = date.getHours()
        if (hour >= 3 && hour < 11) {
            return 'Pagi'
        }
        if (hour >= 11 && hour < 15) {
            return 'Siang'
        }
        if (hour >= 15 && hour < 18) {
            return 'Sore'
        }
        if (hour >= 18) {
            return 'Malam'
        }
    }

    return (
        <div className={`${isAdmin ? 'mb-8' : 'mb-6'} flex justify-between items-end`}>
            <div>
                <p className='text-secondary mb-1'>Selamat {getGreet()},</p>
                <h3 className='text-primary text-2xl font-semibold'>
                    {isAdmin ? 'Admin' : 'Orang Tua ' + name}
                </h3>
            </div>
            {isAdmin && <SemesterSelect />}
        </div>
    );
}
 
export default Greeting;