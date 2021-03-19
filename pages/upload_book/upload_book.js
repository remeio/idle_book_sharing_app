// pages/upload_book/upload_book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isbn: "",
    bookName: "",
    bookImageList: [],
    bookType: 0,
    bookTypeList: ["其他", "教材", "小说", "文学", "传记", "艺术", "计算机", "历史", "法律", " 考试", "外语", "畅销", "科普", "医学", "工业技术", "自然科学", "原版书籍"],
    bookTypePopupShow: false
  },
  onChangeBookType(event) {
    const { picker, value, index } = event.detail;
    this.setData({ bookType: index, })
  },
  showBookTypePopup() {
    this.setData({ bookTypePopupShow: true });
  },

  closeBookTypePopup() {
    this.setData({ bookTypePopupShow: false });
  },

  afterBookImageListRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isbn: options.isbn
    })
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