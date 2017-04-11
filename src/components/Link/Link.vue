<template>
  <a :class="lClass" :style="lStyle" :href="realHref" :target="target" @onclick="onLinkClick">
    <slot></slot>
  </a>
</template>

<script>
// import logic from './logic'

export default {
  name: 'topicItem',
  props: ['href', 'target', 'lClass', 'lStyle'],
  computed: {
    realHref () {
      return this.href
    }
  },
  methods: {
    onLinkClick () {
      console.log('click')
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.visited{
  color : #aaacb4!important;
}
</style>
