// pages/match/index.js
const {HTTP} = require('../../util/http')
const http = new HTTP()
Page({

    /**
     * 组件的初始数据
     */
    data: {
        itemList: [{
            pid: 1,
            status: 1,
            title: '环北自行车大赛',
            location: '广州市',
            begintime: '2019/02/03',
            endtime: '2019/03/03'
        }, {
            pid: 2,
            status: 2,
            title: '环北卡丁车大赛',
            location: '广州市',
            begintime: '2019/02/03',
            endtime: '2019/03/03'
        }, {
            pid: 3,
            status: 3,
            title: '环北车大赛',
            location: '广州市',
            begintime: '2019/02/03',
            endtime: '2019/03/03'
        }]
    },

    /**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		http.request({
            url: '/Match/allMatch',
            method: 'GET',
            success: (res) => {
                console.log(res)
                this.setData({
                    itemList:res.res
                })
            }	
        })
	},

    /**
     * 组件的方法列表
     */
    methods: {

    }
})