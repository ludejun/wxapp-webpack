import { combineReducers } from 'redux';
import user from './user';
import home from './home';

const reducer = combineReducers({
	user,
	home,
});

if (process.env.NODE_ENV === 'production') {
	module.exports = reducer;
} else {
	module.exports = (state, action) => {
		const nextState = reducer(state, action);
		// console.log(action.type, action);
		return nextState;
	};
}
