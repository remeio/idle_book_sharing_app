// pages/user_detail/user_detail.js
var globalData = getApp().globalData;
import { getDateStrFormDate } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  getUserInfo() {
    let me = this
    wx.request({
      url: globalData.serverUrl + '/user/getUserInfo',
      data: {},
      method: 'POST',
      header: {
        "Content-Type": "application/json",
        'authorization': globalData.token
      },
      success: function (res) {
        let dts = res.data
        if (!dts.success) {
          return;
        }
        let userInfo = dts.userDTO;
        userInfo.gmtCreate = getDateStrFormDate(new Date(userInfo.gmtCreate))
        me.setData({
          userInfo: userInfo
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
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