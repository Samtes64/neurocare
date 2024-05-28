import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import appReducer from './reducers/app';
import { User } from 'phosphor-react';
import userReducer from "./reducers/userSlice"
import audioCallReducer from "./reducers/audioCall"
import videoCallReducer from "./reducers/videoCall"


// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  //   whitelist: [],
  //   blacklist: [],
};

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  audioCall: audioCallReducer,
  videoCall: videoCallReducer,
 
});

export { rootPersistConfig, rootReducer };