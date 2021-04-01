// pages/reset_password/reset_password.js
import Toast from "@vant/weapp/dist/toast/toast";
var globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedbackContent: '',
    feedbackOrder: '',
    loading: false
  },
  feedback() {
    let me = this;
    me.setData({ loading: true })
    wx.request({
      url: globalData.serverUrl + '/user/feedback',
      data: { "feedbackContent": me.data.feedbackContent, "feedbackOrder": me.data.feedbackOrder },
      method: 'POST',
      header: {
        "Content-Type": "application/json",
        'authorization': globalData.token
      },
      success: function (res) {
        let dts = res.data
        if (!dts.success) {
          Toast(dts.errorInfo);
          return;
        }
        Toast("反馈成功，感谢您的反馈~")
        setTimeout(function () {
          wx.navigateBack({
            delta: 0,
          })
        }, 1000)
      },
      fail: function (e) {
        console.log(e)
        Toast("反馈成功失败，请稍后重试");
      },
      complete: function () {
        me.setData({ loading: false })
      }
    })
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

  }
})