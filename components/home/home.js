// components/home/home.js
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
    uploadBookShow: false,
    uploadBookActionList: [
      { name: "扫描ISBN", id: 0 }, { name: "手动录入", id: 1 }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openUploadBookAction() {
      this.setData(
        { uploadBookShow: true }
      )
    },

    /**
     * 点击关闭上传书籍弹框
     */
    uploadBookActionOnClose() {
      this.setData(
        { uploadBookShow: false }
      )
    },
    uploadByScanCode() {
      wx.scanCode({
        success(res) {
          if (res.scanType != "EAN_13") {
            Toast("不是有效的ISBN，请重试或使用手动录入~");
            return;
          }
          let isbn = res.result;
          wx.navigateTo({
            url: '/pages/upload_book/upload_book?isbn=' + isbn,
          })
        },
        fail() {
          Toast("扫描ISBN失败，请重试或使用手动录入~");
        }
      })
    },

    toBookDetail(e) {
      wx.navigateTo({
        url: '/pages/book_detail/book_deatil?bookId=' + e.currentTarget.dataset.id,
      })
    },

    uploadByHand() {
      wx.navigateTo({
        url: '/pages/upload_book/upload_book?isbn=',
      })
    },

    /**
     * 选择上传书籍弹框
     * @param {*} event 
     */
    uploadBookActionOnSelect(event) {
      // 扫码上传
      if (event.detail.id == 0) {
        this.uploadByScanCode();
      }
      // 手动录入
      else if (event.detail.id == 1) {
        this.uploadByHand();
      }
    },
  }
})
