const Message = ({text, type}) => {
    const isError = type == 'error'

    return (
        <p className={`fixed w-full top-0 left-0 z-20 ${isError ? 'bg-cust-red' : 'bg-cust-green'} text-white text-center py-2 px-16`}>
            {text}
        </p>
    );
}
 
export default Message;