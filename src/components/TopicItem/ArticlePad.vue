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
