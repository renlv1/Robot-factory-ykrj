<template>
    <div class="autopilot">
      <div class="closeImg">
        <img src="../assets/img/newFunction/close.png">
      </div>
      <div class="wrap">
        <div class="function-t">自动驾驶</div>
        <div class="bottom-line"></div>
        <div class="function-c">【 AI驾驶汽车，科技改变生活 】</div>
        <div class="c-t">用户可以体验AI自动驾驶的全新技术，提升驾驶舒适度和安全感，感受科技对生活的改变。</div>
      </div>
<!--      <div class="swiper-box" id="product-image-slides">-->
<!--        <swiper :options="swiperOption" ref="mySwiper" class="swiper-home">-->
<!--          <swiper-slide v-for="(item, index) in  $t('home.swiperList')" :key="index" class="swiper-item">-->
<!--            <div class="img-box">-->
<!--              <i class="play-btn" @click="playVideo(index)"></i>-->
<!--              <img :src="item.imgUrl" alt="" class="swiper-img">-->
<!--            </div>-->
<!--          </swiper-slide>-->
<!--          <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--          <div class="swiper-button-next" slot="button-next"></div>-->
<!--        </swiper>-->
<!--&lt;!&ndash;        <div class="swiper-pagination"></div>&ndash;&gt;-->
<!--      </div>-->
      <div class="gallery-top-box">
        <div class="swiper-container gallery-top">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in  $t('home.swiperList')" :key="index">
              <div class="img-box">
                <i class="play-btn" @click="playVideo(index)"></i>
                <img :src="item.imgUrl" alt="" class="swiper-img">
              </div>
            </div>
          </div>
          <!-- Add Arrows -->
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
      </div>
<!--      <div class="swiper-nav" id="product-image-nav" >-->
<!--        <swiper :options="swiperOption2" ref="mySwiper" class="swiper-child">-->
<!--          <swiper-slide v-for="(item, index) in  $t('home.swiperList')" :key="index" class="child-item">-->
<!--            <div class="small-img"  :class="{active: index === cuIndex}">-->
<!--              <img :src="item.imgUrl" alt="" class="swiper-img">-->
<!--            </div>-->
<!--          </swiper-slide>-->
<!--&lt;!&ndash;          <div class="swiper-button-prev" slot="button-prev"></div>&ndash;&gt;-->
<!--&lt;!&ndash;          <div class="swiper-button-next" slot="button-next"></div>&ndash;&gt;-->
<!--        </swiper>-->
<!--&lt;!&ndash;        <div class="swiper-pagination"></div>&ndash;&gt;-->
<!--      </div>-->
      <div class="gallery-thumbs-box">
        <div class="swiper-container gallery-thumbs" >
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in  $t('home.swiperList')" :key="index">
              <div class="img-box" :class="{active: index === activeNum}">
                <img :src="item.imgUrl" alt="" class="swiper-img">
              </div>
            </div>
          </div>
        </div>
      </div>
<!--      <div class="small-nav">-->
<!--        <ul class="small-box">-->
<!--          <li class="li-parent"  v-for="(item, index) in  swiperList" :key="index" :class="{active: index === cuIndex}">-->
<!--            <div class="small-img">-->
<!--              <img :src="item.imgUrl">-->
<!--            </div>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
      <div class="video" v-show="videoShow">
        <div class="video-content">
          <i class="close" @click="close"></i>
          <video id="video" ref="video" width="100%" controls="" webkit-playsinline="true" playsinline="true">
            <source src="" type="video/mp4">
          </video>
        </div>
      </div>
    </div>
</template>

<script>
  /* eslint-disable */
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import Swiper from 'swiper'
    export default {
       data() {
         return{
           videoShow: false,
           itemIndex: 0,
           cuIndex: 0,
           activeNum: 0,
           swiperOption: {
             loop: true,
             // autoplay: 1000,
             effect: 'coverflow',
             slidesPerView : 3,
             loopedSlides :5,
             centeredSlides : true,
             activeitem: 0,
             // spaceBetween : 20,
             pagination: '.swiper-pagination',
             paginationClickable: true,
             prevButton: '.swiper-button-prev',
             nextButton: '.swiper-button-next',
             autoplayDisableOnInteraction: false,
             onSlideChangeEnd: swiper => {
               this.cuIndex = swiper.realIndex
               return swiper.realIndex
             },
             onInit(swiper) {
               this.activeitem = swiper.activeIndex - 1
             }
             // paginationBulletRender: function (swiper, index, className) {
             //   return `<ul> <li v-for="(item, index) in  this.$t('home.swiperList')"><div class="small-box"><img :src="item.imgUrl"></div></li></ul>`
             // },
             // coverflow: {
             //   rotate: 30,
             //   stretch: 10,
             //   depth: 60,
             //   modifier: 2,
             //   slideShadows : true
             // }
           },
           swiperList: [
             {
               imgUrl: require('../assets/img/home/pic.png'),
               text: '体验新鲜有趣的AI功能（敬请期待）',
               text2: '用户在线上传，功能分类明确'
             },
             {
               imgUrl: require('../assets/img/home/pic.png'),
               text: '体验新鲜有趣的AI功能（敬请期待）2',
               text2: '用户在线上传，功能分类明确'
             },
             {
               imgUrl: require('../assets/img/home/pic.png'),
               text: '体验新鲜有趣的AI功能（敬请期待）3',
               text2: '用户在线上传，功能分类明确'
             },
             {
               imgUrl: require('../assets/img/home/pic.png'),
               text: '体验新鲜有趣的AI功能（敬请期待）4',
               text2: '用户在线上传，功能分类明确'
             },
           ],
           swiperOption2: {
             slidesPerView : 4,
           }
        }
      },
      components: {
        swiper,
        swiperSlide,
      },
      watch: {
        // '$route': 'getPath'
      },
      created() {
      },
      mounted() {
        this.getPath()
        this.$nextTick(() => {
          var galleryThumbs  = new Swiper('.gallery-thumbs', {
            spaceBetween: 10,
            slidesPerView: 4,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
          });
          var galleryTop  = new Swiper('.gallery-top', {
            loop: true,
            grabCursor: true,
            // autoplay: true,
            effect: 'coverflow',
            slidesPerView : 3,
            loopedSlides :5,
            centeredSlides : true,
            activeitem: 0,
            spaceBetween : 30,
            pagination: '.swiper-pagination',
            paginationClickable: true,
            navigation:{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            },
            autoplayDisableOnInteraction: false,
            initialSlide :2,
            onSlideChangeEnd: swiper => {
              this.cuIndex = swiper.realIndex
              return swiper.realIndex
            },
            onTransitionStart(swiper) {
              this.activeNum = galleryTop.activeIndex
            },
            thumbs: {
              swiper: galleryThumbs,
            }
          })
        })
      },
      methods: {
        getPath () {
         this.activeNum = this.cuIndex
        },
        playVideo(index){
          this.$refs.video.play()
          this.videoShow = true
        },
        close () {
          this.videoShow = false
          this.$refs.video.pause()
        }
      }
    }
</script>

<style scoped lang="stylus">
.gallery-top-box{
  width 1200px
  margin 0 auto 50px
  .swiper-container{
    .swiper-wrapper{
      .swiper-slide{
        &.swiper-slide-active{
          .img-box{
            .play-btn{
              display block
            }
          }
        }
        .img-box{
          width 380px
          position relative
          .swiper-img{
            width 380px
          }
          .play-btn{
            display none
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            background: url("../assets/img/newFunction/play.png") no-repeat center;
            background-size: 100%;
            width: 60px;
            height: 60px;
            img{
              box-shadow:  0 1px 6px rgba(0,0,0, .45);
              border-radius: 50%;
              display: none;
            }
            border-radius: 50%;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.swiper-box{
  width 1200px
  margin 0 auto 50px
  .swiper-home{
    width 100%
    .swiper-item{
      display flex
      justify-content center
      &.swiper-slide-active{
        .img-box{
          .play-btn{
            display block
          }
        }
      }
      .img-box{
        width 380px
        position relative
        .swiper-img{
          width 380px
        }
        .play-btn{
          display none
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          background: url("../assets/img/newFunction/play.png") no-repeat center;
          background-size: 100%;
          width: 60px;
          height: 60px;
          img{
            box-shadow:  0 1px 6px rgba(0,0,0, .45);
            border-radius: 50%;
            display: none;
          }
          border-radius: 50%;
          cursor: pointer;
        }
      }

    }
  }
  .swiper-pagination{
    width 1200px
    margin 50px auto 0
    ul{
      display flex
      li{
        width 200px
        .small-box{
          width 100%
          img{
            width 100%
          }
        }
      }
    }
  }
}
>>>.swiper-slide-shadow-left{
     height 0
   }
>>>.swiper-slide-next{
  height 0
}
.gallery-thumbs-box{
  width 1200px
  margin 0 auto
  .swiper-container{
    .swiper-wrapper{
      .swiper-slide{
        opacity .3
        &.swiper-slide-thumb-active{
          opacity 1
          .img-box {
            &.active {
              /*border 1px solid #d5242c*/
            }
          }
        }
        .img-box{
          width 250px
          height 136px
          &.active{
            /*border 1px solid #d5242c*/
          }
          .swiper-img{
            width 100%
            height 100%
          }
        }
      }
    }
  }
}
.swiper-nav{
  width 1200px
  margin 0 auto
  .swiper-child{
    .child-item{
      .small-img{
        width 252px
        &.active{
          border 1px solid #d5242c
        }
        .swiper-img{
          width 250px
          .img{
            width 100%
          }
        }
      }
    }
  }
}
.small-box{
  display flex
  justify-content center
  width 1200px
  margin 50px auto 0
  .li-parent{
    width 250px
    height 136px
    margin-right 20px
    box-sizing border-box
    &.active{
      border 1px solid #d5242c
    }
    &:last-child{
      margin-right 0
    }
    .small-img{
      width 100%
      height 100%
      img{
        display block
        width 100%
        height 100%
      }
    }
  }
}
.video{
  position: fixed;
  background: rgba(0,0,0,.6);
  width: 100%;
  height: 100%;
  z-index: 99;
  top: 0;
  left: 0;
  &-content{
    width: 800px;
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);
    background: #000;
  }
  .close{
    position: absolute;
    right: 0;
    top: -18px;
    width: 20px;
    height: 20px;
    transform: rotate(-45deg);
    -webkit-transform-origin: 30% 20%;
    -ms-transform-origin: 30% 20%;
    -moz-transform-origin: 30% 20%;
    &:before,&:after{
      content: '';
      width: 2px;
      height: 20px;
      position: absolute;
      left: 9px;
      top: 0;
      background: #999;
    }
    &:after{
      transform: rotate(90deg)
    }
    &:hover{
      &:before,&:after{
        background: #dc2f2f;
      }
    }
    cursor: pointer;
    z-index: 22;
  }
}
</style>
