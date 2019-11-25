let moment = require("moment");
// moment.locale('zh-cn')
export default {
    data() {
        return {
            baseFormVisible:false,
            businessData:{
                business_name:"这是一家店",
                location:"这是地址",
                business_start_time:"08:00",
                business_end_time:"23:00",
                score:9.5,
                telphone:"13415638574",
            },
            editData:{
                business_name:"",
                location:"",
                business_start_time:"",
                business_end_time:"",
                score:null,
                telphone:"",
            },
            orderData:[]
        };
    },
    computed: {
        "business_time":function() {
            return this.businessData.business_start_time+" ~ "+this.businessData.business_end_time
        }
    },
  
    methods: {
        formatter(row,column) {
            return row.total_price+" 元"
          },
          async handleOrder(index,orderData) {
              if(orderData[index].order_type==2) {
                  this.$message({
                      message:"已经处理过咯",
                      type:"warning"
                  })
                  return
              }
              this.$confirm("处理的订单号为"+orderData[index].order_id,"订单处理",{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(async ()=>{
                //   发送服务器 
                const url = "/v2/update/ordertype"
                const res = await this.$http.post(url, {order_id:orderData[index].order_id})
                this.$message({
                    type: 'success',
                    message: '处理成功!'
                  })
                  this.getList()
              }).catch(()=> {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                  });    
              })
          },
          handleBase() {
              this.editData = JSON.parse(JSON.stringify(this.businessData))
              this.baseFormVisible= true;
         
          },
          async setBase() {
            this.editData.bid = localStorage.getItem('bid')  
            const url = "/v2/update/info"
            const res = await this.$http.post(url,this.editData)
             this.businessData = JSON.parse(JSON.stringify(this.editData))
             this.baseFormVisible = false;
            
          },
          async getList() {
            const url = "/v2/get/info"
            let params = {
                uid: localStorage.getItem("uid")
              }
            const res = await this.$http.get(url,{params})
            if(res.status===200) {
                this.businessData = JSON.parse(JSON.stringify(res.data.businessData))
                this.orderData = res.data.orderData
                localStorage.setItem("bid",res.data.businessData.id)
            }
          }
    },
    async created() {
       this.getList();
    },
}
