<template>
  <div class='container'>
    <div class='center'>
      <el-row >
        <el-col :span='24'>
          <router-link to='/'>
            <img class='logo' :src='logoUrl' />
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
const logoUrl = require('../../assets/imgs/logo/logoalpha.png')
export default {
  name: 'header',
  data () {
    return {
      logoUrl
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.logo{
  width: 103px;
  float:left;
}

.center{
  padding: 13px 0px;
}

@media screen and (min-width: 769px) {
    .logo { width: 140px }
}
</style>
