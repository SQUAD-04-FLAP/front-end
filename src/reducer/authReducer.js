export const initialState = {
    user: null,
    allUsers: [],
    token: null,
    loading: true,
    loadingAllUser: false,
    errorAllUser: null,
}

export function authReducer(state, action) {
    switch(action.type) {
        case "LOGIN":
            return { ...state, user: action.payload.user, token: action.payload.token }
        case "LOGOUT":
            return { ...state, user: null, token: null, loading: false };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "FETCH_ALL_USERS_REQUEST":
            return {...state, loadingAllUser: true, errorAllUser: null}
        case "FETCH_ALL_USERS_SUCCESS":
            return {...state, loadingAllUser: false, allUsers: action.payload}
        case "FETCH_ALL_USERS_FAILURE":
            return { ...state, loadingAllUser: false, errorAllUser: action.payload }
        default:
            return state;
    }
}
