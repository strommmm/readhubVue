import _ from 'lodash'

const R_CHINESE_ENGLISE = /([\u4E00-\u9FA5])([a-zA-Z])/ig
const R_ENGLISH_CHINESE = /([a-zA-Z])([\u4E00-\u9FA5])/ig
const R_DIGEST_WORD = /(\d)([\u4E00-\u9FA5])/ig
const R_WORD_DIGEST = /([\u4E00-\u9FA5])(\d)/ig

export function typeset (content) {
  if (content) {
    content = '' + content
    content = content.replace(R_CHINESE_ENGLISE, (_, a, b) => { return a + ' ' + b })
    content = content.replace(R_ENGLISH_CHINESE, (_, a, b) => { return a + ' ' + b })
    content = content.replace(R_DIGEST_WORD, (_, a, b) => { return a + ' ' + b })
    content = content.replace(R_WORD_DIGEST, (_, a, b) => { return a + ' ' + b })
    content = content.replace(/"([^"]+)"/g, (_, a) => { return '「' + a + '」' })
    content = content.replace(/“([^“”]+)”/g, (_, a) => { return '「' + a + '」' })
  } else {
    content = ''
  }
  return content
};

export function newsTitleFormat (title) {
  if (title) {
    title = title.replace(/\s*【[^【】]+】\s*/g, '')
  } else {
    title = ''
  }
  return title
}

export function beautySummary (summary) {
  if (summary) {
    const lastLetter = summary[summary.length - 1]
    if (summary.slice(-6) === '......') {
      return summary
    }
    if (summary.slice(-3) === '...') {
      return summary
    }
    if ('.!?。！？'.indexOf(lastLetter) === -1) {
      summary += '...'
    }
    return summary
  } else {
    return ''
  }
}

export function splitTitle (title) {
  if (!/[\u0000-\u00FF]/.test(title.slice(-1))) {
    return [title.slice(0, -1), title.slice(-1)]
  } else {
    const lastSpaceIndex = title.lastIndexOf(' ')
    if (lastSpaceIndex > -1) {
      return [title.slice(0, lastSpaceIndex + 1), title.slice(lastSpaceIndex + 1)]
    } else {
      return [title, '']
    }
  }
}

export function slice (val, size, append) {
  var count = 0
  var len
  function get (val, size) {
    var count = 0
    size = size * 2
    for (var i = 0, len = val.length; i < len; i++) {
      if (/[\u0000-\u00FF]/.test(val[i])) {
        count++
      } else {
        count += 2
      }
      if (count >= size) {
        break
      }
    }
    return val.slice(0, i)
  }
  val = val || ''
  val.replace(/[\u0000-\u00FF]/g, function () {
    count++
  })
  len = Math.floor(val.length - count + count / 2)
  if (size <= 0) {
    return _.escape(val)
  }
  if (len > size) {
    append = append || ''
    return _.escape(get(val, size) + append)
  } else {
    return _.escape(val)
  }
};

function basePropertyOf (object) {
  return function (key) {
    return object == null ? undefined : object[key]
  }
}

const reUnescapedHtml = /[&<>"']/g
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source)
const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}
const escapeHtmlChar = basePropertyOf(htmlEscapes)

export function escape (string) {
  return (string && reHasUnescapedHtml.test(string))
    ? string.replace(reUnescapedHtml, escapeHtmlChar)
    : string
}
