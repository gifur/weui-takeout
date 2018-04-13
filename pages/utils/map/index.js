var checkNetworkInf = require("../../../utils/check_network_status.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //地图的宽高
    mapHeight: '100%',
    mapWidth: '100%',
    mapTop:'0',
    //用户当前的位置
    latitude: 0,
    longitude:0,
    //房源标注物
    markers: [],
    //当前地图的缩放级别
    mapScale: 16,
    mapControls: [
      {
        //定位控件
        id : 1,
        position: {
          left: 10 * wx.getStorageSync("kScreenW"),
          top: 490 * wx.getStorageSync("kScreenH"),
          width: 40 * wx.getStorageSync("kScreenW"),
          height: 40 * wx.getStorageSync("kScreenW")
        },
        iconPath: '/assets/images/imgs_main_location@2x.png',
        clickable: true
      }
      ]
  },

  /**
   * 定位当前用户
   */
  getUserCurLocation: function() {
    this.mapCtx.moveToLocation()
    this.setData({
      'mapScale': 16
    })
  },

  /**
   * 控件点击事件
   */
  controltap: function(e) {
    console.log(e)
    var that = this
    var id = e.controlId
    if(id == 1) {
      that.getUserCurLocation()
    }
  },

  //点击标注点
  markertap: function (e) {
    console.log(e.markerId)
  },

   showMarkerInfo: function (data, i) {
    var that = this;
    console.log(data[i].longitude)
   },


  getHouseResources: function() {
    if (!checkNetworkInf.checkNetworkStatus) {
      console.log("网络错误")
    } else {
      var that = this
      console.log("网络已连接")
      var markers = []
      var marker1 = {
        latitude: that.data.latitude + 0.00001,
        longitude: that.data.longitude + 0.00122,
        iconPath: '/assets/images/location.png',
        id: 1,
        width: 40 * wx.getStorageSync("kScreenW"),
        height: 40 * wx.getStorageSync("kScreenW")
      }
      markers.push(marker1)
      var marker2 = {
        latitude: Number(that.data.latitude + 0.00122),
        longitude: Number(that.data.longitude),
        iconPath: '/assets/images/location.png',
        id: 2,
        width: 40 * wx.getStorageSync("kScreenW"),
        height: 40 * wx.getStorageSync("kScreenW")
      }
      markers.push(marker2)
      that.setData({
        markers: markers
      })
      console.log(that.data.markers)
    }
  },

  //位置变化
  regionChanged: function(e) {
    var that = this
    that.mapCtx.getCenterLocation({
      success: function(res) {
        var longitudeFixed = res.longitude.toFixed(6)
        var latitudeFixed = res.latitude.toFixed(6)
        if(e.type == "begin") {
          console.log("the same location")
        } else {
          console.log("location has changed")
          that.getHouseResources()
        }
      }
    })
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    console.log("onload")
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res.latitude);
        console.log(res.longitude);

        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers:[{
            // id : 0,
            // latitude: res.latitude,
            // longitude: res.longitude,
            // iconPath: '/assets/images/location.png'
            latitude: Number(res.latitude),
            longitude: Number(res.longitude),
            iconPath: '/assets/images/location.png',
            id: 0,
            width: 40 * wx.getStorageSync("kScreenW"),
            height: 40 * wx.getStorageSync("kScreenW")
          }]
        });
        console.log(that.data.latitude)
        console.log(that.data.longitude)
        // wx.openLocation({
        //   latitude: that.data.latitude,
        //   longitude: that.data.longitude,
        //   scale: 28
        // })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady')
    this.mapCtx = wx.createMapContext('curMap')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow')
    var that = this
    var mapControls = that.data.mapControls
    that.setData({
      'controls': mapControls,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload')
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
    console.log('onShareAppMessage')
    return {
      desc: '又要找房了？试试这个工具吧',
      path: '/index/index'
    }
  }
})
