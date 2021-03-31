// components/book_catalog/book_catalog.js
var globalData = getApp().globalData;
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    bookCatalogIndex: 0,
    bookCatalogIdList: [],
    bookCatalogNameList: [],
    // 书籍列表
    bookList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
          // 分类加载成功时，加载书籍数据
          me.getBookListByBookCatalog()
        }
      })
    },
    onChangBookCatalog(event) {
      this.setData({ bookCatalogIndex: event.detail })
      this.getBookListByBookCatalog()
    },
    getBookListByBookCatalog() {
      let me = this
      let bookCatalogId = this.data.bookCatalogIdList[this.data.bookCatalogIndex]
      wx.request({
        url: globalData.serverUrl + '/book/getBookListByBookCatalog',
        data: { bookCatalogId: bookCatalogId },
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
          let bookList = dts.bookDTOList;
          bookList.forEach(r => {
            // 字符串过长进行截取
            if (r.bookName.length > 10) {
              r.bookName = r.bookName.substring(0, 10) + "..."
            }
          })
          me.setData({
            bookList: bookList
          })
        }
      })
    },
    toBookDetail(e) {
      wx.navigateTo({
        url: '/pages/book_detail/book_deatil?bookId=' + e.currentTarget.dataset.id,
      })
    },
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.getBookCatalogList()
    },
    moved: function () { },
    detached: function () { },
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  }
})
