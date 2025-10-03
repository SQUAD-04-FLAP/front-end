export const initialState = {
    user: null,
    token: null,
    loading: true,
}

export function authReducer(state, action) {
    switch(action.type) {
        case "LOGIN":
            return { ...state, user: action.payload.user, token: action.payload.token }
        case "LOGOUT":
            return { ...state, user: null, token: null, loading: false };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}
