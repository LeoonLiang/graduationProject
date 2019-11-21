// pages/index/index.js
const {HTTP} = require('../../util/http')
var http = new HTTP()
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        locationString: "",
        classifData: [{
                classifImg: "../images/basket.png",
                classifName: "篮球"
            },
            {
                classifImg: "../images/sco.png",
                classifName: "足球"
            },
            {
                classifImg: "../images/wang.png",
                classifName: "网球"
            },
            {
                classifImg: "../images/yumao.png",
                classifName: "羽毛球"
            },
            {
                classifImg: "../images/Ping-Pong.png",
                classifName: "乒乓球"
            },
            {
                classifImg: "../images/Bowling.png",
                classifName: "保龄球"
            },
            {
                classifImg: "../images/Billiards.png",
                classifName: "桌球"
            },
            {
                classifImg: "../images/Skates.png",
                classifName: "溜冰"
            },
        ],
        cardCur: 0,
        swiperList: [{
            id: 0,
            type: 'image',
            url: '../../images/sw1.jpg'
        }, {
            id: 1,
            type: 'image',
            url: '../../images/sw2.jpg',
        }, {
            id: 2,
            type: 'image',
            url: '../../images/sw3.jpg'
        }, {
            id: 3,
            type: 'image',
            url: '../../images/sw4.jpg'
        }, {
            id: 4,
            type: 'image',
            url: '../../images/sw5.jpg'
        }, ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.login({
            success(res) {
                if (res.code) {
                    http.request({
                        url: '/token',
                        method: 'POST',
                        data: {
                            account: res.code,
                            type: 100
                        },
                        success: (res) => {
                            wx.setStorage({
                                key: "token",
                                data: res.token
                            })
							wx.setStorage({
								key: "uid",
								data: res.uid
							})
                        }
                    })
                }
            }
        })
        //获取当前位置
        app.getLocation({
            success: (res) => {
                let city = res.originalData.result.addressComponent.city
                let locationString = city.slice(0, city.length - 1)
                this.setData({
                    locationString
                })
            }
        });



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

    bdmap: function() {
        wx.navigateTo({
            url: '../location/index?city=' + this.data.locationString,
        })
    },

    //轮播图
    DotStyle(e) {
        this.setData({
            DotStyle: e.detail.value
        })
    },
    // cardSwiper
    cardSwiper(e) {
        this.setData({
            cardCur: e.detail.current
        })
    },
    // towerSwiper
    // 初始化towerSwiper
    towerSwiper(name) {
        let list = this.data[name];
        for (let i = 0; i < list.length; i++) {
            list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
            list[i].mLeft = i - parseInt(list.length / 2)
        }
        this.setData({
            swiperList: list
        })
    },
    // towerSwiper触摸开始
    towerStart(e) {
        this.setData({
            towerStart: e.touches[0].pageX
        })
    },
    // towerSwiper计算方向
    towerMove(e) {
        this.setData({
            direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
        })
    },
    // towerSwiper计算滚动
    towerEnd(e) {
        let direction = this.data.direction;
        let list = this.data.swiperList;
        if (direction == 'right') {
            let mLeft = list[0].mLeft;
            let zIndex = list[0].zIndex;
            for (let i = 1; i < list.length; i++) {
                list[i - 1].mLeft = list[i].mLeft
                list[i - 1].zIndex = list[i].zIndex
            }
            list[list.length - 1].mLeft = mLeft;
            list[list.length - 1].zIndex = zIndex;
            this.setData({
                swiperList: list
            })
        } else {
            let mLeft = list[list.length - 1].mLeft;
            let zIndex = list[list.length - 1].zIndex;
            for (let i = list.length - 1; i > 0; i--) {
                list[i].mLeft = list[i - 1].mLeft
                list[i].zIndex = list[i - 1].zIndex
            }
            list[0].mLeft = mLeft;
            list[0].zIndex = zIndex;
            this.setData({
                swiperList: list
            })
        }
    },

})