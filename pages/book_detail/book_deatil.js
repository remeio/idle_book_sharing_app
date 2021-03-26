// pages/book_detail/book_deatil.js
var globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId: "",
    bookImageUrl: "",
    bookName: "",
    bookIsbn: "",
    bookDescription: "",
    bookCatalogName: "",
    bookMaxPeriod: 0,
    bookDeposit: 0,
    userFullName: "",
    schoolName: ""
  },

  getBookInfo() {
    let me = this
    wx.request({
      url: globalData.serverUrl + '/book/getBookInfo',
      data: { bookId: parseInt(me.data.bookId) },
      method: 'POST',
      success: function (res) {
        let dts = res.data
        if (!dts.success) {
          return;
        }
        let bookInfo = dts.bookDTO
        me.setData({
          bookImageUrl: bookInfo.bookImageUrl,
          bookName: bookInfo.bookName,
          bookIsbn: bookInfo.bookIsbn,
          bookDescription: bookInfo.bookDescription,
          bookCatalogName: bookInfo.bookCatalogName,
          bookMaxPeriod: bookInfo.bookMaxPeriod,
          bookDeposit: bookInfo.bookDeposit,
          userFullName: bookInfo.userFullName,
          schoolName: bookInfo.schoolName
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookId: options.bookId
    })
    this.getBookInfo()
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