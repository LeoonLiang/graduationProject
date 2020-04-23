import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import store from '@/vuex/store'
export default {
  components: {
    BaiduMap
  },
  data() {
    return {
      mapZoom: 15,
      mapCenter: { lng: 0, lat: 0 },
      mapLocation: {
        address: undefined,
        coordinate: undefined
      },
      fileList: [],
      newBusinessForm: {
        uid: 1,
        telphone: '13415632147',
        business_name: 'fei在',
        business_start_time: '08:00',
        business_end_time: '23:00',
        business_imgURL:undefined,
        location:"未知",
        city:"其他",

      },
      newBusinessFormRules: {
        business_name: [
          { required: true, message: '场馆名' },
        ],
        telphone: [
          { required: true, message: '手机号不能为空' },
          { min: 11, max: 11, message: '长度须为11位', trigger: 'blur' }
        ],
        business_start_time: [
          { required: true, message: '时间必选哦' },
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(this.newBusinessForm.business_imgURL==undefined){
          this.$message({
            message: "请上传图片",
            type: 'warning'
          })
          return false
        }
        if (valid) {
          this.newbusiness()
        } else {
          this.$message("不能留空哦")
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    maxfile(files, fileList){
      this.$message({
        message: "只能上传一张图,重新上传请先删除下方图片",
        type: 'warning'
      })
    },
    uploadsuc(response, file, fileList) {
        this. newBusinessForm.business_imgURL=response.filename
    },
    async removeImg(file, fileList) {
      const url = 'v2/img/delete'
      if(this.newBusinessForm.business_imgURL) {
        const res = await this.$http.post(url, this.newBusinessForm.business_imgURL)
        this. newBusinessForm.business_imgURL = undefined;
      }
    },
    handlerBMap({ BMap, map }) {
      this.BMap = BMap
    
      this.map = map
      if (this.mapLocation.coordinate && this.mapLocation.coordinate.lng) {
        this.mapCenter.lng = this.mapLocation.coordinate.lng
        this.mapCenter.lat = this.mapLocation.coordinate.lat
        this.mapZoom = 15
        map.addOverlay(new this.BMap.Marker(this.mapLocation.coordinate))
      } else {
        this.mapCenter.lng = 113.271429
        this.mapCenter.lat = 23.135336
        this.mapZoom = 10
      }
    },
    querySearch(queryString, cb) {
      var that = this
      var myGeo = new this.BMap.Geocoder()
      myGeo.getPoint(queryString, function (point) {
        if (point) {
          that.mapLocation.coordinate = point
          that.makerCenter(point)
        } else {
          that.mapLocation.coordinate = null
        }
      }, this.locationCity)

      var options = {
        onSearchComplete: function (results) {
          if (local.getStatus() === 0) {
            // 判断状态是否正确
            var s = []

            //获取城市
            that.newBusinessForm.city = results.city
            for (var i = 0; i < results.getCurrentNumPois(); i++) {
              var x = results.getPoi(i)
              var item = { value: x.address + x.title, point: x.point }
              s.push(item)
              cb(s)
            }
          } else {
            cb()
          }
        }
      }
      var local = new this.BMap.LocalSearch(this.map, options)
      local.search(queryString)
    },
    handleSelect(item) {
      var { point } = item
      this.mapLocation.coordinate = point
      this.makerCenter(point)
      this.newBusinessForm.location = item.value


    },
    makerCenter(point) {
      if (this.map) {
        this.map.clearOverlays()
        this.map.addOverlay(new this.BMap.Marker(point))
        this.mapCenter.lng = point.lng
        this.mapCenter.lat = point.lat
        this.mapZoom = 15
      }
    },
    async newbusiness() {

      const url = 'v2/new/business'
      try{
        const res = await this.$http.post(url, this.newBusinessForm)
   
        if (res.status === 201) {
          this.$refs.upload.submit();
          // 成功：
            this.$router.push('/')
          this.$message({
            message: '新建成功',
            type: 'success',
            duration: 500
          })
        }
      }
      catch(e){
        this.$message({
          message: '创建失败，未知错误',
          type: 'error',
          duration: 1000
        })
      }
      
    }

  },
  created() {
    this.newBusinessForm.uid = store.state.uid
    
  },
  mounted() {
    console.log(this.fileList)
  },
}