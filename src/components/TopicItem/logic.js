import moment from 'moment'
import _ from 'lodash'

// import clamp from '../../utils/clamp'
// import {typeset, beautySummary, escape, splitTitle, newsTitleFormat} from '../../utils/format'
import { getWeiboLink } from '../../utils/weibo'
// import * as browser from '../../utils/browser'

const ARTICLE_TYPES = {
  NEWS: 'news',
  WEIBO: 'weibo',
  WECHAT: 'wechat'
}
const ARTICLE_TYPE_INFOS = [{
  name: ARTICLE_TYPES.NEWS,
  displayName: '新闻',
  dbKey: 'News',
  searchKey: 'news'
}, {
  name: ARTICLE_TYPES.WEIBO,
  displayName: '微博',
  dbKey: 'WeiboTweet',
  searchKey: 'weiboTweet'
}, {
  name: ARTICLE_TYPES.WECHAT,
  displayName: '微信',
  dbKey: 'WechatTweet',
  searchKey: 'wechatTweet'
}]

const getArticleInfo = (articleType, infoName) => {
  for (const info of ARTICLE_TYPE_INFOS) {
    if (info.name === articleType) {
      if (infoName) {
        return info[infoName]
      }
      return info
    }
  }
  return null
}

const ARTICLE_KEY_MAP = {
  [ARTICLE_TYPES.WEIBO]: {
    source: (article) => {
      return {
        source: article['weiboName']
      }
    },
    title: 'text',
    url: (article) => {
      const { url, weiboUserId, weiboId } = article
      if (url) {
        return url
      }
      if (weiboUserId && weiboId) {
        return getWeiboLink(weiboUserId, weiboId)
      }
      return ''
    }
  },
  [ARTICLE_TYPES.WECHAT]: {
    source: (article) => {
      return {
        source: article['wechatName']
      }
    },
    title: 'text'
  },
  [ARTICLE_TYPES.NEWS]: {
    source: (article, isMobile) => {
      if (article.sites) {
        return article.sites
      }
      let url = article.url
      if (isMobile && article.mobileUrl) {
        url = article.mobileUrl
      }
      return {
        source: article.siteName,
        url
      }
    },
    title: 'title',
    url: (article, isMobile) => {
      if (isMobile && article.mobileUrl) {
        return article.mobileUrl
      }
      return article.url
    }
  }
}

/*
合并多个数组，两两之间存在共同元素则合并
*/
function mergeOnce (toMerge, lists) {
  let toMergeCp = [...toMerge]
  const listsCp = [...lists]
  let hasChange = false
  let toMin = 0
  for (let i = 0; i < lists.length; i++) {
    const li = lists[i]
    const merged = _.union(toMergeCp, li)
    if (merged.length === (toMergeCp.length + li.length)) {
      continue
    }
    toMergeCp = merged
    listsCp.splice(i - toMin, 1)
    toMin++
    hasChange = true
  }
  return {
    hasChange,
    toMerge: toMergeCp,
    lists: listsCp
  }
}

function mergeList (toMerge, lists) {
  if (!toMerge || !lists) {
    return {
      toMerge,
      lists
    }
  }
  let toMergeCp = [...toMerge]
  let listsCp = [...lists]
  while (true) {
    const res = mergeOnce(toMergeCp, listsCp)
    if (!res.hasChange) {
      break
    }
    toMergeCp = res.toMerge
    listsCp = res.lists
  }
  return {
    toMerge: toMergeCp,
    lists: listsCp
  }
}

function mergeSimilar (articles, isMobile) {
  function getArticleById (articleId) {
    for (const art of articles) {
      if (art.id.toString() === articleId) {
        return art
      }
    }
    return null
  }
  function getBaseArticleWithIds (ids) {
    let sooner = null
    for (const id of ids) {
      const art = getArticleById(id)
      if (!sooner) {
        sooner = art
        continue
      }
      try {
        const soonerDate = moment(sooner.publishDate)
        const curDate = moment(art.publishDate)
        if (soonerDate > curDate) {
          sooner = art
        }
      } catch (e) {}
    }
    if (sooner) {
      return {...sooner}
    }
    return null
  }

  // function relateLink (source, url) {
  //   if (/^<a href=.+/.test(source)) {
  //     return source
  //   }
  //   return `<a href="${url}" target="${isMobile ? '_self' : '_blank'}">${escape(source)}</a>`
  // }

  if (!articles || articles.length <= 1) {
    return articles
  }
  const simList = []

  for (const article of articles) {
    let l = [article.id.toString()]
    if (article.duplicateArray) {
      const duplicateArray = []
      for (const a of article.duplicateArray) {
        if (!a) {
          continue
        }
        duplicateArray.push(a.toString())
      }
      l = _.union(l, duplicateArray)
    }
    simList.push(l)
  }
  const resList = []
  let toMerge = simList[0]
  let lists = _.slice(simList, 1)
  while (true) {
    const res = mergeList(toMerge, lists)
    resList.push(res.toMerge)
    if (res.lists.length === 1) {
      resList.push(res.lists[0])
      break
    }
    if (res.lists.length < 1) {
      break
    }
    toMerge = res.lists[0]
    lists = _.slice(res.lists, 1)
  }

  const resArticles = []
  for (const ids of resList) {
    const baseArticle = getBaseArticleWithIds(ids)
    if (!baseArticle) {
      continue
    }
    const sites = []
    for (const id of ids) {
      const art = getArticleById(id)
      if (!art) {
        continue
      }
      if (art.siteName) {
        let siteName = art.siteName
        if (siteName === '微信公众号') {
          siteName = art.authorName
        }
        if (sites.length >= 3) {
          sites.push('more')
          break
        }
        for (const site of sites) {
          if (site.siteName === siteName) {
            continue
          }
        }
        let url = art.url
        if (isMobile && art.mobileUrl) {
          url = art.mobileUrl
        }
        sites.push({
          source: siteName,
          url
        })
        // let _name = art.siteName;
        // _name = relateLink(art.siteName, art.url);
        // siteNames.push(_name);
      }
    }
    baseArticle.sites = sites
    // baseArticle.siteName = `${siteNames.join(" / ")}${moreThanThree ? " 等" : ""}`;
    resArticles.push(baseArticle)
  }
  return resArticles
}

export default {
  mergeSimilar,
  getArticleInfo,
  ARTICLE_KEY_MAP,
  ARTICLE_TYPE_INFOS,
  ARTICLE_TYPES
}
