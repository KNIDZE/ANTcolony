import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composeWithDevTools } = require('redux-devtools-extension');

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
