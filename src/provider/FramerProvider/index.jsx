import { useReducer } from "react";
import { framerReducer, initalFramerState } from '../../reducer/framerReducer';
import { create_framer } from '../../services/framerService';
import { FramerContext } from './FramerContext';

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

    return(
        <FramerContext.Provider
            value={{
                framers: state.framers,
                loading: state.loading,
                error: state.error,
                createFramer,
            }}
        >
            {children}
        </FramerContext.Provider>
    );
}