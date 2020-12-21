import { combineReducers } from "redux";
import reportReducer from "./reducers/reportReducer";
import ticketActivityReducer from "./reducers/ticketActivityReducer";

const rootReducer = combineReducers({
  reportReducer: reportReducer,
  ticketActivityReducer: ticketActivityReducer,
});

export default rootReducer;
