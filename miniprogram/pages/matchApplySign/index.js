// pages/matchApplySign/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //步骤条
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
  }
})