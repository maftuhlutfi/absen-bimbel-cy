export const setSemester = semester => ({
    type: 'SET_SEMESTER',
    payload: semester
})

export const setAnak = anak => ({
    type: 'SET_ANAK',
    payload: anak
})

export const clearAnak = () => ({
    type: 'CLEAR_ANAK'
})

export const setLoading = bool => ({
    type: 'SET_LOADING',
    payload: bool
})