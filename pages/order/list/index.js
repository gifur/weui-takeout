var Tab = require("../../../dist/tab/index.js")
const App = getApp()

Page(Object.assign({}, Tab, {
    data: {
        activeIndex: 0,
        navList: [],
        order: {
          items: [{
            goods: {
              thumb_url: '/assets/images/food_6.jpg',
              name: '香菇肉包',
              price: 10,
              quantity: '10个/袋',
            },
            meta: {
              total: 2,
              totalAmount: 4
            },
            total: 2,
            amount: 3,
            totalAmount: 6
          },
            {
              goods: {
                thumb_url: '/assets/images/food_7.jpg',
                name: '玉米馒头',
                price: 10,
                quantity: '10个/袋',
              },
              meta: {
                total: 2,
                totalAmount: 4
              },
              total: 2,
              amount: 3,
              totalAmount: 6
            }],
          paginate: {
            total: 10
          }
        },
        prompt: {
            hidden: !0,
            icon: '../../../assets/images/iconfont-order-default.png',
            title: '您还没有相关的订单',
            text: '可以去看看有哪些想买的',
        },
        states: {
          list: [{
            id: 'all',
            title: '全部'
          },
          {
            id: 'comfirm',
            title: '待付款'
          },
          {
            id: 'waitsell',
            title: '待领取'
          },
          {
            id: 'finished',
            title: '已完成'
          },
          {
            id: 'canceled',
            title: '已取消'
          },
          {
            id: 'expire',
            title: '已超期'
          }],
          selectedId: 'all',
          scroll: true
        }
    },
    onLoad() {
        this.order = App.HttpResource('/order/:id', {id: '@id'})
        this.setData({
            navList: [
                {
                    name: '全部',
                    _id: 'all',
                },
                {
                    name: '已提交',
                    _id: 'submitted',
                },
                {
                    name: '已确认',
                    _id: 'confirmed',
                },
                {
                    name: '已完成',
                    _id: 'finished',
                },
                {
                    name: '已取消',
                    _id: 'canceled',
                },
            ]
        })
        //this.onPullDownRefresh()
    },
    initData() {
        const order = this.data.order
        const params = order && order.params
        const type = params && params.type || 'all'

        this.setData({
            order: {
                items: [],
                params: {
                    page : 1,
                    limit: 10,
                    type : type,
                },
                paginate: {}
            }
        })
    },
    navigateTo(e) {
        console.log(e)
        App.WxService.navigateTo('/pages/order/detail/index', {
            id: e.currentTarget.dataset.id
        })
    },
    getList() {
        const order = this.data.order
        const params = order.params

        // App.HttpService.getOrderList(params)
        this.order.queryAsync(params)
        .then(res => {
            const data = res.data
            console.log(data)
            if (data.meta.code == 0) {
                order.items = [...order.items, ...data.data.items]
                order.paginate = data.data.paginate
                order.params.page = data.data.paginate.next
                order.params.limit = data.data.paginate.perPage
                this.setData({
                    order: order,
                    'prompt.hidden': order.items.length,
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
        if (!this.data.order.paginate.hasNext) return
        this.getList()
    },
    onTapTag(e) {
        const type = e.currentTarget.dataset.type
        const index = e.currentTarget.dataset.index
        this.initData()
        this.setData({
            activeIndex: index,
            'order.params.type': type,
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
}))