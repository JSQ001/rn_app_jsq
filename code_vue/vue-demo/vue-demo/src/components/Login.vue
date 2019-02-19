<template>
  <div class= "login">
    {{ msg }} <br/>
    账户名：<input title="账户名"/><br/>
    密码：<input title="密码"/>
    <Button class="login" @click="goFirst">登录</Button>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'page login'
    }
  },
  methods: {
    goFirst: () => {
      this.$router.push({
        path: '/first',
        params: {
          jsq: 1
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
