export const initialStateKanban = {
  columns: [],
  boards: [],
  tasks: [],
  loading: false,
  loadingEditTask: false,
  error: null,
  selectedBoard: '',
  selectedTask: null,
  isModalOpen: false,
};

export function kanbanReducer(state, action) {
  switch (action.type) {
     case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    
    case 'SET_TASKS':
      return { ...state, tasks: action.payload};
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
    return {
      ...state,
      selectedBoard: action.payload.id,
      selectedBoardName: action.payload.name,
      boards: state.boards.map(b =>
        b.idQuadro === action.payload.id ? { ...b, status: action.payload.statusList } : b
      ),
      selectedBoardStatus: action.payload.statusList || action.payload.status || []
    };

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

case "CREATE_STATUS_SUCCESS": {
  if (!action.boardId) return state;

  const newStatus = action.payload;

  const updatedBoards = state.boards.map(b =>
    b.idQuadro === action.boardId
      ? {
          ...b,
          status: [
            ...(b.status || []).filter(s => s.id !== newStatus.id),
            newStatus
          ]
        }
      : b
  );

  const updatedSelectedBoardStatus =
    state.selectedBoard === action.boardId
      ? [
          ...(state.selectedBoardStatus || []).filter(
            s => s.id !== newStatus.id
          ),
          newStatus
        ]
      : state.selectedBoardStatus;

  return {
    ...state,
    loading: false,
    boards: updatedBoards,
    selectedBoardStatus: updatedSelectedBoardStatus
  };
}




case "CREATE_STATUS_FAILURE":
  return { ...state, loading: false, error: action.payload };

case "DELETE_STATUS_REQUEST":
  return { ...state, loading: true, error: null };

case "UPDATE_STATUS_SUCCESS": {
  const updatedBoards = state.boards.map(b =>
    b.idQuadro === action.boardId
      ? {
          ...b,
          status: (b.status || []).map(s =>
            s.id === action.payload.id ? action.payload : s
          ),
        }
      : b
  );

  const updatedSelectedBoardStatus =
    state.selectedBoard === action.boardId
      ? (state.selectedBoardStatus || []).map(s =>
          s.id === action.payload.id ? action.payload : s
        )
      : state.selectedBoardStatus;

  return {
    ...state,
    loading: false,
    boards: updatedBoards,
    selectedBoardStatus: updatedSelectedBoardStatus,
  };
}

case "DELETE_STATUS_SUCCESS": {
  const updatedBoards = state.boards.map(b =>
    b.idQuadro === action.boardId
      ? {
          ...b,
          status: (b.status || []).filter(
            s => String(s.id) !== String(action.payload)
          ),
        }
      : b
  );

  const updatedSelectedBoardStatus =
    state.selectedBoard === action.boardId
      ? (state.selectedBoardStatus || []).filter(
          s => String(s.id) !== String(action.payload)
        )
      : state.selectedBoardStatus;

  return {
    ...state,
    loading: false,
    boards: updatedBoards,
    selectedBoardStatus: updatedSelectedBoardStatus,
  };
}

case "DELETE_STATUS_FAILURE":
  return { ...state, loading: false, error: action.payload };

  case "UPDATE_TASK":
  return {
    ...state,
    tasks: state.tasks.map(task =>
      task.idTarefa === action.payload.idTarefa ? action.payload : task
    ),
  };

case "SET_LOADING_UPDATE_TASK":
  return { ...state, loadingEditTask: action.payload };
    default:
      return state;
  }
}
