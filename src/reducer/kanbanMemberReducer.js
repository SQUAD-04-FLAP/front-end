export const initialStateKanban = {
  columns: [],
  boards: [],
  tasks: [],
  loading: true,
  error: null,
  selectedBoard: localStorage.getItem('selectedBoard') || '',
  selectedSector: localStorage.getItem('selectedSector') || '',
  selectedTask: null,
  isModalOpen: false,
};

export function kanbanReducer(state, action) {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload};
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'SET_BOARDS':
      return { ...state, boards: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_QUADRO_FILTER':
      localStorage.setItem("selectedBoard", action.payload)
      return { ...state, selectedBoard: action.payload };
    case 'SET_SETOR_FILTER':
      localStorage.setItem('selectedSector', action.payload);
      return { ...state, selectedSector: action.payload };
    case 'SET_FILTERED_COLUMNS':
      return { ...state, filteredColumns: action.payload };
    case 'UPDATE_TASK_STATUS':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.idTarefa === action.payload.id
            ? { ...task, nomeStatus: action.payload.status }
            : task
        ),
      };
    default:
      return state;
  }
}
