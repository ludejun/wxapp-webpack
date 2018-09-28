import { connect } from '@wmfe/vedux';
import { storeUserInfo } from '../../actions/user';
import { fetchAPI } from '../../actions/home';

const pageConfig = {
	data: {
		motto: 'Hello World!',
		userInfo: {},
	},
	// 事件处理函数
	onViewTap() {
		wx.navigateTo({
			url: '../logs/logs',
		});
	},
	onGetUserInfo(e) {
		this.storeUserInfo(e.detail.userInfo);
	},
	onLoad() {
		console.log('DEV: ', __DEV__);
		this.fetchAPI({motto: 'Hello Vedux!'})
	},
};

const mapStateToData = ({user, home}) => {
	return {
		userInfo: user.userInfo,
		motto: home.motto,
	};
};
const mapDispatchToPage = dispatch => ({
	storeUserInfo: userInfo => {
		dispatch(storeUserInfo(userInfo));
	},
	fetchAPI: payload => {
		dispatch(fetchAPI(payload))
	},
});

Page(connect(mapStateToData, mapDispatchToPage)(pageConfig));
