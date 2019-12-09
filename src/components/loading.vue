<template>
  <div class="load-more-box">
    <div class="loading-img">
      <img src="../assets/img/common/loading.gif">
    </div>
<!--    <p class="desc">正在加载中</p>-->
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {}
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  //  加载中的样式
  .load-more-box
    /*margin-top 50px*/
    padding-top: 20px
    .desc
      font-size: 18px
      color: #999;
      text-align: center;
      margin-top: 20px
    .loading-img
      width: 60px;
      margin: 30px auto 0;
      img
        width: 100%
</style>
