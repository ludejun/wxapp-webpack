import { types } from '../actions/home';

const initialState = {
  motto: 'Hello World!',
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case types.HOME_FETCH_API:
      return {
        ...state,
        motto: action.payload.motto,
      };

    default:
      return state;
  }
}
