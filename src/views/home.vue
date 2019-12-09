<template>
  <div class="home">
<!--    <div class="line-one common">-->
<!--    </div>-->
<!--    <div class="line-two common">-->
<!--    </div>-->
<!--    <div class="line-three common">-->
<!--    </div>-->
<!--    <div class="line-four common">-->
<!--    </div>-->
<!--    <div class="line-five common">-->
<!--    </div>-->
    <div class="wrap">
      <div class="banner">
        <div class="home-one">
          <div class="one-title">{{$t('home.text1')}}</div>
          <div class="world">{{$t('home.text2')}}</div>
          <div class="guidance">{{$t('home.text3')}}</div>
        </div>
      </div>
    </div>
    <div class="home-two">
      <div class="two-content">
        <div class="zhi-jiao">
          <span><i></i></span>
        </div>
        <div class="two-title">
          <div class="title-up">{{$t('home.text4')}}</div>
          <span>{{$t('home.text5')}}</span>
        </div>
      </div>
      <div class="view-content">
        <div class="view-our">VIEWOUR</div>
        <div class="view-t" @click="$router.push('/robotManagement')">
          <div class="view-c">{{$t('home.text6')}}</div>
          <div class="zhi-jiao">
            <span><i></i></span>
          </div>
          <div class="img-one"><img src="../assets/img/home/01.png"></div>
        </div>
      </div>
      <div class="img-jump">
        <div class="jump-content"><img src="../assets/img/home/pic2.png"></div>
      </div>
    </div>
    <div class="home-four">
      <div class="four-main">
        <div class="view-content">
          <div class="view-our">VIEWOUR</div>
          <div class="view-t" @click="$router.push('/aiExploration')">
            <div class="view-c">{{$t('home.text8')}}</div>
            <div class="zhi-jiao">
              <span><i></i></span>
            </div>
            <div class="img-one"><img src="../assets/img/home/02.png"></div>
          </div>
        </div>
      </div>
      <div class="right-m">
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
<!--      <div class="swiper-box">-->
<!--        <swiper :options="swiperOption" ref="mySwiper" class="swiper-home">-->
<!--          <swiper-slide v-for="(item, index) in  $t('home.swiperList')" :key="index">-->
<!--            <img :src="item.imgUrl" alt="">-->
<!--            <div class="swiper-title">-->
<!--              <p>{{item.text}}</p>-->
<!--              <span>{{item.text2}}</span>-->
<!--            </div>-->
<!--          </swiper-slide>-->
<!--          <div class="swiper-button-prev" slot="button-prev" @click="goto()">-->
<!--            <div class="prev-box">-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="swiper-button-next" slot="button-next" @click="goto()">-->
<!--            <div class="next-box">-->
<!--            </div>-->
<!--          </div>-->
<!--        </swiper>-->
<!--        <div class="bar-group">-->
<!--          <div class="bar-pro">-->
<!--            <div class="swiper-active">-->
<!--              <ul>-->
<!--                <li :class="{swiperActive: cuIndex === 1}"></li>-->
<!--                <li :class="{swiperActive: cuIndex === 2}"></li>-->
<!--                <li :class="{swiperActive: cuIndex === 3}"></li>-->
<!--                <li :class="{swiperActive: cuIndex === 4}"></li>-->
<!--              </ul>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <div class="home-three">
      <div class="view-content">
        <div class="view-our">VIEWOUR</div>
        <div class="view-t">
          <div class="view-c">{{$t('home.text7')}}</div>
          <div class="zhi-jiao">
            <span><i></i></span>
          </div>
          <div class="img-one"><img src="../assets/img/home/03.png"></div>
        </div>
      </div>
      <div class="robot-box">
         <ul class="robot-img">
<!--           <router-link v-for="(item,index) in list" :key="index" class="li-robot" :to="item.link" tag="li">-->
<!--             <div class="robot-icon"><img :src="item.imgUrl"></div>-->
<!--             <div class="robot-t">{{item.text}}</div>-->
<!--             <div class="robot-c"><div class="chat-name">{{item.text2}}</div><div class="goto-chat"><img src="../assets/img/home/big-right.png"></div></div>-->
<!--           </router-link>-->
           <li v-for="(item,index) in $t('home.list')" :key="index" class="li-robot" >
             <div class="robot-icon"><img :src="item.imgUrl"></div>
             <div class="robot-t">{{item.text}}</div>
             <div class="robot-c"><div class="chat-name">{{item.text2}}</div><div class="goto-chat"><img src="../assets/img/home/big-right.png"></div></div>
           </li>
         </ul>
      </div>
    </div>
    <div class="home-five">
      <div class="view-content">
        <div class="view-our">VIEWOUR</div>
        <div class="view-t">
          <div class="view-c">{{$t('home.text9')}}</div>
          <div class="zhi-jiao">
            <span><i></i></span>
          </div>
          <div class="img-one"><img src="../assets/img/home/04.png"></div>
        </div>
      </div>
      <div class="robot-box">
        <ul class="robot-img">
          <li v-for="(item,index) in $t('home.studyList')" :key="index" class="li-robot" :class="{studyActive: studyLi}">
            <div class="study-one">
              <div class="robot-icon"><img :src="item.imgUrl"></div>
              <div class="robot-t">{{item.text}}</div>
            </div>
            <div class="study-two">
              <div class="robot-icon"><img :src="item.imgUrl"></div>
              <div class="robot-t">{{item.text}}</div>
              <div class="bg"></div>
              <div class="robot-d" ref="robotDes" :class="{robotDes: activeRobot}">{{item.text2}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		data() {
			return {
        activeRobot: false,
        studyLi: false,
        cuIndex: 1,
        nowIndex: 0,
        swiperOption: {
          loop: true,
          // autoplay: 1000,
          activeitem: 0,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next',
          autoplayDisableOnInteraction: false,
          onSlideChangeEnd: swiper => {
            this.cuIndex = swiper.realIndex + 1
            return swiper.realIndex
          }
        },
      }
		},
    mounted() {
		  if(localStorage.getItem('discoveryLang') === 'EN'){
		    this.studyLi = true
        this.activeRobot = true
      } else {
        this.studyLi = false
        this.activeRobot = false
      }
    },
    methods: {
      goto(index) {
        setTimeout(() => {
          this.nowIndex = index
        }, 10)
      },
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      },
      highWidth() {
        return (this.nowIndex + 1) * 40 + 'px'
      },
      prevIndex() {
        if (this.nowIndex === 0) {
          return this.$t('home.swiperList').length - 1
        } else {
          return this.nowIndex - 1
        }
      },
      nextIndex() {
        if (this.nowIndex === this.$t('home.swiperList').length - 1) {
          return 0
        } else {
          return this.nowIndex + 1
        }
      }
    },
    components: {
      // swiper,
      // swiperSlide,
      vFooter: () => import('@/components/footer'),
    }
	}
</script>

<style scoped lang="stylus">
  @import '../assets/css/animation.styl';
.home{
  width 100%
  /*min-height 100vh*/
  height 100%
  /*background url("../assets/img/home/bg.png") center no-repeat*/
  background #090d21
  .common{
    width 1px
    min-height 100vh
    background  #323646
    position fixed
    bottom 0
  }
  .line-one{
    left 40px
  }
  .line-two{
    left 300px
  }
  .line-three{
    left 900px
  }
  .line-four{
    left 1300px
  }
  .line-five{
    left 1850px
  }
  .wrap{
    height 700px
    position relative
  }
  .banner{
    position absolute
    top -80px
    width 100%
    height 780px
    background url("../assets/img/home/banner.png") no-repeat center
  }
  .home-one{
    position absolute
    top 260px
    left 200px
    .one-title{
      font-size 84px
      color #fff
    }
    .world{
      font-size 84px
      color #fff
    }
    .guidance{
      font-size 16px
      cursor pointer
      margin-top 60px
      display flex
      justify-content center
      background #d5242c
      width 250px
      height 60px
      color #fff
      line-height 60px
      text-align center
    }
  }
  .home-two{
    height 1490px
    position relative
    .two-content{
      position absolute
      top 100px
      left 200px
      .zhi-jiao{
        width: 0;
        height: 0;
        border-color:  #d5242c transparent;
        border-width: 0 0 58px 58px;
        border-style: solid;
      }
      .two-title{
        margin-left 96px
        color #fff
        font-size 24px
        .title-up{
          margin-bottom 24px
        }
      }
    }
    .view-content{
      top 500px
      position absolute
      left 50%
      transform translate(-50%)
      .view-our{
        text-align center
        font-size 15px
        color  #929ec7
        /*opacity .2*/
        margin-bottom 36px
      }
      .view-t{
        cursor pointer
        position relative
        color #fff
        font-size 30px
        display flex
        align-items flex-end
        .view-c{
          margin-right 12px
        }
        .zhi-jiao{
          position absolute
          right -10px
          bottom 3px
          width: 0;
          height: 0;
          border-color:  #d5242c transparent;
          border-width: 0 0 14px 14px;
          border-style: solid;
        }
      }
      .img-one{
        position absolute
        right -386px
        top -80px
        width 370px
        /*height 256px*/
        /*background url("../assets/img/home/02.png") no-repeat center*/
        img{
          display block
          width 100%
          height 100%
        }
      }
    }
    .img-jump{
      position absolute
      left 45%
      transform translate(-50%)
      margin-top 700px
      width 1030px
      /*height 764px*/
      @media screen and (max-width:1400px){
        width 800px
      }
      .jump-content{
        width 100%
        position relative
      }
    }
  }
  .home-three{
    height 850px
    position relative
    .view-content{
        top 160px
        position absolute
        left 50%
        transform translate(-50%)
        .view-our{
          text-align center
          font-size 15px
          color  #929ec7
          /*opacity .2*/
          margin-bottom 36px
        }
        .view-t{
          position relative
          color #fff
          font-size 30px
          display flex
          align-items flex-end
          .view-c{
            margin-right 12px
          }
          .zhi-jiao{
            position absolute
            right -10px
            bottom 3px
            width: 0;
            height: 0;
            border-color:  #d5242c transparent;
            border-width: 0 0 14px 14px;
            border-style: solid;
          }
        }
        .img-one{
          position absolute
          right -390px
          top -80px
          width 364px
          height 250px
          /*background url("../assets/img/home/03.png") no-repeat center*/
          img{
            display block
            width 100%
            height:100%
          }
        }
      }
    .robot-box{
      top 350px
      position absolute
      right 100px
      left 100px
      .robot-img{
        display flex
        justify-content space-between
        .li-robot{
          cursor pointer
          display flex
          flex-direction column
          justify-content center
          align-items center
          flex 1
          height 460px
          &:hover{
            background #12182f
            .robot-c{
              border none
              background #d5242c
            }
          }
          .robot-icon{
            width 132px
            height 132px
            img{
              display block
              width 100%
            }
          }
          .robot-t{
            font-size 18px
            color #fff
            margin 52px 0 60px
          }
          .robot-c{
            display flex
            justify-content center
            align-items center
            color #fff
            line-height 60px
            text-align center
            width 250px
            height 60px
            border 1px solid #fff
            .chat-name{
              margin-right 20px
            }
            .goto-chat{
              width 40px
              height 11px
              img{
                width 100%
                display block
              }
            }
          }
        }
      }
    }
  }
  .home-four{
    height 800px
    .four-main{
      height 300px
      position relative
      .view-content{
        position absolute
        left 50%
        transform translate(-50%)
        .view-our{
          text-align center
          font-size 15px
          color  #929ec7
          /*opacity .2*/
          margin-bottom 36px
        }
        .view-t{
          cursor pointer
          position relative
          color #fff
          font-size 30px
          display flex
          align-items flex-end
          .view-c{
            margin-right 12px
          }
          .zhi-jiao{
            position absolute
            right -10px
            bottom 3px
            width: 0;
            height: 0;
            border-color:  #d5242c transparent;
            border-width: 0 0 14px 14px;
            border-style: solid;
          }
        }
        .img-one{
          position absolute
          right -408px
          top -80px
          width 380px
          height 260px
          /*background url("../assets/img/home/04.png") no-repeat center*/
          img{
            display block
            width 100%
            height 100%
          }
        }
      }
    }
    .swiper-box{
      position relative
      display flex
      justify-content space-around
      .swiper-home{
        /*width 1420px*/
        float left
        margin-right 50px
        .swiper-title{
          padding 30px
          color #fff
          font-size 20px
          text-align left
          position absolute
          right 130px
          top 0
          width 510px
          height 140px
          background #d5242c
          @media screen and (max-width:1820px){
            right 0
          }
        }
        img{
          display block
          width 1420px
          height 820px
          @media screen and (max-width:1420px){
            width 1000px
            height 600px
          }
        }
        >>> .swiper-button-prev{
          display: flex;
          justify-content: center;
          align-items: center;
          background-image: none;
          background #232e59
          width 100px
          height 90px
          position: absolute;
          left: 1200px;
          bottom 10%
          opacity: 1;
          cursor: pointer;
          top 752px
          @media screen and (max-width:1820px){
            left: 83%;
          }
          @media screen and (max-width:1418px){
            top 534px
            left: 75%;
          }
          .prev-box{
            width 40px
            height 11px
            background url("../assets/img/home/arrow-left.png")
          }
        }
        >>>.swiper-button-next{
          display: flex;
          justify-content: center;
          align-items: center;
          background-image: none;
          background #232e59
          width 100px
          height 90px
          position: absolute;
          left: 1320px;
          bottom 10%
          opacity: 1;
          cursor: pointer;
          top 752px
          @media screen and (max-width:1820px){
            left: 93%;
          }
          @media screen and (max-width:1418px){
            top 534px
            left: 90%;
          }
          .next-box{
            width 40px
            height 11px
            background url("../assets/img/home/big-right.png")
          }
        }
      }
      .bar-group {
        margin-right 300px
        .bar-pro{
          border-radius 4px
          float right
          position: relative;
          top: 380px;
          width: 4px;
          height: 160px;
        }
        .high-bar {
          border-radius 4px
          position: absolute;
          left: 0;
          width: 4px;
          background-color: #fff;
        }
        .swiper-active{
          border-radius 4px
          position: absolute;
          width: 4px;
          height: 160px;
          background #141a33
          @media screen and (max-width: 1600px) {
            bottom: 40%;
          }
          ul{
            li{
              border-radius 4px
              width: 4px;
              height: 40px;
              &.swiperActive{
                background: #fff;
              }
            }
          }
        }
        .number-one{
          position: absolute;
          top -30px
          left -6px
          color #fff
          font-size 16px
        }
        .number-two{
          position: absolute;
          top 166px
          left -6px
          color #fff
          font-size 16px
        }
      }
    }
    .right-m{
      margin  0 auto
      position: relative
      width: 532px
      opacity: 1
      transition all .3s linear
      &.opaticyM{
        opacity: 0
      }
      .img-box{
        width: 532px
        margin-top: 200px
        img{
          display: block
          width: 100%
        }
      }
      .webpack{
        position: absolute
        left: 228px
        top: -215px
        width: 318px
        height: 351px
      }
    }
  }
  .home-five{
    height 900px
    position relative
    .view-content{
      top 160px
      position absolute
      left 50%
      transform translate(-50%)
      .view-our{
        text-align center
        font-size 15px
        color  #929ec7
        /*opacity .2*/
        margin-bottom 36px
      }
      .view-t{
        position relative
        color #fff
        font-size 30px
        display flex
        align-items flex-end
        .view-c{
          margin-right 12px
        }
        .zhi-jiao{
          position absolute
          right -10px
          bottom 3px
          width: 0;
          height: 0;
          border-color:  #d5242c transparent;
          border-width: 0 0 14px 14px;
          border-style: solid;
        }
      }
      .img-one{
        position absolute
        right -400px
        top -80px
        width 380px
        /*height 266px*/
        /*background url("../assets/img/home/05.png") no-repeat center*/
        img{
          display block
          height 100%
          width 100%
        }
      }
    }
    .robot-box{
      right 100px
      left 100px
      top 350px
      position absolute
      .robot-img{
        display flex
        justify-content space-between
        .li-robot{
          cursor pointer
          display flex
          flex-direction column
          justify-content center
          align-items center
          /*width 350px*/
          height 340px
          flex 1
          &:hover{
            background #12182f
            height 340px
            &.studyActive{
              height 460px
            }
            .study-one{
              display none
            }
            .study-two{
              display flex
              .robot-d{
                height 140px
                &.robotDes{
                  height 270px
                }
              }
            }
          }
          .study-one{
            display flex
            flex-direction column
            justify-content center
            align-items center
            .robot-icon{
              width 72px
              height 80px
              img{
                display block
                width 100%
              }
            }
            .robot-t{
              font-size 18px
              color #fff
              margin 52px 0 60px
            }
          }
          .study-two{
            padding 0 20px
            display none
            flex-direction column
            justify-content center
            align-items center
            .robot-icon{
              width 72px
              height 80px
              img{
                display block
                width 100%
              }
            }
            .robot-t{
              z-index 2
              margin 20px 0
              font-size 18px
              color #fff
              }
            .bg{
              margin-top -30px
              width 90px
              height 10px
              background #d5242c
            }
            .robot-d{
              text-align: center
              margin-top 20px
              height 140px
              font-size 14px
              color #fff
            }
          }
        }
      }
    }
  }
}
</style>
