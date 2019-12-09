<template>
  <div class="login-box">
    <div class="login">
      <div class="title">{{$t('login.text12')}}</div>
      <div class="input-box">
        <input type="text" :placeholder="$t('login.text2')" @keyup.enter="login" v-model.trim="phoneNumber" class="input" @input="checkInput()" @blur="blurIpt(1)" @focus="focusIpt(1)">
      </div>
      <div class="input-box">
        <input type="password" :placeholder="$t('login.text3')" @keyup.enter="login" class="input" v-model.trim="password"
               @input="checkInput()" @blur="blurIpt(2)" @focus="focusIpt(2)">
      </div>
      <p class="err-tip">{{$t('login.text13')}}</p>
      <div class="input-box pwd">
        <input type="password" :placeholder="$t('login.text14')" @keyup.enter="login" class="input" v-model.trim="confirmPassword"
               @input="checkInput()" @blur="blurIpt(3)" @focus="focusIpt(3)">
      </div>
      <div class="input-box">
        <input type="text" :placeholder="$t('login.text15')" @keyup.enter="login" class="input" v-model.trim="inviteCode"
               @input="checkInput()" @blur="blurIpt(4)" @focus="focusIpt(4)">
      </div>
      <div class="btn-box" @click.prevent="login">
        <div class="btn-login" :class="{'toLogin': isOkBtn, 'loading-btn': loadingShow}"><img
          src="../../assets/img/common/loading.gif" alt="" class="loading-m" v-show="loadingShow">{{$t('login.text6')}}
        </div>
        <p class="error" v-show="errText">{{errText}}</p>
      </div>
      <div class="third-login">{{$t('login.text7')}}</div>
      <div class="third-box">
        <div class="wechat cursor"><img src="../../assets/img/common/wechat.png"></div>
        <div class="qq cursor"><img src="../../assets/img/common/qq.png"></div>
        <div class="facebook cursor"><img src="../../assets/img/common/facebook.png"></div>
        <div class="twitter cursor"><img src="../../assets/img/common/twitter.png"></div>
        <div class="google cursor"><img src="../../assets/img/common/google.png"></div>
      </div>
    </div>
<!--    邮箱验证-->
    <transition name="safeDialog">
      <div class="dialog-w dialog-safe-w" v-show="visibleDialog">
        <div class="dialog-safe">
          <div class="close" @click="visibleDialog = false">
            <div class="close-icon"></div>
          </div>
          <div class="dialog-title">{{$t('login.text16')}}</div>
          <div class="dialog-content">
            <label class="label">{{$t('login.text17')}}</label>
            <div class="input-m">
              <input type="text" :placeholder="$t('login.text24')" v-model.trim="veriCode" class="input">
              <div class="refresh" v-show="refreshShow" @click="refreshSend">{{$t('login.text18')}}</div>
            </div>
          </div>
          <p class="error-msg">{{errorMsg}}</p>
          <div class="g-dialog-btn-wrap">
            <div class="comfirm g-dialog-btn" @click="sendCode">{{$t('login.text19')}}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  // import { Auth } from 'aws-amplify';
  export default {
    data() {
      return {
        refreshShow: false,
        errorMsg: '',
        veriCode: '',
        visibleDialog: false,
        phoneNumber: '',
        password: '',
        confirmPassword: '', // 确认密码
        inviteCode: '', // 邀请码
        isOkBtn: false,
        loadingShow: false,
        errText: '',
        userPool: {},
        userData: {}
      }
    },
    created() {
      this.userPool = new this.$AmazonCognitoIdentity.CognitoUserPool(this.$poolData);

      this.userData = {
        Username: this.phoneNumber,
        Pool: this.userPool
      }
    },
    methods: {
      refreshSend () {
        let _this = this
        var userData = {
          Username: _this.phoneNumber,
          Pool: _this.userPool
        };
        var cognitoUser = new _this.$AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.resendConfirmationCode(function (err, result) {
          _this.errorMsg = this.$t('login.text20')
        })
      },
      focusIpt () {
        this.errText = ''
      },
      blurIpt (index) {
        if (index === 1) {
          if (this.phoneNumber === '') {
            this.errText = this.$t('login.text2')
          }
          let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
          if (!reg.test(this.phoneNumber)) {
            this.errText = this.$t('login.text8')
          }
        }
        if (index === 2) {
          if (this.password === '') {
            this.errText = this.$t('login.text3')
          }
          let passwordReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          if (!passwordReg.test(this.password)) {
            this.errText = this.$t('login.text8')
          }
        }
        if (index === 3) {
          if (this.confirmPassword === '') {
            this.errText = this.$t('login.text21')
          }
          let passwordReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          if (!passwordReg.test(this.confirmPassword)) {
            this.errText = this.$t('login.text8')
          }
        }
        if (index === 4) {
          if (this.inviteCode === '') {
            this.errText = this.$t('login.text28')
          }
        }
      },
      // 注册
      login() {
        if (this.verify()) {
          let _this = this
          _this.loadingShow = true
          _this.$fetch.post('/account', {
            code: _this.inviteCode,
            operation: "IsInvitationCodeValid",
            username: _this.phoneNumber
          }).then(res => {
            if (res === true) {
              var userPool = new _this.$AmazonCognitoIdentity.CognitoUserPool(_this.$poolData);
              var attributeList = [];
              var dataEmail = {
                Name: 'email',
                Value: _this.phoneNumber
              };
              var attributeEmail = new _this.$AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
              attributeList.push(attributeEmail);
              // 发送验证码
              _this.userPool.signUp(dataEmail.Value, _this.password, attributeList, null, function (err, result) {
                _this.loadingShow = false
                if (err) {
                  if (err.message === 'An account with the given email already exists.') {
                    _this.visibleDialog = true
                    _this.refreshShow = true
                    _this.refreshSend()
                  } else {
                    _this.errText = err.message
                  }
                  return
                }
                // var cognitoUser = result.user;
                // console.log('user name is ' + cognitoUser.getUsername());
                _this.visibleDialog = true
              });
            } else {
              _this.loadingShow = false
              _this.errText = this.$t('login.text22')
            }
          }).catch(err => {
            _this.errText = this.$t('login.text23')
            _this.loadingShow = false
          })
        }
      },
      // 填入验证码，返回登录
      sendCode() {
        let _this = this
        this.errorMsg = ''
        if (_this.veriCode === '') {
          _this.errorMsg = this.$t('login.text24')
        } else {
          var userData = {
            Username: _this.phoneNumber,
            Pool: _this.userPool
          };
          var cognitoUser = new _this.$AmazonCognitoIdentity.CognitoUser(userData);
          cognitoUser.confirmRegistration(_this.veriCode, true, function (err, result) {
            if (err) {
              _this.errorMsg = err.message
              _this.refreshShow = true
              return;
            }
            _this.$router.push('/login')
          });
        }
      },
      // 验证
      verify() {
        this.errText = ''
        if (this.phoneNumber === '') {
          this.errText = this.$t('login.text2')
          return
        }
        let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        if (!reg.test(this.phoneNumber)) {
          this.errText = this.$t('login.text8')
          return
        }
        if (this.password === '') {
          this.errText = this.$t('login.text3')
          return
        }
        if (this.confirmPassword === '') {
          this.errText = this.$t('login.text25')
          return
        }
        let passwordReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        if (!passwordReg.test(this.password)) {
          this.errText = this.$t('login.text26')
          return
        }
        if (!passwordReg.test(this.confirmPassword)) {
          this.errText = this.$t('login.text26')
          return
        }
        if (this.confirmPassword !== this.password) {
          this.errText = this.$t('login.text27')
          return
        }
        if (this.inviteCode === '') {
          this.errText = this.$t('login.text28')
          return
        }
        return true
      },
      checkInput() {
        if (this.phoneNumber !== '' && this.password !== '' && this.confirmPassword !== '' && this.inviteCode !== '') {
          this.isOkBtn = true
        } else {
          this.isOkBtn = false
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .login-box {
    padding-top: 120px
    height 100vh
    background url("../../assets/img/common/Backgroud.png") no-repeat center / cover
  }

  .login {
    width 500px
    border-radius 8px
    margin 0 auto
    background #fff

    .title {
      line-height 100px
      text-align center
      font-size 26px
      color #000
      height 100px
      border-bottom 1px solid #e7e7e7
      margin-bottom 50px
    }

    .pwd {
      margin-top 20px
    }

    .err-tip {
      padding 0 30px
      font-size 12px
      color #ff2121
    }

    .input-box {
      padding 0 30px
      margin-bottom 20px

      .input {
        height 50px
        width 100%
        background #f2f3f7
        border-radius 4px
        padding-left 30px
        font-size 16px
        color #090d21

        &::-webkit-input-placeholder {
          color: #b3b3b3
        }

        &::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: #b3b3b3
        }

        input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color: #b3b3b3
        }

        input:-ms-input-placeholder { /* Internet Explorer 10-11 */
          color: #b3b3b3
        }
      }
    }

    .btn-box {
      cursor pointer
      margin-top 50px
      height 50px
      position relative
      padding 0 30px

      .btn-login {
        display flex
        justify-content center
        align-items center
        line-height 50px
        text-align center
        height 50px
        width 100%
        background #f2f3f7
        border-radius 4px
        font-size 16px
        color #b3b3b3

        &.toLogin {
          background #3376ff
          color #fff
        }

        &.loading-btn {
          pointer-events none
        }

        .loading-m {
          width: 30px
          margin-right: 10px
          display: block
        }
      }

      .error {
        top -25px
        font-size 12px
        color #ff2121
        position absolute
      }
    }

    .forget-box {
      margin-top 20px
      padding 0 30px
      text-align right

      .secret-a {
        font-size 16px
        color #000
      }
    }

    .third-login {
      text-align center
      font-size 16px
      color #b3b3b3
      margin-top 60px
    }

    .third-box {
      display flex
      justify-content center
      margin-top 20px
      padding-bottom: 60px
      .cursor {
        width 48px
        height 48px
        cursor pointer
        margin-right 20px

        &:last-child {
          margin-right 0
        }

        img {
          width 100%
        }
      }
    }
  }
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
      .dialog-content
        margin-bottom 50px
        font-size: 18px
        color #090d21
        .input-m
          display: flex
          align-items center
          .refresh
            padding: 0 20px
            height: 68px
            display: flex
            align-items center
            justify-content center
            background-color: #3376ff
            color #fff
            border-radius 4px
            margin-left: 20px
        .label
          display: block
          font-size: 18px
          color #090d21
          margin-bottom: 10px
        .input
          border-radius 4px
          padding-left: 20px
          display: block
          flex 1
          height: 68px
          background-color: #F5F5F5
      .error-msg
        font-size: 18px
        color #fe353a
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
      .g-dialog-cancel
        background #ccc
        border-radius 6px
      .comfirm
        border-radius 6px
        background #3376FF
        width: 100%
        display: flex
        align-items center
        justify-content center
        color #fff
</style>
