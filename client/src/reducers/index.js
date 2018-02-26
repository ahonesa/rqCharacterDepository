import { combineReducers } from 'redux';
import authReducer from './authReducer';
import * as characterReducer from './characterReducer';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
  auth: authReducer,
  characters: characterReducer.allCharsReducer,        
  selectedChar: characterReducer.oneCharReducer,
  form: reduxForm
});