export const initialStateFilter = {
  selectedSector: "",
  // futuramente pode-se adicionar mais filtros aqui
};

export function filterReducer(state, action) {
  switch (action.type) {
    case "SET_SECTOR":
      return { ...state, selectedSector: action.payload };
    case "CLEAR_FILTERS":
      return initialStateFilter;
    default:
      return state;
  }
}
