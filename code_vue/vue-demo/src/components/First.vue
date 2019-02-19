<template>
  <div class= "login">
    {{ msg }} <br/>
    params: {{ $route.params.jsq }}
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'page first'
    }
  },
  methods: {
    goFirst: () => {
      this.$router.push({
        path: '/home/first',
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
