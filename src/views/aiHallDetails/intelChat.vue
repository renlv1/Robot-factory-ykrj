<template>
  <div class="ai-chat-w">
    <div class="close" @click="goback">
      <img src="../../assets/img/newFunction/close.png" alt="">
    </div>
    <div class="content-m">
      <h1 class="title-ai">智能聊天</h1>
      <p class="text1">【聊天是一门艺术，和机器人聊天更是一件有趣的事！】</p>
      <p class="text2">用户可以与AI机器人进行无障碍交流，AI机器人不仅可以解答用户疑问，还能帮助用户思考。</p>
      <div class="chat-w">
        <div class="chat-room clearfix" ref="chatcontainer">
          <div class="clearfix" v-for="(item, index) in chatContent" :key="index + 11111" :class="{'mySelf': item.isMy === true,  'leilei': item.isMy === false}">
            <span class="status" :class="{'loading-status': item.status === 1, 'err-status': item.status === 2}"></span>
            <!--          多个回答 -->
            <span v-show="item.isMy === false" v-for="(child, index) in item.msg" :key="index + 999999" class="chatbo-a">{{child}}</span>
            <span class="chatbo-a user-a" v-show="item.isMy === true">{{item.msg}}</span>
            <span class="chatbo-a" v-show="item.rule">{{item.rule}}</span>
<!--          多个回答 显示多个头像 -->
            <div class="user-avatar" v-show="item.msg.length > 1" :class="{'rule-a': item.rule, 'chat-m': n === 1 && item.isMy === false}" v-for="(a, n) in item.msg" :key="n - 111111111">
              <span class="fa fa-linux" v-show="item.isMy === false && !item.rule"></span>
              <span class="rule-avatar" v-show="item.rule">规则</span>
            </div>
            <div class="user-avatar" :class="{'rule-a': item.rule}">
              <span class="fa fa-linux" v-show="item.isMy === false && !item.rule"></span>
              <span class="rule-avatar" v-show="item.rule">规则</span>
            </div>
            <div class="loading-box" v-show="loadingShow && activeIndex === index">
              <div class="loading-m">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-ctrl" @keyup.enter="sendMsg">
          <div class="left">
            <div class="line"></div>
            <input type="text" class="sendContent" placeholder="输入聊天内容..." v-model.trim="sendContent">
          </div>
          <div class="right-send" @click="sendMsg">
            <img src="../../assets/img/aiExploration/send_blue.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Base64 } from 'js-base64';
	export default {
		data() {
			return {
        activeIndex: 0,
        sendContent: '',
        chatContent: [],
        chatContent2: []
      }
		},
    mounted () {
    },
    methods: {
      goback () {
        this.$router.push({
          path:'/aiExploration',
          query: {name: 'a'}
        })
      },
      sendMsg () {
        if (this.sendContent !== '') {
          let myObj = {
            isMy: true,
            msg: this.sendContent,
            status: 1
          }
          this.chatContent.push(myObj)
          this.loadingShow = true
          setTimeout(() => {
            this.$refs.chatcontainer.scrollTop = this.$refs.chatcontainer.scrollHeight
          }, 20)
          this.$fetch.post('https://ijmdcu9fo8.execute-api.ap-northeast-2.amazonaws.com/prod/chat', {
            content: this.sendContent,
            model: 'CASU'
          }).then(res => {
            if (res.text) {
              myObj.status = 3
              this.loadingShow = false
              this.activeIndex  += 2
              this.chatContent.push({
                isMy: false,
                msg: res.textList
              })
              if (res.pattern) {
                this.chatContent.push({
                  isMy: false,
                  rule: Base64.decode(res.pattern)
                })
              }
            } else {
              this.loadingShow = false
              this.activeIndex  += 2
              myObj.status = 3
              this.chatContent.push({
                isMy: false,
                msg: '                       '
              })
            }
            setTimeout(() => {
              this.$refs.chatcontainer.scrollTop = this.$refs.chatcontainer.scrollHeight
            }, 20)
          }).catch(err => {
            myObj.status = 3
            this.loadingShow = false
            this.activeIndex  += 2
            this.chatContent.push({
              isMy: false,
              msg: '                       '
            })
            setTimeout(() => {
              this.$refs.chatcontainer.scrollTop = this.$refs.chatcontainer.scrollHeight
            }, 20)
          })
          this.sendContent = ''
        }
      }
    }
	}
</script>

<style scoped lang="stylus">
  .loading-box{
    position: absolute;
    left: -752px;
    top: 50px
  }
  .loading-m{
    height: 40px;
    margin: 0 auto;
    margin-top:100px;
  }
  .loading-m span{
    display: inline-block;
    width: 8px;
    height: 100%;
    border-radius: 4px;
    margin-left: 10px
    background: #000;
    -webkit-animation: load 1s ease infinite;
  }
  @-webkit-keyframes load{
    0%,100%{
      height: 40px;
    }
    50%{
      height: 70px;
      margin-top: -15px
      margin-bottom: -15px
    }
  }
  .loading-m span:nth-child(2){
    -webkit-animation-delay:0.2s;
  }
  .loading-m span:nth-child(3){
    -webkit-animation-delay:0.4s;
  }
  .loading-m span:nth-child(4){
    -webkit-animation-delay:0.6s;
  }
  .loading-m span:nth-child(5){
    -webkit-animation-delay:0.8s;
  }
  .loading-m span:nth-child(6){

  }
  .loading-m span:nth-child(7){
    -webkit-animation-delay:0.2s;
  }
  .loading-m span:nth-child(8){
    -webkit-animation-delay:0.4s;
  }
  .loading-m span:nth-child(9){
    -webkit-animation-delay:0.6s;
  }
  .loading-m span:nth-child(10){
    -webkit-animation-delay:0.8s;
  }
.ai-chat-w
  .close
    position: absolute
    top: 140px
    left: 300px
    width 44px
    cursor pointer
    @media screen and (max-width: 1700px)
      left 180px
    @media screen and (max-width: 1500px)
      left 100px
    @media screen and (max-width: 1300px)
      left 60px
    img
      width: 44px
      display: block
  .content-m
    display: flex
    align-items center
    flex-direction column
  .title-ai
    // margin: 100px auto 0
    padding-top: 100px
    font-size: 32px
    color #08061d
    position: relative
    display: inline-block
    &::before
      content ''
      display: block
      width: 60%
      border-top: 2px solid #090d21
      position: absolute
      left: 20%
      top: 100%
      margin-top: 10px
  .text1
    font-size: 16px
    color #4984FD
    margin: 36px 0 10px
  .text2
    font-size: 16px
  .chat-w
    width 1000px
    height: 560px
    background-color: #f6f7fb
    border: 1px solid #ddd
    position: relative
    margin-top: 60px
    @media screen and (max-width: 1000px)
      width: 100%
    .chat-room
      height: 498px
      width: 100%
      overflow: auto
      padding: 30px 40px 0 40px
      .chatbo-a
        display: block
        background-color: #e8e8eb
        padding: 10px
        margin-bottom: 20px
        border-radius 4px
        &.user-a
          background-color: #D6E7FF
    .loading-status{
      width: 20px
      height: 20px
      position: absolute
      left: -30px
      top: 5px
      background: url("../../assets/img/common/loading.gif") no-repeat center / cover
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
      &.rule-a{
        background-color: #f6f7fb
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
      // padding: 10px 20px 10px 20px;
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
    .bottom-ctrl
      width: 100%
      height: 60px
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
          width: 40px
          height: 20px
          border-right: 1px solid #b3b3b3
        .sendContent
          font-size: 16px
          color #19191a
          width: 100%
          height: 100%
          padding-left: 20px
      .right-send
        padding: 0 40px 0 20px
        height: 100%
        display: flex
        align-items center
        cursor pointer
        img
          width: 22px
          display: block
</style>
