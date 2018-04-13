const App = getApp()

Page({
	data: {
		userInfo: {},
		items: [
			{
        icon: 'fa fa-paper-plane-o',
				text: '购买历史',
				path: '/pages/order/list/index'
			},  
			{
        icon: 'fa fa-smile-o',
				text: '常见问题',
				path: '/pages/help/list/index',
			},
		],
		settings: [
      {
        icon: 'fa fa-trash-o',
        text: '缓存清理',
        path: '0.0KB'
      },
			{
        icon: 'fa fa-hand-o-right',
				text: '关于',
				path: '/pages/about/index'
			}
		]
	},
	onLoad() {
		this.getUserInfo()
		this.getStorageInfo()
	},
	navigateTo(e) {
		const index = e.currentTarget.dataset.index
		const path = e.currentTarget.dataset.path
    App.WxService.navigateTo(path);
    },
    getUserInfo() {
    	const userInfo = App.globalData.userInfo

		if (userInfo) {
			this.setData({
				userInfo: userInfo
			})
			return
		}

		App.getUserInfo()
		.then(data => {
            console.log(data)
			this.setData({
				userInfo: data
			})
		})
    },
    getStorageInfo() {
    	App.WxService.getStorageInfo()
    	.then(data => {
    		console.log(data)
    		this.setData({
    			'settings[0].path': `${data.currentSize}KB`
    		})
    	})
    },
    bindtap(e) {
    	const index = e.currentTarget.dataset.index
		const path = e.currentTarget.dataset.path

		switch(index) {
			case 0:
				App.WxService.showModal({
		            title: '友情提示', 
		            content: '确定要清除缓存吗？', 
		        })
		        .then(data => data.confirm == 1 && App.WxService.clearStorage())
				break
			default:
				App.WxService.navigateTo(path)
		}
    },
    logout() {
    	App.WxService.showModal({
            title: '友情提示', 
            content: '确定要登出吗？', 
        })
        .then(data => data.confirm == 1 && this.signOut())
    },
    signOut() {
    	App.HttpService.signOut()
    	.then(res => {
    		const data = res.data
    		console.log(data)
    		if (data.meta.code == 0) {
    			App.WxService.removeStorageSync('token')
    			App.WxService.redirectTo('/pages/login/index')
    		}
    	})
    },
})