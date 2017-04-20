//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    tasks: [],
    tabs: ["最新", "排行", "榜单"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    pageIndex: 1,
    loadover: false
  },
  onLoad: function () {
    var that = this;
    app.getService().getTasks(that.data.pageIndex, function (results) {
      that.setData({
        tasks: results
      });
    });
  },
  onShow: function () {
    var that = this;


  },
  loadmoreClick: function (e) {
    var that = this;
    that.data.pageIndex++;
    app.getService().getTasks(that.data.pageIndex, function (results) {
      that.setData({
        tasks: [].concat(that.data.tasks, results),
        loadover: results.length == 0
      });
      if (results.length == 0) {
        wx.showToast({
          title: '数据已全部加载',
          icon: 'success',
          duration: 2000
        });
      }
    });
  },
  onPullDownRefresh: function (e) {
    var that = this;
    that.setData({
       pageIndex: 1,
       loadover: false
    });
    app.getService().getTasks(that.data.pageIndex, function (results) {
      wx.stopPullDownRefresh();
      that.setData({
        tasks: results
      });
    });
  }


})
