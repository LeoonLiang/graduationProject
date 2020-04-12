// pages/checkAudit/index.js
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
		placeData: [],
		isHas: false,
		auditData: {
			type: '',
			keyNum: '',
			phone: ''
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	
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
		this.setData({
			searching: true
		})

		http.request({
			url: "/check",
			data: {
				telphone: word
			},
			success: res => {
				if (res.auditData) {
					const wenan = {
						0:'未审核',
						1: '审核成功',
						'-1': '审核失败'/*  */
					}
					this.setData({
						isHas: true,
						auditData: {
							type: wenan[res.auditData.type],
							keyNum: res.auditData.type,
							phone: res.auditData.telphone
						}
					})
				} else {
					this.setData({
						isHas: false,
					})
				}
				
			}
		})
	},
	back:function () { 
		wx.navigateBack({
			delta: 1
		});
	}
})
