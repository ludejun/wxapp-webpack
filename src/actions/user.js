export const types = {
	STORE_USER_INFO: 'STORE_USER_INFO',
};

export function storeUserInfo(payload) {
	return {
		type: types.STORE_USER_INFO,
		payload
	};
}
