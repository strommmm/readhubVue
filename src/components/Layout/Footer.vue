<template>
  <div class="container">
    <div class="footer">
      <div class="split-line">
        <span class="line"></span>
        <span class="dot"></span>
        <span class="line"></span>
      </div>
      <div class="copy-right">
        © 2017 NoCode &nbsp; 浙 ICP 备 17005035 号 -1
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footer',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../vars.less";
.footer{
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
}
.footer .link{
  color:#808080;
  font-size:13px;
  font-weight: 100;
  height:20px;
  text-align: center;
}
.footer .link .linkItem{
  padding:0 10px;
  border-right: 1px solid #cbcbcb;
  &:last-child{
    border-right: 0px;
  }
}
.footer .split-line .line{
  display: inline-block;
  width: 82px;
  height: 1px;
  background-color: @colorSplitLine;
}
.footer .split-line .dot{
  display: inline-block;
  margin-left: 3px;
  margin-right: 3px;
  font-size: 16px;
  width: 4px;
  height: 4px;
  background: @colorSplitLine;
  border-radius: 50%;
  margin-bottom: -1px;
}
.footer .copy-right{
  margin-top: 20px;
  margin-bottom: 20px;
  color: @colorInfo;
  font-size:13px;
  font-weight: 100;
}
</style>
