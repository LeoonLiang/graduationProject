import store from "@/vuex/store"
export default {
  data() {
    return {
      projectData: [],
      addFormVisible: false,
      editFormVisible: false,

      addform: {
        bid: null,
        name: '',
        price: null,
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
    async addProject(index, row) {
      const url = "/v2/new/project"
      this.addform.bid = localStorage.getItem('bid');
      const res = await this.$http.post(url, this.addform)
      if (res.status === 201) {
        this.addFormVisible = false;
        this.$message({
          type: "success",
          message: "添加成功"
        })
      }
      this.getProject()
    },
    async getProject() {
      const url = "/v2/get/project"
      let params = {
        bid: localStorage.getItem('bid')
      }
      const res = await this.$http.get(url, { params })
      if (res.status === 200) {
        this.projectData = JSON.parse(JSON.stringify(res.data.projectData))
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
    this.getProject();

  },
}
