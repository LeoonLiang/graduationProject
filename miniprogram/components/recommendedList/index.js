// components/recommendedList/index.js
const computedBehavior = require('miniprogram-computed')
const {HTTP} = require('../../util/http')
const http = new HTTP()
Component({
	behaviors:[computedBehavior],
	/**
	 * 组件的属性列表
	 */
	properties: {
		location: {
			type:String,
			value:'广州'
		  }
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		placeData: [],
	},
	watch: {
		'location':function(loca) {
		
			http.request({
				url: '/placelist/recommendedlist',
				method: 'GET',
				data: {
					location:loca
				},
				success: (res) => {
					console.log(res.res)
					this.setData({
						placeData:res.res
					})
				}	
			})
		}	
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		
	},
	lifetimes: {
		attached: function() {
			
		}
	}
})
