import { commentsReducer, initalState } from '../../reducer/comentsReducer';
import { CommentsContext } from './CommentsContext';
import { useReducer } from 'react';

export function CommentsProvider({ children }) {
  const [state, dispatch] = useReducer(commentsReducer, initalState);

  return (
    <CommentsContext.Provider value={{ state, dispatch }}>
      {children}
    </CommentsContext.Provider>
  );
}