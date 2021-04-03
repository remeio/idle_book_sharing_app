const { default: Toast } = require("@vant/weapp/dist/toast/toast");

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
    schoolName: "",
    bookStatus: 0,
    score: 0,
    // 状态
    borrowLoading: false,
    addLoading: false,
    bookcaseShow: false,
    isMe: false
  },
  onCloseBookcase() {
    this.setData({
      bookcaseShow: false
    })
  },
  showPopupBookcase() {
    this.setData({
      bookcaseShow: true
    })
  },
  getBookScore() {
    let me = this
    wx.request({
      url: globalData.serverUrl + '/shareRecord/getScoreOfBook',
      data: { bookId: parseInt(me.data.bookId) },
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
        me.setData({
          score: dts.score
        })
      }
    })
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
          schoolName: bookInfo.schoolName,
          bookStatus: bookInfo.bookStatus,
          isMe: bookInfo.userId == globalData.userId
        })
      }
    })
  },
  addToBookcase() {
    let me = this
    me.setData({ addLoading: true })
    wx.request({
      url: globalData.serverUrl + '/bookcase/addToBookcase',
      data: { bookId: parseInt(me.data.bookId) },
      method: 'POST',
      header: {
        "Content-Type": "application/json",
        'authorization': globalData.token
      },
      success: function (res) {
        let dts = res.data
        if (!dts.success) {
          Toast("添加失败，" + dts.errorInfo)
          return;
        }
        Toast("添加成功")
        // 刷新
        let bookcase = me.selectComponent('#bookcase');
        bookcase.getBookcaseList()
      }, complete: function () {
        me.setData({ addLoading: false })
      }
    })
  },
  borrowBook() {
    let me = this
    me.setData({ borrowLoading: true })
    wx.request({
      url: globalData.serverUrl + '/book/borrowBook',
      data: { bookId: parseInt(me.data.bookId) },
      method: 'POST',
      header: {
        "Content-Type": "application/json",
        'authorization': globalData.token
      },
      success: function (res) {
        let dts = res.data
        if (!dts.success) {
          Toast("借阅失败，" + dts.errorInfo)
          return;
        }
        Toast("借阅成功")
        setTimeout(function () {
          wx.navigateBack({
            delta: 0,
          })
        }, 1000)
      },
      complete: function () {
        me.setData({ borrowLoading: false })
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
    this.getBookScore()
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