export const initialStateFilter = {
  selectedSector: "",
  framers: [],
  loading: false,
};

export function filterReducer(state, action) {
  switch (action.type) {
    case "SET_SECTOR":
      return { ...state, selectedSector: action.payload };
      
    case "SET_FRAMERS":
      return { ...state, framers: action.payload };

    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "CLEAR_FILTERS":
      return initialStateFilter;

    default:
      return state;
  }
}
