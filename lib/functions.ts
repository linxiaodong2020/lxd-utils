
function _isPrototype(value: any) {
  const Ctor = value && value.constructor
  const proto = (typeof Ctor === 'function' && Ctor.prototype) || Object.prototype
  return value === proto
}

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
export function isEmpty(value: any): boolean {
  if (value === null) {
    return true;
  }
  // 数组和字符串
  if ((Array.isArray(value) || typeof value === "string")) {
    return !value.length;
  }
  // 数字处理
  if (typeof value === "number") {
    return false;
  }
  // Map和Set对象处理
  const tag = value.toString();
  if (tag == '[object Map]' || tag == '[object Set]') {
    return !value.size
  }
  // 原型对象处理
  if (_isPrototype(value)) {
    return !Object.keys(value).length
  }
  // 普通对象处理
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      return false
    }
  }
  return true;
}
