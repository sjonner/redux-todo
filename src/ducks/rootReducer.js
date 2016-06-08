import { combineReducers } from 'redux';
import * as todoReducers from './todo';

export default combineReducers({
  ...todoReducers
});
