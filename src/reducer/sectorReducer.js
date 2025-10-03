export const initialSectorState = {
    sectors: [],
    loading: false,
    error: null,
}

export function sectorReducer(state, action) {
    switch(action.type) {
        case "FETCH_SECTORS_REQUEST":
            return { ...state, loading: true, error: null }
        case "FETCH_SECTORS_SUCCESS":
            return { ...state, loading: false, sectors: action.payload };
        case "FETCH_SECTORS_FAILURE":
            return { ...state, loading: false, error: action.payload };
         case "CREATE_SECTOR_SUCCESS":
            return { 
                ...state, 
                loading: false, 
                sectors: [...state.sectors, action.payload] // adiciona novo setor
            };
        case "CREATE_SECTOR_FAILURE":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}