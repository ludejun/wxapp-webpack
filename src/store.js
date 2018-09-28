const {
	createStore,
	applyMiddleware,
	// compose,
} = require('redux');
import thunk from 'redux-thunk';

const reducer = require('./reducers');

const store = createStore(
	reducer,
	applyMiddleware(thunk),
// 	createEnhancer({
// 		beforeDispatch: [],
// 		afterDispatch: [wmRequest.update],
// 	})
);

export default store;
