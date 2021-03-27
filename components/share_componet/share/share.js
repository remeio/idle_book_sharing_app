// components/share_componet/share/share.js
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
    bookList: []

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getBookList() {
      let me = this
      wx.request({
        url: globalData.serverUrl + '/book/getBookListByUserId',
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
          let bookList = dts.bookDTOList;
          me.setData({
            bookList: bookList
          })
        }
      })
    }
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { 
      this.getBookList()
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
