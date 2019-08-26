
const app = getApp()
var innerAudioContext
var vowel_audio_src
var isPlay = false

var baseUrl = 'https://www.antleague.com/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicStatus: 'on',
    play_img:'/images/play.png',
    new_app_id: 'wx572fce5031dcef34'
  },

  compareVersion: function (v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    var len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (var i = 0; i < len; i++) {
      var num1 = parseInt(v1[i])
      var num2 = parseInt(v2[i])

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }

    return 0
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
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log('sdk version--->' + res.SDKVersion)
        var result = that.compareVersion(res.SDKVersion, '2.0.7')
        that.setData({
          isUse: result >= 0 ? true : false
        })
      },
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

  newApp: function (e) {
    if (this.data.isUse) {
      return;
    }
    var that = this
    wx.navigateToMiniProgram({
      appId: that.data.new_app_id
    })
  },

  playPhonetic: function (e) {
    var mp3_url = baseUrl + 'mp3/' + e.currentTarget.dataset.mp3;
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
    return {
      title: '英语音标快速学习，快来试试吧!',
      path: '/pages/phonetic/phonetic',
      imageUrl: '../../images/share_icon.png'
    }
  },
})