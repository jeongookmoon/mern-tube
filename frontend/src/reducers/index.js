import { combineReducer } from 'redux';

import user from './user_reducer';
import chat from './chat_reducer';

const rootReducer = combineReducer({
  user,
  chats
})

export default rootReducer;

