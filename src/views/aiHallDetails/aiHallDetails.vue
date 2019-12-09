<template>
  <div class="ai-hall-w">
    <div class="left-a">
      <div class="img-box">
        <img src="../../assets/img/aiExploration/aureole.png" alt="">
      </div>
      <div class="webpack">
        <span class="cube cube--dark" style="width: 200px; padding-bottom: 60px;">
          <figure class="cube__outer" style="width: 200px; height: 200px;">
            <section class="cube__face" style="transform: rotateX(0deg) translateZ(100px);">
              <div class="smalll-cube">
                <div class="smalll-cube-r">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </section>
            <section class="cube__face" style="transform: rotateX(-90deg) translateZ(100px); "></section>
            <section class="cube__face" style="transform: rotateX(90deg) translateZ(100px); "></section>
            <section class="cube__face" style="transform: rotateY(-90deg) translateZ(100px); "></section>
            <section class="cube__face" style="transform: rotateY(90deg) translateZ(100px);"></section>
            <section class="cube__face" style="transform: rotateY(180deg) translateZ(100px);"></section>
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
<!--        <div class="radius-w">-->
<!--          <div class="radius"></div>-->
<!--          <div class="radius"></div>-->
<!--          <div class="radius"></div>-->
<!--          <div class="radius"></div>-->
<!--          <div class="radius"></div>-->
<!--          <div class="radius"></div>-->
<!--          <div class="radius"></div>-->
<!--          <div class="radius"></div>-->
<!--        </div>-->
      </div>
      <div class="close-box" @click="goback">
        <img src="../../assets/img/aiExploration/goback.png" alt="">
        <span>关闭AI工具箱</span>
      </div>
    </div>
    <div class="right-a">
      <ul  class="ai-uls">
        <li class="ai-list" @click="gotoInfo(1)">
          <div class="img-a">
            <img src="../../assets/img/aiExploration/img1.png" alt="">
          </div>
          <p class="text1">人脸识别</p>
          <p class="text2">分析检测到的人脸情绪</p>
        </li>
        <li class="ai-list" @click="gotoInfo(2)">
          <div class="img-a">
            <img src="../../assets/img/aiExploration/img2.png" alt="">
          </div>
          <p class="text1">风格转换</p>
          <p class="text2">转换任意风格，修出最美照片</p>
        </li>
        <li class="ai-list" @click="gotoInfo(3)">
          <div class="img-a">
            <img src="../../assets/img/aiExploration/img3.png" alt="">
          </div>
          <p class="text1">智能聊天</p>
          <p class="text2">聊天是一门艺术，和机器人聊天更是一件有趣的是！</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
			  vHtml: ''
      }
		},
    mounted () {
    },
    methods: {
		  // 返回上一页
      goback () {
        this.$router.push('/aiExploration')
      },
      // 列表
      gotoInfo (index) {
        if (index === 1) this.$router.push('/aiExploration')
        if (index === 2) this.$router.push('/aiExploration')
        if (index === 3) this.$router.push('/intelChat')
      }
    }
	}
</script>

<style scoped lang="stylus">
@import '../../assets/css/animation.styl';
.ai-hall-w
  width: 100%
  height: calc(100vh - 80px)
  background: url("../../assets/img/aiExploration/ai_bg.png") no-repeat center / cover
  display: flex
  align-items center
  justify-content center
  color #fff
  .left-a
    position: relative
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
    .ai-uls
      display: flex
      flex-wrap wrap
      max-width 820px
      .ai-list
        width: 380px
        margin-right: 60px
        margin-bottom: 60px
        cursor pointer
        &:nth-child(2n)
          margin-right: 0
        &:nth-child(n + 2)
          margin-bottom: 0
        .text1
          font-size: 20px
          margin: 28px 0 16px 0
        .text2
          font-size: 16px
</style>
