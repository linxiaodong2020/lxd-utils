/**
 * @description 判断是否手机号
 *
 * @export
 * @param {(string | number)} num
 * @returns {boolean}
 */
export function isPhone(num: string | number): boolean {
  return /^1[0-9]{10}$/.test(num as string);
}
