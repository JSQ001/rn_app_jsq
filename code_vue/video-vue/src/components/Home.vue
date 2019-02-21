<template>
  <div class="index">
    <div class="right">
      <div class="header">
        todo
      </div>
      <div class="content">
        <Login/>
      </div>
    </div>
  </div>
</template>

<script>
import Login from './Login'
export default {
  name: 'Home',
  components: {Login},
  data () {
    return {}
  }
}
</script>
<style scoped>
 .index{
   width: 100%;
   height: 100%;
   position: absolute;
   background: url('~@/resource/index.jpg')  no-repeat;
   background-size: contain;
 }
  .right{
    width: 55vw;
    height: 100vh;
    float: right;
    border: 1px solid;
  }
  .right .header{
    width: inherit;
    height: 30%;
    border: 1px solid;
  }
</style>
