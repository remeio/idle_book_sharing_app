import Toast from "@vant/weapp/dist/toast/toast";

// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadBookShow: false,
    uploadBookActionList: [
      { name: "扫描ISBN", id: 0 }, { name: "手动录入", id: 1 }
    ]
  },
  openUploadBookAction() {
    this.setData(
      { uploadBookShow: true }
    )
  },

  /**
   * 点击关闭上传书籍弹框
   */
  uploadBookActionOnClose() {
    this.setData(
      { uploadBookShow: false }
    )
  },

  /**
   * 选择上传书籍弹框
   * @param {*} event 
   */
  uploadBookActionOnSelect(event) {
    // 扫码上传
    if (event.detail.id == 0) {
      wx.scanCode({
        success(res) {
          if (res.scanType != "EAN_13") {
            Toast("不是有效的ISBN，请重试或使用手动录入~");
            return;
          }
          let isbn = res.result;
          wx.navigateTo({
            url: '/pages/upload_book/upload_book?isbn=' + isbn,
          })
        },
        fail() {
          Toast("扫描ISBN失败，请重试或使用手动录入~");
        }
      })
    }
    // 手动录入
    else if (event.detail.id == 1) {
      wx.navigateTo({
        url: '/pages/upload_book/upload_book?isbn=',
      })
    }
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