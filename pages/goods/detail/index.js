// pages/goods/detail1/index.js
var Stepper = require('../../../dist/stepper/index.js');
var Dialog = require('../../../dist/dialog/index.js');
const App = getApp()

Page(Object.assign({}, Stepper, Dialog, {
  
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: 0,
    vertical: !1,
    autoplay: !1,
    interval: 3000,
    duration: 1000,
    current: 0,

    showPopup: false,

    goods: {
      item: {
        images : [
          { path: '/assets/images/food_11.jpg'},
          { path: '/assets/images/food_12.jpg' },
          { path: '/assets/images/food_13.jpg' },
          { path: '/assets/images/food_14.jpg' },
          { path: '/assets/images/food_15.jpg' }
        ],
        name: '纸杯蛋糕',
        price: 10,
        location: '科兴',
        quantity: '2个/袋',
        limit: '限购一袋',
        fresh: true,
        remains: 999,
        time: '周三（2018-04-13)',
        remark: '成分：鸡蛋，低筋面粉，奶油，糖',

        purchased: false
      }
    },

    stepper3: {
      stepper: 10,
      min: 1,
      max: 20
    }
  },
  swiperchange(e) {
    this.setData({
      current: e.detail.current,
    })
  },
  toggleButtonDialog() {
    var parent = this;
    this.showZanDialog({
      title: '预定成功！',
      content: '请在约定的时间内领取您的外卖\r\n\r\n^_^ 记得带上餐卡哦！',
      buttons: [{
        text: '确定',
        color: '#CB1F14',
        type: 'forward'
      }]
    }).then(({ type }) => {
      if (type == 'forward') {
        parent.setData({
          'goods.item.purchased': true
        });
      }
      console.log('=== dialog with custom buttons ===', `type: ${type}`);
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  addCart: function() {
    this.setData({
      showPopup: !this.data.showPopup
    });
    this.toggleButtonDialog();
  },
  togglePopup: function() {
    if (!this.data.goods.item.purchased) {
      this.setData({
        showPopup: !this.data.showPopup
      })
    }

  },

  handleZanStepperChange(e) {
    var componentId = e.componentId;
    var stepper = e.stepper;

    this.setData({
      [`${componentId}.stepper`]: stepper
    });
  }
}));