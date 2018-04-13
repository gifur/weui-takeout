function check_network() {
  var status = true
  wx.getNetworkType({
    success: function(res) {
      var nt = res.networkType
      if(nt == "none") {
        wx.showModal({
          title: '提示',
          content: '没有网络连接，请检查您的网络设置',
          showCancel: false
        })
        status = false
      } else if(nt == "unknown") {
        wx.showModal({
          title: '提示',
          content: '未知的网络类型，请检查您的网络设置',
          showCancel: false,
        })
        status = false
      }
    }
  })
  return status
}
module.exports = {
  checkNetworkStatus: check_network
}