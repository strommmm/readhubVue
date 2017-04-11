<template>
  <div>
    <article-line
    v-for="(article, index) in articleArray"
    :key="article.id"
    :article="article"
    :articleType="articleType"
    :isLast="index === articleArray.length - 1"
    >
    </article-line>
  </div>
</template>

<script>
import ArticleLine from './ArticleLine.vue'

export default {
  name: 'articlePad',
  props: ['articleArray', 'articleType'],
  data () {
    return {
      moreCount: 0,
      showMore: false
    }
  },
  computed: {
    showLastRead () {
    }
  },
  components: {
    ArticleLine
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
