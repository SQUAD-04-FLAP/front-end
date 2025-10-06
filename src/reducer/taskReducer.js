export const initialTaskState = {
  tasks: [],
  loading: false,
  error: null
};

export function taskReducer(state, action) {
    switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_TASK":
      return { ...state, tasks: action.payload, loading: false, error: null };

    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
}