// pages/matchApplySign/index.js
import {config} from '../../config'
const { HTTP } = require('../../util/http')
var http = new HTTP()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //步骤条
    show: false,
    numList: [{
      name: '选择赛事项目'
    }, {
      name: '填写报名信息'
    }, {
      name: '提交报名结果'
    },],
    num: 0,
    numSteps() {
      this.setData({
        num: this.data.num == this.data.numList.length - 1 ? 0 : this.data.num + 1
      })
    },
    isCard: false
  },
  onLoad: function (options) {
    this.setData({
			mid:options.id
    })
	},

  formSubmit: function(e) {
    let form = {...e.detail.value, mid: this.data.mid, uid: wx.getStorageSync("uid")}
		http.request({
			url:'/Match/contest',
			method:'POST',
			data:form,
			success:(res)=>{
        this.setData({
          show: true
        })
				wx.navigateBack({
          delta: 2
        })
			}
		})

	}
})