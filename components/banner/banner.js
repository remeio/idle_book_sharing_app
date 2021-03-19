Page({

  /**
   * 页面的初始数据
   */
  data: {
    // Banner数据
    images:[
      "http://img.zcool.cn/community/0154755a2df102a80120ba3828b5af.jpg@1280w_1l_2o_100sh.jpg",
      "http://pic.90sjimg.com/back_pic/00/00/69/40/bf4f8e2ab7e05dc3c7cc2a7f7e9c2fe7.jpg",
      "http://img.zcool.cn/community/01a2a2594943d3a8012193a328e0fd.jpg@1280w_1l_2o_100sh.jpg"
    ],
    // 是否显示面板指示点
    indicatorDots: true,
    // 滑动方向是否为纵向
    vertical: false,
    // 自动切换
    autoplay: true,
    // 采用衔接滑动
    circular: true,
    // 自动切换时间间隔4s
    interval: 4000,
    // 滑动动画时长0.5s
    duration: 500,
    // 前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
    previousMargin: 0,
    // 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
    nextMargin: 0
  },
})
