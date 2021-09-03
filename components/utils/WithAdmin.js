import axios from "axios"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { DataContext } from "../Context"

const WithAdmin = (Component) => {
    function Protected({...otherProps}) {
        const {isAdmin, loading} = useContext(DataContext)
        const router = useRouter()

        useEffect(() => {
            if (!isAdmin) {
                router.push('/admin')
            }
        }, [isAdmin])
    
        return (
            <Component {...otherProps} />
        );
    }

    return Protected
}
 
export default WithAdmin;