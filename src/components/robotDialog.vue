<template>
  <transition name="safeDialog">
    <div class="dialog-w dialog-safe-w" v-show="show">
      <div class="dialog-safe" >
        <div class="close" @click="close()">
          <div class="close-icon"></div>
        </div>
        <div class="dialog-title">新建机器人</div>
        <div class="form-item">
          <input type="password" placeholder="请输入机器人名称" class="input" v-model.trim="robotName">
        </div>
        <div class="form-item">
          <div class="record-type" @click="changeRecord()">
            <div class="type-box" >
              <div class="fixed-type" >
                {{languageType}}
                <div class="sel-img"><i class="arrowDown" :class="{'active-Img': activeChange}"></i></div>
              </div>
              <ul class="selectMenu" :class="{'selectMenuActive': activeChange}" @click.stop>
                <li v-for="(item, index) in languageArr" :key="index" @click="chooseType(item,index)">{{item}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="err-ms" v-show="errInputMsg">{{errInputMsg}}</div>
        <div class="g-dialog-btn-wrap">
          <div class="g-dialog-btn g-dialog-cancel" @click="cancelCallback">取消</div>
          <div class="comfirm g-dialog-btn" @click="okCallback">确定</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        show: false,
        languageArr: ['中文', '英文'],
        activeChange: false,
        languageType: '请选择机器人语言',
        robotName: '',
        isOpen: false,
        errInputMsg: '',
        visible: true,
        safeCode: '',
        payCode: '',
        userData: ''
      }
    },
    props: {
      type: String,
      title: String,
      msg: String,
      okFn: Function,
      okText: String,
      cancelFn: Function,
      cancelText: String,
      align: String
    },
    created() {
    },
    methods: {
      cancelCallback() {
        this.safeCode = ''
        this.payCode = ''
        this.$emit('cancelDialog')
      },
      chooseType() {

      },
      close() {
        this.show = false
      },
      okCallback() {
        this.errInputMsg = ''
        if (this.robotName === '') {
          this.errInputMsg =  '请输入机器人名称'
          return
        }
        if (this.payCode === '请选择机器人语言') {
          this.errInputMsg = '请选择机器人语言'
          return
        }
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
      font-size: 28px;
      transform: translate(0, 0)
      padding: 0 40px
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
          background url("../assets/img/common/close.png")
        }
      }
      .dialog-title
        font-size: 20px
        font-weight: bold
        color #17161f
        padding: 50px 0 60px
        text-align: center
      .g-dialog-btn-wrap
        margin-top 1rem
        display: flex
        align-items center
        justify-content center
        border-top: 1px dashed #000
      .form-item
        margin-bottom: .4rem
        .label
          margin-bottom: .2rem
        .input
          border-bottom 1px solid #000
          width: 100%
          height: 1rem
          /*border-radius .4rem*/
          /*background-color: #f5f6fa*/
          /*padding: 0 .3rem*/
          color #000
      .err-ms
        color: #ff717d;
        font-size .24rem
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
        text-align center
        flex 1
      .comfirm
        width: 100%
        height: 1rem
        display: flex
        align-items center
        justify-content center
        color #b79961
</style>
