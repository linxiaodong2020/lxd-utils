/**
 * @description 判断是否身份证号码
 *
 * @export
 * @param {*} num
 * @returns {boolean}
 */
export function isIdCard(num: any): boolean {
  //是否是身份证号码
  if (!num) return false;
  num = `${num}`.toUpperCase();
  //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)) {
    //alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
    return false;
  }
  //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
  //下面分别分析出生日期和校验位
  const len = num.length;
  let re;

  if (len == 15) {
    re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
    const arrSplit = num.match(re);

    //检查生日日期是否正确
    const dtmBirth = new Date(`19${arrSplit[2]}/${arrSplit[3]}/${arrSplit[4]}`);
    const bGoodDay =
      // @ts-ignore
      dtmBirth.getYear() == Number(arrSplit[2]) &&
      dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
      dtmBirth.getDate() == Number(arrSplit[4]);
    if (!bGoodDay) {
      //alert('输入的身份证号里出生日期不对！');
      return false;
    }

    //将15位身份证转成18位
    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let nTemp = 0,
      i = 0;
    num = `${num.substr(0, 6)}'19'${num.substr(6, num.length - 6)}`;
    for (i = 0; i < 17; i++) {
      nTemp += num.substr(i, 1) * arrInt[i];
    }
    num += arrCh[nTemp % 11];
    return true;
  }
  if (len == 18) {
    re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
    const arrSplit = num.match(re);

    //检查生日日期是否正确
    const dtmBirth = new Date(`${arrSplit[2]}/${arrSplit[3]}/${arrSplit[4]}`);
    const bGoodDay =
      dtmBirth.getFullYear() == Number(arrSplit[2]) &&
      dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
      dtmBirth.getDate() == Number(arrSplit[4]);
    if (!bGoodDay) {
      //alert(dtmBirth.getYear());
      //alert(arrSplit[2]);
      //alert('输入的身份证号里出生日期不对！');
      return false;
    }

    //检验18位身份证的校验码是否正确。
    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    let valnum = '';
    const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let nTemp = 0,
      i = 0;
    for (i = 0; i < 17; i++) {
      nTemp += num.substr(i, 1) * arrInt[i];
    }
    valnum = arrCh[nTemp % 11];
    if (valnum != num.substr(17, 1)) {
      //alert('18位身份证的校验码不正确！应该为：' + valnum);
      return false;
    }
    return true;
  }
  return false;
}
