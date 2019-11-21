export default {
  data() {
    return {
      businessStartHours: '08:00',
      businessEndHours: '23:00',
      active: 0,     //当前步骤
      projectColl:[],
      // form: {           //步骤一表单
      //   projectName: "",
      //   siteName: '',
      // },
      priceData: [],
      priceFormVisible: false,    //暂存价格设置弹窗
      priceEditData: {
        startTime: "",
        endTime: "",
        day: [],
        index: 0
      },
      addPeriodData: {
        start: "",
        startTime: null,
        endTime: null,
        day: [],
      },
      addPeriodVisible: false, //添加时间段弹窗
      setPriceRules:{
        'day[0]':[{required:true,message:'这里不能为空哦',trigger:'blur'}],
        'day[1]':[{required:true,message:'这里不能为空哦',trigger:'blur'}],
        'day[2]':[{required:true,message:'这里不能为空哦',trigger:'blur'}],
        'day[3]':[{required:true,message:'这里不能为空哦',trigger:'blur'}],
        'day[4]':[{required:true,message:'这里不能为空哦',trigger:'blur'}],
        'day[5]':[{required:true,message:'这里不能为空哦',trigger:'blur'}],
        'day[6]':[{required:true,message:'这里不能为空哦',trigger:'blur'}],

      }
    };
  },
  props: {
    form:{
      type:Object,
      default:{
        projectName: "",
        siteName: ''
      }
    }
  },
  methods: {
    //下一步
    next() {
     if(this.active==0&&this.form.projectName!=""&&this.form.siteName!=""){
       this.active=1
     }else if(this.active==1&&this.priceData!="") {
       //完成发送给服务器
       this.$alert("添加项目成功","点击确定返回项目页",{
         confirmButtonText:'确定',
         callback:action => {
          this.$router.push({ path: '/'})
         }
       })
     }else {
       this.$message("是不是忘记填齐表单了")
     }
     ;

    },
    back() {
      this.active==1?this.active=0:"";  
    },

    //编辑价格
    setPrice(index, row) {
      this.priceEditData.startTime = row.startTime;
      this.priceEditData.endTime = row.endTime;
      // this.priceEditData.day = row.day
      // Object.assign(this.priceEditData.day,row.day) 
      // console.log(this.priceEditData.day);
      this.priceEditData.day = JSON.parse(JSON.stringify(row.day))
      this.priceEditData.index = index
 
      this.priceFormVisible = true
    },

    editPrice(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid&&this.priceEditData.endTime!=null&&this.priceEditData.startTime!=null) {
          let { startTime, endTime, day, index } = this.priceEditData
          let nowStart = parseInt(startTime);
          let nowEnd = parseInt(endTime);
          if (index > 0) {
            let lastTime = parseInt(this.priceData[index - 1].endTime);
    
            //时间段矫正
            if (lastTime >= nowStart) {
              if (nowStart >= 10) {
                this.priceData[index - 1].endTime = nowStart + ":00"
              } else {
                this.priceData[index - 1].endTime = "0" + nowStart + ":00"
              }
              this.priceData[index - 1].periodTime = this.priceData[index - 1].startTime + "~" + this.priceData[index - 1].endTime;
            }
            if (index < this.priceData.length-1) {
              let nextTime = parseInt(this.priceData[index + 1].startTime);
      
              //时间段矫正
              if (nextTime <= nowEnd) {
                if (nowEnd >= 10) {
                  this.priceData[index + 1].startTime = nowEnd + ":00"
                } else {
                  this.priceData[index + 1].startTime = "0" + nowEnd + ":00"
                }
                this.priceData[index + 1].periodTime = this.priceData[index + 1].startTime + "~" + this.priceData[index + 1].endTime;
              }
            }
          }
        
          //修改表格数据
          this.priceData[index].startTime = startTime;
          this.priceData[index].endTime = endTime;
          // Object.assign(this.priceData[index].day, day) 
          // this.priceData[index].day= day;
          this.priceData[index].day = JSON.parse(JSON.stringify(day))
          this.priceData[index].periodTime = this.priceData[index].startTime + "~" + this.priceData[index].endTime;
    
          // priceEditData清空
          for (let i in this.priceEditData) {
            this.priceEditData[i] = "";
          }
    
    
          //最后关闭
          this.priceFormVisible = false;
        } else {
          this.$message("哎呦，是不是有的忘填了")
          return false;
        }
      });
     
    },

    // 添加时间段
    addPeriodTime() {
      if(this.priceData.length){
        var maxTime = this.priceData[this.priceData.length - 1].endTime;
        if (parseInt(maxTime) >= 24) {
          this.$message("最后一个时间段超过24:00，请调至23:00或以下")
          return
        }
      }else {
        var maxTime = this.businessStartHours;
      }
      this.addPeriodData.startTime = maxTime;
      this.addPeriodVisible = true;
    },
    //点击确定
    addPeriod(forName) {
    this.$refs[forName].validate((valid) => {
      if(valid&&this.addPeriodData.endTime!=null){
        let arr = [...this.addPeriodData.day];
        this.priceData.push({
          startTime: this.addPeriodData.startTime,
          endTime: this.addPeriodData.endTime,
          periodTime: this.addPeriodData.startTime + "~" + this.addPeriodData.endTime,
          day: arr
        })
        // this.addPeriodData=null
        this.addPeriodVisible = false;
      }else {
        this.$message("哎呦，是不是有的忘填了")
        return false;
      }
    })
      // console.log(this.addPeriodData);
     
    },
    //请先选开始时间
    addPeriodFocus() {
      if (this.addPeriodData.startTime == null) {
        this.$message("请先选开始时间")
      }
    },
    delPeriod(index) {
      this.$confirm("你确定要删除这个时间段？","提示",{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.priceData.splice(index,1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
     
    }

  },
}
