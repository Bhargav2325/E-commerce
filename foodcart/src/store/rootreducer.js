import { combineReducers } from "redux";
import 

const rootReducer = combineReducers({
  cart: cartReducer, // Ensure the key matches what you're accessing in useSelector
});

export default rootReducer;
