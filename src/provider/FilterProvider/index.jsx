import { useReducer } from "react";
import { filterReducer, initialStateFilter } from "../../reducer/filterReducer";
import { FilterContext } from './FilterContext';

export function FilterProvider({ children }) {
  const [state, dispatch] = useReducer(filterReducer, initialStateFilter)

  const setSelectedSector = (sectorId) => {
    dispatch({ type: "SET_SECTOR", payload: sectorId });
  };

  const setFramers = (framers) => dispatch({ type: "SET_FRAMERS", payload: framers })

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  return (
    <FilterContext.Provider value={{ state, dispatch, setSelectedSector, setFramers, clearFilters }}>
      {children}
    </FilterContext.Provider>
  );
}
