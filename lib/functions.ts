/**
 * @description 查询字符串，获取url中参数
 *
 * @export
 * @param {string} name
 * @returns {(string | null)}
 */
export function getQueryString(name: string): string | null {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(decodeURI(r[2]));
  }
  return null;
}

/**
 * @description 转换 123为123.00
 *
 * @export
 * @param {*} amount
 * @returns {string}
 */
export function getAmountFloat(amount: any): string {
  if (!amount) {
    return '0.00';
  }
  let leftNum = amount.toString().split('.')[0];
  let floatNum = amount.toString().split('.')[1];

  if (!floatNum) {
    return `${amount}.00`;
  }
  //补0 处理 100.30 会变成 100.3 的问题
  return floatNum.length == 1 ? `${leftNum}'.'${floatNum}'0` : floatNum;
}
