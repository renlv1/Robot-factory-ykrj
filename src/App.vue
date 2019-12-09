<template>
  <div id="app">
    <v-header></v-header>
    <div class="m-container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {
  },
  components: {
    vHeader: resolve => require(['@/components/header.vue'], resolve)
  }
}
</script>

<style lang="stylus">
  @import 'assets/css/reset.css';
  @import 'assets/css/base.styl';
  @import 'assets/font/font-awesome.min.css';
  @import './assets/css/dialog.styl';
  @import 'assets/css/robot.styl';
  .m-container
    padding-top: 80px
    width: 100%
    min-height 100vh
    // background: url("./assets/img/common/bg.png") no-repeat center / cover
</style>
