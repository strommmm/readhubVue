/**
 * Created by alexyan on 2017年3月15日
 */

import MobileDetect from 'mobile-detect'

export function sizeMode (env) {
  if (env && isMobile(env)) {
    return 'xs'
  }
  const bodyWidth = typeof document !== 'undefined' ? document.body.clientWidth : 1400
  let curSizeMode = 'xs'
  if (bodyWidth > 1200) {
    curSizeMode = 'lg'
  } else if (bodyWidth > 992) {
    curSizeMode = 'md'
  } else if (bodyWidth > 768) {
    curSizeMode = 'sm'
  }
  return curSizeMode
};

export function isMobile (type) {
  if (isBrowser()) {
    return sizeMode() === 'xs'
  }
  return type === 'mobile'
};

export function getDevicePixelRatio () {
  try {
    var pixelRatio = 1 // just for safety
    if ('deviceXDPI' in screen) { // IE mobile or IE
      pixelRatio = screen.deviceXDPI / screen.logicalXDPI
    } else if (window.hasOwnProperty('devicePixelRatio')) { // other devices
      pixelRatio = window.devicePixelRatio
    }
    return pixelRatio
  } catch (e) {
    return 1
  }
};

export function isRetina () {
  let ratio = getDevicePixelRatio()
  return ratio > 1
};

export function isWeixn () {
  try {
    const ua = navigator.userAgent.toLowerCase()
    const match = ua.match(/MicroMessenger/i)
    if (match && match[0] === 'micromessenger') {
      return true
    } else {
      return false
    }
  } catch (e) {
    return false
  }
}

export function isBrowser () {
  return typeof window !== 'undefined' && window !== null
}

let browserName = ''
function initBrowserName () {
  let name = 'unknow'
  try {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Opera') > -1) {
      name = 'opera'
    } else if (userAgent.indexOf('Maxthon') > -1) {
      name = 'maxthon'
    } else if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1) {
      name = 'ie'
    } else if (userAgent.indexOf('Firefox') > -1) {
      name = 'firefox'
    } else if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') < 1) {
      name = 'safari'
    } else if (userAgent.indexOf('Chrome') > -1) {
      name = 'chrome'
    }
    return name
  } catch (e) {
    return 'unknow'
  }
}

export function getBrowserName () {
  if (!browserName) {
    browserName = initBrowserName()
  }
  return browserName
}

export function getWindowHeight () {
  let windowHeight = 0
  if (document.compatMode === 'CSS1Compat') {
    windowHeight = document.documentElement.clientHeight
  } else {
    windowHeight = document.body.clientHeight
  }
  return windowHeight
}

export function getWindowWidth () {
  let windowWeight = 0
  if (document.compatMode === 'CSS1Compat') {
    windowWeight = document.documentElement.clientWidth
  } else {
    windowWeight = document.body.clientWidth
  }
  return windowWeight
}

// 文档高度
export function getDocumentTop () {
  let scrollTop = 0
  let bodyScrollTop = 0
  let documentScrollTop = 0
  if (document.body) {
    bodyScrollTop = document.body.scrollTop
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop
  }
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
  return scrollTop
}

// 滚动条滚动高度
export function getScrollHeight () {
  let scrollHeight = 0
  let bodyScrollHeight = 0
  let documentScrollHeight = 0
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight
  }
  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
  return scrollHeight
}

export function addWindowOnScroll (func) {
  if (typeof window !== 'undefined') {
    const oldMethod = window.onscroll
    if (typeof oldMethod === 'function') {
      window.onscroll = function () {
        oldMethod.call(this)
        func()
      }
    } else {
      window.onscroll = func
    }
  }
}

export function checkMobileByUa (ua) {
  const md = new MobileDetect(ua)
  return !!md.mobile()
}

export function getElementTop (element) {
  var actualTop = element.offsetTop
  var current = element.offsetParent
  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent
  }
  return actualTop
}

export function getPageScroll () {
  var xScroll, yScroll
  if (self.pageYOffset) {
    yScroll = self.pageYOffset
    xScroll = self.pageXOffset
  } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
    yScroll = document.documentElement.scrollTop
    xScroll = document.documentElement.scrollLeft
  } else if (document.body) { // all other Explorers
    yScroll = document.body.scrollTop
    xScroll = document.body.scrollLeft
  }
  return [xScroll, yScroll]
};

export function isPcWindows () {
  try {
    const ua = navigator.userAgent
    return !isMobile(ua) && /windows|win32/i.test(ua)
  } catch (e) {
    return false
  }
}
