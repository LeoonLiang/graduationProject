<template>
    <div class="container">
  <div class="func-btn com-form">

    <el-button type="primary" @click="addFormVisible = true">创办赛事</el-button>
  </div>
  <div class="list com-form">
    <div style="font-size: 16px;font-weight: bold; margin-bottom: 20px">已有项目</div>
    <el-table :data="matchData" border style="width: 100%">
      <el-table-column fixed prop="match_name" label="赛事名称" width="150">
      </el-table-column>
      <el-table-column prop="match_start_time" label="开始时间" width="120">
      </el-table-column>
			<el-table-column prop="match_end_time" label="结束时间" width="120">
      </el-table-column>
      <el-table-column prop="introdution" label="描述">
      </el-table-column>
			<el-table-column prop="location" label="地址">
      </el-table-column>
			<el-table-column prop="memberNum" label="参赛人数">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="emitter('detail', scope.row)" type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- //添加项目 -->
  <el-dialog title="创办赛事" :visible.sync="addFormVisible">
    <el-form :model="addform">
			<el-form-item label-width="100px" label="赛事大图" prop="img">
				<el-upload
				class="upload-demo"
				ref="upload"
				action="http://localhost:8080/upload"
				:on-success="uploadsuc"
				:on-exceed = "maxfile"
				:file-list="fileList"
				:auto-upload="true"
				:on-remove="removeImg"
				:limit="1">
				<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
				<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
			</el-form-item>
			<el-form-item label="赛事名称" label-width="100px">
        <el-input v-model="addform.match_name" autocomplete="off" placeholder="输入赛事名称"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" label-width="100px">
        <el-input v-model="addform.phone" autocomplete="off" placeholder="输入主办人联系电话"></el-input>
      </el-form-item>
      <el-form-item label="活动时间" label-width="100px">
        <el-date-picker
					v-model="addform.matchTime"
					type="daterange"
					range-separator="至"
					value-format="yyyy-MM-dd"
					start-placeholder="开始日期"
					end-placeholder="结束日期">
				</el-date-picker>
      </el-form-item>
			<el-form-item label="举办地址" label-width="100px">
        <el-input v-model="addform.address" autocomplete="off" placeholder="举办赛事的地址"></el-input>
      </el-form-item>
      <el-form-item label="活动描述" label-width="100px">
        <el-input v-model="addform.describe" autocomplete="off" placeholder="详情介绍举办地点"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addMatch">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import store from "@/vuex/store"
export default {
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
  methods: {
		uploadsuc(response, file, fileList) {
        // console
        console.log("打印",response)
        this. addform.match_imgURL=response.filename
      console.log(this.addform.business_imgURL)
    },
    async removeImg(file, fileList) {
      const url = 'v2/img/delete'
      if(this.newBusinessForm.business_imgURL) {
        const res = await this.$http.post(url, this.newBusinessForm.business_imgURL)
        this. newBusinessForm.business_imgURL = undefined;
      }
		},
		 maxfile(files, fileList){
      this.$message({
        message: "只能上传一张图,重新上传请先删除下方图片",
        type: 'warning'
      })
    },
    emitter(key, data, state={}) {
			this.$emit('view', key, data, state)
    },
    //标签页
    handleEdit(index, row) {
      this.editform = {
        id: row.id,
        name: row.name,
        price: row.price,
        describe: row.describe
      }
      this.editFormVisible = true
    },
    formatter(row, column) {
      return row.price + " 元/小时"
    },	
    async addMatch(index, row) {
      const url = "/v1/Match/addMatch"
      this.addform.uid = localStorage.getItem('uid');
      const res = await this.$http.post(url, this.addform)
      if (res.status === 201) {
        this.addFormVisible = false;
        this.$message({
          type: "success",
          message: "添加成功"
        })
      }
      // this.getProject()
    },
    async getMatch() {
      const url = "/v1/match/myMatch"
      let params = {
        uid: localStorage.getItem('uid')
      }
      const res = await this.$http.get(url, { params })
      if (res.status === 200) {
				this.matchData = [...res.data.matchData]
				console.log(	this.matchtData)
      }
    },
    async editProject() {
      const url = "/v2/update/project"
      const res = await this.$http.post(url, this.editform)
      if (res.status === 201) {
        this.editFormVisible = false
        this.$message({
          type: "success",
          message: "修改成功"
        })
        this.getProject()
      }
    },
    async delProject(index,row) {
      // console.log(index,row)
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const url = "/v2/del/project"
        const res = await this.$http.post(url, {id:row.id})
        if (res.status === 201) {
          this.editFormVisible = false	
          this.$message({
            type: "success",
            message: "删除成功"
          })
          this.getProject()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
     
      
    }


  },
  created: async function () {
    this.getMatch();

  },
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