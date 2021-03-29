// components/user/user.js
import Dialog from "@vant/weapp/dist/dialog/dialog";
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
    toDepositDetail() {
      wx.navigateTo({
        url: '/pages/deposit_detail/deposit_detail',
      })
    },
    toSignOut() {
      Dialog.confirm({
        context: this,
        title: '注销登录',
        message: '您确定要退出登录吗？',
        confirmButtonText: '注销'
      }).then(() => {
        globalData.token = ''
        globalData.userId = ''
        wx.redirectTo({
          url: '/pages/sign_in/sign_in',
        })
      })
    },
    toResetPassword() {
      wx.navigateTo({
        url: '/pages/reset_password/reset_password',
      })
    },
    toServiceRule() {

    },
    toUserDetail() {
      wx.navigateTo({
        url: '/pages/user_detail/user_detail',
      })
    },
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
