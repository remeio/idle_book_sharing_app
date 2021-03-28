// components/share_componet/share_record/share_record.js
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
    toBorrowProgress() {
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
            let date = new Date(r.gmtCreate)
            var result = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            r.gmtCreateStr = result
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
})
