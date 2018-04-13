import WxValidate from './assets/plugins/wx-validate/WxValidate'
import WxService from './assets/plugins/wx-service/WxService'
import HttpResource from './helpers/HttpResource'
import HttpService from './helpers/HttpService'
import __config from './etc/config'

App({
	onLaunch() {
		console.log('onLaunch')
		wx.getSystemInfo({
	  success: function (res) {
		var kScreenW = res.windowWidth / 375;
		var kScreenH = res.windowHeight / 603;
		wx.setStorageSync("kScreenW", kScreenW);
		wx.setStorageSync("kScreenH", kScreenH);
	}
});
	},
	onShow() {
		console.log('onShow')
	},
	onHide() {
		console.log('onHide')
	},
	getUserInfo() {
		return this.WxService.login()
		.then(data => {
            console.log(data)
			return this.WxService.getUserInfo()
		})
		.then(data => {
            console.log(data)
			this.globalData.userInfo = data.userInfo
			return this.globalData.userInfo
		})
	},

	globalData: {
		userInfo: null
	},
	renderImage(path) {
        if (!path) return ''
        if (path.indexOf('http') !== -1) return path
        return `${this.__config.domain}${path}`
    },
	WxValidate: (rules, messages) => new WxValidate(rules, messages),
	HttpResource: (url, paramDefaults, actions, options) => new HttpResource(url, paramDefaults, actions, options).init(),
	HttpService: new HttpService({
		baseURL: __config.basePath,
	}),
	WxService: new WxService,
	__config,
})
