<template>
  <div class="xmind-w">
    <div class="m-c">
      <div class="top-m">
        <div class="left">
          <img src="../../../assets/img/common/border.png" alt="">
          <span>{{$t('knowledge.text21')}}</span>
        </div>
      </div>
      <div class="xmind-cont"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
        showDialog: false,
        errInputMsgDialog2: '',
        productName: '',
        heightFlag: -1,
        menuArr: []
      }
		},
    created () {
		  this.getMenu()
    },
    methods: {
      // 获取知识点菜单
      getMenu () {
        let chatbot = this.$route.query.uuid
        this.$fetch.post('/chatbotknowledge/', {
          event: 'EVENT_GET_CONCEPT_NAMES',
          getChatbotConceptRequest: {
            chatbot: chatbot
          }
        }).then(res => {
          if (res.getChatbotConceptResponse) {
            this.menuArr = res.getChatbotConceptResponse.conceptNames
            this.conceptName = res.getChatbotConceptResponse.conceptNames[0]
          }
        })
      },
      smallClick (index, child) {
        this.heightFlag = index
        this.$router.push({
          path: '/user/knowledge/ai',
          query: {
            name: child,
            index: index
          }
        })
      },
      // 添加产品
      okAdd () {
        this.errInputMsg = ''
        if (this.productName === '') {
          this.errInputMsg = '请输入产品名称'
        } else {
          this.$fetch.post('/chatbotknowledge/', {
            event: 'EVENT_CREATEORUPDATE_PRODUCT',
            createOrUpdateChatbotProductRequest: {
              chatbot: this.chatbot,
              product: {
                name: this.productName,
                properties: '{}'
              }
            }
          }).then(res => {
            if (res.event) {
              this.showDialog = false
              this.menuArr.push(this.productName)
              Dialog({
                content: '添加成功'
              })
            }
          })
        }
      },
      // 添加产品
      addProduct () {
        this.productName = ''
        if (this.heightFlag === 1) {
          this.showDialog = true
        }
      },
    }
	}
</script>

<style scoped lang="stylus">
.xmind-w
  width: 100%
  .left-menu
    width: 320px
    background-color: #0d1125
    position: fixed
    left: 300px
    top: 80px
    bottom: 0
    display: flex
    flex-direction column
    justify-content space-between
    .add-robot
      display: flex
      align-items center
      justify-content center
      font-size: 20px
      color #f2f2f2
      height: 68px
      border-top: 1px solid #323646
      cursor pointer
      img
        margin-right: 20px
    .menu-uls
      .menu-list
        height: 68px
        display: flex
        align-items center
        justify-content space-between
        color #fff
        padding: 0 20px 0 42px
        cursor pointer
        &.active-list
          background-color: #1d243c
          .child-name
            color #3376ff
        .child-icon
          width: 24px
          height: 24px
          background: url("../../../assets/img/common/minus.png") no-repeat center / cover
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
