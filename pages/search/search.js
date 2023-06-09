// pages/search/search.js
var globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: null,
    keyword: ''
  },
  onChange(e) {
    this.setData({
      keyword: e.detail,
    });
  },
  getSearchBookList() {
    let me = this
    wx.request({
      url: globalData.serverUrl + '/book/getSearchBookList',
      data: {keyword: me.data.keyword},
      header: {
        "Content-Type": "application/json",
        'authorization': globalData.token
      },
      method: 'POST',
      success: function (res) {
        let dts = res.data
        if (!dts.success) {
          return;
        }
        let bookList = dts.bookDTOList
        me.setData({
          bookList: bookList
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isbn = options.isbn
    if (isbn && isbn != "") {
      this.setData({
        keyword: isbn
      })
      this.getSearchBookList()
    }
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