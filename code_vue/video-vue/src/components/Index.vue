<template>
  <div class="index">
    <div class="header">
      <div class="top">
        欢迎来到jsq高清影院-王者影院！相聚王者！共享峡谷精彩！记住我们网址:www.xg.com！！！记得好东西大家要分享袄！！微信公众号:coding...
      </div>
    </div>
    <nav class="navBar">
      <li @click="tabLink(item)" v-for="item in tabs" :key="item.key" :style="{background: item.key=== tab ? 'rgb(51,51,51)' : '' }">{{ item.label}}</li>
      <el-input suffix-icon="el-icon-search" @keyup.enter.native="search" placeholder="视频搜索" v-model="searchKey" style="display: inline-block; width: 16.66667%;margin-left: 48%"/>
      <el-button @click="search" style="display: inline-block">搜索</el-button>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      tab: 'index',
      searchKey: '',
      tabs: [
        {key: 'index', label: '首页'},
        {key: 'wz', label: '王者荣耀'},
        {key: 'movies', label: '电影'},
        {key: 'tv', label: '电视'},
        {key: 'zy', label: '综艺'}
      ]
    }
  },
  methods: {
    tabLink (item) {
      this.tab = item.key
    },
    search () {
      console.log(this.searchKey)
    }
  }
}
</script>
<style scoped>
  .index .header{
    width: 100vw;
    height: 30vh;
    background: #bb1d2e url(http://ww2.sinaimg.cn/large/005BjCpAjw1f69uiojtrij31hc050x6p.jpg) no-repeat 50% 30px;
  }
  .index .header .top{
    text-align: center;
    padding: 5px 0;
    border-bottom: 1px solid #DDD;
    color: white;
    background: #CD2C42;
  }
  .index .navBar{
    padding: 0 14%;
    color: white;
    background: linear-gradient(to right , rgb(60,45,119), rgb(220,71,97) ); /* 标准的语法 */
  }
  li{
    display: inline-block;
    list-style-type:none;
    padding: 17px;
  }
  li:hover{
    background: rgb(51,51,51);
  }

</style>
