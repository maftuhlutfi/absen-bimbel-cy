const Card = ({children, addStyle}) => {
    return (
        <div className={`p-4 rounded-3xl ${addStyle}`}>
            {children}
        </div>
    );
}
 
export default Card;