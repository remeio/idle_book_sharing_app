import Toast from "@vant/weapp/dist/toast/toast";
var globalData = getApp().globalData;
// pages/upload_book/upload_book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhone: "",
    userPassword: "",
    loading: false
  },
  toSignUp() {
    wx.navigateTo({
      url: '/pages/sign_up/sign_up',
    })
  },
  login() {
    let me = this;
    me.setData({ loading: true })
    wx.request({
      url: globalData.serverUrl + '/user/signIn',
      data: { "userPhone": me.data.userPhone, "userPassword": me.data.userPassword },
      method: 'POST',
      success: function (res) {
        let dts = res.data
        if (!dts.success) {
          Toast(dts.errorInfo);
          return;
        }
        globalData.token = dts.token
        globalData.userId = dts.userId
        Toast("登录成功")
        setTimeout(function() {
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }, 1000)
      },
      fail: function (e) {
        console.log(e)
        Toast("处理失败，请稍后重试");
      },
      complete: function () {
        me.setData({ loading: false })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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

  }
})