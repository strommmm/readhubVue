<template>
  <label v-if="isSourceArray" class="newsAuthor">
    <template v-for="(value, index) in source">
      <span v-if="value === 'more'"> 等</span>
      <template v-else>
        <wrap-link
        v-if="!!value.url"
        :href="value.url"
        target="_blank"
        >{{value.source}}</wrap-link>
        <span v-else>{{value.source}}</span>
        <span v-if="!((index === source.length - 1) || (source[source.length - 1] === 'more' && index === source.length - 2))"> / </span>
      </template>
    </template>
  </label>
  <label v-else class="newsAuthor">
  </label>
</template>

<script>
import _ from 'lodash'
import WrapLink from '../Link/Link.vue'

export default {
  name: 'articleSource',
  props: ['source'],
  computed: {
    isSourceArray () {
      return _.isArray(this.source)
    }
  },
  components: {
    WrapLink
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../vars.less";
.newsAuthor{
    color: @colorInfo;
    font-size: @fontSizeInfo;
    margin-left: @marginMiddle;
    a{
      color: @colorInfo;
      &:hover{
        text-decoration: underline;
      }
    }
}
</style>
