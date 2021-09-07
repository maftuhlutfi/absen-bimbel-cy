import Card from "../shared/Card";

const NextBimbelNote = () => {
    return (
        <Card addStyle='bg-yellow-100 px-6 mb-6 flex items-center justify-between'>
            <p className='font-medium'>Bimbel Selanjutnya</p>
            <p className='text-sm text-secondary leading-relaxed'>
                Sabtu, 18 Januari 2021
            </p>
        </Card>
    );
}
 
export default NextBimbelNote;