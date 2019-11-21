import store from '@/vuex/store'
import leftNav from "@/components/common/LeftNav"
export default {
    components:{
        leftNav
    },
    created() {
            store.state.token = localStorage.getItem("token")
            store.state.uid = localStorage.getItem("uid")
    },
}