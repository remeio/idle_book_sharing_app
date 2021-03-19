const app = getApp()

Page({
  data: {
    active: 0,
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    wx.request({
      url: 'http://115.29.198.114:8080/user/signIn',
      data: {"userPhone": "11", "userPassword": "121"},
      method: 'POST',
      success: function(res) {
        console.log(res.data)
      },
      complete: function() {
        wx.stopPullDownRefresh({
          success: (res) => {

          },
        })
      }
    })
  },
});