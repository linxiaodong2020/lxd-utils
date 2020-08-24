/**
 * @description 判断是邮件
 *
 * @export
 * @param {string} input
 * @returns {boolean}
 */
export function isEmail(input: string): boolean {
  return /^[-\w\+]+(?:\.[-\w]+)*@[-a-z0-9]+(?:\.[a-z0-9]+)*(?:\.[a-z]{2,})$/i.test(input);
}
