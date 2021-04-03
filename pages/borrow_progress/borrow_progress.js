// pages/borrow_progress/borrow_progress.js
var globalData = getApp().globalData;
import Toast from '@vant/weapp/dist/toast/toast';
import Dialog from '@vant/weapp/dist/dialog/dialog';
import { getDateStrFormDate } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 数据
    shareRecord: {},
    shareLogList: [],
    // 状态
    shareRecordId: 0,
    isBorrow: null,
    steps: [
    ],
    activeIndex: 0,
    countDownTime: 0,
    countDownTimeData: {},
    star: 5
  },
  onStarChange(e) {
    this.setData({
      star: e.detail
    })
    let me = this
    Dialog.confirm({
      title: '确认评价',
      message: '您确认要评价吗？',
      confirmButtonText: '确认评价'
    }).then(() => {
      wx.request({
        url: globalData.serverUrl + '/shareRecord/score',
        data: { shareRecordId: me.data.shareRecordId, score: me.data.star },
        method: 'POST',
        header: {
          "Content-Type": "application/json",
          'authorization': globalData.token
        },
        success: function (res) {
          let dts = res.data
          if (!dts.success) {
            Toast("评价失败，" + dts.errorInfo)
            return;
          }
          Toast("评价成功~")
          me.getShareLogList()
        }
      })
    })
  },
  onCountDownTimeChange(e) {
    this.setData({
      countDownTimeData: e.detail
    })
  },
  seriouslyOverdueHandleBook() {
    let me = this
    Dialog.confirm({
      title: '书籍归还逾期严重',
      message: '您确定书籍已严重逾期？（严重逾期后将会同押金等额赔偿给共享者）',
      confirmButtonText: '确认严重逾期'
    }).then(() => {
      wx.request({
        url: globalData.serverUrl + '/shareRecord/seriouslyOverdueHandleBook',
        data: { shareRecordId: me.data.shareRecordId },
        method: 'POST',
        header: {
          "Content-Type": "application/json",
          'authorization': globalData.token
        },
        success: function (res) {
          let dts = res.data
          if (!dts.success) {
            Toast("确认书籍严重逾期失败，" + dts.errorInfo)
            return;
          }
          Toast("处理成功")
          me.getShareLogList()
        }
      })
    })
  },
  lostHandleBook() {
    let me = this
    Dialog.confirm({
      title: '书籍丢失确认',
      message: '您确定书籍已丢失？（书籍丢失后将会同押金等额赔偿给共享者）',
      confirmButtonText: '确认丢失'
    }).then(() => {
      wx.request({
        url: globalData.serverUrl + '/shareRecord/lostHandleBook',
        data: { shareRecordId: me.data.shareRecordId },
        method: 'POST',
        header: {
          "Content-Type": "application/json",
          'authorization': globalData.token
        },
        success: function (res) {
          let dts = res.data
          if (!dts.success) {
            Toast("确认丢失书籍失败，" + dts.errorInfo)
            return;
          }
          Toast("处理成功")
          me.getShareLogList()
        }
      })
    })
  },

  returnBook() {
    let me = this
    Dialog.confirm({
      title: '归还确认',
      message: '您确定已归还书籍吗？',
      confirmButtonText: '确认归还'
    }).then(() => {
      wx.request({
        url: globalData.serverUrl + '/shareRecord/returnBook',
        data: { shareRecordId: me.data.shareRecordId },
        method: 'POST',
        header: {
          "Content-Type": "application/json",
          'authorization': globalData.token
        },
        success: function (res) {
          let dts = res.data
          if (!dts.success) {
            Toast("归还书籍失败，" + dts.errorInfo)
            return;
          }
          Toast("处理成功")
          me.getShareLogList()
        }
      })
    })
  },
  cancelBorrowBook() {
    let me = this
    Dialog.confirm({
      title: '取消订单',
      message: '您确定要取消该订单吗？取消后不可恢复',
      confirmButtonText: '确认取消'
    }).then(() => {
      wx.request({
        url: globalData.serverUrl + '/shareRecord/cancelBorrowBook',
        data: { shareRecordId: me.data.shareRecordId },
        method: 'POST',
        header: {
          "Content-Type": "application/json",
          'authorization': globalData.token
        },
        success: function (res) {
          let dts = res.data
          if (!dts.success) {
            Toast("取消订单失败，" + dts.errorInfo)
            return;
          }
          Toast("处理成功")
          me.getShareLogList()
        }
      })
    })
  },
  receiveBook() {
    let me = this
    Dialog.confirm({
      title: '确认收到',
      message: '您确定已收到该书籍吗？',
      confirmButtonText: '确认收到'
    }).then(() => {
      wx.request({
        url: globalData.serverUrl + '/shareRecord/receiveBook',
        data: { shareRecordId: me.data.shareRecordId },
        method: 'POST',
        header: {
          "Content-Type": "application/json",
          'authorization': globalData.token
        },
        success: function (res) {
          let dts = res.data
          if (!dts.success) {
            Toast("收到书籍失败，" + dts.errorInfo)
            return;
          }
          Toast("处理成功")
          me.getShareLogList()
        }
      })
    })
  },
  getSteps(shareRecord, shareLogList) {
    let steps = []
    let shareRecordStatus = shareRecord.recordStatus
    const _getShareLog = (list, status) => {
      for(let i = 0; i < list.length; i++) {
        if (status == list[i].shareRecordStatus) {
          return list[i]
        }
      }
      return null
    }
    const _getOperator = r => {
      if (r == 1) {
        return "共享者"
      } else if (r == 2) {
        return "借阅者"
      }
      return "-"
    }
    if (shareRecordStatus == 1) {
      let log1 = _getShareLog(shareLogList, 1)
      steps = [
        { text: '已下单，待共享者交付书籍 [' + _getOperator(log1.operatorType) + ']', desc: getDateStrFormDate(new Date(log1.gmtCreate)) }
      ]
    } else if (shareRecordStatus == 2) {
      let log1 = _getShareLog(shareLogList, 1)
      let log2 = _getShareLog(shareLogList, 2)
      steps = [
        { text: '已下单，待共享者交付书籍 [' + _getOperator(log1.operatorType) + ']', desc: getDateStrFormDate(new Date(log1.gmtCreate)) },
        { text: '书籍借阅中，待归还 [' + _getOperator(log2.operatorType) + ']', desc: getDateStrFormDate(new Date(log2.gmtCreate)) }
      ]
    } else if (shareRecordStatus == 3) {
      let log1 = _getShareLog(shareLogList, 1)
      let log2 = _getShareLog(shareLogList, 2)
      let log3 = _getShareLog(shareLogList, 3)
      steps = [
        { text: '已下单，待共享者交付书籍 [' + _getOperator(log1.operatorType) + ']', desc: getDateStrFormDate(new Date(log1.gmtCreate)) },
        { text: '书籍借阅中，待归还 [' + _getOperator(log2.operatorType) + ']', desc: getDateStrFormDate(new Date(log2.gmtCreate)) },
        { text: '已归还书籍，交易完成 [' + _getOperator(log3.operatorType) + ']', desc: getDateStrFormDate(new Date(log3.gmtCreate)) }
      ]
    } else if (shareRecordStatus == 4) {
      let log1 = _getShareLog(shareLogList, 1)
      let log2 = _getShareLog(shareLogList, 2)
      let log4 = _getShareLog(shareLogList, 4)
      steps = [
        { text: '已下单，待共享者交付书籍 [' + _getOperator(log1.operatorType) + ']', desc: getDateStrFormDate(new Date(log1.gmtCreate)) },
        { text: '书籍借阅中，待归还 [' + _getOperator(log2.operatorType) + ']', desc: getDateStrFormDate(new Date(log2.gmtCreate)) },
        { text: '已归还书籍(逾期归还)，交易完成 [' + _getOperator(log4.operatorType) + ']', desc: getDateStrFormDate(new Date(log4.gmtCreate)) }
      ]
    } else if (shareRecordStatus == 5) {
      let log1 = _getShareLog(shareLogList, 1)
      let log5 = _getShareLog(shareLogList, 5)
      steps = [
        { text: '已下单，待共享者交付书籍 [' + _getOperator(log1.operatorType) + ']', desc: getDateStrFormDate(new Date(log1.gmtCreate)) },
        { text: '已取消订单，交易终止 [' + _getOperator(log5.operatorType) + ']', desc: getDateStrFormDate(new Date(log5.gmtCreate)) }
      ]
    } else if (shareRecordStatus == 6 || shareRecordStatus == 7) {
      let log1 = _getShareLog(shareLogList, 1)
      let log2 = _getShareLog(shareLogList, 2)
      let log67 = _getShareLog(shareLogList, shareRecordStatus)
      steps = [
        { text: '已下单，待共享者交付书籍 [' + _getOperator(log1.operatorType) + ']', desc: getDateStrFormDate(new Date(log1.gmtCreate)) },
        { text: '借阅中，待归还 [' + _getOperator(log2.operatorType) + ']', desc: getDateStrFormDate(new Date(log2.gmtCreate)) },
        { text: (shareRecordStatus == 6 ? '书籍丢失或严重受损，交易终止[' : '书籍超时严重，交易终止[') + _getOperator(log67.operatorType) + ']', desc: getDateStrFormDate(new Date(log67.gmtCreate)) },
      ]
    }
    this.setData({
      steps: steps,
      activeIndex: steps.length - 1
    })
  },
  getShareLogList() {
    let me = this
    wx.request({
      url: globalData.serverUrl + '/shareLog/getShareLogListByShareRecordId',
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
        me.setData({
          shareRecord: dts.shareRecordDTO,
          shareLogList: dts.shareLogDTOList
        })
        me.getSteps(me.data.shareRecord, me.data.shareLogList)
        // 倒计时
        if (me.data.shareRecord.recordStatus == 2) {
          let log = me.data.shareLogList.filter(r => {
            return r.shareRecordStatus == 2
          })[0]
          let times = me.data.shareRecord.bookMaxPeriod * 24 * 60 * 60 * 1000 - new Date().getTime() + new Date(log.gmtCreate).getTime()
          me.setData({
            countDownTime: times > 0 ? times : 0
          })
        }
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
    this.getShareLogList()
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