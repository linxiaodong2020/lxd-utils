/**
 * @param {Date} dateObj
 * @returns {*}
 */
function _formatConfig(dateObj: Date): any {
  return {
    'M+': dateObj.getMonth() + 1,               // 月份
    'd+': dateObj.getDate(),                    // 日
    'h+': dateObj.getHours(),                   // 时
    'm+': dateObj.getMinutes(),                 // 分
    's+': dateObj.getSeconds(),                 // 秒
    'q+': Math.floor((dateObj.getMonth() + 3) / 3), // 季度
    'S': dateObj.getMilliseconds()              // 毫秒
  };
}

/**
 * @description 计算时间差([d天]hh:mm:ss)
 *
 * @export
 * @param {*} currentDate
 * @param {*} endDate
 * @param {string} [format='d天hh:mm:ss']
 * @returns {string}
 *
 * @example
 * getRemain(new Date('2019/09/30'), new Date('2019/10/31')); // 31天00:00:00
 * getRemain(new Date('2019/10/31 00:00:00'), new Date('2019/10/31 03:12:12')); // 03:12:12
 */
export function getRemain(currentDate: any, endDate: any, format: string = 'd天hh:mm:ss'): string {
  currentDate = currentDate ? new Date(currentDate) : new Date();
  endDate = new Date(endDate);

  const resetSec = endDate.getTime() - currentDate.getTime();

  const value: any = { day: 0, hou: 0, min: 0, sec: 0 };
  const map: any = { d: 'day', h: 'hou', m: 'min', s: 'sec' };

  if (resetSec > 0) {
    value.day = parseInt(`${resetSec / (60 * 60 * 24 * 1000)}`);
    value.hou = parseInt(`${resetSec / (60 * 60 * 1000) % 24}`);
    value.min = parseInt(`${resetSec / (60 * 1000) % 60}`);
    value.sec = parseInt(`${resetSec / 1000 % 60}`);
  }
  if (value.day <= 0 && format === 'd天hh:mm:ss') format = 'hh:mm:ss';

  for (const mapKey in map) {
    const reg = new RegExp(`${mapKey}+`);
    const result = format.match(reg);
    if (result) {
      let num = value[map[mapKey]];
      let length = Math.max(result[0].length, String(num).length);
      num = (Array(length).join('0') + num).slice(-length);
      format = format.replace(reg, num);
    }
  }

  return format;
}

/**
 * @description 获取n天前的Date
 *
 * @export
 * @param {number} days
 * @param {Date} [date]
 * @returns {Date}
 *
 * @example
 * getDateBefore(5, new Date('2019/09/27')); // Sun Sep 22 2019 00:00:00 GMT+0800 (中国标准时间)
 */
export function getDateBefore(days: number, date?: Date): Date {
  return new Date(Date.parse((date || new Date()).toString()) - 1000 * 60 * 60 * 24 * days);
}
/**
 * @description 格式化时间 formatDate(Date,'yyyy-MM-dd')
 *
 * @export
 * @param {Date} dataObj
 * @param {string} fmt
 * @returns {string}
 *
 * @example
 * formatDate(new Date('2019/09/27'),'yyyy-MM-dd'); // 2019-09-27
 * formatDate(new Date('2019/09/27 12:00:00'), 'yyyy-MM-dd hh:mm:ss');  // 2019-09-27 12:00:00
 */
export function formatDate(dataObj: Date, fmt: string): string {
  let o = _formatConfig(dataObj);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${dataObj.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    }
  }
  return fmt;
}
