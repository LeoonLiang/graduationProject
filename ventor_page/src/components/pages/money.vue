<template>
    <div class="container">
  <div class="func-btn com-form">
    <el-button type="primary" @click="getList">查询</el-button>
    <el-button type="primary" @click="addFormVisible = true">发起提现</el-button>
  </div>
  <div class="money-card-box">
    <div class="money-card">
        <div class="money-title">剩余金额/元</div>
        <div class="money">{{moneyData.nowMoney}}</div>
    </div>
    <div class="money-card">
        <div class="money-title">提现中金额/元</div>
        <div class="money">{{moneyData.ingMoney}}</div>
    </div>
    <div class="money-card">
        <div class="money-title">已提现金额/元</div>
        <div class="money">{{moneyData.edMoney}}</div>
    </div>
  </div>
  <div class="list com-form">
    <div style="font-size: 16px;font-weight: bold; margin-bottom: 20px">提现记录</div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column fixed prop="createdAt" label="提现时间" width="150">
      </el-table-column>
      <el-table-column prop="telphone" label="提现手机号" width="120">
      </el-table-column>
			<el-table-column prop="ingMoney" label="提现金额" width="120">
      </el-table-column>
      <el-table-column prop="type" label="提现状态">
        <template slot-scope="scope">
          {{scope.row.moneyType==0 ? '提现中' : scope.row.moneyType== -1 ? '提现失败' : scope.row.moneyType== 2 ? '已取消' : '提现成功'}}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button @click="cancel(scope.row)" type="" size="mini" v-show="scope.row.moneyType === 0">取消提现</el-button>
          <el-button @click="reWithdraw(scope.row)" type="" size="mini" v-show="scope.row.moneyType === 2">重新提现</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- //添加项目 -->
  <el-dialog title="发起提现" :visible.sync="addFormVisible">
    <el-form :model="form">
      <el-form-item label="提现金额" label-width="100px">
        <el-input
            v-model="form.ingMoney"
            autocomplete="off"
            placeholder="输入提现金额"
            :min="0"
            @blur="handleAmountChange"
            @keyup.enter.native="handleAmountChange"
         ></el-input>
      </el-form-item>
      <el-form-item label="提现手机号" label-width="100px">
        <el-input
            v-model="form.telphone"
            autocomplete="off"
            placeholder="输入提现手机号"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="withdraw" :disabled="withdrawBtn">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import store from "@/vuex/store"
export default {
  data() {
    return {
      list: [],
      form: {
          telphone: '',
          ingMoney: ''
      },
      withdrawBtn: true,
      addFormVisible: false,
      moneyData: {
          nowMoney: 0,
          ingMoney: 0,
          edMoney: 0
      }
    };
  },
  methods: {
    reWithdraw(row) {
        this.$http.post('/v2/update/reWithdraw', {
            id: row.id
        }).then((res) => {
            if (res.data.error_code === 200) {
                  this.$message({
                    type: 'success',
                    message: res.data.msg
                }); 
                this.getList()
            }
        })
    },
    handleAmountChange() {
        const url = '/v2/get/checkMoney'
        let params = {
            uid: localStorage.getItem('uid'),
            ingMoney: this.form.ingMoney
        }
        this.$http.get(url, {params})
        .then((res) => {
            if (res.data.error_code === 200) {
                this.withdrawBtn = false
            } else {
                this.withdrawBtn = true
                 this.$message({
                    type: 'error',
                    message: res.data.msg
                });    
            }
        })
    },
    emitter(key, data, state={}) {
			this.$emit('view', key, data, state)
    },
    cancel(row) {
        this.$http.post('/v2/update/cancelWithdraw', {
            id: row.id
        }).then((res) => {
            if (res.data.error_code === 200) {
                  this.$message({
                    type: 'success',
                    message: res.data.msg
                }); 
                this.getList()
            }
        })
    },
    async getList() {
      const url = "/v2/get/memberRecord"
      let params = {
        uid: localStorage.getItem('uid')
      }
      const res = await this.$http.get(url, { params })
      if (res.status === 200) {
          this.list = []
          this.moneyData = {}
          this.$nextTick(() => {
            this.list = [...res.data.recordData]
            this.moneyData = res.data.moneyData
          })
      }
    },
    withdraw() {
        const data = {
            ...this.form,
            uid: localStorage.getItem('uid')
        }
        this.$http.post('/v2/new/withdraw', data)
            .then((res) => {
            if (res.data.error_code === 200) {
                this.$message({
                    type: 'success',
                    message: res.data.msg
                })
                this.withdrawBtn = true
                this.addFormVisible = false
                this.form = {
                    telphone: '',
                    ingMoney: 0
                }
                this.getList()
            } else {
                this.withdrawBtn = true
                 this.$message({
                    type: 'error',
                    message: res.data.msg
                });    
            }
            })
    }
  },
  created: async function () {
    this.getList();
  },
  activated() {
    this.getList()
  }
}

</script>

<style>
    .container {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 30px;

    background-color: #f5f5f5;
}

.com-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    margin-top: 10px;
}
.money-card-box {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
}
.money-card {
    padding: 20px;
    box-sizing: border-box;
    min-width: 200px;
    height: 100px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    margin-right: 10px;
    color: #c9c9c9;
}
.money {
    padding-top: 4px;
    font-size: 32px;
    font-weight: bold;
    color: #409eff;
}

.func-btn {
    margin-top: 10px;
}
</style>