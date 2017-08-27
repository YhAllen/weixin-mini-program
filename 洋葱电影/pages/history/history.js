var filmNullTip = {
      tipText: '亲，找不到电影的浏览记录',
      // routeUrl: '../../pages/popular/popular',
      actionText: '去逛逛'
    }
var personNullTip = {
      tipText: '亲，找不到人物的浏览记录',
      // routeUrl: '../../pages/popular/popular',
      actionText: '去逛逛'
    }
Page({
  data:{
    film_history: [],
    person_history: [],
    show: 'film_history',
    nullTip: filmNullTip
  },
  onShareAppMessage: function () {
    return {
      title: '电影分享',
      path: '/pages/user?id=123'
    }
  },
  onLoad:function(options){
    var that = this
    wx.getStorage({
      key: 'film_history',
      success: function(res){
        that.setData({
          film_history: res.data
        })
      }
    })
    wx.getStorage({
      key: 'person_history',
      success: function(res){
        that.setData({
          person_history: res.data
        })
      }
    })
    wx.stopPullDownRefresh()
  },
	onPullDownRefresh: function() {
    this.setData({
      film_history: [],
      person_history: []
    })
		this.onLoad()
	},
  viewFilmDetail: function(e) {
		var data = e.currentTarget.dataset
		wx.redirectTo({
			url: "../filmDetail/filmDetail?id=" + data.id
		})
  },
  viewPersonDetail: function(e) {
		var data = e.currentTarget.dataset
		wx.redirectTo({
			url: "../personDetail/personDetail?id=" + data.id
		})
  },
  changeViewType: function(e) {
    var data = e.currentTarget.dataset
    this.setData({
      show: data.type,
      nullTip: data.type == 'film_history' ? filmNullTip : personNullTip
    })
  }
})