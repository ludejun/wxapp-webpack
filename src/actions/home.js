export const types = {
	HOME_FETCH_API: 'HOME_FETCH_API',
};

const fetch = (data, t = 0) => new Promise((resolve) => {
	setTimeout(resolve, t, data)
});

export function fetchAPI(payload) {
	return dispatch => {

		return fetch(payload, 1500).then(
			data => {
				dispatch({
					type: types.HOME_FETCH_API,
					payload: data,
				})
			},
		)
	};
}
