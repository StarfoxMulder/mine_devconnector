import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(
      ...middleware
    ) /*,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */
  )
);

export default store;

/****
 * createStore() accepts 3 arguments
 * the first is the reducer, originally symbolized by '() => []
 * the second is initial state, originally symbolized by an empty object '{}'
 * the third is for middleware
 */
