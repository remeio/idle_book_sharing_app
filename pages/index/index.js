const app = getApp()

Page({
  data: {
    active: 0,
    icons: [
      { title: '首页', normal: "/resources/images/tabbar/home.png", active: "/resources/images/tabbar/home-active.png" },
      { title: '分类', normal: "/resources/images/tabbar/catalog.png", active: "/resources/images/tabbar/catalog-active.png" },
      { title: '书箱',  normal: "/resources/images/tabbar/bookcase.png", active: "/resources/images/tabbar/bookcase-active.png" },
      { title: '共享', normal: "/resources/images/tabbar/share.png", active: "/resources/images/tabbar/share-active.png" },
      { title: '我的', normal: "/resources/images/tabbar/me.png", active: "/resources/images/tabbar/me-active.png" },
    ]
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {

  },
});