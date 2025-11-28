import { useReducer } from "react";
import { TaskContext } from './TaskContext';
import { initialTaskState, taskReducer } from '../../reducer/taskReducer';
import { fetchTasksByBoardID } from '../../services/tasks';
import { fetchTasksByUserID } from '../../services/tasks';

export function TaskProvider({ children }) {
    const [ state, dispatch ] = useReducer(taskReducer, initialTaskState);

    async function loadTasks(idBoard) {
        dispatch({ type: "SET_LOADING", payload: true });

        try {
            const data = await fetchTasksByBoardID(idBoard);
            dispatch({ type: "SET_TASK", payload: data });
        } catch(e) {
            dispatch({ type: "SET_ERROR", payload: e.message });
        }
    }

    async function loadTasksByUser(idUsuario) {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const data = await fetchTasksByUserID(idUsuario);
      dispatch({ type: "SET_TASKS_BY_USER", payload: data });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: e.message });
    }
  }


    return(
        <TaskContext.Provider value={{
            state,
            loadTasks,
            loadTasksByUser,
            dispatch,
        }}>
            {children}
        </TaskContext.Provider>
    );
}