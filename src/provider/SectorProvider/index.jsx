import { useReducer, useEffect } from "react";
import { sectorReducer, initialSectorState } from '../../reducer/sectorReducer';
import { list_sectors } from '../../services/sectorsService';
import { SectorContext } from './SectorContext';

import { create_sector } from '../../services/sectorsService';


export function SectorProvider({ children }) {
    const [ state, dispatch ] = useReducer(sectorReducer, initialSectorState);

    // função para carregar setores
    const fetchSectors = async() => {
        dispatch({ type: "FETCH_SECTORS_REQUEST" });

        try {
            const data = await list_sectors();
            dispatch({ type: "FETCH_SECTORS_SUCCESS", payload: data });
        } catch(e) {
            dispatch({ type: "FETCH_SECTORS_FAILURE", payload: e.message });
        }
    }

  const createSector = async (newSectorData) => {
  dispatch({ type: "CREATE_SECTOR_REQUEST" });

  try {
    const createdSector = await create_sector(newSectorData); // chama o service
    dispatch({ type: "CREATE_SECTOR_SUCCESS", payload: createdSector }); // passa o retorno do service
  } catch (e) {
    dispatch({ type: "CREATE_SECTOR_FAILURE", payload: e.message });
  }
}


  useEffect(() => {
    fetchSectors();
  }, []);

  return (
    <SectorContext.Provider value={{
      sectors: state.sectors,
      loading: state.loading,
      error: state.error,
      fetchSectors,
      createSector
     }}>
      {children}
    </SectorContext.Provider>
  );
}