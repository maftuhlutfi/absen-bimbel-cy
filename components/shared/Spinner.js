const Spinner = ({width, color}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: 'auto', display: 'block', shapeRendering: 'auto'}} width={width || '40px'} height={width || '40px'} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx={50} cy={50} fill="none" stroke={color || "#51c3fe"} strokeWidth={10} r={38} strokeDasharray="179.0707812546182 61.690260418206066">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" />
            </circle>
        </svg>
    );
}
 
export default Spinner;