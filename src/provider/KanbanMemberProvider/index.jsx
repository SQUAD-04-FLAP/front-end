import { useReducer, useEffect } from 'react';
import { initialStateKanban, kanbanReducer } from '../../reducer/kanbanMemberReducer';
import { KanbanMemberContext } from './KanbanMemberContext';
import { listFramersBySector } from '../../services/framerService';
import { fetchTasksByBoardID } from '../../services/tasks';

export function KanbanMemberProvider({ children }) {
  const [state, dispatch] = useReducer(kanbanReducer, initialStateKanban);


  useEffect(() => {
    if (!state.selectedSector) return;

    const loadData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const data = await listFramersBySector(state.selectedSector);

        dispatch({ type: 'SET_BOARDS', payload: data })
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err.message });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadData();
  }, [state.selectedSector]);

  useEffect(() => {
    if (!state.selectedBoard) return;

    const loadData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const data = await fetchTasksByBoardID(state.selectedBoard);

        dispatch({ type: 'SET_TASKS', payload: data })
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err.message });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadData();
  }, [state.selectedBoard]);

  // ------------------------------
  // Atualizar filteredColumns quando columns ou filtros mudarem
  // ------------------------------
  useEffect(() => {
    const columnsArray = state.columns || [];

    let filtered = [...columnsArray];

    if (state.quadroSelecionado) {
      filtered = filtered.filter(
        (col) => col.quadroId === parseInt(state.quadroSelecionado)
      );
    }

    if (state.setorSelecionado) {
      filtered = filtered.map((col) => ({
        ...col,
        tasks: (col.tasks || []).filter(
          (task) => task.setorId === parseInt(state.setorSelecionado)
        ),
      }));
    }

    dispatch({ type: 'SET_FILTERED_COLUMNS', payload: filtered });
  }, [state.columns, state.quadroSelecionado, state.setorSelecionado]);

  return (
    <KanbanMemberContext.Provider value={{ state, dispatch }}>
      {children}
    </KanbanMemberContext.Provider>
  );
}
