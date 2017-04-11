import Vue from 'vue'
import Vuex from 'vuex'

import topic from './modules/topic'
// import * as getters from './getters'
// import * as actions from './actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  // getters,
  // actions,
  modules: {
    topic
  },
  strict: debug
})
