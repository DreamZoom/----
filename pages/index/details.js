var app = getApp()
Page({
  data: {  
    userInfo: {},
    task: {}
  },
  //事件处理函数
  bindPublish: function () {
    wx.navigateTo({
      url: '../publish/publish'
    })
  },
  onLoad: function (q) { 
    console.log(q) 
    var that = this
    app.getService().getTask(q.id,function (result) {
      that.setData({
        task: result
      })
    });

  },
  onShow:function(q){
    
  }
})