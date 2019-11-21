// pages/search/index.js
import {HistoryModel} from '../../models/history.js'
const historyModel = new HistoryModel()
const {
	HTTP
} = require('../../util/http')
var http = new HTTP()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		searching:false,
		inputValue:"",
		his:[],
		placeData: [
			{
			pid: 1,
			placeName: "这是第一家店",
			placeImg: "../../images/place1.jpg",
			distance: 1.7,
			grade: 9.1,
			price: 100
		  },
		  {
			pid: 2,
			placeName: "这是第二家店",
			placeImg: "../../images/place1.jpg",
			distance: 2.7,
			grade: 7.1,
			price: 200
		  },
		],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			his: historyModel.getHistory()
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

	},
	cancel:function (param) { 
		this.setData({
			searching:false,
			inputValue:""
		})
	 },
	 search:function (e) {
		 let word = e.detail.value;
		 this.listrequest(word)
	   },
	listrequest(word) {
		historyModel.addHistory(word);
		let his = this.data.his;
		his.unshift(word)
		this.setData({
			searching: true,
			his
		})

		http.request({
			url: "/placelist/search",
			data: {
				keyword: word
			},
			success: res => {
				this.setData({
					placeData: res.searchData
				})

			}
		})
	},
	back:function () { 
		wx.navigateBack({
			delta: 1
		});
	},
	history:function(e) {
		this.setData({
			inputValue: e.currentTarget.dataset.key
		})
		this.listrequest(e.currentTarget.dataset.key)
	}
})
