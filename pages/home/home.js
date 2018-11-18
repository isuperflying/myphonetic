
var baseUrl = 'https://www.antleague.com/'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    base_img_url: baseUrl + 'words/',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '音标小课堂',
    })

    var that = this
    let url = baseUrl + 'querywords'
    wx.request({
      url: url,
      data: {
        'cid': 7
      },
      method: 'POST',
      success: function (result) {
        console.log(result.data.data)
        //words = result.data.data
        that.setData({
          words: result.data.data
        })
      }
    })

  },

  basetrain: function () {
    wx.navigateTo({
      url: '/pages/wordtype/wordtype',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})