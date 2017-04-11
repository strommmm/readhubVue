function realCount (content) {
  let count = 0
  for (let i = 0, len = content.length; i < len; i++) {
    if (/[\u0000-\u00FF]/.test(content[i])) {
      count++
    } else {
      count += 2
    }
  }
  return count
}
// function getRealBackgroundColor (ele) {
//   let value = getComputedStyle(ele).getPropertyValue('background-color')
//   if (value === 'rgba(0, 0, 0, 0)') {
//     return this.getRealBackgroundColor(ele.parentElement)
//   } else {
//     return value
//   }
// }
function getRealUnClampCount (text, unclampCount) {
  let rc = 0
  let count = 0
  for (let i = 0, len = text.length; i < len; i++) {
    if (/[\u0000-\u00FF]/.test(text[i])) {
      count += 0.5
    } else {
      count += 1
    }
    if (count > unclampCount) {
      return rc
    }
    rc += 1
  }
  return rc
}
function getText (ele) {
  return ele.innerText || ele.textContent
}
function setText (ele, text) {
  ele.innerHTML = text
}
function clamp (ele, lineCount, append = '...', pos = 2) {
  let {width} = ele.getClientRects()[0]
  let style = getComputedStyle(ele)
  let lineHeight = parseInt(style.getPropertyValue('line-height'))
  let fontSize = parseInt(style.getPropertyValue('font-size'))
  let text = ele.getAttribute('data-clamp-text')
  if (!text) {
    text = getText(ele)
    ele.setAttribute('data-clamp-text', text)
  }
  let count = realCount(text)
  let realLines = count * fontSize / (2 * width)
  let unclampCount = Math.floor(width * lineCount / fontSize)
  let realUnClampCount = getRealUnClampCount(text, unclampCount)
  if (realLines > lineCount) {
    ele.style.height = lineCount * lineHeight + 'px'
    ele.style.overflow = 'hidden'
    setText(ele, text.slice(0, realUnClampCount - pos) + '...')
  } else {
    setText(ele, text)
    ele.style.height = 'auto'
    ele.style.overflow = 'initial'
  }
}
export default clamp
