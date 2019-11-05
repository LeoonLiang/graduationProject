// components/scrollNav/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		itemName: {
			type:Array,
			value:[],
			observer:function(newVal,oldVal) {
				console.log(newVal);
			}
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		TabCur: 0,
		scrollLeft: 0
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		tabSelect(e) {
			this.setData({
				TabCur: e.currentTarget.dataset.id,
				scrollLeft: (e.currentTarget.dataset.id - 1) * 60
			})
			this.triggerEvent('itemChange',this.data.TabCur)
		}
	}
	
})
