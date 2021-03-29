// components/user/user.js
var globalData = getApp().globalData;
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
    userInfo: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo() {
      let me = this
      wx.request({
        url: globalData.serverUrl + '/user/getUserInfo',
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
          let userInfo = dts.userDTO;
          me.setData({
            userInfo: userInfo
          })
        }
      })
    }
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.getUserInfo()
    },
    moved: function () { },
    detached: function () { },
  },
})
