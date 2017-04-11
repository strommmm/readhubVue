<template>
  <div class="layout">
    <my-header />
    <div class="little-nav">
      <div class="container">
        <div class="nav" >
          <router-link key="topicpage" to="/">
            <div class="tag">热门话题</div>
          </router-link>
          <router-link key="newspage" to="/news">
            <div class="tag">最新资讯</div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="container">
      <slot></slot>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import myHeader from './Header.vue'
import myFooter from './Footer.vue'
export default {
  name: 'layout',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: { myHeader, myFooter }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.layout {
  background-color: #fff;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: none;
}
.container {
  margin: 0 auto;
}
.little-nav{
  height:30px;
  background: #607D8B;
}
.little-nav .container .nav{
  height:30px!important;
  overflow:hidden;
  margin-left: -15px;
}

.nav .tag {
  float: left;
  font-size: 14px;
}
.nav a{
  height:30px;
  line-height: 30px;
  display:block;
  font-size: 14px;
  float:left;
  color:#fff;
  padding:0 15px;
  &:hover{

  }
  &.active{
    background: #78909C;
  }
}
@media screen and (min-width: 769px) {
  .container { width: 718px }
}
@media screen and (min-width: 991px) {
  .container { width: 860px }
}
@media screen and (min-width: 1201px) {
  .container { width: 960px }
}
</style>
