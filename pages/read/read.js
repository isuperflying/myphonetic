
const app = getApp()
var innerAudioContext
var vowel_audio_src
var isPlay = false

var baseUrl = 'http://192.168.0.104:8888/mp3/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicStatus: 'on',
    play_img:'/images/play.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发音练习',
    })
    var item = JSON.parse(options.item);
    console.log(item)
    this.setData({
      item: item
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  playPhonetic: function (e) {
    var mp3_url = baseUrl + e.currentTarget.dataset.mp3;
    if (isPlay) {
      this.stopMusic()
    } else {
      this.setData({
        is_test_result: false,
        play_img: '/images/stop.png'
      })
      this.playMusic(mp3_url, false)
    }
  },


  playMusic(src, loop = false) {
    if (this.data.musicStatus != "on") {
      this.stopMusic()
      return
    }
    isPlay = true
    const innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext = innerAudioContext
    innerAudioContext.src = src
    innerAudioContext.loop = loop
    innerAudioContext.play()

    //播放结束
    innerAudioContext.onEnded(() => {
      isPlay = false
      this.setData({
        play_img: '/images/play.png'
      })
    })
  },

  stopMusic() {
    if (this.innerAudioContext) {
      console.log('stop music --->')
      this.innerAudioContext.stop()
    }
    isPlay = false;
    this.setData({
      play_img: '/images/play.png'
    })
  },

  nextStep: function (e){
    var item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../example/example?item=' + item,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})