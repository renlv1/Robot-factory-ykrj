<template>
  <transition name="safeDialog">
    <div class="dialog-w dialog-safe-w" v-show="visible">
      <div class="dialog-safe">
        <div class="close" @click="visible = false">
          <div class="close-icon"></div>
        </div>
        <div class="dialog-title">{{title}}</div>
        <div class="dialog-content" v-html="content"></div>
        <div class="g-dialog-btn-wrap">
          <div v-if="type !== 'alert'" class="g-dialog-btn g-dialog-cancel" @click="cancelCallback">{{cancelText}}</div>
          <div class="comfirm g-dialog-btn" @click="okCallback">{{okText}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  props: {
    content: String,
    type: String,
    title: String,
    msg: String,
    okFn: Function,
    okText: String,
    cancelFn: Function,
    cancelText: String,
    align: String
  },
  methods: {
    okCallback () {
      this.visible = false
      this.okFn && this.okFn()
    },
    cancelCallback() {
      this.visible = false
      this.cancelFn && this.cancelFn()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .dialog-safe-w
    display: flex
    align-items center
    justify-content center
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom:0
    width: 100%
    height: 100%
    z-index: 200
    color #000
    background-color: rgba(0,0,0,.4)
    &.safeDialog-enter, &.safeDialog-leave-to
      opacity: 0;
      .dialog-safe
        transform: translate(0, -5%)
    &.safeDialog-enter-active
      transition: .3s;
      .dialog-safe
        transition: .3s
    &.safeDialog-leave-active
      transition: .1s;
      .dialog-safe
        transition: .1s
    .dialog-safe
      width: 600px
      background-color: #fff
      position: relative
      border-radius 4px
      color #17161f
      font-size: 20px;
      transform: translate(0, 0)
      padding: 0 40px 80px
      .close{
        cursor pointer
        width 21px
        height 21px
        position absolute
        right 20px
        top 40px
        .close-icon{
          width 21px
          height 21px
          background url("../../assets/img/common/close.png")
        }
      }
      .dialog-title
        font-size: 20px
        font-weight: bold
        color #090d21
        padding: 50px 0 90px
        text-align: center
      .dialog-content{
        margin-bottom 80px
        text-align center
        font-size: 18px
        color #090d21
        >>> span{
          color #3376ff
        }
      }
      .g-dialog-btn-wrap
        display: flex
        align-items center
        justify-content center
      .form-item
        margin-bottom: 40px
        .label
          margin-bottom: 20px
        .input
          width: 100%
          height: .8rem
          border-radius .4rem
          background-color: #f5f6fa
          padding: 0 .3rem
          color #17161f
      .err-ms
        color: #ff151d;
        text-align: center;
        margin-top: .3rem;
      .shortMsg
        position relative
        .payMsg-box
          .payMsg
            width 100%
            height .8rem
            background-color #f5f6fa
            border-radius .4rem
            font-size .28rem
            padding 0 .3rem
          .sendMsg
            position absolute
            top 0
            right 0
            height: 100%
            padding: 0 .2rem
            background-color transparent
            border none
            outline none
            font-size: .28rem
            color #00a6f1
      .g-dialog-btn
        flex 1
        height: 68px
        display: flex
        align-items center
        justify-content center
        cursor pointer
        color #fff
      .g-dialog-cancel{
        background #ccc
        border-radius 6px
      }
      .comfirm
        margin-left 20px
        border-radius 6px
        background #3376FF
        width: 100%
        display: flex
        align-items center
        justify-content center
        color #fff
</style>
