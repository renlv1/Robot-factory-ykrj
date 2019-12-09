<template>
  <div class="aichat-w"  @click="isSelectShow = false">
    <div class="aichat-c">
<!--      左边菜单-->
      <div class="left-menu">
        <ul class="menu-uls">
          <li v-for="(item, index) in menuArr" :key="index" class="menu-list"
              @click="clickOne(item, index)"
              :class="{'active-li': currentIndex === index}">
            <div class="img-box">
              <i class="fa fa-linux"></i>
            </div>
            <p class="name">{{item.name}}</p>
            <div class="img-editor" @click.stop="gotoEditor(item)">
              <img src="../assets/img/user/editor.png" alt="">
            </div>
          </li>
        </ul>
      </div>
<!--      右边内容-->
      <div class="right-cont">
<!--        模型设置 -->
        <div class="switch-top-m">
          <div class="switch-top" v-show="isAdmin === true">
            <div class="model-w-c">
              <div class="model-w">
                <div class="left-model">
                  <div class="line">
                    <img src="../assets/img/common/border.png" alt="">
                  </div>
                  <div>{{$t('aiChat.text1')}}: {{currentModel}}</div>
                </div>
                <div class="arrow" @click.stop="isSelectShow = !isSelectShow">
                  <img src="../assets/img/common/arrow_gray.png" alt="">
                </div>
              </div>
              <transition name="arrowf">
                <div class="dialog-slide" v-show="isSelectShow">
                  <div class="group">
                    <ul class="arrow-uls">
                      <li v-for="(item, index) in modelArr" :key="index" class="arrow-item"
                          @click="switchOne(item, index)"
                          :class="{'active-model': activeIndex === index}">{{item.name}}</li>
                    </ul>
                  </div>
                </div>
              </transition>
            </div>
            <div class="language-m">
              <div class="line">
                <img src="../assets/img/common/border.png" alt="">
              </div>
              <div>{{$t('aiChat.text2')}}：{{language}}</div>
            </div>
          </div>
        </div>
<!--        聊天内容-->
        <div class="chart-room-w">
          <p class="room-title">{{$t('aiChat.text3')}}<span class="robot-name">{{robotName}}</span>{{$t('aiChat.text4')}}</p>
          <div class="chart-room-content">
            <p class="time-refresh">{{$t('aiChat.text5')}}{{$changeDate(new Date())}}</p>
            <div class="m-room clearfix" ref="chatcontainer">
              <div v-for="(item, index) in chatContent" :key="index" :class="{'mySelf': item.isMy === true,  'leilei': item.isMy === false}">
                <span class="status" :class="{'loading-status': item.status === 1, 'err-status': item.status === 2}"></span>
                <!--          多个回答 -->
                <span>
                  <span v-show="typeof item.msg === 'object'" v-for="(child, aindex) in item.msg" :key="aindex + 66666" class="chatbo-a">{{child}}</span>
                  <span class="chatbo-a user-a" v-show="typeof item.msg === 'string'">{{item.msg}}</span>
                </span>

                <span class="re" v-show="item.isMy === false && isAdmin === true && item.model !== 'ALL' && !item.rule">{{item.model}}</span>
                <span class="re" v-show="item.isMy === false && isAdmin === true && !item.rule && item.model === 'ALL'">RB</span>
                <div class="user-avatar">
                  <span class="fa fa-linux" v-show="item.isMy === false"></span>
                </div>
                <!--          多个回答 显示多个头像 -->
                <div class="user-avatar" v-show="typeof item.msg === 'object'" :class="{'rule-a': item.rule, 'chat-m': n === 1 && item.isMy === false}" v-for="(a, n) in item.msg" :key="n - 111111111">
                  <span class="fa fa-linux" v-show="item.isMy === false && !item.rule"></span>
                  <span class="rule-avatar" v-show="item.rule && isAdmin === true">规则</span>
                </div>
                <span class="chatbo-a" v-show="item.rule && isAdmin === true">{{item.rule}}</span>
                <div class="user-avatar" :class="{'rule-a': item.rule}">
                  <span class="fa fa-linux" v-show="item.isMy === false && !item.rule"></span>
                  <span class="rule-avatar" v-show="item.rule && isAdmin === true">规则</span>
                </div>
              </div>
<!--              <div v-for="(item) in chatContent2" :key="item.msg" class="leilei">-->
<!--                {{item.msg}}-->
<!--                <div class="user-avatar rule-avatar">-->
<!--                  规则-->
<!--                </div>-->
<!--              </div>-->
            </div>
            <div class="bottom-ctrl" @keyup.enter="sendMsg">
              <div class="left">
                <div class="line"></div>
                <input type="text" class="sendContent" v-model.trim="sendContent" :placeholder="$t('aiChat.text6')">
              </div>
              <div class="right-send" @click="sendMsg">
                <img src="../assets/img/common/send.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loading-w" v-show="axiosShow">
      <img src="../assets/img/common/loading.gif" alt="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/dialog'
  import { Base64 } from 'js-base64';
	export default {
		data() {
			return {
        axiosShow: true,
        currentModel: 'ALL',
        isSelectShow: false,
        activeIndex: 0,
			  modelArr: [
          {name: 'ALL'},
          {name: 'RB'},
          {name: 'IC'},
          {name: 'RE'},
          {name: 'PI'},
          {name: 'GN'},
          {name: 'RO'},
          {name: 'DF'}
        ],
        chatContent: [],
        sendContent: '',
        currentIndex: 0,
        robotName: '',
        menuArr: [],
        apiKey: '',
        language: '',
        chatbotsOne: '',
        isAdmin: false,
        fromUser: ''
      }
		},
    created () {
      if (localStorage.getItem('__userEmail__')) {
        this.getAi()
        this.fromUser = this.uuidv4()
      } else {
        this.$router.push('/login')
      }
    },
    mounted () {
    },
    methods: {
      uuidv4 () {
        return 'xxxxxxxxxxxxyxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      },
      routePath () {
        // 跳转过来高亮
        if (this.$route.query.apiKey && this.menuArr.length > 0) {
          this.menuArr.forEach((item, mindex) => {
            if (item.name === this.$route.query.apiKey) {
              this.currentIndex = mindex
            }
          })
        }
      },
      // 跳转到编辑
      gotoEditor (item) {
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
      },
      // 自己的机器人
      getAi () {
        let axLeng = 0
        let username = localStorage.getItem('__userEmail__')
        this.$fetch.post('/account', {
          operation: "GetAccount",
          username: username
        }).then(res => {
          if (res.chatbots && res.chatbots[0]) {
            let arr = res.chatbots
            if (res.tier === 'ADMIN') {
              this.isAdmin = true
            } else {
              this.isAdmin = false
            }
            let aichat = []
            arr.forEach((item, index) => {
              this.$fetch.get(`/chatbotregistration/${item}`).then(response => {
                axLeng++
                aichat.push(response)
                this.axiosShow = false
              })
            })
            this.menuArr = aichat
            setTimeout(() => {
              this.routePath()
              if (axLeng === arr.length) {
                if (this.$route.query.apiKey && this.menuArr.length > 0) {
                  this.menuArr.forEach((item, mindex) => {
                    if (item.apiKey === this.$route.query.apiKey) {
                      this.currentIndex = mindex
                      this.apiKey = item.apiKey
                      this.chatbotsOne = item.uuid
                      this.robotName = item.name
                      if (item.language === 'ZH') {
                        this.language = this.$t('aiChat.text7')
                      } else {
                        this.language = this.$t('aiChat.text8')
                      }
                    }
                  })
                } else {
                  this.chatbotsOne = res.chatbots[0]
                  this.robotName = this.menuArr[0].name
                  this.apiKey = this.menuArr[0].apiKey
                  if (res.chatbots[0].language === 'ZH') {
                    this.language = this.$t('aiChat.text7')
                  } else {
                    this.language = this.$t('aiChat.text8')
                  }
                }
              }
            }, 1000)
          } else {
            this.axiosShow = false
            Dialog({
              content: this.$t('aiChat.text9'),
              okText: this.$t('aiChat.text10'),
              type: 'confirm',
              okFn: () => {
                this.$router.push('/robotManagement')
              }
            })
          }
        }).catch(err => {
          this.axiosShow = false
        })
      },
      // 发送
      sendMsg () {
        if (this.sendContent !== '') {
          let myObj = {
            isMy: true,
            msg: this.sendContent,
            status: 1
          }
          this.chatContent.push(myObj)
          setTimeout(() => {
            this.$refs.chatcontainer.scrollTop = this.$refs.chatcontainer.scrollHeight
          }, 20)
          let model
          if (this.currentModel === 'ALL') model = 'ALL'
          if (this.currentModel === 'RB') model = 'RULE'
          if (this.currentModel === 'IC') model = 'INTE'
          if (this.currentModel === 'RE') model = 'RETR'
          if (this.currentModel === 'PI') model = 'PARA'
          if (this.currentModel === 'GN') model = 'GENE'
          if (this.currentModel === 'RO') model = 'TULI'
          if (this.currentModel === 'DF') model = 'DIAL'
          this.$fetch.post('/chat', {
            apiKey: this.apiKey,
            chatbotId: this.chatbotsOne,
            operation: 'CHAT',
            content: this.sendContent,
            platform: 'FACTORY_WEBSITE_v1',
            fromUser: localStorage.getItem('__userEmail__'),
            model: model
          }).then(res => {
            if (res.text) {
              myObj.status = 3
              this.chatContent.push({
                isMy: false,
                msg: res.textList,
                model: this.currentModel
              })
              if (res.pattern) {
                this.chatContent.push({
                  isMy: false,
                  rule: Base64.decode(res.pattern)
                })
              }
            } else {
              myObj.status = 3
              this.chatContent.push({
                isMy: false,
                model: this.currentModel,
                msg: '                       '
              })
            }
            setTimeout(() => {
              this.$refs.chatcontainer.scrollTop = this.$refs.chatcontainer.scrollHeight
            }, 20)
          }).catch(err => {
            myObj.status = 3
            this.chatContent.push({
              isMy: false,
              model: this.currentModel,
              msg: '                       '
            })
            setTimeout(() => {
              this.$refs.chatcontainer.scrollTop = this.$refs.chatcontainer.scrollHeight
            }, 20)
          })
          this.sendContent = ''
        }
      },
      clickOne (item, index) {
        this.apiKey = item.apiKey
        this.chatbotsOne = item.uuid
        this.chatContent = []
        this.currentIndex = index
        this.robotName = item.name
        if (item.language === 'ZH') {
          this.language = this.$t('aiChat.text7')
        } else {
          this.language = this.$t('aiChat.text8')
        }
      },
      switchOne (item, index) {
        this.chatContent = []
        this.currentModel = item.name
        this.activeIndex = index
        this.isSelectShow = false
      }
    },
    watch: {
      menuArr () {
        if (this.$route.query.apiKey && this.menuArr.length > 0) {
          this.menuArr.forEach((item, mindex) => {
            if (item.name === this.$route.query.apiKey) {
              this.currentIndex = mindex
            }
          })
        }
      }
    }
	}
</script>

<style scoped lang="stylus">
.aichat-w
  background-color: #E4E4E6
  padding: 50px 30px
  position: relative
  @media screen and (max-width: 1200px)
    padding: 0
  .loading-w
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 1000
    display: flex
    align-items center
    justify-content center
    background-color: rgba(0,0,0,.5)
  .aichat-c
    display: flex
    justify-content:center
    min-height calc(100vh - 180px)
    @media screen and (max-width: 1200px)
      min-height calc(100vh - 80px)
    .left-menu
      width: 320px
      background-color: #0D1125
      .menu-uls
        .menu-list
          color #fff
          display: flex
          align-items center
          padding-left: 40px
          height: 68px
          cursor pointer
          &.active-li
            background-color: #1D243C
            color #3376ff
            .img-box
              border: 2px solid #3376ff
              box-sizing content-box
          .img-editor
            width: 24px
            box-sizing content-box
            padding: 0 20px
            height: 100%
            display: flex
            align-items center
            cursor pointer
            img
              width: 100%
              display: block
          .name
            flex 1
          .img-box
            width: 42px
            height: 42px
            background-color: #fff
            border-radius 50%
            margin-right: 14px
            display: flex
            align-items center
            justify-content center
            .fa
              color #000
              font-size: 32px
    .right-cont
      flex 1
      max-width  1300px
      background-color: #fff
      display: flex
      flex-direction column
      .switch-top-m
        padding: 60px 60px 0 60px
        width: 100%
        @media screen and (max-width: 1200px)
          padding: 10px
      .switch-top
        font-size: 18px
        color #090d21
        width: 100%
        padding-bottom: 40px
        display: flex
        align-items center
        border-bottom: 1px dashed #ccc
        @media screen and (max-width: 1200px)
          padding-bottom: 10px
        .model-w-c
          position: relative
          margin-right: 30px
          .dialog-slide
            position: absolute
            z-index: 100
            top: 100%
            right: 0
            min-width 88px
            background-color: #fff
            &.arrowf-leave-to
              opacity: 0
              .group
                transform: translate(0, -5%)
            &.arrowf-enter
              opacity: 0
            &.arrowf-enter-active, &.arrowf-leave-active
              transition: all .1s linear;
              .group
                transition: all .1s linear;
          .group
            transform: translate(0, 0);
            width: 100%;
            height: auto;
          .arrow-uls
            transform: translate(0, 0);
            border-radius 4px
            box-shadow 0 0 6px rgba(9,13,33, .3)
            background-color: #fff
            margin-top: 10px
            .arrow-item
              color #19191a
              height: 40px
              line-height: 40px
              text-align: center
              cursor pointer
              padding: 0 30px
              &:hover
                color #3376ff
        .model-w
          width: 300px
          height: 80px
          display: flex
          align-items center
          justify-content space-between
          padding-left: 30px
          background-color: #f2f3f7
          border-radius 6px
          @media screen and (max-width: 1200px)
            height: 50px
            font-size: 14px
          .left-model
            display: flex
            align-items center
          .arrow
            height: 100%
            display: flex
            align-items center
            padding: 0 30px
            cursor pointer
        .line
          width: 4px
          margin-right: 14px
          img
            width: 100%
            display: block
        .language-m
          flex 1
          display: flex
          align-items center
          height: 80px
          background-color: #f2f3f7
          border-radius 6px
          padding: 0 30px
          white-space nowrap
          @media screen and (max-width: 1200px)
            height: 50px
            font-size: 14px
      .chart-room-w
        flex 1
        display: flex
        flex-direction column
        .room-title
          font-size: 20px
          font-weight: bold
          color #090d21
          padding: 40px 0 20px 60px
          @media screen and (max-width: 1200px)
            padding: 10px
            font-size: 14px
          .robot-name
            color #3376ff
        .chart-room-content
          position: relative
          flex 1
          display: flex
          flex-direction column
          .time-refresh
            text-align: center
            margin-bottom: 60px
            color #b3b3b3
            @media screen and (max-width: 1200px)
              margin-bottom: 10px
          .m-room{
            padding: 0 60px
            min-height: calc(100vh - 596px);
            max-height: calc(100vh - 596px);
            overflow auto
            @media screen and (max-width: 1200px){
              min-height: calc(100vh - 300px);
              max-height: calc(100vh - 300px);
            }
            .chatbo-a{
              display: block
              background-color: #e8e8eb
              padding: 10px
              margin-bottom: 20px
              border-radius 4px
              &.user-a{
                background-color: #D6E7FF
              }
            }
            .loading-status{
              width: 20px
              height: 20px
              position: absolute
              left: -30px
              top: 5px
              background: url("../assets/img/common/loading.gif") no-repeat center / cover
            }
            .err-status{
              width: 20px
              height: 20px
              position: absolute
              left: -30px
              top: 5px
              background-color: red
              border-radius 50%
              display: flex
              align-items center
              justify-content center
              &::before{
                content '!'
                color #fff
                font-size: 16px
              }
            }
            .create-time{
              position: absolute;
              display: inline-block;
              top: -30px;
              text-align: center;
              height: 30px;
              width: 144px;
              color: #939eae;
              font-size: 14px;
            }
            .user-avatar{
              width: 44px;
              height: 44px;
              border-radius: 50%;
              background-color: #D5D5D6;
              position: absolute;
              top: 0;
              display: flex
              align-items center
              justify-content center
              &.rule-avatar{
                background-color: #fff
                color #3376ff
              }
              &.chat-m{
                margin-top: 67px
              }
              .rule-avatar{
                color #3376ff
              }
              .fa{
                font-size: 28px
                color #000
              }
              &.rule-a{
                background-color: #fff
                border-radius 0
              }
            }
            .mySelf{
              float: right;
              margin-right: 64px;
              color: #19191a;
              font-size: 16px
              // background-color: #D6E7FF;
              position: relative;
              clear: both;
              display: inline-block;
              // padding: 10px 20px;
              margin-bottom: 20px;
              font: 20px/26px 'Microsoft YaHei';
              border-radius: 10px 10px 0 10px;
              max-width: 80%;
              word-break break-all
              @media screen and (max-width: 1200px){
                margin-bottom: 10px
                font-size: 14px
              }
              &:before{
                content: "";
                width: 0;
                height: 0;
                clear: both;
                display: block;
                visibility: hidden;
              }
              .user-avatar{
                right: -64px;
                background-color: #D6E7FF
              }
            }
            .leilei{
              float: left;
              margin-left: 64px;
              color: #19191a;
              font-size: 16px
              // background-color: #E8E8EB;
              position: relative;
              display: inline-block;
              // padding: 10px 140px 10px 20px;
              margin-bottom: 20px;
              clear: both;
              font: 20px/26px 'Microsoft YaHei';
              border-radius: 10px 10px 10px 0;
              max-width: 80%;
              word-break break-all
              min-height: 46px;
              @media screen and (max-width: 1200px){
                margin-bottom: 10px
                font-size: 14px
              }
              .chatbo-a {
                padding-right: 100px
                min-height 46px
              }
              .re{
                position: absolute
                right: 0
                top: 0
                color #3376ff
                font-weight: bold
                padding: 10px 20px
              }
              .user-avatar{
                left: -64px;
              }
            }
          }
          .bottom-ctrl
            width: 100%
            height: 68px
            position: absolute
            bottom: 0
            left:0
            background-color: #f9f9f9
            border-top: 1px solid #E8E8EB
            display: flex
            align-items center
            justify-content space-between
            .left
              flex 1
              height: 100%
              display: flex
              align-items center
              .line
                width: 80px
                height: 20px
                border-right: 1px solid #b3b3b3
              .sendContent
                font-size: 16px
                color #19191a
                width: 100%
                height: 100%
                padding-left: 10px
            .right-send
              padding: 0 60px 0 20px
              height: 100%
              display: flex
              align-items center
              cursor pointer
              img
                width: 22px
                display: block
</style>
