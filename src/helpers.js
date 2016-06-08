export function createReducer(actionCreators, initialState) {
  return (state = initialState, action) => {
    const handler = actionCreators[action.type];
    return handler ? handler(state, action) : state;
  };
}
