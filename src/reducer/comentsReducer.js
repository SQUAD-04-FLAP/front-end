export const initalState = {
    comments: [],
    loading: false,
}

export function commentsReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_COMMENTS":
      return { ...state, comments: action.payload, loading: false };

    case "ADD_COMMENT":
      return { ...state, comments: [...state.comments, action.payload] };

    default:
      return state;
  }
}