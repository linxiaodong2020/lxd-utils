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
 * @description 睡眠
 *
 * @export
 * @param {number} timer
 * @returns {*}
 */
export function sleep(timer: number): any {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve(true);
    }, timer);
  });
}
