export const initalFramerState = {
    framers: [],
    loading: false,
    error: null,
}

export function framerReducer(state, action) {
    switch(action.type) {
        case "FETCH_FRAMERS_REQUEST":
            return { ...state, loading: true, error: null }
        case "FETCH_FRAMERS_SUCCESS":
            return { ...state, loading: false, framers: action.payload }
        case "FETCH_FRAMERS_FAILURE":
            return { ...state, loading: false, error: action.payload }
        case "CREATE_FRAMER_SUCCESS":
            return {
                ...state,
                loading: false,
                framers: [...state.framers, action.payload]
            };
        case "CREATE_FRAMER_FAILURE":
            return { ...state, loading: false, error: action.payload };
        case "DELETE_BOARD_REQUEST":
                return { ...state, loading: true, error: null };
        case "DELETE_BOARD_SUCCESS":
        return {
            ...state,
            loading: false,
            framers: state.framers.filter((b) => b.idQuadro !== action.payload),
        };
        
        case "UPDATE_FRAMER_REQUEST":
            return { ...state, loading: true, error: null };
        case "UPDATE_FRAMER_SUCCESS":
            return { 
                ...state, 
                loading: false, 
                framers: state.framers.map(f => 
                    f.idQuadro === action.payload.idQuadro ? action.payload : f
                ) 
            };
        case "UPDATE_FRAMER_FAILURE":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}