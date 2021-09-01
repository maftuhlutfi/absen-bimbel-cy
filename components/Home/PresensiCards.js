import Card from "../shared/Card";

const PresensiCards = ({total, hadir, izin, tidakHadir}) => {
    console.log(total)
    return (
        <div className='grid grid-cols-2 grid-rows-3 w-full gap-4 text-white mb-6'>
            <Card addStyle='bg-cust-blue row-span-3 flex flex-col items-start justify-end'>
                <h3 className='text-4xl font-bold mb-2'>{total}</h3>
                <p>Total bimbel</p>
            </Card>
            <Card addStyle='bg-cust-green flex items-center py-2'>
                <h3 className='text-2xl font-bold'>{hadir}</h3>
                <p className='ml-4'>Hadir</p>
            </Card>
            <Card addStyle='bg-cust-orange flex items-center py-2'>
                <h3 className='text-2xl font-bold'>{izin}</h3>
                <p className='ml-4'>Izin</p>
            </Card>
            <Card addStyle='bg-cust-red flex items-center py-2'>
                <h3 className='text-2xl font-bold'>{tidakHadir}</h3>
                <p className='ml-4'>Tidak Hadir</p> 
            </Card>
        </div>
    );
}
 
export default PresensiCards;