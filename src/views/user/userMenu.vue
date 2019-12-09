<template>
  <div class="user-w">
    <div class="user-m">
      <div class="menu" :class="{'disable-menu': disableMenu}">
<!--        <div class="pack-up">-->
<!--          <div class="pack-up-m">-->
<!--            <img src="../../assets/img/common/pack-up.png" alt="">-->
<!--          </div>-->
<!--        </div>-->
        <ul class="menu-uls">
          <li class="charles-list" :class="{'active-charles': charlesShow}" @click="clickOne">
            <div class="img-con">
              <i class="fa fa-linux"></i>
            </div>
            <div class="name-w" @click.stop>
              <p>{{robotName}}</p>
              <div class="img-chat" @click="gotoChat">
                <img src="../../assets/img/user/chat.png" alt="">
              </div>
            </div>
          </li>
          <li  v-for="(item, index) in menuArr" :key="index" class="li-big" :class="{'max-height': item.childFlag === true}">
            <div class="menu-list"  @click="gotoPath(index, item)" :class="{'active-list': activeIndex === index}">
              <div class="img-box">
                <img :src="item.icon" alt="">
              </div>
              <p class="name">{{item.name}}</p>
            </div>
            <div v-for="(child, midx) in item.children" :key="midx"
                 @click="smallClick(index, midx)"
                 :class="{'active-list': smallIndex === midx}" class="child">{{child.name}}</div>
          </li>
        </ul>
      </div>
      <div class="right-cont">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
        disableMenu: false,
        smallIndex: -1,
        activeIndex: -1,
        charlesShow: false,
        robotName: '',
			  menuArr: [
          {
            childFlag: false,
            icon: require('../../assets/img/user/corpus.png'),
            name: this.$t('knowledge.text1')
          },
          {
            icon: require('../../assets/img/user/knowledge.png'),
            name: this.$t('knowledge.text2'),
            childFlag: false,
            children: [
              {name: this.$t('knowledge.text3')}, {name: this.$t('knowledge.text4')}
            ]
          },
          {
            childFlag: false,
            icon: require('../../assets/img/user/setting.png'),
            name: this.$t('knowledge.text5')
          }
        ]
      }
		},
    created () {
		  this.getrobot()
    },
    mounted() {
		  this.getRoute()
      this.robotName = this.$route.query.name
    },
    methods: {
		  getrobot () {
        let username = localStorage.getItem('__userEmail__')
        if (!username) return
        this.$fetch.post('/account', {
          operation: "GetAccount",
          username: username
        }).then(res => {
          this.axiosShow = false
          if (res.chatbots && res.chatbots[0]) {
            this.disableMenu = false
          } else {
            this.disableMenu = true
          }
        })
      },
      gotoChat () {
		    this.$router.push({
          path: '/aiChat',
          query: {
            apiKey: this.$route.query.apiKey
          }
        })
      },
      smallClick (index, midx) {
        this.smallIndex = midx
        this.activeIndex = -1
        let query = {
          uuid: this.$route.query.uuid,
          name: this.$route.query.name,
          apiKey: this.$route.query.apiKey,
          createdAt: this.$route.query.createdAt,
          endpoint: this.$route.query.endpoint,
          index: midx
        }
        if (midx === 0) {
          this.$router.push({path: '/user/knowledge/productXmind', query: query})
        } else if (midx === 1) {
          this.$router.push({path: '/user/knowledge/knowledgeXmind', query: query})
        }
      },
      gotoPath (index, item) {
        this.smallIndex = -1
        this.activeIndex = index
        this.charlesShow = false
        let query = {
          uuid: this.$route.query.uuid,
          name: this.$route.query.name,
          apiKey: this.$route.query.apiKey,
          createdAt: this.$route.query.createdAt,
          endpoint: this.$route.query.endpoint,
        }
        if (index === 0) {
          this.$router.push({
            path: '/user/corpusMenu/corpus',
            query: query
          })
        } else if (index === 2) {
          this.$router.push({
            path: '/user/setting',
            query: query
          })
        } else if (index === 1) {
          this.$router.push({
            path: '/user/knowledge/productXmind',
            query: query
          })
          item.childFlag = true
        }
      },
      clickOne () {
        this.activeIndex = -1
        this.charlesShow = true
        let query = {
          uuid: this.$route.query.uuid,
          name: this.$route.query.name,
          apiKey: this.$route.query.apiKey,
          createdAt: this.$route.query.createdAt,
          endpoint: this.$route.query.endpoint,
        }
        this.$router.push({
          path: '/user/charles',
          query: query
        })
      },
      getRoute () {
        this.robotName = this.$route.query.name
        this.menuArr[1].childFlag = false
        if (this.$route.path === '/user/charles') {
          this.activeIndex = -1
          this.charlesShow = true
        } else if (this.$route.path === '/user/corpusMenu/corpus') {
          this.activeIndex = 0
          this.charlesShow = false
        } else if (this.$route.path === '/user/corpusMenu/addCorpus') {
          this.activeIndex = 0
          this.charlesShow = false
        } else if (this.$route.path === '/user/corpusMenu/fileManagement') {
          this.activeIndex = 0
          this.charlesShow = false
        } else if (this.$route.path === '/user/knowledge/productXmind' && Number(this.$route.query.index) === 0) {
          this.smallIndex = 0
          this.charlesShow = false
          this.menuArr[1].childFlag = true
        } else if (this.$route.path === '/user/knowledge/knowledgeXmind' && Number(this.$route.query.index) === 1) {
          this.smallIndex = 1
          this.charlesShow = false
          this.menuArr[1].childFlag = true
        } else if (this.$route.path === '/user/knowledge/productXmind') {
          this.activeIndex = -1
          this.smallIndex = 0
          this.charlesShow = false
          this.menuArr[1].childFlag = true
        } else if (this.$route.path === '/user/knowledge/ai') {
          this.activeIndex = -1
          this.charlesShow = false
          this.smallIndex = 1
          this.menuArr[1].childFlag = true
        } else if (this.$route.path === '/user/knowledge/houseToken') {
          this.activeIndex = -1
          this.charlesShow = false
          this.smallIndex = 0
          this.menuArr[1].childFlag = true
        } else if (this.$route.path === '/user/setting') {
          this.activeIndex = 2
          this.charlesShow = false
        } else if (this.$route.path === '/user/userinfo') {
          this.activeIndex = -1
          this.charlesShow = false
          this.smallIndex = -1
        }
      },
    },
    watch: {
		  '$route': 'getRoute'
    }
	}
</script>

<style scoped lang="stylus">
.user-w
  .user-m
    height calc(100vh - 80px)
    display: flex
    width: 100%
    .menu
      height: 100%
      width: 300px
      background-color: #090d21
      position: fixed
      top: 80px
      left: 0
      bottom: 0
      @media screen and (max-width: 1400px)
        width: 200px
      &.disable-menu
        cursor not-allowed
        &::before
          content ''
          position: absolute
          left: 0
          top: 0
          width: 100%
          height: 100%
          z-index: 111
      .pack-up
        height: 68px
        display: flex
        align-items center
        justify-content flex-end
        .pack-up-m
          padding: 20px
          cursor pointer
          img
            display: block
            width: 18px
            height: 16px
      .menu-uls
        .charles-list
          color #3376ff
          display: flex
          align-items center
          justify-content center
          flex-direction column
          height: 148px
          cursor pointer
          &.active-charles
            background-color: #1d243c
            color #3376ff
          .name-w
            display: flex
            align-items center
            justify-content center
            .img-chat
              padding: 10px 20px
              img
                display: block
                width: 20px
          .img-con
            width: 58px
            height: 58px
            border-radius 50%
            background-color: #fff
            margin-bottom: 14px
            display: flex
            align-items center
            justify-content center
            .fa-linux
              font-size: 32px
              color #000
              display: block
        .li-big
          max-height: 88px
          overflow: hidden
          transition all .3s linear
          &.max-height
            max-height 220px
        .child
          height: 68px
          line-height: 68px
          color #fff
          padding-left: 100px
          border-left: 6px solid transparent;
          cursor pointer
          @media screen and (max-width: 1400px)
            padding-left: 50px
          &.active-list
            border-left: 6px solid #3376ff
            background-color: #1d243c
        .menu-list
          height: 68px
          margin: 10px 0
          display: flex
          align-items center
          color #fff
          font-size: 16px
          padding-left: 42px
          cursor pointer
          border-left: 6px solid transparent
          @media screen and (max-width: 1400px)
            padding-left: 10px
          &:nth-child(1) .img-box
            width: 44px
            height: 44px
          &.active-list
            border-left: 6px solid #3376ff
            background-color: #1d243c
          .img-box
            width: 44px
            display: flex
            align-items center
            justify-content center
            margin-right: 14px
    .right-cont
       flex 1
</style>
