
import request from '@/utils/request'
import { TOPIC_DEFAULT_PAGESIZE } from '@/constants'
import CONFIG from './config'

export function fetch (lastCursor, pageSize = TOPIC_DEFAULT_PAGESIZE, orderBy = '-order') {
  const url = `${CONFIG.HOST}${CONFIG.TOPIC_API}?lastCursor=${lastCursor || '@null'}&pageSize=${pageSize}&orderBy=${orderBy}`
  return request(url)
}

export function fetchNewCount (latestCursor, order = 'order') {
  const url = `${CONFIG.HOST}${CONFIG.TOPIC_NEW_COUNT_API}?latestCursor=${latestCursor || '@null'}&order=${order}`
  return request(url)
}
