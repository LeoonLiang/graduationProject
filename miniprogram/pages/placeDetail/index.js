// pages/placeDetail/index.js
const {
    HTTP
} = require('../../util/http')
var http = new HTTP()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pid: 1,
        placeData: {
            id: "2",
            business_name: "店名",
            score: "9.6",
            location: "这是一个地址",
            placeTime: "8:00-20:00 周一到周日",
            price: "100",
            distance: "1.7",
            telphone: "13415638574"
        },
        commentData: [{
                cid: 1,
                headURL: "../images/head1.jpeg",
                username: "Leoon",
                time: "6小时前",
                rate: 4,
                content: "飒飒的 打撒打的阿萨德阿萨德啊的的 打撒打的阿萨德阿萨德啊的的 打撒打的阿萨德阿萨德啊的"
            },
            {
                cid: 2,
                headURL: "../images/head1.jpeg",
                username: "Leoon",
                time: "6小时前",
                rate: 4,	
                content: "飒飒的 打撒打的阿萨德阿萨德啊的的 打撒打的阿萨德阿萨德啊的的 打撒打的阿萨德阿萨德啊的"
            }
        ],
        projectData: [{
                id: 1,
                project_name: "羽毛球",
                describe: "这是一段描述。超出就会点点点的那种，不信你看看这个行就知道了",
                price: 57
            },
            {
                id: 2,
                project_name: "乒乓球",
                describe: "这是一段描述。超出就会点点点的那种，不信你看看这个行就知道了",
                price: 12
            }
        ],
        itemNum: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        http.request({
            url: "/placelist/placedetail",
            data: {
                bid: options.pid||6
            },
            success: res => {
                this.setData({
					placeData:res.placeData,
					commentData:res.commentData,
					projectData:res.projectData
				})
            }
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    phone() {
        wx.makePhoneCall({
            phoneNumber: this.data.placeData.telphone,
        })
    },

	book(e){
		let obj = {
			projectData:this.data.projectData[e.currentTarget.dataset.index],
			placeData:this.data.placeData
		}
		wx.navigateTo({
			url: '../orderDetail/index',
			success:function(res) {
				res.eventChannel.emit('resData',obj)
			}
		})
	}
})