var service = require('./utils/services.js')
//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    service.initBmob();

  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (response) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          });

          var d = {
            appid: 'wx6921588727f22e79',//appid需自己提供，此处的appid我随机编写  
            secret: 'a3f939bfce3f89100efb4e07054bdb80',//secret需自己提供，此处的secret我随机编
          };//这里存储了appid、secret、token串    
          var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + response.code + '&grant_type=authorization_code';
          wx.request({
            url: l,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
            // header: {}, // 设置请求的 header    
            success: function (res) {
              var obj = {};
              obj.openid = res.data.openid;
              obj.expires_in = Date.now() + res.data.expires_in;
              console.log(obj);
              wx.setStorageSync('user', obj);//存储openid    
            }
          });

        }
      })
    }
  },
  getService: function () {
    return service;
  },
  globalData: {
    userInfo: null
  }
})