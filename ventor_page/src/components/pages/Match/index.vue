<template>
  <keep-alive>
    <component
			:is="componentId"
			@view="acceptor"
			:propsData="data"
			:propsState="state"

		></component>
  </keep-alive>
</template>

<script>
import List from "./list"
import Detail from "./detail"
export default {
  components: {
    List,
    Detail
	},
	data() {
		return {
			componentId: 'List',
			data: {},
			state: {}
		}
	},
	methods: {
		acceptor(key, data, state) {
			this.data = { ...data }
			this.state = { ...state }
			this.componentId = key
		}
	}
}
</script>

<style>
</style>