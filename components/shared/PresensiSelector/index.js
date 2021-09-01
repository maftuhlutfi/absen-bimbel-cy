import Card from "../Card";
import SemesterSelect from "./SemesterSelect";

const PresensiSelector = ({isAdmin}) => {
    return (
        <Card addStyle='mb-6 bg-white flex justify-between items-center '>
            <p className='font-semibold'>Presensi</p>
            <SemesterSelect />
        </Card>
    );
}
 
export default PresensiSelector;