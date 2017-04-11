<template>
  <div v-if="isLoadAll">
    <p class="bottomText" style={{display: "none"}}>-- 我是有底线的 --</p>
  </div>
  <div v-else>
    <div class="listButtonFix">
      <el-button class="listButton" :loading="loading" @onclick="onLoadMoreClick">
        {{info}}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'listFooter',
  props: ['isLoadAll', 'loading', 'onLoadMoreClick'],
  computed: {
    info () {
      let info = '点击加载更多'
      if (this.loading) {
        info = '正在加载中...'
      }
      return info
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../vars.less";

.bottomText{
  margin-top: 10px;
  text-align: center;
  font-size: @fontSizeSmall;
  color: @colorInfo;
}

.listButton {
  width: 100%;
  &:hover{
    color:#607D8B;
    border-color:#607D8B;
  }
}

.listButtonFix {
  margin: 60px 0 10px 0;
  &:hover{
    color:#607D8B;
    border-color:#607D8B;
  }
  button:hover{
    color:#607D8B;
    border-color:#607D8B;
  }
}
</style>
