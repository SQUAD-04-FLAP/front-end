import { useReducer, useEffect } from "react";
import { framerReducer, initalFramerState } from '../../reducer/framerReducer';
import { create_framer } from '../../services/framerService';
import { updateFramer } from '../../services/framerService';
import { listAllFramers } from '../../services/framerService';
import { delete_framer } from '../../services/framerService';
import { FramerContext } from './FramerContext';
import { useAuth } from '../../hooks/useAuth';

export function FramerProvider({ children }) {
    const [ state, dispatch ] = useReducer(framerReducer, initalFramerState);
    const { token } = useAuth();

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
        if (token) { 
            fetchFramers();
        }
    }, [token]);

  const deleteBoard = async (idBoard) => {
      dispatch({ type: "DELETE_BOARD_REQUEST" });
  
      try {
        await delete_framer(idBoard);
        dispatch({ type: "DELETE_BOARD_SUCCESS", payload: idBoard });
      } catch (e) {
        dispatch({ type: "DELETE_BOARD_FAILURE", payload: e.message });
         throw e;
      }
    };

  const updateFramerHandler = async (idBoard, updatedData) => {
        dispatch({ type: "UPDATE_FRAMER_REQUEST" });

        try {
            const updatedFramer = await updateFramer(idBoard, updatedData);
            dispatch({ type: "UPDATE_FRAMER_SUCCESS", payload: updatedFramer });
        } catch (e) {
            dispatch({ type: "UPDATE_FRAMER_FAILURE", payload: e.message });
            throw e;
        }
    };

    return(
        <FramerContext.Provider
            value={{
                framers: state.framers,
                loading: state.loading,
                error: state.error,
                createFramer,
                deleteBoard,
                fetchFramers,
                updateFramerHandler,
            }}
        >
            {children}
        </FramerContext.Provider>
    );
}