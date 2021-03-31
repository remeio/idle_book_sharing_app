// pages/deposit_detail/deposit_detail.js
var globalData = getApp().globalData;
import { getDateStrFormDate } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    depositList: []
  },
  getDepositList() {
    let me = this
    wx.request({
      url: globalData.serverUrl + '/deposit/getDepositListByUserId',
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
        let depositDTOList = dts.depositDTOList
        depositDTOList.forEach(r => {
          let typeSign = ['+', '-', '-', '+', '-', '+']
          let typeDict = ['缴纳押金', '提取押金', '占用押金', '释放押金', '支付损失', '所得补偿']
          r.depositOperateTypeName = typeDict[r.depositOperateType - 1]
          r.gmtCreateStr = getDateStrFormDate(new Date(r.gmtCreate))
          r.depositAmountStr = typeSign[r.depositOperateType - 1] + "￥" + r.depositAmount + ".00"
          r.color = (r.depositAmountStr.indexOf("+") != -1) ? "#ff8260" : "#ff4057"
        })
        me.setData({
          depositList: depositDTOList
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDepositList()
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