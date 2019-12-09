<template>
  <div class="charles-w">
    <div class="charles-m">
      <div class="left-menu">
        <ul class="menu-uls">
          <li class="menu-list" v-for="(item, index) in menuArr" :key="index"
              @click="gotoPath(index, item)"
              :class="{'active-list': activeIndex === index}">
            <div class="img-box">
              <i class="fa fa-linux"></i>
            </div>
            <p class="name">{{item.name}}</p>
          </li>
        </ul>
        <div class="add-robot" @click="addRobot">
          <img src="../../../assets/img/common/add.png" alt="">
          <span>新建机器人</span>
        </div>
      </div>
      <div class="v-right-content">
        <div class="top-cont">
          <div  class="top-m">
            <div class="top-c">
              <div class="left">
                <div class="list-m">
                  <img src="../../../assets/img/common/border.png" alt="">
                  <span>{{$t('charles.text1')}}: {{chatName}}</span>
                </div>
                <div class="list-m">
                  <img src="../../../assets/img/common/border.png" alt="">
                  <span>{{$t('charles.text2')}}: {{language}}</span>
                </div>
                <div class="list-m">
                  <img src="../../../assets/img/common/border.png" alt="">
                  <span>{{$t('charles.text3')}}: {{$t('charles.text4')}}</span>
                </div>
              </div>
              <div class="right">
                <div class="ctrl-item" @click="gotoChat">
                  <img src="../../../assets/img/common/chat.png" alt="">
                </div>
<!--                <div class="ctrl-item" @click="downloadAi">-->
<!--                  <img src="../../../assets/img/common/document.png" alt="">-->
<!--                </div>-->
                <div class="ctrl-item" @click="deleteAi">
                  <img src="../../../assets/img/common/delete.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="title-x">{{$t('charles.text5')}}</div>
        <div class="xmind-w"></div>
      </div>
    </div>
    <!--      新增机器人弹窗-->
    <transition name="safeDialog">
      <div class="dialog-w dialog-safe-w" v-show="addShow">
        <div class="dialog-safe" >
          <div class="close" @click="closeAdd()">
            <div class="close-icon"></div>
          </div>
          <div class="dialog-title">{{$t('charles.text6')}}</div>
          <div class="robot-name">{{$t('charles.text7')}}</div>
          <div class="form-item">
            <input type="text" :placeholder="$t('charles.text8')" class="input" v-model.trim="robotName" @input="inputM">
          </div>
          <div class="robot-name">{{$t('charles.text9')}}</div>
          <div class="record-type" @click="changeRecord()">
            <div class="type-box" >
              <div class="fixed-type" >
                {{languageType}}
                <div class="sel-img"><i class="arrowDown" :class="{'active-Img': activeChange}"></i></div>
              </div>
              <ul class="selectMenu" :class="{'selectMenuActive': activeChange}" @click.stop>
                <li v-for="(item, index) in $t('charles.languageArr')" :key="index" @click="chooseType(item,index)">{{item}}</li>
              </ul>
            </div>
          </div>
          <div class="g-dialog-btn-wrap">
            <div class="err-ms">{{errInputMsg}}</div>
            <div class="g-dialog-btn g-dialog-cancel" @click="okCallback()" :class="{'disable-btn': disableBtn}">
              <img src="../../../assets/img/common/loading.gif" alt="" v-show="disableBtn">{{$t('charles.text10')}}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/dialog'
	export default {
		data() {
			return {
        disableBtn: false,
        languageArr: ['中文', '英文'],
        errInputMsg: '',
        activeChange: false,
        languageType: this.$t('charles.text11'),
        robotName: '',
        addShow: false,
        activeIndex: 0,
        chatName: '',
        menuArr: [],
        language: '',
        apiKey: this.$route.query.apiKey
      }
		},
    created () {
		  this.getai()
    },
    mounted () {
		  this.getPath()
    },
    methods: {
      getPath () {
        setTimeout(() => {
          this.menuArr.forEach((item, index) => {
            if (item.name === this.$route.query.name) {
              this.activeIndex = index
            }
          })
        }, 1000)
      },
      inputM () {
        let reg = /^[\u4e00-\u9fa5\u3001\a-zA-Z0-9_\s]+$/
        if (reg.test(this.robotName)) {
          this.errInputMsg = ''
        } else {
          this.errInputMsg = this.$t('charles.text12')
        }
      },
      // 添加机器人
      okCallback() {
        const uuidv1 = require('uuid/v1');
        let uuid = uuidv1()
        // uuidv1();
        this.errInputMsg = ''
        if (this.robotName === '') {
          this.errInputMsg =  this.$t('charles.text8')
          return
        }
        if (this.languageType === this.$t('charles.text11')) {
          this.errInputMsg =this.$t('charles.text11')
          return
        }
        let language = ''
        if(this.languageType === this.$t('charles.text13')) {
          language = 'ZH'
        } else if(this.languageType === this.$t('charles.text14')) {
          language = 'EN'
        }
        this.disableBtn = true
        this.$fetch.post('/chatbotregistration/',{
          language: language,
          name: this.robotName,
          username: this.username,
          uuid: uuid
        }).then(res => {
          if(res.uuid) {
            this.$fetch.get('/chatbotregistration/' + res.uuid).then(res => {
              if(res) {
                // let list  = []
                // list.push(res)
                // list[0].flag = false
                this.menuArr.push(res)
                this.addShow = false
                this.disableBtn = false
                Dialog({
                  content: this.$t('charles.text15'),
                  okText: this.$t('charles.text16')
                })
              } else {
                this.disableBtn = false
                Dialog({
                  content: this.$t('charles.text17'),
                  okText: this.$t('charles.text16')
                })
              }
            }).catch(err => {
              this.disableBtn = false
              this.addShow = false
              Dialog({
                content: this.$t('charles.text17'),
                okText: this.$t('charles.text16')
              })
            })
          } else {
            this.disableBtn = false
            this.addShow = false
            if(localStorage.getItem('discoveryLang') === 'CN') {
              if(res.errorMessage === 'Please upgrade your account as the allowed limit has been reached.') {
                this.errMsg  = '请升级您的帐户，因为已达到允许的限制。'
              } else if(res.errorMessage === 'Unable to create a new chatbot, please try again later.') {
                this.errMsg  = '无法创建新的聊天机器人，请稍后再试。'
              } else {
                this.errMsg  = '添加失败'
              }
            } else {
              this.errMsg = res.errorMessage
            }
            Dialog({
              content: this.errMsg,
              okText: this.$t('charles.text16')
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 选择语言
      chooseType(item) {
        this.languageType = item
        this.activeChange = !this.activeChange
      },
      changeRecord() {
        this.activeChange = !this.activeChange
      },
      closeAdd () {
        this.errInputMsg = ''
        this.robotName = ''
        this.languageType = this.$t('charles.text11')
        this.addShow = false
      },
      addRobot() {
        this.errInputMsg = ''
        this.robotName = ''
        this.languageType = this.$t('charles.text11')
        this.addShow = true
      },
      // 菜單切換
      gotoPath (index, item) {
        this.apiKey = item.key
        this.chatName = item.name
        this.$router.push({
          path: '/user/setting',
          query: {
            uuid: item.uuid,
            name: item.name,
            apiKey: item.apiKey,
            createdAt: item.createdAt,
            endpoint: item.endpoint,
          }
        })
        // this.activeIndex = index
        // this.menuArr.forEach(item => {
        //   if (item.name === name) {
        //     if (item.language === 'ZH') {
        //       this.language = '中文'
        //     } else {
        //       this.language = '英文'
        //     }
        //   }
        // })
      },
      // 跳转到聊天
      gotoChat () {
        this.$router.push({
          path: '/aiChat',
          query: {
            apiKey: this.apiKey
          }
        })
      },
      // 获取机器人
      getai () {
        let username = localStorage.getItem('__userEmail__')
        this.$fetch.post('/account', {
          operation: "GetAccount",
          username: username
        }).then(res => {
          if (res.chatbots) {
            let arr = res.chatbots
            let chatOne = res.chatbots[0]
            let aichat = []
            arr.forEach(item => {
              this.$fetch.get(`/chatbotregistration/${item}`).then(response => {
                aichat.push(response)
                if (chatOne === item) {
                  this.chatName = response.name
                  if (response.language === 'ZH') {
                    this.language = this.$t('charles.text13')
                  } else {
                    this.language = this.$t('charles.text14')
                  }
                }
              })
            })
            this.menuArr = aichat
            this.getPath()
          }
        })
      },
      // 下载机器人
      downloadAi () {
        let text = '';
        let botname = this.$t('charles.text18')
        text = text + "user" + "\t" + botname + "\t" + this.$t('charles.text19') + "\t";
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', "chat.csv");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      },
      // 删除机器人
      deleteAi () {
        Dialog({
          title: this.$t('charles.text20'),
          type: this.$t('charles.text21'),
          cancelText: this.$t('charles.text22'),
          okText: this.$t('charles.text21'),
          content: this.$t('charles.text23'),
          okFn: () => {
            let chatRobot = ''
            this.$fetch.delete('/chatbotregistration/'+ chatRobot + '/' + this.username).then(res => {
              if(res) {
                Dialog({
                  content: this.$t('charles.text24')
                })
                this.getai()
              }
            }).catch(err => {
              console.log(err)
            })
          }
        })
      }
    },
    watch: {
		  '$route': 'getPath'
    }
	}
</script>

<style scoped lang="stylus">
.charles-w
  height: calc(100vh - 80px);
  .charles-m
    display: flex
    height: 100%
    .left-menu
      width: 320px
      background-color: #0d1125
      position: fixed
      top: 80px
      left: 300px
      bottom: 0
      display: flex
      flex-direction column
      justify-content space-between
      @media screen and (max-width: 1400px)
        left: 200px
        width: 200px
      .add-robot
        display: flex
        align-items center
        justify-content center
        font-size: 20px
        color #f2f2f2
        height: 68px
        border-top: 1px solid #323646
        cursor pointer
        img
          margin-right: 20px
      .menu-uls
        .menu-list
          height: 68px
          margin: 10px 0
          display: flex
          align-items center
          color #fff
          font-size: 16px
          padding-left: 42px
          cursor pointer
          &:nth-child(1)
            margin-top: 0
          &.active-list
            background-color: #1d243c
            color #3376ff
          .img-box
            width: 44px
            height: 44px
            border-radius 50%
            background-color: #fff
            display: flex
            align-items center
            justify-content center
            margin-right: 14px
            .fa
              color #000
              font-size: 32px
    .v-right-content
      flex 1
      position: absolute
      left: 620px
      right: 0
      top: 80px
      @media screen and (max-width: 1400px)
        left: 400px
        padding: 10px
      .top-cont
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
            height: 100%
            padding: 0 30px
          .left
            display: flex
            align-items center
            .list-m
              display: flex
              align-items center
              margin-right: 130px
              white-space nowrap
              &:last-child
                margin-right: 0
              @media screen and (max-width: 1600px)
                margin-right: 20px
              img
                margin-right: 14px
          .right
            display: flex
            align-items center
            .ctrl-item
              display: flex
              align-items center
              cursor pointer
              height: 80px
              padding: 0 20px
      .title-x
        font-size: 20px
        color #090d21
        margin: 40px 0 30px
      .xmind-w
        width: 100%
        height: 500px
        background-color: #FBFBFB
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
        background url("../../../assets/img/common/close.png")
      }
    }
    .dialog-title
      font-size: 20px
      font-weight: bold
      color #17161f
      padding: 50px 0 60px
      text-align: center
    .robot-name{
      font-size: 20px
      color #17161f
      margin-bottom 20px
    }
    .g-dialog-btn-wrap
      position relative
      border-radius 6px
      cursor pointer
      width 100%
      height 68px
      background #3376ff
      color #fff
      font-size 20px
      margin-top 50px
      display: flex
      align-items center
      justify-content center
      margin-bottom 50px
    .record-type{
      cursor: pointer;
      user-select:none;
      width: 100%
      height: 50px;
      line-height 50px
      background #f5f5f5
      border-radius 4px
      font-size 16px
      color #b3b3b3
      position: relative;
      .type-box{
        width: 100%;
        height: 100%;
        .fixed-type{
          color #090d21
          padding-left: 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .sel-img{
          top: 40%;
          transform: translate(-50%);
          right: 20px;
          /*position: absolute;*/
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all .5s;
          .arrowDown{
            display: inline-block;
            width: 16px;
            height: 10px;
            background: url("../../../assets/img/robotManagement/pull.png") no-repeat;
            background-position: center;
            background-size: cover!important;
            &.active-Img{
              transform: rotate(180deg);
            }
          }
        }
        .selectMenu{
          display: none;
          transition: all .3s linear;
          position: absolute;
          top: 60px;
          width: 100%;
          height: 0;
          verflow-y: hidden;
          z-index: 99;
          box-shadow: 0 2px 2px rgba(153, 153, 153, .2);
          &.selectMenuActive{
            display: block;
            height: auto;
          }
          li{
            border-bottom 1px solid #ededed
            padding-left: 20px;
            background #f5f5f5
            height: 40px;
            font-size: 18px;
            color: #999;
            &:hover{
              background #f1f1f1
              font-size: 18px;
              color: #090d21;
            }
          }
        }
      }
    }
    .form-item
      margin-bottom: 40px
      .label
        margin-bottom: .2rem
      .input
        height 50px
        width 100%
        background #f5f5f5
        border-radius 4px
        padding-left 30px
        font-size 16px
        color #090d21
    .err-ms
      position absolute
      font-size 12px
      color #ff2121
      top -30px
      left 0
    .shortMsg
      position relative
      .payMsg-box
        .payMsg
          width 100%
          height .8rem
          background-color #f5f6fa
          border-radius 40px
          font-size 28px
          padding 0 30px
        .sendMsg
          position absolute
          top 0
          right 0
          height: 100%
          padding: 0 20px
          background-color transparent
          border none
          outline none
          font-size: 28px
          color #00a6f1
    .g-dialog-btn
      text-align center
      flex 1
      display: flex
      align-items center
      justify-content center
      img
        width: 40px
        margin-right: 10px
      &.disable-btn
        pointer-events none
        cursor none
    .comfirm
      width: 100%
      height: 1rem
      display: flex
      align-items center
      justify-content center
      color #b79961
</style>
