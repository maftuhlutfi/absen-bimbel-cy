import Card from "../shared/Card";

const DataAnakCard = ({total, laki, perempuan}) => {
    console.log(total)
    return (
        <div className='grid grid-cols-2 grid-rows-2 w-full gap-4 text-white mb-8'>
            <Card addStyle='bg-cust-blue row-span-2 flex flex-col items-start justify-end'>
                <h3 className='text-4xl font-bold mb-2'>{total}</h3>
                <p>Total anak</p>
            </Card>
            <Card addStyle='bg-red-500 flex items-center py-2'>
                <h3 className='text-2xl font-bold'>{laki}</h3>
                <p className='ml-4'>Laki-laki</p>
            </Card>
            <Card addStyle='bg-purple-500 flex items-center py-2'>
                <h3 className='text-2xl font-bold'>{perempuan}</h3>
                <p className='ml-4'>Perempuan</p>
            </Card>
        </div>
    );
}
 
export default DataAnakCard;