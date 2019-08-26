
const app = getApp()
var innerAudioContext
var vowel_audio_src
var isPlay = false

var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()

var baseUrl = 'https://www.antleague.com/'
var base_url_img = baseUrl + 'phonetic/'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicStatus: 'on',
    play_img: '/images/play.png',
    base_url_img: base_url_img
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
    var resultWord = item.pro_instance.replace(/#/g, '')
    this.setData({
      result_word: resultWord,
      item: item,
      example_img: base_url_img + item.pro_introduce_img
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

  playWord: function (e) {
    var word = e.currentTarget.dataset.word;
    word = word.replace(/#/g, '')
    console.log("this word--->", word);
    var that = this
    if (word){
      plugin.textToSpeech({
        lang: "en_US",
        tts: true,
        content: word,
        success: function (res) {
          console.log("succ tts", res.filename)
          var mp3_url = res.filename
          that.setData({
            play_img: '/images/stop.png'
          })
          that.playMusic(mp3_url, false)
        },
        fail: function (res) {
          console.log("fail tts", res)
        }
      })
    }else{
        wx.showToast({
          title: '拼读错误,请重试',
          icon:'none'
        })
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

  preStep: function (e) {
   wx.redirectTo({
     url: '../phonetic/phonetic'
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