export const initialState = {
    user: null,
    loading: true,
}

export function authReducer(state, action) {
    switch(action.type) {
        case "LOGIN":
            return { ...state, user: action.payload }
        case "LOGOUT":
            return { user: null, loading: false };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}