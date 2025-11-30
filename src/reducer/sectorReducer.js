export const initialSectorState = {
    sectors: [],
    dashboard: [],
    loading: false,
    error: null,

    tasksCloseDueDate: [],
    loadingTasksDueDate: false,
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
        case "DELETE_SECTOR_SUCCESS":
            return {
                ...state,
                sectors: state.sectors.filter(sector => sector.idSetor !== action.payload),
                loading: false
            };
            case "DELETE_SECTOR_FAILURE":
        
            return {
                ...state,
                loading: false,
                error: action.payload
            };
         case "UPDATE_SECTOR_SUCCESS":
            return {
                ...state,
                sectors: state.sectors.map(s =>
                    s.idSetor === action.payload.idSetor ? action.payload : s
                ),
                loading: false,
            };
        case "UPDATE_SECTOR_FAILURE":
            return { ...state, loading: false, error: action.payload };
        
        case "FETCH_DASHBOARD_REQUEST": 
            return {...state, loading: true, error: null}
        case "FETCH_DASHBOARD_SUCCESS":
            return {...state, loading: false, dashboard: action.payload }
        case "FETCH_DASHBOARD_FAILURE":
            return {...state, loading: false, error: action.payload}

         case "FETCH_TASKS_DUE_DATE_REQUEST": 
            return {...state, loadingTasksDueDate: true, error: null}
        case "FETCH_TASKS_DUE_DATE_SUCCESS":
            return {...state, loadingTasksDueDate: false, tasksCloseDueDate: action.payload }
        case "FETCH_TASKS_DUE_DATE_FAILURE":
            return {...state, loadingTasksDueDate: false, error: action.payload}
        
        case "RESET_SECTOR_ERROR":
            return { ...state, error: null };
            default:
            return state;
    }
}