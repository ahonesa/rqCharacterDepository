import { combineReducers } from 'redux';
import authReducer from './authReducer';
import paramsReducer from './paramsReducer';
import messagesReducer from './messagesReducer';
import cthulhuMessagesReducer from './cthulhuMessagesReducer';
import * as cthulhuReducer from './cthulhuReducer'
import * as characterReducer from './characterReducer';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
  auth: authReducer,
  cthulhuCharacters: cthulhuReducer.allCthulhuCharsReducer,
  selectedCthulhuChar: cthulhuReducer.oneCthulhuCharReducer,
  characters: characterReducer.allCharsReducer,
  selectedChar: characterReducer.oneCharReducer,
  form: reduxForm,
  params: paramsReducer,
  messages: messagesReducer,
  cthulhuMessages: cthulhuMessagesReducer
});