// components/book_grid/book_grid.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bookList: {
      type: Object
    }
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

    toBookDetail(e) {
      wx.navigateTo({
        url: '/pages/book_detail/book_deatil?bookId=' + e.currentTarget.dataset.id,
      })
    },

  },
  lifetimes: {
    attached: function () {


    }
  }
})
