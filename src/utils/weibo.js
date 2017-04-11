
/**
 * 62进制字典
 */
let str62keys = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
  'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z'
]
/**
 * 10进制值转换为62进制
 * @param {String} int10 10进制值
 * @return {String} 62进制值
 */
function int10to62 (int10) {
  let s62 = ''
  let r = 0
  while (int10 !== 0) {
    r = int10 % 62
    s62 = str62keys[r] + s62
    int10 = Math.floor(int10 / 62)
  }
  return s62
};
/**
 * mid转换为URL字符
 * @param {String} mid 微博mid，如 "201110410216293360"
 * @return {String} 微博URL字符，如 "wr4mOFqpbO"
 */
function mid2url (mid) {
  if (typeof (mid) !== 'string') return false // mid数值较大，必须为字符串！
  let url = ''
  for (let i = mid.length - 7; i > -7; i = i - 7) {
    // 从最后往前以7字节为一组读取mid
    let offset1 = i < 0 ? 0 : i
    let offset2 = i + 7
    let num = mid.substring(offset1, offset2)
    num = int10to62(num)
    url = num + url
  }
  return url
};

export function getWeiboLink (weiboUserId, weiboId) {
  let wUrl = mid2url(weiboId)
  return `http://weibo.com/${weiboUserId}/${wUrl}`
}
