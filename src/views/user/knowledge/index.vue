<template>
  <div class="charles-w">
    <div class="charles-m">
      <div class="left-menu">
        <ul class="menu-uls">
          <li class="menu-list"
              v-for="(item, index) in menuArr" :key="index"
              @click="smallClick(index, item)"
              :class="{'active-list': heightFlag === index}">
            <div class="child-name">{{item}}</div>
            <div class="child-icon-w" @click.stop="deleteItem(item, index)">
              <div class="child-icon"></div>
            </div>
          </li>
        </ul>
        <div class="add-robot" @click="addProduct">
          <img src="../../../assets/img/common/add.png" alt="">
          <span>{{$t('knowledge.text6')}}</span>
        </div>
      </div>
      <div class="v-right-content">
        <router-view></router-view>
        <div class="loading-m" v-show="loadingShow">
          <img src="../../../assets/img/common/loading.gif" alt="">
        </div>
      </div>
    </div>
    <transition name="safeDialog">
      <div class="dialog-w dialog-safe-w" v-show="showDialog">
        <div class="dialog-safe" >
          <div class="close" @click="closeD()">
            <div class="close-icon"></div>
          </div>
          <div class="dialog-title">{{addProductText}}</div>
          <div class="form-item">
            <div class="label">{{productNameText}}</div>
            <input type="text" :placeholder="productInputText" class="input" v-model.trim="productName" @input="inputM">
          </div>
          <div class="err-ms">{{errInputMsg}}</div>
          <div class="g-dialog-btn-wrap">
            <div class="comfirm g-dialog-btn" @click="okAdd" :class="{'loading-btn': loadingBtn}">
              <img src="../../../assets/img/common/loading.gif" alt="" v-show="loadingBtn">
              <span>{{$t('knowledge.text6')}}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/dialog'
  export default {
    data() {
      return {
        loadingBtn: false,
        loadingShow: false,
        addProductText: this.$t('knowledge.text7'),
        productNameText: this.$t('knowledge.text8'),
        productInputText: this.$t('knowledge.text9'),
        productName: '',
        errInputMsg: '',
        showDialog: false,
        activeIndex: -1,
        heightFlag: -1,
        chatbot: this.$route.query.uuid,
        menuArr: []
      }
    },
    created () {
      this.getProOrAi()
    },
    mounted () {
      this.getRoute()
    },
    methods: {
      inputM () {
        this.errInputMsg = ''
        let reg = /^[\u4e00-\u9fa5\u3001\a-zA-Z0-9_\s]+$/
        if (reg.test(this.productName)) {
          this.errInputMsg = ''
        } else if (this.productName === '') {
          this.errInputMsg = ''
        } else {
          this.errInputMsg = this.$t('knowledge.text10')
        }
      },
      // 删除菜单
      deleteItem (item, index) {
        if (Number(this.$route.query.index) === 0) { // 删除产品
          Dialog({
            title: this.$t('knowledge.text11'),
            content: this.$t('knowledge.text12') + item + '?',
            okFn: () => {
              this.$fetch.post('/chatbotknowledge/', {
                event: "EVENT_DELETE_PRODUCT",
                deleteChatbotKnowledgeRequest: {
                  product: item,
                  chatbot: this.chatbot
                }
              }).then(res => {
                if (res.event) {
                  this.getMenu2()
                  this.$router.push({
                    path: '/user/knowledge/productXmind',
                    query: {
                      index:0,
                      uuid: this.$route.query.uuid,
                      name: this.$route.query.name,
                      apiKey: this.$route.query.apiKey,
                      createdAt: this.$route.query.createdAt,
                      endpoint: this.$route.query.endpoint
                    }
                  })
                  Dialog({
                    content: this.$t('knowledge.text13')
                  })
                }
              })
            }
          })
        } else { // 删除知识点
          Dialog({
            title: this.$t('knowledge.text14'),
            content: this.$t('knowledge.text15') + item + '?',
            okFn: () => {
              this.$fetch.post('/chatbotknowledge/', {
                event: "EVENT_DELETE_CONCEPT",
                deleteChatbotKnowledgeRequest: {
                  concept: item,
                  chatbot: this.chatbot
                }
              }).then(res => {
                this.getMenu()
                if (res.event) {
                  this.$router.push({
                    path: '/user/knowledge/knowledgeXmind',
                    query: {
                      index:1,
                      uuid: this.$route.query.uuid,
                      name: this.$route.query.name,
                      apiKey: this.$route.query.apiKey,
                      createdAt: this.$route.query.createdAt,
                      endpoint: this.$route.query.endpoint
                    }
                  })
                  Dialog({
                    content: this.$t('knowledge.text13')
                  })
                }
              })
            }
          })
        }
      },
      // 关闭弹窗
      closeD () {
        this.showDialog = false
        this.productName = ''
        this.errInputMsg = ''
      },
      // 添加
      okAdd () {
        this.errInputMsg = ''
        let reg = /^[\u4e00-\u9fa5\u3001\a-zA-Z0-9_\s]+$/
        if (this.productName === '') {
          this.errInputMsg =  this.productInputText
        } else if (!reg.test(this.productName)) {
          this.errInputMsg = this.$t('knowledge.text10')
        } else {
          if (Number(this.$route.query.index) === 0) {
            this.menuArr.forEach((item) => {
              if (item === this.productName) {
                this.errInputMsg = '不允许添加相同的产品'
                return false
              }
            })
            if (this.errInputMsg === '') {
              this.loadingBtn = true
              this.addProductData()
            }
          } else {
            this.menuArr.forEach((item) => {
              if (item === this.productName) {
                this.errInputMsg = '不允许添加相同的知识点'
                return false
              }
            })
            if (this.errInputMsg === '') {
              this.loadingBtn = true
              this.addKnowledge()
            }
          }
        }
      },
      // 成功添加产品
      addProductData () {
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
          this.loadingBtn = false
          if (res.event) {
            this.showDialog = false
            this.getMenu2(this.productName)
            Dialog({
              content: this.$t('knowledge.text16'),
              okFn: () => {
                this.menuArr.forEach((item, index) => {
                  if (this.productName === item) {
                    this.heightFlag = index
                  }
                })
                this.$router.push({
                  path: '/user/knowledge/houseToken',
                  query: {
                    name2: this.productName,
                    index: 0,
                    mindex: this.heightFlag, // 添加产品的索引
                    uuid: this.$route.query.uuid,
                    name: this.$route.query.name,
                    apiKey: this.$route.query.apiKey,
                    createdAt: this.$route.query.createdAt,
                    endpoint: this.$route.query.endpoint
                  }
                })
              }
            })
          } else {
            Dialog({
              content: this.$t('knowledge.text17')
            })
          }
        }).catch(err => {
          this.loadingBtn = false
          Dialog({
            content: this.$t('knowledge.text17')
          })
        })
      },
      // 成功添加知识点
      addKnowledge () {
        this.$fetch.post('/chatbotknowledge/', {
          event: 'EVENT_CREATEORUPDATE_CONCEPTS',
          createOrUpdateChatbotConceptRequest: {
            chatbot: this.chatbot,
            concept: {
              name: this.productName,
              properties: '{}'
            }
          }
        }).then(res => {
          this.loadingBtn = false
          if (res.event) {
            this.showDialog = false
            this.getMenu(this.productName)
            Dialog({
              content: this.$t('knowledge.text16'),
              okFn: () => {
                this.menuArr.forEach((item, index) => {
                  if (this.productName === item) {
                    this.heightFlag = index
                  }
                })
                this.$router.push({
                  path: '/user/knowledge/ai',
                  query: {
                    name2: this.productName,
                    index: 1,
                    mindex: this.heightFlag, // 添加知识点的索引
                    uuid: this.$route.query.uuid,
                    name: this.$route.query.name,
                    apiKey: this.$route.query.apiKey,
                    createdAt: this.$route.query.createdAt,
                    endpoint: this.$route.query.endpoint
                  }
                })
              }
            })
          } else {
            Dialog({
              content: this.$t('knowledge.text17')
            })
          }
          this.loadingBtn = false
        }).catch(err => {
          this.loadingBtn = false
          Dialog({
            content: this.$t('knowledge.text17')
          })
        })
      },
      // 添加产品
      addProduct () {
        this.productName = ''
        this.showDialog = true
      },
      // 获取知识点菜单
      getMenu (product) {
        let chatbot = this.$route.query.uuid
        this.$fetch.post('/chatbotknowledge/', {
          event: 'EVENT_GET_CONCEPT_NAMES',
          getChatbotConceptRequest: {
            chatbot: chatbot
          }
        }).then(res => {
          if (res.getChatbotConceptResponse) {
            this.menuArr = res.getChatbotConceptResponse.conceptNames
            this.menuArr.forEach((item, index) => {
              if (product && item === product) {
                this.heightFlag = index
              }
            })
          }
        })
      },
      // 获取产品菜单
      getMenu2 (product) {
        let chatbot = this.$route.query.uuid
        this.$fetch.post('/chatbotknowledge/', {
          event: 'EVENT_GET_PRODUCT_NAMES',
          getChatbotProductRequest: {
            chatbot: chatbot
          }
        }).then(res => {
          if (res.getChatbotProductResponse) {
            this.menuArr = res.getChatbotProductResponse.chatbotProductNames
            this.menuArr.forEach((item, index) => {
              if (product && item === product) {
                this.heightFlag = index
              }
            })
          }
        })
      },
      // 二级菜单
      smallClick (index, child) {
        this.heightFlag = index
        this.loadingShow = true
        setTimeout(() => {
          this.loadingShow = false
        }, 1000)
        if (Number(this.$route.query.index) === 1) {
          this.$router.push({
            path: '/user/knowledge/ai',
            query: {
              name2: child,
              index: 1,
              mindex: index,
              uuid: this.$route.query.uuid,
              name: this.$route.query.name,
              apiKey: this.$route.query.apiKey,
              createdAt: this.$route.query.createdAt,
              endpoint: this.$route.query.endpoint
            }
          })
        } else {
          this.$router.push({
            path: '/user/knowledge/houseToken',
            query: {
              name2: child,
              index: 0,
              mindex: index,
              uuid: this.$route.query.uuid,
              name: this.$route.query.name,
              apiKey: this.$route.query.apiKey,
              createdAt: this.$route.query.createdAt,
              endpoint: this.$route.query.endpoint
            }
          })
        }
      },
      getProOrAi () {
        // this.heightFlag = -1
        if (this.$route.path === '/user/knowledge/productXmind' && !this.$route.query.name2) this.menuArr = []
        if (this.$route.path === '/user/knowledge/knowledgeXmind' && !this.$route.query.name2) this.menuArr = []
        if (Number(this.$route.query.index) === 1) {
          this.addProductText = this.$t('knowledge.text18')
          this.productNameText = this.$t('knowledge.text19')
          this.productInputText = this.$t('knowledge.text20')
          // 获取知识点菜单
          this.getMenu()
        } else {
          this.addProductText = this.$t('knowledge.text7')
          this.productNameText = this.$t('knowledge.text8')
          this.productInputText = this.$t('knowledge.text9')
          // 获取产品菜单
          this.getMenu2()
        }
        if (this.$route.path === '/user/knowledge/productXmind') this.heightFlag = -1
        if (this.$route.path === '/user/knowledge/knowledgeXmind') this.heightFlag = -1
        this.heightFlag = Number(this.$route.query.mindex)
      },
      getRoute () {
        this.getProOrAi()
        if (this.$route.path === '/user/knowledge/ai' && this.$route.query.name2 && this.menuArr.length > 0) {
          this.menuArr.forEach((item, index) => {
            if (this.$route.query.name2 === item) {
              this.heightFlag = index
            }
          })
        } else if (this.$route.path === '/user/knowledge/productXmind' && this.$route.query.name2 && this.menuArr.length > 0) {
          this.menuArr.forEach((item, index) => {
            if (this.$route.query.name2 === item) {
              this.heightFlag = index
            }
          })
        }
      }
    },
    watch: {
      '$route': 'getRoute'
    }
  }
</script>

<style scoped lang="stylus">
  .loading-m
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: calc(100vh - 80px)
    background-color: rgba(0,0,0,.5)
    display: flex
    justify-content center
    img
      width: 150px
      height: 150px
      display: block
      margin-top: 350px
  .charles-w
    .charles-m
      display: flex
      height: 100%
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
        @media screen and (max-width: 1400px)
          left: 200px
          width: 200px
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
            padding-left: 42px
            cursor pointer
            &.active-list
              background-color: #1d243c
              .child-name
                color #3376ff
            .child-icon-w
              padding: 0 20px
              height: 100%
              display: flex
              align-items center
              justify-content center
              cursor pointer
            .child-icon
              width: 24px
              height: 24px
              background: url("../../../assets/img/common/minus.png") no-repeat center / cover
      .v-right-content
        position: absolute
        left: 620px
        right: 0
        @media screen and (max-width: 1400px)
          left: 400px
          padding: 10px
</style>
