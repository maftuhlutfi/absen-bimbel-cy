const dataReducer = (state, action) => {
    switch (action.type) {
        case "SET_SEMESTER":
            return {
                ...state,
                semester: action.payload
            }
        case "SET_ANAK":
            return {
                ...state,
                anak: action.payload
            }
        case "CLEAR_ANAK":
            return {
                ...state,
                anak: null
            }
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload
            }
        case 'SET_IS_ADMIN':
            return {
                ...state,
                isAdmin: action.payload
            }
        default:
            return state;
    }
}

export default dataReducer