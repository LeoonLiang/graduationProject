let moment = require("moment");
// moment.locale('zh-cn')
export default {
    data() {
        return {
            orderData:[
                {
                    order_id:123165113,
                    nickname:"leoon",
                    telphone:"13415638574",
                    project_name:"羽毛球",
                    price:66,
                    time_length:4,
                    date:"2019-08-24 14:00",
                    type:0
                },
                {
                    order_id:5623132,
                    nickname:"某某",
                    telphone:"134156328574",
                    project_name:"乒乓球",
                    price:66,
                    time_length:4,
                    date:"2019-11-24 14:00",
                    type:1
                }
            ]
        };
    },
  
    methods: {
        formatter(row,column) {
            return row.total_price+" 元"
          },
          handleOrder(index,orderData) {
              if(orderData[index].type==1) {
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
          async getList() {
            const url = "/v2/get/orderlist"
            let params = {
                bid: localStorage.getItem('bid')
              }
            const res = await this.$http.get(url, {params})
            console.log(res)
            this.orderData = res.data.orderData
          }
  
    },  
    async created() {
     this.getList()
    },
}
