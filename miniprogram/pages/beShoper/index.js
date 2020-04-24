// pages/beShoper/index.js
import {config} from '../../config'
const { HTTP } = require('../../util/http')
var http = new HTTP()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		config,
		imgUrl0:'',
		imgUrl1:'',
		imgUrl2:'',
		imgUrl3:'',

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	formSubmit: function(e) {
		let form = {...e.detail.value, ...this.data }
		http.request({
			url:'/handAudit',
			method:'POST',
			data:form,
			success:(res)=>{
				wx.navigateTo({
					url: '../checkAudit/index'
				})
			}
		})

	},
	upImgClick: function (e){
		let that = this
        wx.chooseImage({
        count: 1,                                           //一次上传图片数量
        sizeType: ['compressed'],                           //图片大小
        sourceType: ['album', 'camera'],
        success: function (res) {                           
        var filePath = res.tempFilePaths[0]               //获取图片路径
 
        // 上传图片
        wx.uploadFile({                                  
          url: 'https://leoon.utools.club/api/v2/img/upload',                  //服务器接口地址
          filePath: filePath,                            
          name: 'file',
 
          success: function (res) {
            res = JSON.parse(res.data)                          
			let num = e.currentTarget.dataset.num
			if (num == 0) {
				that.setData({
					imgUrl0: res.filename
				  })
			}else if (num == 1) {
				that.setData({
					imgUrl1: res.filename
				  })
			}else if (num == 2) {
				that.setData({
					imgUrl2: res.filename
				  })
			}else if (num == 3) {
				that.setData({
					imgUrl3: res.filename
				  })
			}
           
          },
 
          fail: function (e) {
            console.log('上传失败', e)
          }
        })
 
      },
      fail: function (e) {
        console.error(e)
      }
    })
  },

})