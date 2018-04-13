import componentsConfig from './config';
var Tab = require("../../dist/tab/index.js")
const App = getApp()

Page(Object.assign({}, Tab, {
    data: {
      weeks: {
        list: [{
          id: 'mon',
          title: '周一'
        },
        {
          id: 'tues',
          title: '周二'
        },
        {
          id: 'wed',
          title: '周三'
        },
        {
          id: 'thur',
          title: '周四'
        },
        {
          id: 'fri',
          title: '周五'
        }
        ],
        selectedId: 'mon'
      },
      todays: {
        list: [
          {
            id: 'takeout',
            title: '外卖'
          }, {
            id: 'outsource',
            title: '油米外购'
          }
        ],
        selectedId: 'takeout'
      },
        indicatorDots: !0,
        autoplay: !1,
        current: 0,
        interval: 3000,
        duration: 1000,
        circular: !0,
        images: [{
          path: '/assets/images/food_01.jpg'
        },
        {
          path: '/assets/images/food_02.jpg'
        },
        {
          path: '/assets/images/food_03.jpg'
        }],

        goods: {
          items:[{
            name: '奶香馒头',
            price : 10,
            location: '科兴',
            quantity: '10个/袋',
            limit: '限购一袋',
            fresh: true,
            remains: 100,
            thumb_url:'/assets/images/food_04.jpg'
          }, {
            name: '紫薯面包',
            price : 10,
            location: '科兴',
            quantity: '2个/袋',
            limit: '限购一袋',
            fresh: false,
            remains: 999,
            thumb_url: '/assets/images/food_05.jpg'
          }]

        },
        prompt: {
            hidden: !0,
        },
    },
    swiperchange(e) {
        // console.log(e.detail.current)
    },
    onLoad() {
        //this.banner = App.HttpResource('/banner/:id', {id: '@id'})
        //this.goods = App.HttpResource('/goods/:id', {id: '@id'})
        //this.classify = App.HttpResource('/classify/:id', {id: '@id'})

        //this.getBanners()
        //this.getClassify()
    },
    initData() {
        const type = this.data.goods.params && this.data.goods.params.type || ''
        const goods = {
            items: [],
            params: {
                page : 1,
                limit: 10,
                type : type,
            },
            paginate: {}
        }

        this.setData({
            goods: goods
        })
    },
    navigateTo(e) {
        console.log(e)
        App.WxService.navigateTo('/pages/goods/detail/index', {
            id: e.currentTarget.dataset.id
        })
    },
    getBanners() {
    	// App.HttpService.getBanners({is_show: !0})
        this.banner.queryAsync({is_show: !0})
        .then(res => {
            const data = res.data
        	console.log(data)
        	if (data.meta.code == 0) {
                data.data.items.forEach(n => n.path = App.renderImage(n.images[0].path))
        		this.setData({
                   // images: data.data.items
                })
        	}
        })
    },
    getClassify() {
        const activeIndex = this.data.activeIndex

        // App.HttpService.getClassify({
        //     page: 1, 
        //     limit: 4, 
        // })
        this.classify.queryAsync({
            page: 1, 
            limit: 4, 
        })
        .then(res => {
            const data = res.data
            console.log(data)
            if (data.meta.code == 0) {
                this.setData({
                    navList: data.data.items,
                    'goods.params.type': data.data.items[activeIndex]._id
                })
                this.onPullDownRefresh()
            }
        })
    },
    getList() {
        const goods = this.data.goods
        const params = goods.params

        // App.HttpService.getGoods(params)
        this.goods.queryAsync(params)
        .then(res => {
            const data = res.data
            console.log(data)
            if (data.meta.code == 0) {
                data.data.items.forEach(n => n.thumb_url = App.renderImage(n.images[0] && n.images[0].path))
                goods.items = [...goods.items, ...data.data.items]
                goods.paginate = data.data.paginate
                goods.params.page = data.data.paginate.next
                goods.params.limit = data.data.paginate.perPage
                this.setData({
                    goods: goods,
                    'prompt.hidden': goods.items.length,
                })
            }
        })
    },
    onPullDownRefresh() {
        console.info('onPullDownRefresh')
        this.initData()
        this.getList()
    },
    onReachBottom() {
        console.info('onReachBottom')
        if (!this.data.goods.paginate.hasNext) return
        this.getList()
    },
    onTapTag(e) {
        const type = e.currentTarget.dataset.type
        const index = e.currentTarget.dataset.index
        const goods = {
            items: [],
            params: {
                page : 1,
                limit: 10,
                type : type,
            },
            paginate: {}
        }
        this.setData({
            activeIndex: index,
            goods: goods,
        })
        this.getList()
    },
    handleZanTabChange(e) {
      var componentId = e.componentId;
      var selectedId = e.selectedId;

      this.setData({
        [`${componentId}.selectedId`]: selectedId
      });
    }
}));
