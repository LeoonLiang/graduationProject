<template>
   <div class="signup">
        <!--
          el-form 表示使用了 表单组件
    
          ref 在vue中是一个特殊的属性，给组件或者HTML元素添加该属性后，
          可以在 js 中通过 this.$refs.loginForm 来获取到当前组件或这DOM对象
        -->
       
        <el-form class="signup-form" ref="loginForm" :model="loginForm" label-width="80px" :rules="rules" :label-position="labelPosition">
            <div class="title">
                场馆预订店家平台
              </div>
          <!--
            el-form-item 是表单元素中的一行
            label 表示当前行的文字提示
    
            prop 是配合 表单校验 的属性
           -->
           <div style="font-weight:bold;font-size: 18px;">注册</div>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="loginForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phonenum">
            <el-input v-model="loginForm.phonenum"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <!-- 给组件绑定事件的时候，如果发现绑定的事件不生效，那么，可以添加 .native 修饰符 -->
            <el-input v-model="loginForm.password" type="password" @keyup.enter.native="login"></el-input>
          </el-form-item>
          <el-form-item label="再次输入密码" prop="password1">
            <!-- 给组件绑定事件的时候，如果发现绑定的事件不生效，那么，可以添加 .native 修饰符 -->
            <el-input v-model="loginForm.password1" type="password" @keyup.enter.native="login"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center;">
            <el-button type="primary" @click="login">注册</el-button>
          </el-form-item>
          <router-link to="/login" class="sign-up">登录</router-link>
        </el-form>
      </div>
</template>

<script>
    // import axios from 'axios'
import store from '@/vuex/store'
export default {
    data () {
        return {
          loginForm: {
            nickname: '',
            phonenum: '',
            password: '',
            password1: '',
            type:102
          },
          store,
          // 表单验证规则：
          rules: {
            phonenum: [
              // required 表示为必填项
              // message 验证失败时的提示
              // trigger 表示什么时候触发表单验证
              { required: true, message: '用户名为必填项', trigger: 'blur' },
    
              // min 和 max 分别指定：当前表单的长度
              { min: 4, max: 12, message: '用户名长度为：4-12个字符', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '密码为必填项', trigger: 'blur' },
              { min: 6, max: 12, message: '密码长度为：6-12个字符', trigger: 'blur' }
            ],
             password: [
              { required: true, message: '密码为必填项', trigger: 'blur' },
              { min: 6, max: 12, message: '密码长度为：6-12个字符', trigger: 'blur' }
            ]
          },
    
          // 表单标签文字提示的位置
          labelPosition: 'top'
        }
      },
      methods: {
        /**
         * 登录方法
         */
        login () {
          // 表单校验的代码：
          // 先进行表单验证，验证成功后，再进行登录
          // console.log(this.$refs.loginForm)
    
          // this.$refs.loginForm 是用来获取到页面中的组件或DOM对象
          this.$refs.loginForm.validate((valid) => {
            if (valid) {
              if (this.loginForm.password !== this.loginForm.password1) {
                this.$message.warning('两次密码不相同')
                return false
              }
              // 表单验证成功时执行的代码
              this.handleLogin()
            } else {
              // 表单验证失败的代码
              return false
            }
          })
        },
    
        /**
         * 登录逻辑
         */
        async handleLogin () {
          const url = '/v1/user/register'
          // 使用 await 等待这个异步请求成功：
          const res = await this.$http.post(url, this.loginForm)
          if (res.data.error_code === 200) {
            // 成功：
            this.$router.push('/login')
            this.$message.success(res.data.msg)
          } else  {
            this.$message(res.data.msg)
          }
        
        },
    
        /**
         * 重置
         */
        reset () {
          this.$refs.loginForm.resetFields()
        }
      }
}
</script>

<style>
    .signup {
    height: 100%;
    background-color: #2d434c;
    display:flex;
    align-items: center;
    justify-content: center;
  }
  
  .title {
    font-size: 32px;
    position: relative;
    z-index: 999;
    text-align: center;
    color: #fff;
    position: absolute;
    top: -80px;
    left: 50%;
    transform: translateX(-50%);
  }

  .signup .el-form-item {
    margin-bottom: 14px
  }

  .signup .el-form-item__content {
    line-height: 24px
  }

  .signup .signup-form {
    position: absolute;
    width: 500px;
    padding: 35px;
    border-radius: 12px;
    background-color: #fff;
  }

  .signup-form .el-button {
    width: 100%;
  }
</style>