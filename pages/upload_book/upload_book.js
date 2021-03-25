import Dialog from "@vant/weapp/dist/dialog/dialog";
import Toast from "@vant/weapp/dist/toast/toast";
var globalData = getApp().globalData;
// pages/upload_book/upload_book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // uploadBook
    bookName: '',
    bookIsbn: '',
    bookDescription: '',
    bookMaxPeriod: 7,
    bookDeposit: 0,
    bookCatalogIndex: 0,
    bookCatalogIdList: [],
    bookCatalogNameList: [],
    // 状态
    bookImageList: [],
    bookCatalogPopupShow: false,
    currentSchoolName: ' --- '
  },
  /**
   * 上传书籍
   */
  uploadBook() {

  },
  setBookDeposit(event) {
    this.setData({ bookDeposit: event.detail })
  },

  setBookMaxPeriod(event) {
    this.setData({ bookMaxPeriod: event.detail })
  },
  dialogBookDeposit() {
    Dialog.alert({
      title: '押金',
      message: '押金用于保障书籍的安全，为 0 则可免押金借阅，不为 0 则需借阅者缴纳押金且押金才能借阅',
      theme: 'round-button',
    }).then(() => {
      // on close
    });

  },
  dialogBookShareDay() {
    Dialog.alert({
      title: '最大共享天数',
      message: '最大共享天数是指所接受的最大共享天数，例如最大共享天数设为 21，则支持别人以 7，14，21 借出该书籍',
      theme: 'round-button',
    }).then(() => {
      // on close
    });

  },
  onChangeBookCatalog(event) {
    const { picker, value, index } = event.detail;
    this.setData({ bookCatalogIndex: index, })
  },
  showBookCatalogPopup() {
    this.setData({ bookCatalogPopupShow: true });
  },

  closeBookCatalogPopup() {
    this.setData({ bookCatalogPopupShow: false });
  },

  deleteImage(event) {
    console.log(event)
    const { index, name } = event.detail;
    const fileList = this.data[`bookImageList${name}`];
    fileList.splice(index, 1);
    this.setData({ [`bookImageList${name}`]: fileList });
  },

  /**
   * 上传图片
   * @param {*} event 
   */
  afterBookImageListRead(event) {
    console.log(event)
    let me = this
    const { file } = event.detail;
    if (file.type != "image") {
      Toast("选择的不是图片")
      return;
    }
    console.log(file)
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式 （mutiple 默认为 false）
    wx.uploadFile({
      url: globalData.serverUrl + "/file/uploadFile", // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      success(res) {
        console.log(res)
        let dts = JSON.parse(res.data)
        console.log(dts)
        if (!dts.success) {
          Toast("图片上传失败, " + dts.errorInfo)
          return;
        }
        const { bookImageList = [] } = me.data;
        bookImageList.push({ ...file, url: dts.filePath });
        me.setData({ bookImageList });
      },
    });
  },

  getBookCatalogList() {
    let me = this
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
      }
    })
  },

  getSchoolName: function () {
    let me = this
    wx.request({
      url: globalData.serverUrl + '/user/getSchoolInfo',
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
        me.setData({ currentSchoolName: dts.schoolName })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isbn: options.isbn
    })
    // 获取当前学校
    this.getSchoolName()
    // 获取书籍分类
    this.getBookCatalogList()
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