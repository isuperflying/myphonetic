var app = getApp()

var baseUrl = 'https://www.antleague.com/'

let plist1 = [];
let plist2 = [];
let plist3 = [];
let plist4 = [];
let plist5 = [];
let plist6 = [];
let plist7 = [];
let plist8 = [];
let plist9 = [];
let plist10 = [];
let plist11 = [];
let plist12 = [];
let plist13 = [];
let plist14 = [];

Page({
  data: {
    currentTab: 0,
    new_app_id:'wx572fce5031dcef34',
    isShowModel: false,//控制弹窗是否显示，默认不显示
    isShowConfirm: false,//是否只显示确定按钮，默认不是
    ModelId: 0,//弹窗id
    ModelTitle: '',//弹窗标题
    ModelContent: '',//弹窗文字内容
  },
  clearData:function(){
    plist1 = [];
    plist2 = [];
    plist3 = [];
    plist4 = [];
    plist5 = [];
    plist6 = [];
    plist7 = [];
    plist8 = [];
    plist9 = [];
    plist10 = [];
    plist11 = [];
    plist12 = [];
    plist13 = [];
    plist14 = [];
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

  onLoad: function(options) {
    this.clearData();
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

        let totalData = result.data.data;
        for (let i = 0; i < totalData.length; i++) {
          let  type = totalData[i].type;
          switch(type){
            case 1:
              plist1.push(totalData[i])
            break;
            case 2:
              plist2.push(totalData[i])
              break;
            case 3:
              plist3.push(totalData[i])
              break;
            case 4:
              plist4.push(totalData[i])
              break;
            case 5:
              plist5.push(totalData[i])
              break;
            case 6:
              plist6.push(totalData[i])
              break;
            case 7:
              plist7.push(totalData[i])
              break;
            case 8:
              plist8.push(totalData[i])
              break;
            case 9:
              plist9.push(totalData[i])
              break;
            case 10:
              plist10.push(totalData[i])
              break;
            case 11:
              plist11.push(totalData[i])
              break;
            case 12:
              plist12.push(totalData[i])
              break;
            case 13:
              plist13.push(totalData[i])
              break;
            case 14:
              plist14.push(totalData[i])
              break;
            default:
              break;
          }
        }
        
        that.setData({
          phonetics: result.data.data,
          plist1:plist1,
          plist2: plist2,
          plist3: plist3,
          plist4: plist4,
          plist5: plist5,
          plist6: plist6,
          plist7: plist7,
          plist8: plist8,
          plist9: plist9,
          plist10: plist10,
          plist11: plist11,
          plist12: plist12,
          plist13: plist13,
          plist14: plist14,
        })
      }
    })

    wx.getSystemInfo({
      success: function (res) {
        console.log('sdk version--->' + res.SDKVersion)
        var result = that.compareVersion(res.SDKVersion, '2.0.7')
        that.setData({
          isUse: result >= 0 ? true : false,
          clientHeight: res.windowHeight
        })
      },
    })
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
  },
  readPhonetic:function (e){
    //console.log(e.currentTarget.dataset.item)
    
    if (app.globalData.useCount % 6 == 0){
      this.showModel({
        ModelId: 0,
        ModelTitle: '分享好友',
        ModelContent: '如果你觉得音标学习很有用，请分享给你的好友一起学习吧！'
      })
    }else{
      var item = JSON.stringify(e.currentTarget.dataset.item)
      wx.navigateTo({
        url: '../read/read?item=' + item,
      })

      app.globalData.useCount = app.globalData.useCount + 1
    }

    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   success(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this
    return {
      title: '英语音标快速学习，快来试试吧!',
      path: '/pages/phonetic/phonetic',
      imageUrl: '../../images/share_icon.png',
      success: function (res) {
        that.setData({
          isShowModel: false
        })
      }
    }
  },

  //调用模态弹窗
  showModel: function (e) {
    //将传过来的标题和内容展示到弹窗上
    this.setData({
      isShowModel: true,
      ModelId: e.ModelId,
      ModelTitle: e.ModelTitle,
      ModelContent: e.ModelContent
    })
  },
  //取消事件
  cancel: function (e) {
    app.globalData.useCount = app.globalData.useCount + 1
    //关闭模态弹窗
    this.setData({
      isShowModel: false
    })
  },
  //确定事件
  confirm: function (e) {
    app.globalData.useCount = app.globalData.useCount + 1
    //关闭模态弹窗
    this.setData({
      isShowModel: false
    })
  }
})