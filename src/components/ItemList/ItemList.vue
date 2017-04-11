<template>
  <div class="list">
    <slot></slot>
    <list-footer :loading="loading" :isLoadAll="isLoadAll" :onLoadMoreClick="onLoadMoreClick" />
  </div>
</template>

<script>
import listFooter from './ListFooter'
import Events from '../../utils/events'
export default {
  name: 'itemList',
  props: ['loading', 'isLoadAll', 'onLoadMoreClick'],
  mounted () {
    Events.addScrollToBottomListener(
      'itemList',
      () => {
        const { loading, isLoadAll, onLoadMoreClick } = this
        if (!isLoadAll && !loading) {
          setTimeout(onLoadMoreClick, 500)
        }
      },
    )
  },
  beforeDestroy () {
    Events.removeScrollToBottomListener('itemList')
  },
  computed: {
    footerProps () {
      const { loading, isLoadAll, onLoadMoreClick } = this
      return {
        loading,
        isLoadAll,
        onLoadMoreClick
      }
    }
  },
  components: {
    listFooter
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
