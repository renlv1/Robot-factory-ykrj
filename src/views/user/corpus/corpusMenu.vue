<template>
  <div class="v-charles-w">
    <div class="charles-m">
      <div class="left-menu">
        <ul class="menu-uls">
          <li class="menu-list" v-for="(item, index) in menuArr" :key="index"
              @click="gotoPath(index)"
              :class="{'active-list': activeIndex === index}">
            <p class="name">{{item.name}}</p>
          </li>
        </ul>
      </div>
      <div class="right-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
    data() {
      return {
        activeIndex: 0,
        menuArr: [
          {name: this.$t('corpus.text9'), icon: ''},
          {name: this.$t('corpus.text10'), icon: ''}
        ]
      }
    },
    mounted () {
      this.getRoute()
    },
    methods: {
      gotoPath (index) {
        this.activeIndex = index
        let query = {
          uuid: this.$route.query.uuid,
          name: this.$route.query.name,
          apiKey: this.$route.query.apiKey,
          createdAt: this.$route.query.createdAt,
          endpoint: this.$route.query.endpoint
        }
        if (index === 0) this.$router.push({path: '/user/corpusMenu/corpus', query: query})
        if (index === 1) this.$router.push({path: '/user/corpusMenu/fileManagement', query: query})
      },
      getRoute () {
        if (this.$route.path === '/user/corpusMenu/fileManagement') this.activeIndex = 1
      },
    },
    watch: {
      '$route': 'getRoute'
    }
	}
</script>

<style scoped lang="stylus">

</style>
