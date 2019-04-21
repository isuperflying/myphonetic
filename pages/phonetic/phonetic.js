var app = getApp()

var baseUrl = 'http://192.168.0.103:8888/'
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
    currentTab: 0
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