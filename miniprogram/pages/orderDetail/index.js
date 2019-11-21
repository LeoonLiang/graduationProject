// pages/orderDetail/index.js
const {
	HTTP
} = require('../../util/http')
const util = require('../../util/util.js')
var http = new HTTP()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		date: '2018-12-25',
		hourArr:[1,2,3,4,5,6,7,8,9],
		hour:1,
		telphone:null,
		error:"请填写手机号",
		telval:false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		
		const eventChannel = this.getOpenerEventChannel()
		eventChannel.on('resData', (data)=> {
			this.setData({
				placeData:data.placeData,
				projectData:data.projectData,
				startTime: util.formatTime(0),
				date: util.formatTime(0),
				endTime: util.formatTime(7),
				total: data.projectData.price
			})
		});
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

	//自定义导航栏高度
	topbar(e) {
		this.setData({
			topbarHeight:e.detail
		})
	},
	DateChange(e) {
		this.setData({
			date: e.detail.value
		})
	},
	HourChange(e) {
		this.setData({
			hour: parseInt(e.detail.value)+1,
			total: this.data.projectData.price * (parseInt(e.detail.value) + 1)
		})
	},
	showModal(e) {
		if(!this.data.telphone){
			this.setData({
				telval:true
			})
			return
		}
		this.setData({
			modalName: e.currentTarget.dataset.target
		})
	},
	hideModal(e) {
		this.setData({
			modalName: null
		})
	},
	getTel(e){
		this.setData({
			telphone:e.detail.value
		})
	},
	finshOrder() {
		http.request({
			url: "/order/commit",
			method:"POST",
			data: {
				uid: wx.getStorageSync("uid"),
				bid:this.data.placeData.id,
				telphone:this.data.telphone,
				project_name:this.data.projectData.project_name,
				book_date:this.data.date,
				book_hour:this.data.hour,
				total_price:this.data.total
			},
			success: res => {
				console.log(res)
			}
		})

	}
})