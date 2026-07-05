// 极简国际化：文案写成 { zh, en }，t() 按当前语言取；纯字符串原样返回。
let lang = 'zh'
try { lang = localStorage.getItem('lang') || 'zh' } catch (e) { /* localStorage 不可用时用默认 */ }

const listeners = new Set()

export function getLang() { return lang }

export function setLang(l) {
  if (l !== 'zh' && l !== 'en') return
  lang = l
  try { localStorage.setItem('lang', l) } catch (e) { /* 忽略 */ }
  for (const fn of listeners) fn(l)
}

// 订阅语言变化，返回取消订阅函数
export function onLang(fn) { listeners.add(fn); return () => listeners.delete(fn) }

// 取当前语言文本：{zh,en} -> string；普通字符串/其它 -> 原样
export function t(v) {
  if (v && typeof v === 'object' && !Array.isArray(v) && ('zh' in v || 'en' in v)) {
    return v[lang] != null ? v[lang] : (v.zh != null ? v.zh : v.en)
  }
  return v
}
