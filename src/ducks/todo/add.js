import { createReducer } from '../../helpers';

function getNextId(todos) {
  return todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1;
}

// ------------------------------------
// Constants
// ------------------------------------
const ADD = 'todo/ADD';
const ADD_SUCCESS = 'todo/ADD_SUCCESS';
const ADD_FAIL = 'todo/ADD_FAIL';

// ------------------------------------
// ActionCreators
// ------------------------------------
export const addTodo = (text) => ({
  text,
  type: ADD,
});

// ------------------------------------
// Action Handlers
// ------------------------------------
const actionHandlers = {
  [ADD]: (state, action) => [
    ...state,
    {
      id: getNextId(state),
      text: action.text,
      completed: false,
    }
  ]
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = [
  { id: 0, text: 'Hey', completed: false },
  { id: 1, text: 'Ho', completed: false },
  { id: 2, text: 'Let\'s go', completed: false },
];

export default createReducer(actionHandlers, initialState);
