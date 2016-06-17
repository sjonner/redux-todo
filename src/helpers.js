export function createReducer(actionCreators, initialState) {
  return (state = initialState, action) => {
    const handler = actionCreators[action.type];
    return handler ? handler(state, action) : state;
  };
}

// TODO: move to createRequestActionTypes.js
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export function createRequestActionTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((requestTypes, type) => ({
    ...requestTypes,
    [type]: `${base}_${type}`,
  }), {});
}
