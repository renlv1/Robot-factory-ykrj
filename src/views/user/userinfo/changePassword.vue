<template>
    <div class="userinfo">
      <div class="right-content">
        <div class="top-cont">
          <div class="top-t">
            <img src="../../../assets/img/common/border.png">
            <div class="account">{{$t('getBackPwd.text20')}}</div>
          </div>
<!--          <div class="input-title title-one">-->
<!--            <div class="input-name">用户名</div>-->
<!--          </div>-->
<!--          <ul class="input-box">-->
<!--            <li class="li-one">-->
<!--              <input type="text" class="input" placeholder="请输入邮箱地址" v-model.trim="email">-->
<!--            </li>-->
<!--          </ul>-->
          <div class="input-title title-one">
            <div class="input-name">{{$t('getBackPwd.text21')}}</div>
          </div>
          <ul class="input-box">
            <li class="li-one">
              <input type="password" class="input" :placeholder="$t('getBackPwd.text22')" v-model.trim="oldPassword">
            </li>
          </ul>
          <div class="input-title title-one">
            <div class="input-name">{{$t('getBackPwd.text23')}}</div>
          </div>
          <ul class="input-box">
            <li class="li-one">
              <input type="password" class="input" :placeholder="$t('getBackPwd.text24')" v-model.trim="newPassword">
            </li>
          </ul>
          <p class="err-tip">{{$t('getBackPwd.text25')}}</p>
          <div class="input-title title-one">
            <div class="input-name">{{$t('getBackPwd.text26')}}</div>
          </div>
          <ul class="input-box">
            <li class="li-one">
              <input type="password" class="input" :placeholder="$t('getBackPwd.text27')" v-model.trim="sureNewPassword">
            </li>
          </ul>
          <div class="save-btn" @click="btnSave()">
            <div class="save">{{$t('getBackPwd.text28')}}</div>
            <div class="err-ms" v-show="errInputMsg">{{errInputMsg}}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Dialog from '../../../components/dialog/index'
    export default {
        data() {
          return{
            email: '',
            userName: '',
            oldPassword: '', // 原始密码
            newPassword: '', // 新密码
            sureNewPassword: '', // 确认新密码
            userPool: {},
            userData: {},
            errInputMsg: ''
          }
        },
      created() {
        this.userPool = new this.$AmazonCognitoIdentity.CognitoUserPool(this.$poolData);
        this.getUserInfo()
      },
      methods: {
        // isLoggedIn() {
        //   return this.userPool.getCurrentUser() != null;
        // },
        verify() {
          // if(this.email === '') {
          //   this.errInputMsg = '请输入邮箱地址'
          //   return false
          // }
          let passwordReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          if(this.oldPassword === '') {
            this.errInputMsg = this.$t('getBackPwd.text22')
            return false
          }
          if(!passwordReg.test(this.oldPassword)) {
            this.errInputMsg = this.$t('getBackPwd.text29')
            return false
          }
          if(this.newPassword === '') {
            this.errInputMsg =this.$t('getBackPwd.text24')
            return false
          }
          if(!passwordReg.test(this.newPassword)) {
            this.errInputMsg = this.$t('getBackPwd.text18')
            return false
          }
          if(this.sureNewPassword === '') {
            this.errInputMsg = this.$t('getBackPwd.text27')
            return false
          }
          if(this.oldPassword === this.newPassword) {
            this.errInputMsg = this.$t('getBackPwd.text30')
            return false
          }
          if(this.sureNewPassword !== this.newPassword) {
            this.errInputMsg = this.$t('getBackPwd.text19')
            return false
          }
          return true
        },
        getUserInfo() {
          var cognitoUser = this.userPool.getCurrentUser();
          if (cognitoUser != null) {
            cognitoUser.getSession(function(err, session) {
            })
          }
        },
        btnSave() {
          if(this.verify()) {
            this.errInputMsg = ''
            var userPool = new this.$AmazonCognitoIdentity.CognitoUserPool(this.$poolData);
            var cognitoUser = userPool.getCurrentUser(); // 获取当前用户
            // var authenticationData = {
            //   PreviousPassword : this.oldPassword,
            //   ProposedPassword : this.newPassword
            // };
            // var attributeList = [];
            // let _this = this
            // var userData = {
            //   Username: this.email,
            //   Pool: userPool
            // };
            if (cognitoUser != null){
              //need to get session first to reset password even though user current authenticate
              cognitoUser.getSession(function (err, session) {
                if (err) {
                  alert(err);
                  return;
                }
              })
              let _this = this
              cognitoUser.changePassword(this.oldPassword, this.newPassword, function(err, result) {
                if(err) {
                  if (localStorage.getItem('discoveryLang') === 'CN') {
                    if (err.message === 'Incorrect username or password.') {
                      _this.errInputMsg = this.$t('getBackPwd.text31')
                    } else if(err.message === 'Attempt limit exceeded, please try after some time.') {
                      _this.errInputMsg = this.$t('getBackPwd.text10')
                    } else {
                      _this.errInputMsg = err.message
                    }
                  } else{
                    _this.errInputMsg = err.message
                  }
                } else if(result === 'SUCCESS') {
                  Dialog({
                    content: this.$t('getBackPwd.text32'),
                    okText: this.$t('getBackPwd.text33'),
                    okFn: () => {
                      cognitoUser.signOut()
                      _this.$router.push('/login')
                    }
                  })
                }
              })
            }else{
              Dialog({
                content: this.$t('getBackPwd.text34'),
                okText: this.$t('getBackPwd.text33'),
              })
              // console.log('user not authenticated!');
            }
            // var authenticationDetails = new this.$AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
            // var cognitoUser = new this.$AmazonCognitoIdentity.CognitoUser(userData);
            // cognitoUser.changePassword(authenticationData.PreviousPassword, authenticationData.ProposedPassword, function(err, result) {
            //   console.log(err)
            //   if (err) {
            //     if(localStorage.getItem('discoveryLang') === 'CN') {
            //       if(err === 'User is not authenticated') {
            //         _this.errInputMsg = '用户未经过身份验证'
            //       }
            //     }
            //     return;
            //   }
            //   console.log('call result: ' + result);
            // });
          }
        }
      }
    }
</script>

<style scoped lang="stylus">
  .right-content
    flex 1
    /*overflow-y scroll*/
    .top-cont
      padding: 60px 60px 0 60px;
      /*width: 100%;*/
      margin-left 280px
      .top-m
        height: 80px
        padding-bottom: 40px
        box-sizing content-box
        font-size: 18px;
        color: #090d21;
        width: 100%;
        border-bottom: 1px dashed #ccc;
        .top-c
          display: flex;
          align-items: center;
          justify-content space-between
          background-color: #f2f3f7
        .left
          display: flex
          align-items center
          .list-m
            display: flex
            align-items center
            margin-right: 130px
            img
              margin-right: 14px
      .top-t{
        margin-bottom 50px
        padding-bottom 20px
        display flex
        align-items center
        border-bottom 1px dashed #ccc
        img{
          display block
          width 4px
          height 26px
        }
        .account{
          margin-left 20px
          font-size 22px
          color #090d21
        }
      }
      .input-title{
        display flex
        justify-content space-between
        margin-top 30px
        margin-bottom 20px
        .input-name{
          font-size 18px
          color #090d21
        }
        .add-icon{
          cursor pointer
          font-size 18px
          color #3376ff
        }
      }
      .title-one{
        margin-top 50px
      }
      .input-box{
        width 100%
        .li-one{
          padding  0 30px
          display flex
          justify-content space-between
          align-items center
          margin-top 30px
          width 100%
          height 50px
          color #090d21
          font-size 16px
          border-radius 4px
          background #F2F3F7
          .delete-icon{
            cursor pointer
            width 17px
            height 20px
            img{
              display block
              width 100%
            }
          }
        }
        .input{
          flex 1
          font-size 16px
          color #090d21
        }
      }
      .save-btn{
        cursor pointer
        height 50px
        background #3376ff
        text-align center
        line-height 50px
        color #fff
        font-size 18px
        border-radius 6px
        margin 50px 0
        position relative
        .err-ms{
          position absolute
          font-size 12px
          color #ff2121
          top -40px
          left 0
        }
      }
.err-tip {
  margin-top 20px
  padding 0 30px
  font-size 12px
  color #ff2121
}
</style>
