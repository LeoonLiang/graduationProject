<template>
    <div class="container">
  <!-- <div class="func-btn com-form">

    <el-button type="primary" @click="addFormVisible = true">创办赛事</el-button>
  </div> -->
  <div class="list com-form">
    <div style="font-size: 16px;font-weight: bold; margin-bottom: 20px">参赛人员</div>
    <el-table :data="matchData" border style="width: 100%">
      <el-table-column fixed prop="member_name" label="参赛者名称" width="150">
      </el-table-column>
      <el-table-column prop="telphone" label="手机号" width="120">
      </el-table-column>
			<el-table-column prop="idCard" label="身份证号" width="120">
      </el-table-column>
      <el-table-column prop="remark" label="备注">
      </el-table-column>
			<el-table-column prop="ranking" label="排名">
      </el-table-column>
      <!-- <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="emitter('detail', scope.row)" type="text" size="small">详情</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <div class="tc-pannel l_page__footer">
			<elRow type="flex" justify="center">
				<!-- 返回 -->
				<elButton
					@click="emitter('list')"
				>
					返回
				</elButton>
			</elRow>
		</div>
  </div>
</div>
</template>

<script>
import store from "@/vuex/store"
export default {
    props: {
        propsData: Object
    },
  data() {
    return {
      matchData: [],
      addFormVisible: false,
			editFormVisible: false,
			fileList:[],

      addform: {
        bid: null,
        describe: null
      },
      editform: {
        bid: null,
        name: '',
        price: null,
        describe: null
      },
    };
  },
  activated() {
    this.getMatchMember();
  },
  methods: {
      emitter(key, data, state={}) {
        this.$emit('view', key, data, state)
    },
     getMatchMember() {
      const url = "/v1/Match/matchMember"
      let params = {
        mid: this.propsData.id
      }
      this.$http.get(url, { params }).then((res) => {
        if (res.status === 200) {
            console.log(res.data)
            this.matchData = [...res.data.MatchData]
        }
      })
    },


  }
}

</script>

<style>
    .container {
    height: 100%;
    width: 100%;
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

.func-btn {
    margin-top: 10px;
}
</style>