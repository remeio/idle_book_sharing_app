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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toBorrowProgress(e) {
      wx.navigateTo({
        url: '/pages/borrow_progress/borrow_progress?order=' + e.currentTarget.dataset.order,
      })
    },
  
    toMessage(e) {
      wx.navigateTo({
        url: '/pages/message/message?order=' + e.currentTarget.dataset.order,
      })
    },
  }
})
