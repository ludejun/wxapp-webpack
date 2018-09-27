import { types } from '../actions/user';

const initialState = {
	userInfo: null,
};

export default function user(state = initialState, action = {}) {
	switch (action.type) {
		case types.STORE_USER_INFO:
			return {
				...state,
				userInfo: action.payload,
			};

		default:
			return state;
	}
}
