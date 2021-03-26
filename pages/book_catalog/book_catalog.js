// pages/book_catalog/book_catalog.js
var globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookCatalogIndex: 0,
    bookCatalogIds: [],
    bookCatalogNames: ['a', 'b']
  },

  getBookCatalogList() {
    let me = this
    console.log("A")
    wx.request({
      url: globalData.serverUrl + '/book/getBookCatalogList',
      data: {},
      method: 'POST',
      success: function (res) {
        let dts = res.data
        if (!dts.success) {
          return;
        }
        let bookCatalogList = dts.bookCatalogDTOList;
        let bookCatalogIds = []
        let bookCatalogNames = []
        for (let i = 0; i < bookCatalogList.length; i++) {
          let bookCatalog = bookCatalogList[i];
          bookCatalogIds.push(bookCatalog.id)
          bookCatalogNames.push(bookCatalog.bookCatalogName)
        }
        console.log(bookCatalogIds, bookCatalogNames, me.data.bookCatalogIndex)
        me.setData({
          bookCatalogIndex: 0,
          bookCatalogIdList: bookCatalogIds,
          bookCatalogNameList: bookCatalogNames
        })
      },
      fail: function(e) {
        console.log(e)
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
    this.getBookCatalogList()
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