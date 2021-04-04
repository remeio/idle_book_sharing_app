// components/bookcase/bookcase.js
import Dialog from '@vant/weapp/dist/dialog/dialog';
import Toast from '@vant/weapp/dist/toast/toast';
import { getDateStrFormDate } from '../../utils/util'
var globalData = getApp().globalData;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isDetail: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    bookcaseList: [],
    countOfIdle: 0,
    bookListRecommend: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    removeBook(e) {
      let me = this
      let bookcaseId = e.currentTarget.dataset.id
      Dialog.confirm({
        context: this,
        title: '移除确认',
        message: '您确认要从书箱中移除该书籍吗？',
        confirmButtonText: '确认移除'
      }).then(() => {
        wx.request({
          url: globalData.serverUrl + '/bookcase/deleteFromBookcase',
          data: { bookcaseId: bookcaseId },
          method: 'POST',
          header: {
            "Content-Type": "application/json",
            'authorization': globalData.token
          },
          success: function (res) {
            let dts = res.data
            if (!dts.success) {
              Toast("移除失败，" + dts.errorInfo)
              return;
            }
            Toast("移除成功")
            // 刷新界面
            me.getBookcaseList()
          }
        })
      })
    },
    getBookListRecommend() {
      let me = this
      wx.request({
        url: globalData.serverUrl + '/book/recommendBookList',
        data: {},
        header: {
          "Content-Type": "application/json",
          'authorization': globalData.token
        },
        method: 'POST',
        success: function (res) {
          let dts = res.data
          if (!dts.success) {
            return;
          }
          let bookList = dts.bookDTOList
          bookList.forEach(r => {
            r.tag = "推荐"
          })
          me.setData({
            bookListRecommend: bookList
          })
        }
      })
    },
    toBookDetail(e) {
      if (this.data.isDetail == true) {
        wx.redirectTo({
          url: '/pages/book_detail/book_deatil?bookId=' + e.currentTarget.dataset.id,
        })
      }
      else {
        wx.navigateTo({
          url: '/pages/book_detail/book_deatil?bookId=' + e.currentTarget.dataset.id,
        })
      }
    },
    getBookcaseList() {
      let me = this
      wx.request({
        url: globalData.serverUrl + '/bookcase/getBookcaseListByUserId',
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
          let bookcaseList = dts.bookcaseDTOList;
          let countOfIdle = 0
          bookcaseList.forEach(r => {
            r.gmtCreateStr = getDateStrFormDate(new Date(r.gmtCreate))
            if (r.bookDTO.bookStatus == '1') {
              countOfIdle = countOfIdle + 1
            }
          })
          me.setData({
            bookcaseList: bookcaseList,
            countOfIdle: countOfIdle
          })
        }
      })
    }
  },

  lifetimes: {
    attached() {
      this.getBookcaseList()
      this.getBookListRecommend()
    }
  }
})
