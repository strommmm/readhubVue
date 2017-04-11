<template>
  <div>
    <layout>
      <item-list
      :loading="loading"
      :isLoadAll="isLoadAll"
      :onLoadMoreClick="onLoadMoreClick"
      >
        <topic-item
        v-for="(topic, index) of topics"
        :key="topic.id"
        :topic="topic"
        :isLastRead="false"
        :isFirst="index === 0"
        :isTop="topic.order && topic.order > 1000000"
        :openList="openList"
        :onTopicClick="onTopicClick"
        />
      </item-list>
    </layout>
  </div>
</template>


<script>
import { mapState } from 'vuex'
import layout from '@/components/Layout/Layout.vue'
import topicItem from '@/components/TopicItem/TopicItem.vue'
import itemList from '@/components/ItemList/ItemList.vue'
import { MUTATION_TYPES, ACTION_TYPES } from '@/constants'

console.log(this)
export default {
  name: 'topic',
  created () {
    this.$store.dispatch(ACTION_TYPES.TOPIC.FETCH, { refresh: true, init: true })
  },
  computed: {
    ...mapState({
      topics: state => state.topic.data,
      openList: state => state.topic.openList || [],
      loading: state => state.topic.loading,
      isLoadAll: state => state.topic.isLoadAll
    })
  },
  methods: {
    onTopicClick (collapseKey) {
      this.$store.commit(MUTATION_TYPES.TOPIC.OPEN_STATE_CHANGE, { collapseKey })
    },
    onLoadMoreClick () {
      this.$store.dispatch(ACTION_TYPES.TOPIC.FETCH, {})
    }
  },
  components: { layout, topicItem, itemList }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
