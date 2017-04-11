import {
  getWindowHeight,
  getDocumentTop,
  getScrollHeight,
  addWindowOnScroll
} from './browser'
const scrollBottomCache = {}

function callScrollBottomFunc (offset) {
  for (const name in scrollBottomCache) {
    if (scrollBottomCache.hasOwnProperty(name)) {
      const cur = scrollBottomCache[name]
      if (cur.inInterval) {
        continue
      }
      if (cur.state) {
        if (offset > cur.options.triggerOffset) {
          scrollBottomCache[name].state = false
        }
        continue
      }
      if (offset > cur.options.triggerOffset) {
        continue
      }
      scrollBottomCache[name].state = true
      scrollBottomCache[name].inInterval = true
      setTimeout(() => {
        scrollBottomCache[name].inInterval = false
      }, cur.options.triggerInterval)
      cur.func()
    }
  }
}

if (typeof window !== 'undefined') {
  addWindowOnScroll(() => {
    const docTop = getDocumentTop()
    const winHeight = getWindowHeight()
    const scrTop = getScrollHeight()
    const offset = scrTop - (winHeight + docTop)
    callScrollBottomFunc(offset)
  })
}

function addScrollToBottomListener (name, func, options = {}) {
  // Assert(name, "name can not be null or empty");
  options = {
    triggerOffset: 100,
    triggerInterval: 100,
    ...options
  }
  scrollBottomCache[name] = {
    func,
    options,
    state: false,
    inInterval: false
  }
}

function removeScrollToBottomListener (name) {
  delete scrollBottomCache[name]
}

export default {
  addScrollToBottomListener,
  removeScrollToBottomListener
}
