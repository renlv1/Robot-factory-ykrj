import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {messages} from './data'

Vue.use(VueI18n)

let lan = 'CN' // 默认为中文
let language = navigator.browserLanguage ? navigator.browserLanguage : navigator.language
// 获取浏览器配置语言 #括号内是个运算，运算过后赋值给lang，当?前的内容为true时把?后的值赋给lang，为False时把:后的值赋给lang
let langSub = language.substr(0, 2) // 获取lang字符串的前两位\

export const i18n = new VueI18n({
  messages // set locale messages
})

if (window.localStorage.getItem('discoveryLang') === null) {
  if (langSub === 'zh') {
    localStorage.setItem('discoveryLang', 'CN')
    lan = 'CN'
  } else {
    localStorage.setItem('discoveryLang', 'EN')
    lan = 'EN'
  }
  i18n.locale = lan
} else { // 根据用户上次的选择的语言来显示语言
  i18n.locale = window.localStorage.getItem('discoveryLang')
}
