<template>
  <div class="login">
    <el-form>
      <el-form-item>
        <el-input v-model="username" :style="style" placeholder="用户名"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="password" :style="style" placeholder="密码"/>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit" style="width: 15%;margin-left: 59%" type="primary" placeholder="密码">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      style: {
        width: '33%',
        marginLeft: '50%'
      },
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      // todo 后端接口校验
      this.$goRoute('')
    }
  }
}
</script>
<style scoped>
  .login{
     margin-top: 15%;
  }
</style>
