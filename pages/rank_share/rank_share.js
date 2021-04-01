// pages/rank_borrow/rank_borrow.js
var globalData = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankList: []
  },

  getRankList() {
    let me = this
    wx.request({
      url: globalData.serverUrl + '/shareRecord/getShareRankList',
      data: {},
      method: 'POST',
      success: function (res) {
        let dts = res.data
        if (!dts.success) {
          return;
        }
        let rankList = dts.rankDTOList.map(r => {
          return {
            title: r.userFullName,
            value: r.number
          }
        })
        me.setData({
          rankList: rankList
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRankList()
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