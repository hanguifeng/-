import { combineReducers, compose, createStore } from 'redux';
import {
  BrowserProtocol,
  queryMiddleware,
  createHistoryEnhancer,
} from 'farce';
import {
  Matcher,
  createMatchEnhancer,
  foundReducer,
} from 'found';
import routeConfig from 'src/routes/routeConfig';
console.log(routeConfig);
const createMyStore = routeConfig => {
  return createStore(
    combineReducers({
      found: foundReducer,
    }),
    compose(
      createHistoryEnhancer({
        protocol: new BrowserProtocol(),
        middlewares: [queryMiddleware],
      }),
      createMatchEnhancer(new Matcher(routeConfig)),
    ),
  );
};


const store = createMyStore(routeConfig);
// https://github.com/4Catalyzer/farce#transition-hooks

export default store;