<template>
  <div class="login-box">
    <div class="login">
      <div class="title">{{$t('getBackPwd.text1')}}</div>
<!--        <div class="input-box">-->
<!--          <input type="text" placeholder="请输入手机号" @keyup.enter="next" v-model.trim="phoneNumber" maxlength="11" class="input" @input="checkInput()">-->
<!--        </div>-->
      <div class="input-box">
        <input type="text" :placeholder="$t('getBackPwd.text2')" @keyup.enter="nextBtn" v-model.trim="email" class="input" @input="checkInput()">
      </div>
      <div class="input-box send-box">
        <input type="text" :placeholder="$t('getBackPwd.text3')" @keyup.enter="nextBtn" class="input input-code" v-model.trim="code" @input="checkInput()">
        <div class="send-btn" :class="{'disable-btn': isDisabled}" @click="sendCode()">{{sendBtnValue}}</div>
      </div>
      <div class="btn-box" @click.prevent="nextBtn">
        <div class="btn-login" :class="{'toLogin': isOkBtn, 'loading-btn': loadingShow}"><img src="../../assets/img/common/loading.gif" alt="" class="loading-m" v-show="loadingShow">{{$t('getBackPwd.text4')}}</div>
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
        email: '', //邮箱
        phoneNumber: '', // 手机号
        code: '', // 验证码
        sendBtnValue: this.$t('getBackPwd.text5'),
        sendBtnTimes: 60,
        isOkBtn: false,
        isDisabled: false,
        loadingShow: false,
        userPool: {},
        userData: {},
        errText: '',
        language: ''
      }
    },
    created() {
      // this.userPool = new this.$AmazonCognitoIdentity.CognitoUserPool(this.$poolData);
      // this.userData = {
      //   Username: this.email,
      //   Pool: this.userPool
      // };
    },
    methods: {
      // 下一步
      nextBtn(){
        if(this.verify()) {
          this.$router.push({path: '/setPassword',query: {code: this.code,userName: this.email}})
          // this.loadingShow = true
        }
      },
      verify() {
        this.errText = ''
        // if (this.phoneNumber === '') {
        //   this.errText = '请输入手机号码'
        //   return
        // }
        if (this.email === '') {
          this.errText = this.$t('getBackPwd.text2')
          return
        }
        let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (!reg.test(this.email)) {
          this.errText = this.$t('getBackPwd.text6')
          return
        }
        if (this.code === '') {
          this.errText = this.$t('getBackPwd.text3')
          return
        }
        return  true
      },
      checkInput() {
        // if (this.phoneNumber !== '' && this.code !== '') {
        //   this.isOkBtn = true
        // } else {
        //   this.isOkBtn = false
        // }
        this.errText = ''
        if (this.email !== '' && this.code !== '') {
          this.isOkBtn = true
        } else {
          this.isOkBtn = false
        }
      },
      sendCode() {
        if (this.email === '') {
          this.errText = this.$t('getBackPwd.text2')
          return
        }
        let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (!reg.test(this.email)) {
          this.errText = this.$t('getBackPwd.text6')
          return
        }
        var userPool = new this.$AmazonCognitoIdentity.CognitoUserPool(this.$poolData);
        var userData = {
          Username: this.email,
          Pool: userPool
        };
        let _this = this
        var cognitoUser = new this.$AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.forgotPassword({
          onSuccess: function (result) {
            // console.log(result);
            if(result.CodeDeliveryDetails) {
              Dialog({
                content: this.$t('getBackPwd.text7'),
                okText: this.$t('getBackPwd.text8'),
              })
            }
          },
          onFailure: function(err) {
            if(err) {
              if (localStorage.getItem('discoveryLang') === 'CN') {
                if(err.message === 'Username/client id combination not found.') {
                  _this.errText = this.$t('getBackPwd.text9')
                } else if (err.message === 'Cannot reset password for the user as there is no registered/verified email or phone_number') {
                  _this.errText =this.$t('getBackPwd.text9')
                } else if (err.message === 'Attempt limit exceeded, please try after some time.') {
                  _this.errText = this.$t('getBackPwd.text10')
                } else {
                  _this.errText = err.message
                }
              } else{
                _this.errText = err.message
              }
            }
          },
        })
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
    padding-bottom 50px
    width 500px
    border-radius 8px
    margin 50px auto 0
    background #fff
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
