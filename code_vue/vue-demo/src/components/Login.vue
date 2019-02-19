<template>
  <div class= "login">
    <ElButton>elButton</ElButton>

    {{ msg }} <br/>
    账户名：<input title="账户名"/><br/>
    密码：<input title="密码"/>
    <Button class="login" @click="$goRoute(path)">登录</Button>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'page login',
      path: {
        path: '/first',
        params: {
          jsq: 1
        }
      }
    }
  },
  methods: {
    goFirst: () => {
      let path = {
        path: '/first',
        params: {
          jsq: 1
        }
      }
      this.$goRoute(path)
    }
  }
}
</script>
<style scoped>
</style>
