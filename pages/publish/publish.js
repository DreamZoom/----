//logs.js
var app = getApp();
Page({
  data: {
    model: {
      title:null,
      desc:null,
      tag:null,
      price:null
    }
  },
  onLoad: function () {

  },
  bindInput: function (e) {
    this.data.model[e.target.id] = e.detail.value;
    this.setData(this.data);
  },
  vialdModel: function () {
    for (var f in this.data.model) {
      if (!this.data.model[f]) return false;
    }

    return true;
  },

  bindTap: function () {

    if (!this.vialdModel()) {
      wx.showToast({
        title: '验证失败',
        icon: 'error',
        duration: 2000
      })
      return;
    }

    app.getService().addTask(this.data.model, function (result) {
      console.log(result);
      wx.switchTab({
        url: '../index/index'
      })
    });
  }
})
