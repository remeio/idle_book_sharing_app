// pages/borrow_progress/borrow_progress.js
import { getDateStrFormDate } from '../../utils/util'
import Toast from '@vant/weapp/dist/toast/toast';
var globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 消息列表
    messageList: [],
    borrowUserFullName: '',
    shareUserFullName: '',
    // 状态
    shareRecordId: 0,
    messageContent: '',
    isBorrow: null,
    loading: false
  },
  getMessageList() {
    let me = this;
    wx.request({
      url: globalData.serverUrl + '/shareRecord/getMessageList',
      data: { shareRecordId: me.data.shareRecordId },
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
        let messageDTOList = dts.messageDTOList.map(r => {
          r.gmtCreateStr = getDateStrFormDate(new Date(r.gmtCreate))
          let isToday = (new Date(r.gmtCreate).toDateString() == new Date().toDateString())
          let isSameYear = (new Date(r.gmtCreate).getFullYear() == new Date().getFullYear())
          if (isToday == true) {
            r.gmtCreateStr = r.gmtCreateStr.substring(11)
          } else if (isSameYear == true) {
            r.gmtCreateStr = r.gmtCreateStr.substring(5)
          }
          return r
        })
        // 5 分钟内的消息不重复显示时间
        for (let i = 0; i < messageDTOList.length; i++) {
          // 第一个始终显示
          if (i == 0) {
            messageDTOList[i].showGmtCreate = true
            continue;
          } 
          let last = messageDTOList[i - 1]
          let now = messageDTOList[i]
          let minute = 5
          if (new Date(now.gmtCreate).getTime() - new Date(last.gmtCreate).getTime() < 1000 * 60 * minute) {
            now.showGmtCreate = false
          } else {
            now.showGmtCreate = true
          }
        }
        console.log(messageDTOList)
        // 清空
        me.setData({
          messageList: messageDTOList,
          borrowUserFullName: dts.borrowUserFullName,
          shareUserFullName: dts.shareUserFullName,
        })
        wx.createSelectorQuery().select('#chat').boundingClientRect(function(rect) {
          wx.pageScrollTo({
            scrollTop: rect.height,
            duration: 100
          })
        }).exec()
      }
    })
  },
  sendMessage() {
    let me = this;
    me.setData({ loading: true })
    wx.request({
      url: globalData.serverUrl + '/shareRecord/sendMessage',
      data: { shareRecordId: me.data.shareRecordId, messageContent: me.data.messageContent },
      method: 'POST',
      header: {
        "Content-Type": "application/json",
        'authorization': globalData.token
      },
      success: function (res) {
        let dts = res.data
        if (!dts.success) {
          Toast(dts.errorInfo);
          return;
        }
        // 清空
        me.setData({
          messageContent: ''
        })
        // 刷新界面
        me.getMessageList()
      },
      fail: function (e) {
        console.log(e)
        Toast("发送消息失败，请稍后重试");
      },
      complete: function () {
        me.setData({ loading: false })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shareRecordId: options.shareRecordId,
      isBorrow: options.operatorType == "borrow"
    });
    this.getMessageList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})