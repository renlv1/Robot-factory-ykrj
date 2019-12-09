<template>
  <div class="login-box">
    <div class="login">
      <div class="title">{{$t('getBackPwd.text11')}}</div>
<!--      <div class="input-box send-box">-->
<!--        <input type="text" placeholder="请输入验证码" @keyup.enter="submit" class="input input-code" v-model.trim="code" @input="checkInput()">-->
<!--        <div class="send-btn" :class="{'disable-btn': isDisabled}" @click="sendCode()">{{sendBtnValue}}</div>-->
<!--      </div>-->
      <div class="input-box">
        <input type="password" :placeholder="$t('getBackPwd.text12')" @keyup.enter="submit" v-model.trim="password" class="input" @input="checkInput">
      </div>
      <div class="input-box">
        <input type="password" :placeholder="$t('getBackPwd.text13')" @keyup.enter="submit" class="input" v-model.trim="confirmPassword" @input="checkInput">
      </div>
      <div class="btn-box" @click.prevent="submit">
        <div class="btn-login" :class="{'toLogin': isOkBtn, 'loading-btn': loadingShow}"><img src="../../assets/img/common/loading.gif" alt="" class="loading-m" v-show="loadingShow">{{$t('getBackPwd.text14')}}</div>
        <p class="error" v-show="errText">{{errText}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Dialog from '../../components/dialog/index'
  export default {
    data() {
      return {
        sendBtnValue: this.$t('getBackPwd.text5'),
        sendBtnTimes: 60,
        isDisabled: false,
        phoneNumber: '',
        password: '',
        code: this.$route.query.code,
        confirmPassword: '', // 确认密码
        inviteCode: '', // 邀请码
        isOkBtn: false,
        loadingShow: false,
        userPool: {},
        userData: {},
        errText: ''
      }
    },
    methods: {
      submit(){
        if(this.verify()) {
          var userPool = new this.$AmazonCognitoIdentity.CognitoUserPool(this.$poolData);
          var userData = {
            Username: this.$route.query.userName,
            Pool: userPool
          };
          let _this = this
          var cognitoUser = new this.$AmazonCognitoIdentity.CognitoUser(userData);
          // cognitoUser.confirmPassword(_this.code, _this.password, this);
          cognitoUser.confirmPassword(_this.code, _this.password, {
            onSuccess: function (){
              Dialog({
                content: this.$t('getBackPwd.text15'),
                okText: this.$t('getBackPwd.text16'),
                okFn: () => {
                  cognitoUser.signOut()
                  _this.$router.push('/login')
                }
              })
            },
            onFailure: function (err) {
              // _this.errText = '网络繁忙，请稍后再尝试。'
              if (localStorage.getItem('discoveryLang') === 'CN') {
                if(err.message === 'Attempt limit exceeded, please try after some time.') {
                  _this.errText = this.$t('getBackPwd.text10')
                } else if(err.message === 'Invalid code provided, please request a code again.') {
                  _this.errText = this.$t('getBackPwd.text17')
                } else {
                  _this.errText = err.message
                }
              } else{
                _this.errText = err.message
              }
            }
          })

          // if(JSON.stringify(result) === '{}') {
          //   Dialog({
          //     content: '设置成功',
          //     okText: '确定',
          //     okFn: () => {
          //       cognitoUser.signOut()
          //       _this.$router.push('/login')
          //     }
          //   })
          // } else {
          //   if (localStorage.getItem('discoveryLang') === 'CN') {
          //     if(result === 'Attempt limit exceeded, please try after some time.') {
          //       _this.errText = '网络繁忙，请稍后再尝试。'
          //     } else {
          //       _this.errText = '验证码不正确'
          //     }
          //   } else{
          //     _this.errText = result
          //   }
          // }
              // onFailure: function (err) {
              //   if(err) {
              //     if (localStorage.getItem('discoveryLang') === 'CN') {
              //       if(err.message === 'Attempt limit exceeded, please try after some time.') {
              //         _this.errText = '网络繁忙，请稍后再尝试。'
              //       } else {
              //         _this.errText = '验证码不正确'
              //       }
              //     } else{
              //       _this.errText = err.message
              //       return;
              //     }
              //   }
              // }
        }
      },
      // inputVerificationCode(email, code, password) {
      //   return Observable.create(observer => {
      //     cognitoUser.confirmPassword(code, password, {
      //       onSuccess: function (){
      //         console.log('Successfully reset password');
      //         observer.next();
      //         observer.complete();
      //       },
      //
      //       onFailure: function (err) {
      //         console.log(err);
      //       }
      //     })
      //   })
      // }
      verify() {
        this.errText = ''
        if(this.code === '') {
          this.errText = this.$t('getBackPwd.text3')
          return false
        }
        if (this.password === '') {
          this.errText = this.$t('getBackPwd.text12')
          return false
        }
        let passwordReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        if(!passwordReg.test(this.password)) {
          this.errText = this.$t('getBackPwd.text18')
          return false
        }
        if (this.confirmPassword === '') {
          this.errText = this.$t('getBackPwd.text13')
          return false
        }
        if (this.password !== this.confirmPassword) {
          this.errText = this.$t('getBackPwd.text19')
          return false
        }
        return  true
      },
      // 短信倒计时
      countDown () {
        if (this.sendBtnTimes === 0) {
          this.sendBtnValue = this.$t('getBackPwd.text5')
          this.sendBtnTimes = 60
          this.isDisabled = false
        } else {
          this.sendBtnTimes--
          this.sendBtnValue = this.sendBtnTimes
          this.isDisabled = true
          setTimeout(() => this.countDown(), 1000)
        }
      },
      checkInput() {
        this.errText = ''
        if (this.password !== '' && this.confirmPassword !== '') {
          this.isOkBtn = true
        } else {
          this.isOkBtn = false
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .login-box{
    height calc(100vh - 80px)
    background-size: 100%;
    padding-top: 90px
    background url("../../assets/img/common/Backgroud.png") no-repeat center / cover
  }
  .login{
    width 500px
    border-radius 8px
    margin 50px auto 0
    background #fff
    padding-bottom 50px
    .title{
      line-height 100px
      text-align center
      font-size 26px
      color #000
      height 100px
      border-bottom 1px solid #e7e7e7
      margin-bottom 50px
    }
    .pwd{
      margin-top 50px
    }
    .send-box{
      height 50px
      display flex
      align-items center
      .input-code{
        flex 2
      }
      .send-btn{
        line-height 50px
        text-align center
        font-size 16px
        border-radius 4px
        height 100%
        background #3376ff
        color #fff
        margin-left 20px
        flex 1
        cursor pointer
        &.disable-btn{
          pointer-events none
          cursor none
        }
      }
    }
    .input-box{
      padding 0 30px
      margin-bottom 20px
      .input{
        height 50px
        width 100%
        background #f2f3f7
        border-radius 4px
        padding-left 30px
        font-size 16px
        color #000
        &::-webkit-input-placeholder{
          color:#b3b3b3
        }
        &::-moz-placeholder{   /* Mozilla Firefox 19+ */
          color:#b3b3b3
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
          color:#b3b3b3
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
          color:#b3b3b3
        }
      }
    }
    .btn-box{
      cursor pointer
      margin-top 50px
      height 50px
      position relative
      padding 0 30px
      .btn-login{
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
        &.toLogin{
          background #3376ff
          color #fff
        }
        &.loading-btn{
          pointer-events none
        }
        .loading-m{
          width: 30px
          margin-right: 10px
          display: block
        }
      }
      .error{
        top -25px
        font-size 12px
        color #ff2121
        position absolute
      }
    }
    .forget-box{
      margin-top 20px
      padding 0 30px
      text-align right
      .secret-a{
        font-size 16px
        color #000
      }
    }
    .third-login{
      text-align center
      font-size 16px
      color #b3b3b3
      margin-top 60px
    }
    .third-box{
      display flex
      justify-content center
      margin-top 20px
      .cursor{
        width 48px
        height 48px
        cursor pointer
        margin-right 20px
        &:last-child{
          margin-right 0
        }
        img{
          width 100%
        }
      }
    }
  }
</style>
