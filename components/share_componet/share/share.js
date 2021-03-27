// components/share_componet/share/share.js
import Dialog from '@vant/weapp/dist/dialog/dialog';
import Toast from '@vant/weapp/dist/toast/toast';
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
    deleteBook(e) {
      let me = this
      let bookId = e.currentTarget.dataset.id
      Dialog.confirm({
        title: '删除确认',
        message: '您确定要删除该书籍吗？删除后不可恢复',
        confirmButtonText: '确认删除'
      }).then(() => {
        wx.request({
          url: globalData.serverUrl + '/book/deleteBook',
          data: { bookId: bookId },
          method: 'POST',
          header: {
            "Content-Type": "application/json",
            'authorization': globalData.token
          },
          success: function (res) {
            let dts = res.data
            if (!dts.success) {
              Toast("删除失败，" + dts.errorInfo)
              return;
            }
            Toast("删除成功")
            // 刷新界面
            me.getBookList()
          }
        })
      })
    },
    onShelfBook(e) {
      let me = this
      let bookId = e.currentTarget.dataset.id
      Dialog.confirm({
        title: '上架确认',
        message: '您确认要上架该书籍吗？',
        confirmButtonText: '确认上架'
      }).then(() => {
        wx.request({
          url: globalData.serverUrl + '/book/onShelfBook',
          data: { bookId: bookId },
          method: 'POST',
          header: {
            "Content-Type": "application/json",
            'authorization': globalData.token
          },
          success: function (res) {
            let dts = res.data
            if (!dts.success) {
              Toast("上架失败，" + dts.errorInfo)
              return;
            }
            Toast("上架成功")
            // 刷新界面
            me.getBookList()
          }
        })
      })
    },
    offShelfBook(e) {
      let me = this
      let bookId = e.currentTarget.dataset.id
      Dialog.confirm({
        title: '下架确认',
        message: '您确认要下架该书籍吗？（下架后可重新上架）',
        confirmButtonText: '确认下架'
      }).then(() => {
        wx.request({
          url: globalData.serverUrl + '/book/offShelfBook',
          data: { bookId: bookId },
          method: 'POST',
          header: {
            "Content-Type": "application/json",
            'authorization': globalData.token
          },
          success: function (res) {
            let dts = res.data
            if (!dts.success) {
              Toast("下架失败，" + dts.errorInfo)
              return;
            }
            Toast("下架成功")
            // 刷新界面
            me.getBookList()
          }
        })
      })
    },
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
