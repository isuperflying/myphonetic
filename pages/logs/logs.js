//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })
    wx.request({
      url: 'http://t.yushu.im/v2/movie/top250',
      success:function(res){
        console.log(res.data)
      }
    })
  }
})
