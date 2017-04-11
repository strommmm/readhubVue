import {
  TOPIC_DEFAULT_PAGESIZE,
  MUTATION_TYPES,
  ACTION_TYPES
} from '../../../constants'
import { fetch, fetchNewCount } from '../../../api/topic'
const BEFORE_FETCH = 'beforeFetch'
const AFTER_FETCH = 'afterFetch'

export default {
  state: {
    data: [],
    openList: [],
    pageSize: TOPIC_DEFAULT_PAGESIZE || 10,
    totalItems: 0,
    init: false,
    loading: false,
    isLoadAll: false,
    autoLoading: true,
    newTopicCount: 0
  },
  actions: {
    [ACTION_TYPES.TOPIC.FETCH] ({ state, commit, rootState }, { refresh, init, lastTopic }) {
      if (init && state.init) {
        return
      }

      function save (items) {
        const { data, totalItems, pageSize } = items
        let isLoadAll = false
        if (!items.data || items.data.length < pageSize) {
          isLoadAll = true
        }
        commit(
          MUTATION_TYPES.TOPIC.SAVE,
          { data, totalItems, pageSize, isLoadAll, lastTopic })
      }

      if (refresh) {
        commit(MUTATION_TYPES.TOPIC.CLEAR)
        commit(BEFORE_FETCH)
        return fetch(null, state.pageSize)
        .then(items => {
          commit(AFTER_FETCH)
          return save(items)
        })
        .catch(() => {
          commit(AFTER_FETCH)
        })
      } else {
        if (state.isLoadAll) {
          return
        }
        const lastItem = (state && state.data && state.data.length > 0) ? state.data[state.data.length - 1] : null
        const lastOrder = lastItem ? lastItem.order : null
        // analytics.event({
        //   category: 'page',
        //   action: 'pagenumber',
        //   label: `${++page}`
        // })
        commit(BEFORE_FETCH)
        fetch(lastOrder, state.pageSize)
        .then(items => {
          if (!lastTopic) {
            lastTopic = state.lastTopic
          }
          commit(AFTER_FETCH)
          return save(items)
        })
        .catch(() => {
          commit(AFTER_FETCH)
        })
      }
    },
    [ACTION_TYPES.TOPIC.FETCH_NEW_COUNT] ({ state, commit, rootState }) {
      const topics = state.data
      if (topics.length <= 0) {
        return
      }
      let latestOrder = null
      let topCount = 0
      for (const i in topics) {
        if (!topics[i] || !topics[i].order) {
          continue
        }
        if (topics[i].order > 1000000) {
          topCount++
          continue
        }
        latestOrder = topics[i].order
        break
      }
      return fetchNewCount(latestOrder)
      .then(res => {
        let count = 0
        if (!isNaN(res.count)) {
          count = Number(res.count) - topCount
          if (count < 0) {
            count = 0
          }
        }
        commit(MUTATION_TYPES.TOPIC.SET_NEW_COUNT, { count })
      })
    }
  },
  mutations: {
    [MUTATION_TYPES.TOPIC.SAVE] (state, { data, totalItems, pageSize, isLoadAll, lastTopic }) {
      // function standardTopic (topic) {
      //   const toStandard = ['title', 'summary']
      //   const toStandardArray = {
      //     'newsArray': ['title'],
      //     'wechatArray': ['text'],
      //     'weiboArray': ['text']
      //   }
      //   for (const k of toStandard) {
      //     if (!topic[k]) {
      //       continue
      //     }
      //     topic[k] = standardText(topic[k])
      //   }
      //   for (const k in toStandardArray) {
      //     if (!topic[k]) {
      //       continue
      //     }
      //     const standardKeys = toStandardArray[k]
      //     for (const m in topic[k]) {
      //       if (Object.prototype.hasOwnProperty.call(topic[k], m)) {
      //         if (!topic[k][m]) {
      //           continue
      //         }
      //         for (const standardKey of standardKeys) {
      //           if (!topic[k][m][standardKey]) {
      //             continue
      //           }
      //           topic[k][m][standardKey] = standardText(topic[k][m][standardKey])
      //         }
      //       }
      //     }
      //   }
      //   return topic
      // }

      // for (const idx in data) {
      //   if (Object.prototype.hasOwnProperty.call(data, idx)) {
      //     if (!data[idx]) {
      //       continue
      //     }
      //     data[idx] = standardTopic(data[idx])
      //   }
      // }
      state.data = state.data.concat(data)
      state.totalItems = totalItems
      state.pageSize = pageSize
      state.isLoadAll = isLoadAll
      state.init = true
      state.lastTopic = lastTopic
      // state = {...state, data: state.data.concat(data), totalItems, pageSize, isLoadAll, init: true, lastTopic: lastTopic}
    },
    [MUTATION_TYPES.TOPIC.CLEAR] (state) {
      state.data = []
      state.newTopicCount = 0
      state.openList = []
      // state = { ...state, data: [], newTopicCount: 0, openList: [] }
    },
    [MUTATION_TYPES.TOPIC.OPEN_STATE_CHANGE] (state, { collapseKey }) {
      const openList = [...state.openList] || []
      const index = openList.indexOf(collapseKey)
      if (index > -1) {
        openList.splice(index, 1)
      } else {
        openList.push(collapseKey)
      }
      state.openList = openList
      // return { ...state, openList }
    },
    [MUTATION_TYPES.TOPIC.SET_NEW_COUNT] (state, { count }) {
      if (isNaN(count)) {
        count = 0
      } else {
        count = Number(count)
      }
      // if (typeof document !== "undefined") {
      //   if (count === 0) {
      //     document.title = CONFIG.TITLE;
      //   } else {
      //     document.title = `(${count})${CONFIG.TITLE}`;
      //   }
      // }
      return { ...state, newTopicCount: count }
    },
    [BEFORE_FETCH] (state) {
      state.loading = true
    },
    [AFTER_FETCH] (state) {
      state.loading = false
    }
  }
}
