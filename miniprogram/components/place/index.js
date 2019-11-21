// components/place/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        placeData: {
            type: Object,
            observer: function(newVal, oldVal) {
                this.setData({
                    pid: newVal.pid,
                    placeName: newVal.placeName,
					business_imgURL: newVal.business_imgURL,
                    city: newVal.city,
                    distance: newVal.distance,
                    score: newVal.score,
                    price: newVal.price
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        pid: 1,
        placeName: "店名",
		business_imgURL: "../images/place1.jpg",
        distance: 1.7,
        grade: 9.0,
        price: 100
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})