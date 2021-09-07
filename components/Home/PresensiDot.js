import Card from "../shared/Card";

const PresensiDot = ({presensi}) => {
    const colorByValue = {
        0: 'bg-cust-red',
        1: 'bg-cust-green',
        2: 'bg-cust-orange',
        null: 'bg-gray-200'
    }

    return (
        <Card addStyle='bg-white flex flex-col gap-4 p-6 mb-8'>
            {presensi.map(({monthString, values}, indexBulan) => 
                <div key={indexBulan} className='flex items-center'>
                    <p className='w-1/12 flex-shrink-0 text-sm'>{monthString.slice(0,3)}</p>
                    <div className='flex gap-1.5 relative ml-auto place-items-center'>
                        {values.map((val, index) => 
                            <button 
                                key={index} 
                                className={`relative text-xs ${val.value != null ? 'text-white' : 'text-gray-400'} ${colorByValue[val.value]} w-6 h-6`} 
                            >
                                {val.date}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </Card>
    );
}
 
export default PresensiDot;