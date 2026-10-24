// 统一错误工厂：带错误码的 Error，工具层据此把「参数错误」转成可执行提示，
// 而不是把内部堆栈直出给模型。引擎各模块都从这里取 fail，避免各自造一个。

/**
 * @param {string} code 错误码：E_INPUT / E_RANGE / E_LINES / E_COUNT / E_ASOF / E_PARTNER / E_SYSTEM
 * @param {string} message 面向调用方的中文说明（含修复提示）
 * @returns {Error & { code: string }}
 */
export const fail = (code, message) => {
  const e = new Error(message);
  e.code = code;
  return e;
};
