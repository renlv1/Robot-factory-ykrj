<template>
  <div class="footer">
    <div class="footer-content">
      <div class="footer-content-top linWrap">
        <div class="footer-content-bt linWrap">Robot factory © 2019.All rights reserved.</div>
        <ul>
          <li class="language-cn" :class="{active: activeLi === index}" v-for="(item ,index) in langArr" :key="index" @click="changeLang(index)">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .footer
    position relative
    .footer-content
      z-index 10
      width 100%
      height 80px
      background-color #0a0d1a
      color #fff
      font-size 16px
      .footer-content-top
        height 80px
        display flex
        justify-content space-between
        align-items center
        padding 0 260px
        ul
          display flex
          justify-content center
          li
            float left
            padding 10px 20px
            margin-right 40px
            cursor pointer
            user-select none
            &:last-child
              margin-right 0
            &.active
              color #d5242c
        .friendsLink
          display flex
          align-items center
          justify-content center
          span
            font-size 14px
            display inline
      .footer-line
        height 1px
        width 100%
        background-color #303030
      .footer-content-bt
        height 60px
        line-height 60px
        font-size 12px
        text-align center
</style>

<script>
  import { i18n } from '../i18n/config'
  export default{
    data () {
      return {
        activeLi: 1,
        langArr: ['EN', 'CN']
      }
    },
    mounted () {
      if (localStorage.getItem('discoveryLang') !== null) { // 判断是什么语言，高亮
        if (localStorage.getItem('discoveryLang') === 'CN') {
          this.activeLi = 1
        } else if (localStorage.getItem('discoveryLang') === 'EN') {
          this.activeLi = 0
        }
      }
    },
    methods: {
      changeLang(index) {
        this.activeLi = index
        if (index === 1) {
          localStorage.setItem('discoveryLang', 'CN')
          i18n.locale = 'CN'
        } else if (index === 0) {
          localStorage.setItem('discoveryLang', 'EN')
          i18n.locale = 'EN'
        }
        window.location.reload()
      }
    },
    watch: {
      '$route': 'getpathFooter'
    }
  }
</script>

