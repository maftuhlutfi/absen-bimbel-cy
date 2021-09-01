import Card from "../shared/Card";

const Note = () => {
    return (
        <Card addStyle='bg-white px-6'>
            <p className='font-semibold mb-2'>Note</p>
            <p className='text-sm text-secondary leading-relaxed'>
                Jika ada pertanyaan hubungi grup whatsapp Bimbel atau melalui <a href='https://wa.me/6285702774243' className='text-cust-green font-semibold underline'>link ini</a>.
            </p>
        </Card>
    );
}
 
export default Note;