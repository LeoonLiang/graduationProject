// pages/me/index.js
const { HTTP } = require('../../util/http')
var http = new HTTP()
Page({

	/**
	 * 页面的初始数据
	 */
	// options:{
	// 	multipleSlots:true
	// },
	data: {
		avatarUrl:"/images/my.png",
		nickName:"点击获取授权"
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		wx.getSetting({
			success: (res)=>{
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称
					wx.getUserInfo({
						success:(res)=> {
							console.log(res)
							this.setData({
								avatarUrl: res.userInfo.avatarUrl,
								nickName: res.userInfo.nickName,
							})
						
						}
					})
				}
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

	onGotUserInfo: function (e) {

		this.setData({
			avatarUrl:e.detail.userInfo.avatarUrl,
			nickName:e.detail.userInfo.nickName,
		})

		wx.getStorage({
			key: 'uid',
			success(res) {
				http.request({
					url:"/user/evpi",
					method:"POST",
					data:{
						uid:res.data,
						headUrl: e.detail.userInfo.avatarUrl,
						nickname: e.detail.userInfo.nickName
					},
					success(res) {
						console.log(res)
					}
				
				})
			}
		})

	}

})