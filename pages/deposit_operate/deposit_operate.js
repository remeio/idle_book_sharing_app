// pages/reset_password/reset_password.js
import Toast from "@vant/weapp/dist/toast/toast";
import { getDateStrFormDate } from '../../utils/util'
var globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount: 0,
    loadingPay: false,
    loadingDraw: false
  },
  drawDeposit() {
    let me = this;
    if (me.data.amount <= 0) {
      Toast('请输入大于1的金额')
      return
    }
    me.setData({ loadingDraw: true })
    wx.request({
      url: globalData.serverUrl + '/deposit/drawDeposit',
      data: { depositAmount: me.data.amount, outerOrderNo: getDateStrFormDate(new Date()).replace("-", "").replace(" ", "").replace(":", "") + globalData.userId },
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
        Toast("提现成功")
        setTimeout(function() {
          wx.navigateBack({
            delta: 0,
          })
        }, 1000)
      },
      fail: function (e) {
        console.log(e)
        Toast("处理失败，请稍后重试");
      },
      complete: function () {
        me.setData({ loadingDraw: false })
      }
    })
  },
  payDeposit() {
    let me = this;
    if (me.data.amount <= 0) {
      Toast('请输入大于1的金额')
      return
    }
    me.setData({ loadingPay: true })
    wx.request({
      url: globalData.serverUrl + '/deposit/payDeposit',
      data: { depositAmount: me.data.amount, outerOrderNo: getDateStrFormDate(new Date()).replace("-", "").replace(" ", "").replace(":", "") + globalData.userId },
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
        Toast("缴纳成功")
        setTimeout(function() {
          wx.navigateBack({
            delta: 0,
          })
        }, 1000)
      },
      fail: function (e) {
        console.log(e)
        Toast("处理失败，请稍后重试");
      },
      complete: function () {
        me.setData({ loadingPay: false })
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