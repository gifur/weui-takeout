var Dialog = require('../../../dist/dialog/index.js');
var Stepper = require('../../../dist/stepper/index.js');

const App = getApp()

Page(Object.assign({}, Dialog, Stepper, {
    data: {
        canEdit: !1,
        carts: {
            items: [{
              goods: {
                thumb_url: '/assets/images/food_6.jpg',
                name: '香菇肉包',
                price: 10,
                quantity: '10个/袋',
              },
              total: 2,
              amount: 3,
              totalAmount: 6
            }],
            totalPrice: 20
        },
        stepper3: {
          stepper: 10,
          min: 1,
          max: 20
        },
        steps2: [
          {
            current: true,
            done: true,
            text: '签到',
            desc: '10.01'
          },
          {
            done: false,
            current: false,
            text: '刷餐卡',
            desc: '10.02'
          },
          {
            done: false,
            current: false,
            text: '领取',
            desc: '10.03'
          }
        ],
        scan_result: '',
        prompt: {
            hidden: !0,
            icon: '../../assets/images/iconfont-cart-empty.png',
            title: '购物车空空如也',
            text: '来挑几件好货吧',
            buttons: [
                {
                    text: '随便逛',
                    bindtap: 'bindtap',
                },
            ],
        },
        notice: {
          text: '售卖时间段里，请到售卖地点扫描相关工作人员的二维码！不然将被视为放飞机喔！'
        }
    },
    bindtap(e) {
        const index = e.currentTarget.dataset.index

        switch(index) {
            case 0:
                App.WxService.switchTab('/pages/index/index')
                break
            default:
                break
        }
    },
    scanCode: function () {
      var that = this
      wx.scanCode({
        success: function (res) {
          console.log(res.result.value)
          that.setData({
            scan_result: res.result
          })
        },
        fail: function (res) {
        }
      })
    },
    onLoad() {
    },
    onShow() {
        //this.getCarts()
    },
    getCarts() {
        App.HttpService.getCartByUser()
        .then(res => {
            const data = res.data
            console.log(data)
            if (data.meta.code == 0) {
                data.data.forEach(n => n.goods.thumb_url = App.renderImage(n.goods.images[0] && n.goods.images[0].path))
                this.setData({
                    'carts.items': data.data,
                    'prompt.hidden': data.data.length,
                })
            }
        })
    },
    onPullDownRefresh() {
        this.getCarts()
    },
    navigateTo(e) {
        console.log(e)
        App.WxService.navigateTo('/pages/goods/detail/index', {
            id: e.currentTarget.dataset.id
        })
    },
    confirmOrder(e) {
        console.log(e)
        App.WxService.setStorageSync('confirmOrder', this.data.carts.items)
        App.WxService.navigateTo('/pages/order/confirm/index')
    },
    del(e) {
        const id = e.currentTarget.dataset.id

        App.WxService.showModal({
            title: '友情提示',
            content: '确定要删除这个宝贝吗？',
        })
        .then(data => {
            if (data.confirm == 1) {
                App.HttpService.delCartByUser(id)
                .then(res => {
                    const data = res.data
                    console.log(data)
                    if (data.meta.code == 0) {
                        this.getCarts()
                    }
                })
            }
        })
    },
    clear() {
        App.WxService.showModal({
            title: '友情提示',
            content: '确定要清空购物车吗？',
        })
        .then(data => {
            if (data.confirm == 1) {
                App.HttpService.clearCartByUser()
                .then(res => {
                    const data = res.data
                    console.log(data)
                    if (data.meta.code == 0) {
                        this.getCarts()
                    }
                })
            }
        })
    },
    onTapEdit(e) {
        this.setData({
            canEdit: !!e.currentTarget.dataset.value
        })
    },
    bindKeyInput(e) {
        const id = e.currentTarget.dataset.id
        const total = Math.abs(e.detail.value)
        if (total < 0 || total > 100) return
        this.putCartByUser(id, {
            total: total
        })
    },
    putCartByUser(id, params) {
        App.HttpService.putCartByUser(id, params)
        .then(res => {
            const data = res.data
            console.log(data)
            if (data.meta.code == 0) {
                this.getCarts()
            }
        })
    },
    decrease(e) {
        const id = e.currentTarget.dataset.id
        const total = Math.abs(e.currentTarget.dataset.total)
        if (total == 1) return
        this.putCartByUser(id, {
            total: total - 1
        })
    },
    increase(e) {
        const id = e.currentTarget.dataset.id
        const total = Math.abs(e.currentTarget.dataset.total)
        if (total == 100) return
        this.putCartByUser(id, {
            total: total + 1
        })
    },
    toggleButtonDialog() {
      this.showZanDialog({
        title: '弹窗',
        content: '这是一个模态弹窗',
        buttons: [{
          text: '微信支付',
          color: '#3CC51F',
          type: 'wechat'
        }, {
          text: '取消',
          type: 'cancel'
        }]
      }).then(({ type }) => {
        console.log('=== dialog with custom buttons ===', `type: ${type}`);
      });
    },
    handleZanStepperChange(e) {
      var componentId = e.componentId;
      var stepper = e.stepper;

      this.setData({
        [`${componentId}.stepper`]: stepper
      });
    }
}));
