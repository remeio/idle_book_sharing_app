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
    currentSchoolName: ' --- ',
    uploadLoading: false
  },
  /**
   * 共享书籍
   */
  uploadBook() {
    let me = this
    me.setData({uploadLoading: true})
    wx.request({
      url: globalData.serverUrl + '/book/uploadBook',
      data: {
        bookCatalogId: me.data.bookCatalogIdList[me.data.bookCatalogIndex],
        bookDeposit: me.data.bookDeposit,
        bookDescription: me.data.bookDescription,
        bookImageUrl: me.data.bookImageList[0] ? me.data.bookImageList[0].url : null,
        bookIsbn: me.data.bookIsbn,
        bookMaxPeriod: me.data.bookMaxPeriod,
        bookName: me.data.bookName
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json",
        'authorization': globalData.token
      },
      success: function (res) {
        let dts = res.data
        if (!dts.success) {
          Toast("共享书籍失败，" + dts.errorInfo)
          return;
        }
        Toast("共享成功")
        setTimeout(function() {
          wx.navigateBack({
            delta: 0,
          })
        }, 1000)
      },
      complete: function() {
        me.setData({uploadLoading: false})
      }
    })
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

  fillByIsbn(isbn) {
    let me = this
    if (isbn == "" || isbn == null || isbn == undefined) {
      Toast("不是有效的ISBN")
      return;
    }
    wx.request({
      url: "https://route.showapi.com/2218-1",
      data: {
        'isbn': isbn,
        'showapi_appid': '577146',
        'showapi_sign': '50920cba02b6430486eda10e54815e91',
      },
      method: 'GET',
      success: function (res) {
        let dts = res.data
        if (dts.showapi_res_code != 0) {
          Toast("没有找到相应书籍，请手动输入")
          return;
        }
        if (dts.showapi_res_body.ret_code != 0) {
          Toast("没有找到相应书籍，请手动输入")
          return;
        }
        let bookInfo = dts.showapi_res_body.datas[0];
        let title = bookInfo.title
        let description = bookInfo.gist
        // 字符串过长进行截取
        if (description.length > 100) {
          description = description.substring(0, 100) + "..."
        }
        let imageUrl = bookInfo.img
        // 押金跟随定价，最大为 99
        let price = parseInt(bookInfo.price) > 99 ? 99 : parseInt(bookInfo.price);
        let imageList = []
        if (imageUrl && imageUrl != null && imageUrl != "") {
          imageList.push({url: imageUrl})
        }
        me.setData({ bookName: title, bookDescription: description,  bookImageList: imageList, bookDeposit: price})
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.isbn) {
      this.fillByIsbn(options.isbn)
    }
    this.setData({
      bookIsbn: options.isbn
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