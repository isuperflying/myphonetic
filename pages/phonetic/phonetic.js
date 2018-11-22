var app = getApp()

var baseUrl = 'http://192.168.1.104:8888/'

Page({
  data: {
    currentTab: 0,
    testList: [{ name: 'a' }, { name: 'b' }, { name: 'c' }, { name: 'd' }]
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '音标学习',
    })
    var that = this
    let url = baseUrl + 'phoneticlist'
    wx.request({
      url: url,
      method: 'POST',
      success: function(result) {
        console.log(result.data.data)
        that.setData({
          phonetics: result.data.data
        })
      }
    })
  },
  //滑动切换
  swiperTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function(e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }

})