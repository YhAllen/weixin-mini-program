// // pages/gallery/gallery.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
  
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
  
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
  
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
  
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
  
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
  
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
  
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
  
//   }
// })
Page({
  data: {
    pictures: [],
    nullTip: {
      tipText: '亲，没有上传照片哦',
      actionText: '上传',
      fn: 'uploadImg'
    }
  },
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'gallery',
      success: function (res) {
        that.setData({
          pictures: res.data
        })
      }
    })
  },
  uploadImg: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var tempFilePath = res.tempFilePaths[0]
        wx.saveFile({
          tempFilePath: tempFilePath,
          success: function (res) {
            var savedFilePath = res.savedFilePath
            console.log(savedFilePath)
            that.setData({
              pictures: that.data.pictures.concat(savedFilePath)
            })
            wx.setStorage({
              key: 'gallery',
              data: that.data.pictures
            })
          }
        })
      }
    })
  },
  previewImage: function (e) {
    var data = e.currentTarget.dataset
    var index = data.index
    var that = this
    wx.previewImage({
      current: that.data.pictures[index], // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: that.data.pictures
    })
  }
})