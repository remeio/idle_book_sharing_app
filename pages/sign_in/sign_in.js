import Toast from "@vant/weapp/dist/toast/toast";
var globalData = getApp().globalData;
// pages/upload_book/upload_book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhone: "",
    userPassword: ""
  },
  login() {
    console.log(globalData.serverUrl + '/user/signIn')
    wx.request({
      url: globalData.serverUrl + '/user/signIn',
      data: { "userPhone": this.data.userPhone, "userPassword": this.user },
      method: 'POST',
      success: function (res) {
        let dts = res.data
        if (!dts.success) {
          Toast("登录失败，用户名或密码不正确");
          return;
        }
        Toast("登录成功");
        wx.navigate({
          url: '/pages/index/index',
        })
      },
      fail: function (e) {
        console.log(e)
        Toast("处理失败，请稍后重试");
      },
      complete: function () {

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