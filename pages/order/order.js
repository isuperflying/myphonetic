// pages/order/order.js
var baseUrl = 'https://www.antleague.com/'
var current_page = 1;
let list;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的订单',
    })

    this.loadData();
  },

  loadData:function(){
    var that = this
    let url = baseUrl + 'aqueryorders'
    wx.request({
      url: url,
      data: {
        'page': current_page
      },
      method: 'POST',
      success: function (result) {
        console.log(result.data.data)
        
        if (list == null) {
          list = result.data.data
        } else {
          list = list.concat(result.data.data)
        }

        that.setData({
          orders: list
        })        
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    current_page++;
    this.loadData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})