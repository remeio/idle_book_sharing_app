// components/home/home.js
const { default: Toast } = require("@vant/weapp/dist/toast/toast");

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
    bookList: [
      {
        "id": 30,
        "bookName": "人类简史:从动物到上帝",
        "bookIsbn": "9787508647357",
        "bookDescription": "十万年前，地球上至少有六种不同的人\n但今日，世界舞台为什么只剩下了我们自己？\n从只能啃食虎狼吃剩的残骨的猿人，到跃居食物链顶端的智人，\n从雪维洞穴壁上的原始人手印，到阿姆斯壮踩上月球的脚印，\n从认知革...",
        "bookMaxPeriod": 7,
        "bookDeposit": 68,
        "bookImageUrl": "https://img.maimiaobook.com/cover/8W3F0751P2.jpg?x-oss-process\u003dstyle/yuantu",
        "bookCatalogId": 1,
        "schoolId": 1,
        "userId": 4,
        "bookStatus": 1,
        "tag": "上新",
        "gmtCreate": "Mar 31, 2021 3:22:35 PM"
      },
      {
        "id": 28,
        "bookName": "统一软件开发过程 The Unified Software",
        "bookIsbn": "9787111571698",
        "bookDescription": "本书是Java语言的经典教材，中文版分为...",
        "bookMaxPeriod": 7,
        "bookDeposit": 99,
        "bookImageUrl": "https://img.maimiaobook.com/cover/793UN25X0G.jpg?x-oss-process\u003dstyle/yuantu",
        "bookCatalogId": 1,
        "schoolId": 1,
        "userId": 4,
        "bookStatus": 1,
        "gmtCreate": "Mar 30, 2021 8:30:20 PM"
      },
      {
        "id": 27,
        "bookName": "PHP+MySQL动态网站设计实用教程/高等学校应用型特色规划教材",
        "bookIsbn": "9787302403357",
        "bookDescription": "PHP是一种易于学习和使用的后台开发技术...",
        "bookMaxPeriod": 7,
        "bookDeposit": 40,
        "bookImageUrl": "https://img.maimiaobook.com/cover/62HN7J3K58.jpg?x-oss-process\u003dstyle/yuantu",
        "bookCatalogId": 1,
        "schoolId": 1,
        "userId": 4,
        "bookStatus": 1,
        "gmtCreate": "Mar 30, 2021 8:29:49 PM"
      },
      {
        "id": 23,
        "bookName": "人类简史:从动物到上帝",
        "bookIsbn": "9787508647357",
        "bookDescription": "十万年前，地球上至少有六种不同的人\n但今...",
        "bookMaxPeriod": 7,
        "bookDeposit": 68,
        "bookImageUrl": "https://img.maimiaobook.com/cover/8W3F0751P2.jpg?x-oss-process\u003dstyle/yuantu",
        "bookCatalogId": 1,
        "schoolId": 1,
        "userId": 4,
        "bookStatus": 1,
        "gmtCreate": "Mar 29, 2021 10:07:46 PM"
      }

    ],
    uploadBookShow: false,
    uploadBookActionList: [
      { name: "扫描ISBN", id: 0 }, { name: "手动录入", id: 1 }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toBookCatalog() {
      wx.navigateTo({
        url: '/pages/book_catalog/book_catalog',
      })
    },
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
