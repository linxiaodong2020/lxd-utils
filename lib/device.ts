export const Device = {
  //是否是IOS
  isIos: /iPhone|iPad/i.test(navigator.userAgent),
  //是否是安卓
  isAndroid: /Linux\;.*Android/i.test(navigator.userAgent),
  //是否在微信中
  isWX: window.navigator.userAgent.search(/MicroMessenger/i) !== -1,
  //是否为PC端
  isPC: () => {
    let userAgentInfo = navigator.userAgent;
    let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }
};
