import Vue from 'vue'
import Router from 'vue-router'
import Topic from './topic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Topic',
      component: Topic
    }
  ]
})
