// pages/matchApply/index.js
import {config} from '../../config'
const {
	HTTP
} = require('../../util/http')
var http = new HTTP()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgBase: config.imgBase,
    matchData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
			mid:options.mid
    })
    http.request({
			url: '/Match/matchDetail',
			data: {
				mid: this.data.mid
			},
			success: res => {
        this.setData({
          matchData:res.MatchData
        })
			}
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
    http.request({
			url: '/Match/matchDetail',
			data: {
				mid: this.data.mid
			},
			success: res => {
        this.setData({
          matchData:res.MatchData
        })
			}
		})
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})