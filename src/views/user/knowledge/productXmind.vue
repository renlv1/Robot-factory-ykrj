<template>
  <div class="xmind-w">
    <div class="top-m">
      <div class="left">
        <img src="../../../assets/img/common/border.png" alt="">
        <span>{{$t('knowledge.text22')}}</span>
      </div>
    </div>
    <div class="xmind-cont"></div>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {}
		}
	}
</script>

<style scoped lang="stylus">
.xmind-w
  .top-m
    .left
      display: flex
      align-items center
      padding-bottom: 20px
      border-bottom: 1px dashed #ccc
      font-size: 26px
      color #090d21
      img
        margin-right: 14px
  .xmind-cont
    margin-top: 60px
    height: 1000px
    background-color: #FBFBFB
</style>
