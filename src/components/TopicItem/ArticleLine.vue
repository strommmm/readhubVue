<template>
  <div class="topicNews" :class="{ 'last': isLast }">
    <wrap-link lClass="newsTitle" v-if="!!url" :href="url" target="_blank">
    {{title}}
    </wrap-link>
    <label v-else class="newsTitle">{{title}}</label>

    <article-source :source="source" ></article-source>
  </div>
</template>

<script>
import WrapLink from '../Link/Link.vue'
import ArticleSource from './ArticleSource'
import logic from './logic'
import { typeset, newsTitleFormat } from '../../utils/format'
const ARTICLE_KEY_MAP = logic.ARTICLE_KEY_MAP

function getValue (article, articleType, key, defaultValue = '') {
  const keyMap = ARTICLE_KEY_MAP[articleType] || {}
  const m = keyMap[key]
  let v = ''
  if (m) {
    if (typeof m === 'string') {
      v = article[m]
    } else if (typeof m === 'function') {
      v = m(article, false)
    } else {
      throw new Error('Key Map Value type need string or function')
    }
  }
  if (!v) {
    v = defaultValue
  }
  return v
}

export default {
  name: 'topicItem',
  props: ['article', 'articleType', 'isLast'],
  computed: {
    url () {
      return getValue(this.article, this.articleType, 'url')
    },
    title () {
      return newsTitleFormat(typeset(getValue(this.article, this.articleType, 'title')))
    },
    source () {
      return getValue(this.article, this.articleType, 'source')
    }
  },
  components: {
    WrapLink,
    ArticleSource
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../vars.less";
.topicNews{
  margin-bottom: 10px;
  padding-left: 16px;
  position: relative;
  &.mobileFixTopicArticle{
    padding-left: 0px;
    &:before{
      display: none;
    }
  }
  &:before{
    content: ' ';
    position: absolute;
    left: 0px;
    top: 50%;
    height: 10px;
    margin-top: -1px;
    width: 3px;
    height: 3px;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
  &.last{
      margin-bottom: @marginMiddle;
  }
  .newsTitle{
      color: #545454;
      font-size: @fontSizeInfo;
      line-height: 1.2em;
  }
  .newsTitleMobileFix {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .newsAuthorMobileFix {
    margin-left: 0;
    margin-top: 7px;
    font-size: @fontSizeSmall;
  }
  .hoverStyle {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
