import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
// slices
import appReducer from "../../redux/reducers/app";
import conversationReducer from "../../redux/reducers/conversation"

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  //   whitelist: [],
  //   blacklist: [],
};

const rootReducer = combineReducers({
  app: appReducer,
  conversation: conversationReducer,
});

export { rootPersistConfig, rootReducer };
