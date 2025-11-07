import { useReducer, useEffect } from "react";
import { framerReducer, initalFramerState } from '../../reducer/framerReducer';
import { create_framer } from '../../services/framerService';
import { FramerContext } from './FramerContext';
import { listAllFramers } from '../../services/framerService';

export function FramerProvider({ children }) {
    const [ state, dispatch ] = useReducer(framerReducer, initalFramerState);

    const createFramer = async(newFramerData) => {
        dispatch({ type: "CREATE_FRAMER_REQUEST" });

        try {
            const createFramer = await create_framer(newFramerData);
            dispatch({ type: "CREATE_FRAMER_SUCCESS", payload: createFramer });
        } catch(e) {
            dispatch({ type: "CREATE_FRAMER_FAILURE", payload: e.message });
        }
    }

    const fetchFramers = async () => {
    dispatch({ type: "FETCH_FRAMERS_REQUEST" });
    try {
      const framers = await listAllFramers();
      dispatch({ type: "FETCH_FRAMERS_SUCCESS", payload: framers });
    } catch (e) {
      dispatch({ type: "FETCH_FRAMERS_FAILURE", payload: e.message });
    }
  };

  useEffect(() => {
    fetchFramers();
  }, []);

    return(
        <FramerContext.Provider
            value={{
                framers: state.framers,
                loading: state.loading,
                error: state.error,
                createFramer,
                fetchFramers
            }}
        >
            {children}
        </FramerContext.Provider>
    );
}