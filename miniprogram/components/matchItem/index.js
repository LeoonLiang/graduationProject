// components/matchItem/index.js
Page({

  properties: {
    matchData: {
      type: Object,
      observer: function (newVal, oldVal) {
        this.setData({
          pid: newVal.pid,
          status: newVal.status,
          title: newVal.title,
          location: newVal.location,
          begintime: newVal.begintime,
          endtime: newVal.endtime
        })
      }
    }
  },

  /**
   * 页面的初始数据
   */
  data: {

    // pid: 1,
    // status: 1,
    // title: '热个人热无法v儿科v嗯',
    // location: '哦i很够二',
    // begintime: '2019/01/01',
    // endtime: '2019 / 01 / 09'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})