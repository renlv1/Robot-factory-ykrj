<template>
  <div class="header-w" :class="{'fixed-head': isFixed}">
    <h1 class="logo">
      <router-link to="/" class="img-a">
        <img src="../assets/img/common/logo.png" alt="" class="img">
      </router-link>
    </h1>
    <ul class="menu-uls">
      <router-link to="/home" tag="li" class="list">{{$t('header.text1')}}</router-link>
      <router-link to="/robotManagement" tag="li" class="list">{{$t('header.text2')}}</router-link>
      <router-link to="/aiChat" tag="li" class="list">{{$t('header.text3')}}</router-link>
      <router-link to="/aiExploration" tag="li" class="list" :class="{'router-link-active': activeFlag}">{{$t('header.text4')}}</router-link>
<!--      语言切换  -->
      <li class="list language-m">
        <div class="top">
          <div>{{currentLang}}</div>
          <img src="../assets/img/common/arrow-t.png" alt="" class="img-arrow">
        </div>
        <div class="hover-box">
          <ul class="language-uls">
            <li class="language-list" @click="cnOrEn('CN')">CN</li>
            <li class="language-list" @click="cnOrEn('EN')">EN</li>
          </ul>
        </div>
      </li>
      <!--      登录-->
      <li class="list login-list" v-if="loginFlag">
        <div class="login" @click="$router.push('/login')">{{$t('header.text5')}}</div>
      </li>
<!--      用户-->
      <li class="list user-cont" v-if="!loginFlag">
        <div class="top">
          <div>{{username}}</div>
        </div>
        <div class="user-m-box">
          <ul class="user-uls">
            <li class="user-list" @click="gotoUser">{{$t('header.text6')}}</li>
            <li class="user-list logout-list" @click="logout">
              <img src="../assets/img/common/logout.png" alt="" class="logout">
              <span>{{$t('header.text7')}}</span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import Bus from '@/assets/js/bus'
  import Dialog from '@/components/dialog'
	export default {
		data() {
			return {
        activeFlag: false,
        currentLang: '',
        isFixed: false,
			  username: '',
        loginFlag: false,
        robotaData: {}
      }
		},
    created () {
      this.currentLang = localStorage.getItem('discoveryLang')
		  if (localStorage.getItem('__userEmail__')) {
		    this.getrobot()
		    this.loginFlag = false
		    this.username = localStorage.getItem('__userEmail__').split('@')[0]
      } else {
        this.loginFlag = true
      }
    },
    mounted () {
      Bus.$on('setUserFn', (email) => {
        this.loginFlag = false
        this.username = email.split('@')[0]
      })
      this.getRoute()
    },
    watch: {
		  '$route': 'getRoute'
    },
    methods: {
		  // 中英切换
      cnOrEn (tag) {
        localStorage.setItem('discoveryLang', tag)
        this.$router.go(0)
        this.currentLang = tag
      },
      getrobot () {
        let username = localStorage.getItem('__userEmail__')
        this.$fetch.post('/account', {
          operation: "GetAccount",
          username: username
        }).then(res => {
          this.axiosShow = false
          if (res.chatbots && res.chatbots[0]) {
            let chatbotsData = res.chatbots[0]
            this.$fetch.get(`/chatbotregistration/${chatbotsData}`).then(response => {
              this.robotaData = response
            })
          }
        })
      },
		  gotoUser () {
        var query = {}
        if (this.$route.query.uuid) {
          query = {
            uuid: this.$route.query.uuid,
            name: this.$route.query.name,
            apiKey: this.$route.query.apiKey,
            createdAt: this.$route.query.createdAt,
            endpoint: this.$route.query.endpoint
          }
          this.$router.push({
            path:'/user/userinfo',
            query: query
          })
        } else if (this.robotaData) {
          query = {
            uuid: this.robotaData.uuid,
            name: this.robotaData.name,
            apiKey: this.robotaData.apiKey,
            createdAt: this.robotaData.createdAt,
            endpoint: this.robotaData.endpoint
          }
          this.$router.push({
            path:'/user/userinfo',
            query: query
          })
        }
      },
      getRoute () {
        if (this.$route.path.indexOf('/user') > -1) {
          this.isFixed = true
        } else {
          this.isFixed = false
        }
        this.activeFlag = false
        if (this.$route.path === '/aiHallDetails' || this.$route.path === '/intelChat' || this.$route.path === '/emotion' || this.$route.path === '/styleTransfer') this.activeFlag = true
      },
      logout () {
        Dialog({
          content:this.$t('header.text8'),
          type: 'confirm',
          okFn: () => {
            this.$router.push('/login')
            this.loginFlag = true
            localStorage.removeItem('__userEmail__');
          }
        })
      }
    }
	}
</script>

<style scoped lang="stylus">
.header-w
  left: 0
  top: 0
  width: 100%
  height: 80px
  background-color: #090D21
  display: flex
  align-items center
  justify-content space-between
  border-bottom: 1px solid #323646
  z-index: 1
  position: absolute
  padding: 0 260px
  @media screen and (max-width: 1700px)
    padding: 0 180px
  @media screen and (max-width: 1500px)
    padding: 0 100px
  @media screen and (max-width: 1300px)
    padding: 0 60px
  &.fixed-head
    padding: 0 60px
    position: fixed
    z-index: 10
  .logo
    .img-a
      width: 187px
      display: block
      img
        width: 100%
        display: block
  .menu-uls
    display: flex
    align-items center
    .list
      height: 80px
      display: flex
      align-items center
      padding: 0 30px
      margin: 0 5px
      font-size: 16px
      cursor pointer
      color #fff
      position: relative
      border-bottom: 2px solid transparent
      z-index: 1000
      white-space nowrap
      &.router-link-exact-active,&.router-link-active
        color #fd3e4b
        border-bottom: 2px solid #fd3e4b
      .top
        display: flex
        align-items center
        .img-arrow
          margin-left: 8px
      &.language-m:hover
        .hover-box
          display: block
      .hover-box
        position: absolute
        top: 100%
        left: 0
        padding-top: 4px
        width: 100%
        display: none
        z-index: 1000
      .language-uls
        background-color: #fff
        border-radius 4px
        box-shadow 0 0 6px rgba(9,13,33, .3)
        width: 100%
        .language-list
          height: 40px
          line-height: 40px
          text-align: center
          color #090d21
          &:hover
            color #3376ff
      .avatar
        width: 46px
        height: 46px
        background-color: #fff
        border-radius 50%
        margin-right: 10px
        img
          width: 100%
          border-radius 50%
      .login
        width: 100px
        height: 38px
        display: flex
        align-items center
        justify-content center
        background-color: #21294f
        border-radius 4px
        cursor pointer
    .login-list
      cursor auto
    .user-cont
      padding: 0
      &:hover .user-m-box
        display: block
      .user-m-box
        position: absolute
        top: 100%
        left: 0
        padding-top: 4px
        width: 100%
        display: none
        .user-uls
          background-color: #fff
          border-radius 4px
          box-shadow 0 0 6px rgba(9,13,33, .3)
          width: 100%
          min-width 115px
          .user-list
            height: 40px
            line-height: 40px
            padding-left: 20px
            color #090d21
            &:hover
              color #3376ff
            .logout
              display: block
              width: 14px
              margin-right: 8px
          .logout-list
            display: flex
            align-items center
</style>
