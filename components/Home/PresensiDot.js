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
                    <p className='w-2/12 flex-shrink-0'>{monthString.slice(0,3)}</p>
                    <div className='grid grid-cols-9 w-full place-items-center'>
                        {values.map((val, index) => 
                            <button 
                                key={index} 
                                className={`relative text-xs text-white ${colorByValue[val.value]} w-6 h-6 ${indexBulan < presensi.length && index == 0 && 'col-start-'+ (10 - values.length)}`} 
                            >
                                {val.value != null && val.date}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </Card>
    );
}
 
export default PresensiDot;