<template>
  <div class="userinfo">
    <div class="right-content">
      <div class="top-cont">
        <div class="top-t">
          <img src="../../../assets/img/common/border.png">
          <div class="account">{{$t('getBackPwd.text35')}}</div>
        </div>
        <div class="input-title title-one">
          <div class="input-name">{{$t('getBackPwd.text36')}}</div>
        </div>
        <ul class="input-box">
          <li class="li-one">
            <input type="text" class="input"  v-model.trim="userName" readonly>
          </li>
        </ul>
        <div class="input-title title-one">
          <div class="input-name">{{$t('getBackPwd.text37')}}</div>
        </div>
        <ul class="input-box">
          <li class="li-one">
            <input type="text" class="input"  v-model.trim="accountNumber" readonly>
          </li>
        </ul>
        <div class="save-btn" @click="gotoModify">
          <div class="save">{{$t('getBackPwd.text38')}}</div>
<!--          <div class="err-ms" v-show="errInputMsg">{{errInputMsg}}</div>-->
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
        accountNumber: '',
        oldPassword: '', // 原始密码
        newPassword: '', // 新密码
        sureNewPassword: '', // 确认新密码
        userPool: {},
        userData: {},
        errInputMsg: ''
      }
    },
    created() {
      if (localStorage.getItem('__userEmail__')) {
        this.userName = localStorage.getItem('__userEmail__').split('@')[0]
        this.accountNumber = localStorage.getItem('__userEmail__')
      }
    },
    methods: {
      gotoModify () {
        this.$router.push({
          path: '/user/changePassword',
          query: {
            uuid: this.$route.query.uuid,
            name: this.$route.query.name,
            apiKey: this.$route.query.apiKey,
            createdAt: this.$route.query.createdAt,
            endpoint: this.$route.query.endpoint
          }
        })
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
