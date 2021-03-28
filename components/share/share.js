// components/share/share.js
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
    subComponents: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTabsClick(e) {
      if (e.detail.index == 0) {
        this.data.subComponents.srBorrow.getShareRecord()
      } else if (e.detail.index == 1) {
        this.data.subComponents.srLend.getShareRecord()
      } else if (e.detail.index == 2) {
        this.data.subComponents.share.getBookList()
      }
    }
  },
  lifetimes: {
    ready: function () {
      let srBorrow = this.selectAllComponents("#share-record-borrow")[0]
      let srLend = this.selectAllComponents("#share-record-lend")[0]
      let share = this.selectAllComponents("#share")[0]
      this.setData({
        subComponents: { srBorrow: srBorrow, srLend: srLend, share: share }
      })
    }
  }
})
