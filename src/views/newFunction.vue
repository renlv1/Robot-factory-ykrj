<template>
    <div class="newFunction">
      <div class="closeImg">
        <img src="../assets/img/newFunction/close.png">
      </div>
      <div class="wrap">
        <div class="function-t">AI新功能</div>
        <div class="bottom-line"></div>
        <div class="function-c">抢先体验有趣的AI功能。点击开始体验来这里体验新鲜有趣的AI功能</div>
        <ul class="parent-ul">
          <li v-for="(item,index) in list" :key="index" class="li-child">
            <div class="img-item"><img :src="item.imgUrl"></div>
            <div class="li-t">{{item.text}}</div>
            <div class="li-c">{{item.text2}}</div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
       data() {
         return{
           list: [
             {
               imgUrl: require('../assets/img/home/robot1.png'),
               text: '深度学习',
               text2: '深度学习是用于建立、模拟人脑进行分析学习的神经网络，并模仿人脑的机制来解释数据的一种机器学习技术。它的基本特点是试图模仿大脑的神经元之间传递，处理信息的模式。最显著的应用是计算机视觉和自然语言处理(NLP)领域。'
             },
             {
               imgUrl: require('../assets/img/home/robot2.png'),
               text: '深度学习',
               text2: '深度学习是用于建立、模拟人脑进行分析学习的神经网络，并模仿人脑的机制来解释数据的一种机器学习技术。它的基本特点是试图模仿大脑的神经元之间传递，处理信息的模式。最显著的应用是计算机视觉和自然语言处理(NLP)领域。'
             },
             {
               imgUrl: require('../assets/img/home/robot3.png'),
               text: '深度学习',
               text2: '深度学习是用于建立、模拟人脑进行分析学习的神经网络，并模仿人脑的机制来解释数据的一种机器学习技术。它的基本特点是试图模仿大脑的神经元之间传递，处理信息的模式。最显著的应用是计算机视觉和自然语言处理(NLP)领域。'
             },
           ],
         }
       }
    }
</script>

<style scoped lang="stylus">
.closeImg{
  cursor pointer
  margin 60px 0 0 160px
  img{
    display block
    width 44px
  }
}
.wrap{
  display flex
  flex-direction column
  align-items center
  .function-t{
    font-size 32px
    color #08061d
  }
  .bottom-line{
    width 80px
    height 2px
    background-color #090d21
    margin 24px 0
  }
  .function-c{
    font-size 16px
    color #08061d
    margin-bottom 80px
  }
  .parent-ul{
    display flex
    @media screen and (max-width: 1200px) {
      display block
    }
    .li-child{
      border 1px dashed #ddd
      width 358px
      margin-right 50px
      @media screen and (max-width: 1200px) {
        margin-right 0
        margin-bottom 30px
      }
      &:last-child{
        margin-right 0
        @media screen and (max-width: 1200px) {
          margin-bottom 0
        }
      }
      .img-item{
        width 100%
        img{
          display block
          width 100%
          height 210px
        }
      }
      .li-t{
        font-size 20px
        color #08061d
        padding 0 20px
        margin 24px 0 14px
      }
      .li-c{
        font-size 16px
        color #333
        padding 0 20px 30px
      }
    }
  }
}
</style>
