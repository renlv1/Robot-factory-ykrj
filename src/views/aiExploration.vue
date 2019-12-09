<template>
  <div class="aiExploration">
    <div class="a-w" v-show="isShow === true">
      <div class="left-m" :class="{'opaticyM': isOpt}">
        <h3 class="text1">AI世界</h3>
        <h3 class="text1">身临其境 虚实结合</h3>
        <p class="text2">AI体验馆将展示人脸识别、图像识别、自然语言处理以及机器人学习等高新技术和人工智能领域的最新成果，让用户身临AI之境，感受科技的力量，聆听智能的声音。</p>
        <div class="button-n" @click="gotoM">进入AI世界</div>
      </div>
      <div class="right-m" :class="{'opaticyM': isOpt}">
        <div class="img-box">
          <img src="../assets/img/aiExploration/aureole.png" alt="">
        </div>
        <div class="webpack">
            <span class="cube cube--dark" style="width: 200px; padding-bottom: 60px;">
              <figure class="cube__outer" style="width: 200px; height: 200px;">
                <section class="cube__face" style="transform: rotateX(0deg) translateZ(100px);"><div></div></section>
                <section class="cube__face" style="transform: rotateX(-90deg) translateZ(100px); "><div></div></section>
                <section class="cube__face" style="transform: rotateX(90deg) translateZ(100px); "><div></div></section>
                <section class="cube__face" style="transform: rotateY(-90deg) translateZ(100px); "><div></div></section>
                <section class="cube__face" style="transform: rotateY(90deg) translateZ(100px);"><div></div><div class="radius-c"></div></section>
                <section class="cube__face" style="transform: rotateY(180deg) translateZ(100px);"><div></div><div  class="radius-c"></div></section>
              </figure>
              <figure class="cube__inner" style="width: 200px; height: 200px;">
                <section class="cube__face" style="transform: rotateX(0deg) translateZ(100px);"></section>
                <section class="cube__face" style="transform: rotateX(-90deg) translateZ(100px);"></section>
                <section class="cube__face" style="transform: rotateX(90deg) translateZ(100px);"></section>
                <section class="cube__face" style="transform: rotateY(-90deg) translateZ(100px);"></section>
                <section class="cube__face" style="transform: rotateY(90deg) translateZ(100px);"></section>
                <section class="cube__face" style="transform: rotateY(180deg) translateZ(100px);"></section>
              </figure>
            </span>

        </div>
      </div>
    </div>
    <div class="ai-hall-w"  v-show="isShow === false">
      <div class="left-a" :class="{'opaticyM': isOpt === false}">
        <div class="img-box">
          <img src="../assets/img/aiExploration/aureole.png" alt="">
        </div>
        <div class="webpack">
            <span class="cube cube--dark" style="width: 200px; padding-bottom: 60px;">
              <figure class="cube__outer" style="width: 200px; height: 200px;">
                <section class="cube__face" style="transform: rotateX(0deg) translateZ(100px);"><div></div></section>
                <section class="cube__face" style="transform: rotateX(-90deg) translateZ(100px); "><div></div></section>
                <section class="cube__face" style="transform: rotateX(90deg) translateZ(100px); "><div></div></section>
                <section class="cube__face" style="transform: rotateY(-90deg) translateZ(100px); "><div></div></section>
                <section class="cube__face" style="transform: rotateY(90deg) translateZ(100px);"><div></div><div class="radius-c"></div></section>
                <section class="cube__face" style="transform: rotateY(180deg) translateZ(100px);"><div></div><div  class="radius-c"></div></section>
              </figure>
              <figure class="cube__inner" style="width: 200px; height: 200px;">
                <section class="cube__face" style="transform: rotateX(0deg) translateZ(100px);"></section>
                <section class="cube__face" style="transform: rotateX(-90deg) translateZ(100px);"></section>
                <section class="cube__face" style="transform: rotateX(90deg) translateZ(100px);"></section>
                <section class="cube__face" style="transform: rotateY(-90deg) translateZ(100px);"></section>
                <section class="cube__face" style="transform: rotateY(90deg) translateZ(100px);"></section>
                <section class="cube__face" style="transform: rotateY(180deg) translateZ(100px);"></section>
              </figure>
            </span>

        </div>
        <div class="close-box" @click="goback">
          <img src="../assets/img/aiExploration/goback.png" alt="">
          <span>关闭AI工具箱</span>
        </div>
      </div>
      <div class="right-a"  :class="{'opaticyM': isOpt === false}">
        <ul  class="ai-uls">
          <li class="ai-list" @click="gotoInfo(1)">
            <div class="img-a">
              <img src="../assets/img/aiExploration/img1.png" alt="">
            </div>
            <p class="text1">人脸识别</p>
            <p class="text2">分析检测到的人脸情绪</p>
          </li>
          <li class="ai-list" @click="gotoInfo(2)">
            <div class="img-a">
              <img src="../assets/img/aiExploration/img2.png" alt="">
            </div>
            <p class="text1">风格转换</p>
            <p class="text2">转换任意风格，修出最美照片</p>
          </li>
          <li class="ai-list" @click="gotoInfo(3)">
            <div class="img-a">
              <img src="../assets/img/aiExploration/img3.png" alt="">
            </div>
            <p class="text1">智能聊天</p>
            <p class="text2">聊天是一门艺术，和机器人聊天更是一件有趣的事！</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  /*eslint-disable*/
  import Dialog from '@/components/dialog'

  export default {
    data() {
      return {
        isOpt: false,
        isShow: true
      }
    },
    mounted () {
      if (this.$route.query.name) {
        this.isShow = false
        this.isOpt = true
      }
    },
    methods: {
      // 列表
      gotoInfo (index) {
        if (index === 1) this.$router.push('/emotion')
        if (index === 2) this.$router.push('/styleTransfer')
        if (index === 3) this.$router.push('/intelChat')
      },
      goback () {
        this.isOpt = false
        setTimeout(() => {
          this.isShow = true
        }, 500)
      },
      gotoM () {
        this.isOpt = true
        setTimeout(() => {
          this.isShow = false
        }, 500)
      }
    },
  }
</script>

<style scoped lang="stylus">
  @import '../assets/css/animation.styl';
  .aiExploration
    overflow hidden
    width: 100%
    height: calc(100vh - 80px)
    background: url("../assets/img/aiExploration/ai_bg.jpg") no-repeat center / cover
    .a-w
      width: 100%
      height: 100%
      display: flex
      align-items center
      justify-content center
      color #fff
      @media screen and (max-width: 1400px)
        justify-content space-between
        padding: 0 10px
    .left-m
      opacity: 1
      transition all .3s linear
      &.opaticyM
        opacity: 0
      .text1
        font-size: 48px
        line-height: 1.5
      .text2
        font-size: 20px
        line-height: 2
        max-width: 600px
        margin: 20px 0 50px
      .button-n
        width: 260px
        height: 58px
        cursor pointer
        display: flex
        align-items center
        justify-content center
        background-color: #3376ff
    .right-m
      margin-left: 225px
      position: relative
      width: 532px
      opacity: 1
      transition all .3s linear
      @media screen and (max-width: 1400px)
        margin-left: 30px
      &.opaticyM
        opacity: 0
      .img-box
        width: 532px
        margin-top: 200px
        img
          display: block
          width: 100%
      .webpack
        position: absolute
        left: 228px
        top: 0
        width: 318px
        height: 351px
  .ai-hall-w
    width: 100%
    height: 100%
    display: flex
    align-items center
    justify-content center
    color #fff
    @media screen and (max-width: 1600px)
      justify-content space-between
      padding: 0 10px
    .left-a
      position: relative
      opacity: 1
      transition all .3s linear
      @media screen and (max-width: 1600px)
        width: 50%
      &.opaticyM
        opacity: 0
     .close-box
       display: flex
       align-items center
       justify-content center
       color #fff
       font-size: 20px
       cursor pointer
       padding: 30px 0
       img
         width: 23px
         display: block
         margin-right: 16px
     .img-box
       width: 532px
       margin-top: 200px
       img
         display: block
         width: 100%
     .webpack
       position: absolute
       left: 228px
       top: 0
       width: 318px
       height: 351px
    .right-a
      margin-left: 225px
      opacity: 1
      transition all .3s linear
      @media screen and (max-width: 1600px)
        width: 50%
        margin-left: 0
      &.opaticyM
        opacity: 0
      .ai-uls
        display: flex
        flex-wrap wrap
        width 820px
        @media screen and (max-width: 1600px)
          width: 100%
        .ai-list
          width: 380px
          margin-right: 60px
          margin-bottom: 60px
          cursor pointer
          transform translateY(0)
          transition all .3s linear
          &:hover
            transform translateY(-2%)
          @media screen and (max-width: 1600px)
            width: 260px
          &:nth-child(2n)
            margin-right: 0
          &:nth-child(n + 2)
            margin-bottom: 0
          .img-a
            width: 100%
            img
              width: 100%
              display: block
          .text1
            font-size: 20px
            margin: 28px 0 16px 0
          .text2
            font-size: 16px


</style>
