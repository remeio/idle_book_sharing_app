// components/share_componet/share_record/share_record.js
import {getDateStrFormDate} from '../../../utils/util'
var globalData = getApp().globalData;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    borrowOrLend: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    shareRecordList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toMessage(e) {
      wx.navigateTo({
        url: '/pages/message/message?shareRecordId=' + e.currentTarget.dataset.id,
      })
    },
    toBorrowProgress(e) {
      wx.navigateTo({
        url: '/pages/borrow_progress/borrow_progress?shareRecordId=' + e.currentTarget.dataset.id + '&operatorType=' + e.currentTarget.dataset.type,
      })
    },
    getShareRecord() {
      let me = this
      wx.request({
        url: globalData.serverUrl
          + (me.data.borrowOrLend == "borrow"
            ? '/shareRecord/getShareRecordListByBorrowUserId' : '/shareRecord/getShareRecordListByShareUserId'),
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
          let shareRecordList = dts.shareRecordDTOList;
          shareRecordList.forEach(r => {
            r.gmtCreateStr = getDateStrFormDate(new Date(r.gmtCreate))
          })
          me.setData({
            shareRecordList: shareRecordList
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
      this.getShareRecord()
    },
    moved: function () { },
    detached: function () { },
  },
  pageLifetimes: {
    show: function() {
      this.getShareRecord()
    }
  }
})
