const getNearestNextDate = dateList => {
    const today = new Date()
    today.setHours(0,0,0,0)
    
    return dateList.filter(d => new Date(d) >= today)[0]
}

export default getNearestNextDate