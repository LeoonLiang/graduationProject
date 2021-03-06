// pages/myOrder/index.js
const { HTTP } = require('../../util/http')
var http = new HTTP()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		orderData:[
			{
				business_name: "体院馆",
				project_name: "乒乓球",
				book_date: "2019-10-11",
				book_hour: 4,
				createdAt: "2019-10-14 16:20:24",
				price: 28,
				order_type: 1
			},
			{
				business_name: "体院馆",
				project_name: "乒乓球",
				book_date: "2019-10-11",
				book_hour: 4,
				createdAt: "2019-10-14 16:20:24",
				price: 28,
				order_type: 1
			}
		]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		http.request({
			url:"/order/myorder",
			data:{
				uid:wx.getStorageSync("uid")
			},
			success:(res)=>{
				this.setData({
					orderData:res.orderData
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
		wx.reLaunch({
			url: '/pages/my/index',
		})
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