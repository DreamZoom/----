//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    tasks: []
  },
  onLoad: function () {  
    var that = this
    app.getService().getTasks(function (results) {
      that.setData({
        tasks: results
      })
    });

  },
  onShow:function(){
    var that = this
    app.getService().getTasks(function (results) {
      that.setData({
        tasks: results
      })
    });
  }
})
