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
/**
 * @description 转换货币问题，1234转换为1,234
 *
 * @export
 * @param {*} amount
 * @returns {string}
 */
export function getAmountThousand(amount: any): string {
  if (!amount) {
    return '0';
  }
  return amount.toString().replace(/\d+/, function (s: any) {
    return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  });
}

/**
 * @description 格式化金钱，加'.00'和千分位
 *
 * @export
 * @param {number} val        - 金额
 * @param {boolean} thousands - 是否转换千分位
 * @returns {string}
 *
 * @example
 * getMoneyStr(200000); // 200000.00
 * getMoneyStr(200000, true); // 200,000.00
 */
export function getMoneyStr(val: number, thousands: boolean): string {
  const str = `${(val / 100 * 100).toFixed(2)}`;

  // 取到整数部分
  const intSum = thousands
    ? str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ',')
    : str.substring(0, str.indexOf('.'));
  const dot = str.substring(str.length, str.indexOf('.')); // 取到小数部分搜索
  const ret = intSum + dot;

  return ret;
}

/**
 * @description 获取大写金额
 *
 * @export
 * @param {string} amount
 * @returns {string}
 *
 * @example
 * getAmountCN('1234.56'); // "壹仟贰佰叁拾肆元伍角陆分"
 */
export function getAmountCN(amount: string): string {
  if (!amount) {
    return '零';
  }
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(amount)) return '';
  let unit = '京亿万仟佰拾兆万仟佰拾亿仟佰拾万仟佰拾元角分', str = '';
  amount += '00';
  let p = amount.indexOf('.');
  if (p >= 0)
    amount = amount.substring(0, p) + amount.substr(p + 1, 2);
  unit = unit.substr(unit.length - amount.length);
  for (let i = 0; i < amount.length; i++) str += '零壹贰叁肆伍陆柒捌玖'.charAt(parseInt(amount.charAt(i))) + unit.charAt(i);
  return str
    .replace(/零(仟|佰|拾|角)/g, '零')
    .replace(/(零)+/g, '零')
    .replace(/零(兆|万|亿|元)/g, '$1')
    .replace(/(兆|亿)万/g, '$1')
    .replace(/(京|兆)亿/g, '$1')
    .replace(/(京)兆/g, '$1')
    .replace(/(京|兆|亿|仟|佰|拾)(万?)(.)仟/g, '$1$2零$3仟')
    .replace(/^元零?|零分/g, '')
    .replace(/(元|角)$/g, '$1整');
}
