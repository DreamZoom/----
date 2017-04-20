var app = getApp()
Page({
  data: {
    userInfo: {},
    task: {},
    taskid: 0
  },
  //事件处理函数
  bindPublish: function () {
    wx.navigateTo({
      url: '../publish/publish'
    });
  },
  onLoad: function (q) {
    console.log(q);
    var that = this;
    that.setData({
      taskid: q.id
    });
    app.getService().getTask(q.id, function (result) {
      that.setData({
        task: result
      });
    });

  },
  onShow: function (q) {

  },
  onGetTask: function (e) {
    var that = this;
    app.getService().updateTask({
      id: that.data.taskid,
      state: 2,
      stateName: "已领取"
    }, function (result) {
      console.log(result);
      that.setData({
        task: result
      });
      wx.showToast({
        title: '已领取',
        icon: 'success',
        duration: 2000
      });
    });
  }
})