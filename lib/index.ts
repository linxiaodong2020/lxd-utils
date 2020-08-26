export * as RegExpRule from "./regexp";
export * from "./functions";
export * from "./device";
export * from "./date";
export * from "./price";
// 引入出index.js之外的全部文件
// const context = require.context('./', false, /\.ts$/);

// const keys = context.keys().filter((item: string) => item !== './index.ts');

// const utils: any = {};

// keys.forEach((item: string) => {
//   const match = item.match(/([^/]+)\.js$/);
//   if (match) {
//     const attr: string = match[1];
//     utils[attr] = context(item);
//   }
// });
// export default utils;
