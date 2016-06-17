// import { createAction } from 'redux-actions';
import { createReducer, createRequestActionTypes } from '../../helpers';

function getNextId(items) {
  return items.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1;
}

// ------------------------------------
// ActionTypes/Constants
// ------------------------------------
const ADD = createRequestActionTypes('todo/ADD');

// ------------------------------------
// ActionCreators
// ------------------------------------
export const addTodo = (text) => (dispatch) => {
  dispatch({ type: ADD.REQUEST });
  setTimeout(() => (
    Math.floor(3 * Math.random()) === 0
      ? dispatch({ error: new Error('failed async add'), type: ADD.FAILURE })
      : dispatch({ text, type: ADD.SUCCESS })
  ), 10);
};
// export const addTodo = createAction(ADD.REQUEST);

// ------------------------------------
// ActionHandlers
// ------------------------------------
const actionHandlers = {
  [ADD.REQUEST]: (state, action) => ({
    ...state,
    loading: true,
    error: null,
  }),

  [ADD.SUCCESS]: (state, action) => ({
    items: [
      ...state.items,
      {
        id: getNextId(state.items),
        text: action.text,
        completed: false,
      }
    ],
    loading: false,
    error: null,
  }),

  [ADD.FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default createReducer(actionHandlers, initialState);
