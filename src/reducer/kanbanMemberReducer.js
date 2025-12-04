export const initialStateKanban = {
  columns: [],
  boards: [],
  tasks: [],
  status: [],
  selectedBoardStatus: [],
  loading: false,
  loadingEditTask: false,
  error: null,
  selectedBoard: '',
  selectedSector: '',
  selectedTask: null,
  isModalOpen: false,
};

export function kanbanReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };

    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'SET_BOARDS':
      return { ...state, boards: action.payload }
    case "DELETE_BOARD_REQUEST":
      return { ...state, loading: true, error: null };

    case "DELETE_BOARD_SUCCESS":
      return {
        ...state,
        loading: false,
        boards: state.boards.filter((b) => b.idQuadro !== action.payload),
      };

    case "DELETE_BOARD_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_QUADRO_FILTER':
      localStorage.setItem("selectedBoard", action.payload.id);
      localStorage.setItem("selectedBoardName", action.payload.name);
      return {
        ...state,
        selectedBoard: action.payload.id,
        selectedBoardName: action.payload.name,
        selectedBoardStatus: action.payload.statusList || []
      };
    case 'SET_SETOR_FILTER':
      localStorage.setItem('selectedSector', action.payload);
      return { ...state, selectedSector: action.payload };
    case 'SET_FILTERED_COLUMNS':
      return { ...state, filteredColumns: action.payload };
    case "UPDATE_TASK_STATUS":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.idTarefa === action.payload.id
            ? {
              ...task,
              idStatus: action.payload.statusId,
              nomeStatus: action.payload.statusName,
            }
            : task
        ),
      };

    case "CREATE_STATUS_REQUEST":
      return { ...state, loading: true, error: null };
    case "CREATE_STATUS_SUCCESS":
      return {
        ...state,
        loading: false,
        status: [...state.status, action.payload],
        selectedBoardStatus: [...(state.selectedBoardStatus || []), action.payload],
      };

    case "CREATE_STATUS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "DELETE_STATUS_REQUEST":
      return { ...state, loading: true, error: null };

    case "DELETE_STATUS_SUCCESS":
      return {
        ...state,
        loading: false,
        selectedBoardStatus: state.selectedBoardStatus.filter(
          (s) => String(s.id) !== String(action.payload)
        ),
      };

    case "DELETE_STATUS_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "SET_SELECTED_BOARD_STATUS":
      return {
        ...state,
        selectedBoardStatus: action.payload,
      };

    case "UPDATE_STATUS_SUCCESS":
      return {
        ...state,
        loading: false,
        selectedBoardStatus: state.selectedBoardStatus.map(s =>
          s.id === action.payload.id ? action.payload : s
        ),
      };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.idTarefa === action.payload.idTarefa ? action.payload : task
        ),
      };

    case "SET_LOADING_UPDATE_TASK":
      return { ...state, loadingEditTask: action.payload };

    // socket
    case 'SET_TASKS_FROM_SOCKET':
      return {
        ...state,
        tasks: action.payload,
        loading: false
      };

    case 'UPDATE_SINGLE_TASK_DATA':
      const updatedTask = action.payload;
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.idTarefa === updatedTask.idTarefa
            ? updatedTask
            : task
        )
      };
    // socket

    default:
      return state;
  }
}
