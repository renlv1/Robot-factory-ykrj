<template>
  <div class="right-content">
<!--    <div class="top-cont">-->
<!--      <div class="input-w">-->
<!--        <label class="label">{{$t('corpus.text31')}}</label>-->
<!--        <input type="text" class="input" v-model.trim="intent">-->
<!--      </div>-->
<!--      <div class="input-w">-->
<!--        <label class="label">{{$t('corpus.text32')}}</label>-->
<!--        <input type="text" class="input" v-model.trim="question">-->
<!--      </div>-->
<!--      <div class="input-w" v-show="!isShowSelect">-->
<!--        <label class="label">{{$t('corpus.text33')}}</label>-->
<!--        <input type="text" class="input" v-model.trim="keyword">-->
<!--      </div>-->
<!--      <div class="input-w" v-show="!isShowSelect">-->
<!--        <label class="label">{{$t('corpus.text34')}}</label>-->
<!--        <input type="text" class="input" v-model.trim="answers">-->
<!--      </div>-->
<!--      <div class="input-w" v-show="!isShowSelect">-->
<!--        <label class="label">{{$t('corpus.text35')}}</label>-->
<!--        <el-date-picker-->
<!--          v-model="dataTime"-->
<!--          type="date"-->
<!--          :placeholder="$t('corpus.text36')">-->
<!--        </el-date-picker>-->
<!--      </div>-->
<!--      <div class="btn-w-m">-->
<!--        <div class="btn" @click="search">{{$t('corpus.text37')}}</div>-->
<!--        <div>-->
<!--          <div class="select-w" v-if="isShowSelect" @click="showInput">-->
<!--            <span>{{$t('corpus.text38')}}</span>-->
<!--            <div class="border">-->
<!--              <img src="../../../assets/img/common/sanjiao_blue.png" alt="">-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="select-w " v-else @click="hideInput">-->
<!--            <span>{{$t('corpus.text39')}}</span>-->
<!--            <div class="border hide-input">-->
<!--              <img src="../../../assets/img/common/sanjiao_blue.png" alt="">-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div class="ctrl-w">
      <div class="add-btn" @click="addCorpus">+ {{$t('corpus.text40')}}</div>
      <div>
        <div class="flex-item" v-if="batchFlag">
          <div class="add-btn red-btn" @click="deleteSome">批量删除</div>
          <div class="add-btn cancel-btn" @click="cancelBatch">取消</div>
        </div>
        <div class="add-btn red-btn" v-else @click="showBatch">批量删除</div>
      </div>

    </div>
    <div class="table-w">
      <ul class="table-header">
<!--        全选-->
        <li class="check-li" v-show="batchFlag === true" @click="allCheck">
          <div class="all-default-check " :class="{'check-all': checkAll === true}"></div>
        </li>
        <li>{{$t('corpus.text41')}}</li>
        <li>{{$t('corpus.text42')}}</li>
        <li>{{$t('corpus.text43')}}</li>
        <li class="answer-list">{{$t('corpus.text44')}}</li>
        <li>{{$t('corpus.text45')}}</li>
        <li><div class="head-t">{{$t('corpus.text46')}}</div></li>
      </ul>
      <div class="loading-w" v-show="loadingShow">
        <img src="../../../assets/img/common/loading.gif" alt="">
      </div>
      <ul class="table-body" v-for="(item, index) in chatbotCorpusList" :key="item.scenario">
<!--        单选-->
        <li class="check-li" v-show="batchFlag === true" @click="clickOne(item, index)" ref="checkList">
          <div class="default-check" :class="{'active-check': item.checkFlag === true}"></div>
        </li>
        <li>{{item.intent}}</li>
        <li class="more-list"><span v-for="(q, lindex) in item.questions" :key="lindex">{{q}}</span></li>
        <li class="more-list"><span v-for="(k, lindex) in item.keywords" :key="lindex">{{k}}</span></li>
        <li class="more-list answer-list"><span v-for="(a, lindex) in item.answers" :key="lindex">{{a}}</span></li>
        <li>{{dataInit(item.updatedAt)}}</li>
        <li class="btn-ctrl">
          <div class="ctrl-item" @click="editorOne(item)">
            <img src="../../../assets/img/common/editor.png" alt="">
          </div>
          <div class="ctrl-item" @click="deleteOne(item)">
            <img src="../../../assets/img/common/delete.png" alt="">
          </div>
        </li>
      </ul>
      <div class="no-data-w" v-show="noLength">
        <div class="img-b">
          <img src="../../../assets/img/common/nodata.png" alt="">
        </div>
        <p>{{$t('corpus.text25')}}</p>
      </div>
      <turn-page :propsPage="totalPage" @orderLogTrunPage="parentTurnPage" ref="turnPage1"></turn-page>
    </div>
    <div class="loading-w" v-show="axiosShow">
      <img src="../../../assets/img/common/loading.gif" alt="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/dialog'
  export default {
    data() {
      return {
        axiosShow: false,
        checkAll: false,
        batchFlag: false,
        noLength: false,
        totalPage: 0,
        allChatbot: [],
        loadingShow: true,
        isShowSelect: true,
        intent: '',
        question: '',
        keyword: '',
        answers: '',
        dataTime: '',
        chatbot: this.$route.query.uuid,
        activeIndex: 0,
        pageSize: 10,
        chatbotCorpusList: [],
        listAxios: [],
        menuArr: [
          {name: '语料库管理', icon: ''},
          {name: '语料文件管理', icon: ''}
        ]
      }
    },
    created () {
      this.getRobot()
    },
    methods: {
      // 批量删除
      deleteSome () {
        if (this.listAxios.length === 0) {
          Dialog({
            content: '请选择要删除的语料'
          })
          return false
        }
        let deleLength = 0
        Dialog({
          content: '你选中的语料将被删除并且不能被恢复，确认要删除?',
          type: 'confirm',
          okFn: () => {
            this.axiosShow = true
            this.listAxios.forEach((item) => {
              this.$fetch.delete('/chatbotcorpus/', {
                chatbot: this.chatbot,
                intent: item.intent,
                scenario: item.scenario,
              }).then(res => {
                if (JSON.stringify(res) === '{}') {
                  deleLength++
                  if (deleLength === this.listAxios.length) {
                    this.axiosShow = false
                    this.getRobot()
                    this.$refs.turnPage1.resetPage(1)
                    this.checkAll = false
                    Dialog({
                      content: this.$t('corpus.text48')
                    })
                  }
                } else {
                  deleLength++
                  if (deleLength === this.listAxios.length) {
                    this.axiosShow = false
                    Dialog({
                      content: '删除失败'
                    })
                  }
                }
              }).catch(() => {
                deleLength++
                if (deleLength === this.listAxios.length) {
                  this.axiosShow = false
                  Dialog({
                    content: '删除失败'
                  })
                }
              })
            })
          }
        })
      },
      // 取消
      cancelBatch () {
        this.batchFlag = false
      },
      // 显示批量操作
      showBatch () {
        this.batchFlag = true
      },
      // 选中所有
      allCheck () {
        this.checkAll = !this.checkAll
        this.listAxios = []
        if (this.checkAll === true) {
          this.chatbotCorpusList.forEach(item => {
            item.checkFlag = true
            this.listAxios.push({
              intent: item.intent,
              scenario: item.scenario,
            })
          })
        } else {
          this.chatbotCorpusList.forEach(item => {
            item.checkFlag = false
          })
        }
      },
      // 单个
      clickOne (item, current) {
        if (item.checkFlag === true) {
          item.checkFlag = false
          this.checkAll = false
          this.$refs.checkList[current].children[0].className = 'default-check'
          this.listAxios.forEach((list, idIndex) => {
            if (list.scenario === item.scenario) {
              this.listAxios.splice(idIndex, 1)
            }
          })
        } else {
          item.checkFlag = true
          this.$refs.checkList[current].children[0].className = 'default-check active-check'
          let len = 0
          this.chatbotCorpusList.forEach(item => {
            if (item.checkFlag === true) {
              len++
              if (len === this.chatbotCorpusList.length) {
                this.checkAll = true
              } else {
                this.checkAll = false
              }
            }
          })
          this.listAxios.push({
            intent: item.intent,
            scenario: item.scenario,
          })
        }
      },
      // 搜索
      search () {
        if (this.intent === '' && this.question === '' && this.answers === '' && this.keyword === '') {
          this.chatbotCorpusList = this.allChatbot
        } else {
          this.chatbotCorpusList = []
          this.allChatbot.forEach((item, index) => {
            item.questions.forEach((m, index) => {
              if (this.question === m && this.intent === '' && this.answers === '' && this.keyword === '') { // 只有问句
                this.chatbotCorpusList.push(item)
                this.chatbotCorpusList = this.objectFilters(this.chatbotCorpusList, 'scenario')
              }
              if (this.question === m && this.intent === item.intent && this.answers === '' && this.keyword === '') { // 有问句 还有 意图
                this.chatbotCorpusList.push(item)
                this.chatbotCorpusList = this.objectFilters(this.chatbotCorpusList, 'scenario')
              }
            })
            if (this.intent === item.intent && this.question === '' && this.answers === '' && this.keyword === '') { // 只有意图
              this.chatbotCorpusList.push(item)
            }
          })
        }
      },
      // 收起
      showInput () {
        this.isShowSelect = false
      },
      // 展开
      hideInput () {
        this.isShowSelect = true
        this.keyword = ''
        this.answers = ''
        this.dataTime = ''
      },
      parentTurnPage (page) {
        this.chatbotCorpusList = this.allChatbot.slice(this.pageSize * (page - 1), this.pageSize * page)
        if (this.chatbotCorpusList.length === 0) {
          this.noLength = true
        }
      },
      // 删除一条语料
      deleteOne (item) {
        Dialog({
          content: this.$t('corpus.text47'),
          type: 'confirm',
          okFn: () => {
            this.$fetch.delete('/chatbotcorpus/', {
              chatbot: this.chatbot,
              intent: item.intent,
              scenario: item.scenario,
            }).then(res => {
              if (JSON.stringify(res) === '{}') {
                this.getRobot()
                Dialog({
                  content: this.$t('corpus.text48')
                })
              }
            })
          }
        })
      },
      // 修改语料
      editorOne (item) {
        this.$router.push({
          path: '/user/corpusMenu/addCorpus',
          query: {
            chatbot: this.chatbot,
            listdata: JSON.stringify(item),
            uuid: this.$route.query.uuid,
            name: this.$route.query.name,
            apiKey: this.$route.query.apiKey,
            createdAt: this.$route.query.createdAt,
            endpoint: this.$route.query.endpoint
          }
        })
      },
      // 获取列表
      getRobot () {
        this.chatbot = this.$route.query.uuid
        this.$fetch.get('/chatbotcorpus/', {
          chatbot: this.chatbot
        }).then(response => {
          this.loadingShow = false
          this.allChatbot = response.chatbotCorpusList
          if (response.chatbotCorpusList.length > 0) {
            let corpusList = response.chatbotCorpusList
            corpusList.forEach((item) => {
              item.checkFlag = false
            })
            this.chatbotCorpusList = corpusList.slice(0,this.pageSize)
            this.totalPage = Math.ceil(corpusList.length / this.pageSize)
          } else {
            this.noLength = true
          }
        }).catch(() => {
          this.loadingShow = false
        })
      },
      // 去重
      objectFilters (oldArr, id) {
        var allArr = [];//新数组
        for(var i=0;i<oldArr.length;i++){
          var flag = true;
          for(var j=0;j<allArr.length;j++){
            //判断唯一标识
            if(oldArr[i][id] === allArr[j][id]){
              flag = false;
            }
          }
          if(flag){
            allArr.push(oldArr[i])
          }
        }
        return allArr
      },
      // 添加语料
      addCorpus () {
        this.$router.push({
          path: '/user/corpusMenu/addCorpus',
          query: {
            chatbot: this.chatbot,
            uuid: this.$route.query.uuid,
            name: this.$route.query.name,
            apiKey: this.$route.query.apiKey,
            createdAt: this.$route.query.createdAt,
            endpoint: this.$route.query.endpoint
          }
        })
      },
      // 日期格式化
      dataInit (time) {
        if (time.length > 0) {
          return time.substring(0,10)
        }
      }
    },
    components: {
      turnPage: resolve => require(['@/components/turnPage.vue'], resolve)
    }
  }
</script>

<style scoped lang="stylus">
  .no-data-w
    display: flex
    align-items center
    justify-content center
    flex-direction column
    color #afb3c5
    font-size: 14px
    margin-top: 120px
    .img-b
      width: 70px
      margin-bottom: 10px
      img
        width: 100%
        display: block
  .right-content
    flex 1
    padding-left: 60px
    .loading-w
      position: fixed
      top: 0
      right: 0
      left: 620px
      height: 100%
      z-index: 1000
      display: flex
      align-items center
      justify-content center
      background-color: rgba(0,0,0,.5)
      @media screen and (max-width: 1400px)
        left: 400px
      img
        width: 60px
        display: block
    .top-cont
      padding: 60px 60px 0 0;
      width: 100%;
      display: flex
      align-items center
      flex-wrap wrap
      .input-w
        display: flex
        align-items center
        margin-right: 40px
        margin-bottom: 30px
        .label
          font-size: 16px
          color #090d21
          margin-right: 10px
        .input
          width: 300px
          height: 32px
          padding-left: 20px
          border-radius 4px
          border: 1px solid #e5e5e5
      .btn
        display: flex
        align-items center
        justify-content center
        border-radius 4px
        margin: 0 30px 0 40px
        background-color: #3376ff
        color #fff
        width: 68px
        height: 32px
        cursor pointer
      .btn-w-m
        display: flex
        align-items center
        margin-bottom: 30px
      .select-w
        font-size: 16px
        display: flex
        align-items center
        color #3376ff
        cursor pointer
        .border
          width:10px
          margin-left: 4px
          &.hide-input
            transform rotate(180deg)
          img
            display: block
            width: 100%
    .ctrl-w
      display: flex
      align-items center
      justify-content space-between
      padding-right: 30px
      .flex-item
        display: flex
        align-items center
      .cancel-btn
        background-color: #ccc
        margin-left: 20px
      .red-btn
        background-color: #fd3e4b
    .add-btn
      width: 150px
      height: 38px
      background-color: #3376ff
      color #fff
      border-radius 4px
      display: flex
      align-items center
      justify-content center
      margin: 40px 0 20px
      font-size: 14px
      cursor pointer
    .table-w
      width 100%
      padding-right: 30px
      li
        flex 0.8
        overflow:hidden;
        text-overflow:ellipsis;
        padding: 10px 20px
        @media screen and (max-width: 1400px)
          padding: 6px
      .answer-list
        flex 2
      .table-header
        color #090d21
        font-size: 16px
        height: 50px
        display: flex
        align-items center
        background-color: #f2f3f7
        border-bottom: 1px solid #e3e4e8
        padding-left: 40px
        white-space nowrap
        li
          text-overflow clip
        .all-default-check
          width: 18px
          height: 18px
          border: 1px solid #3376ff
          border-radius 3px
          cursor pointer
          position: relative
          &::before
            content ''
            position: absolute
            left: -16px
            top: -16px
            width: 18px
            height: 18px
            padding: 16px
            box-sizing content-box
          &.check-all
            border none
            background url("../../../assets/img/robotManagement/selected.png") center no-repeat / cover
        .head-t
          padding-left: 20px
      .loading-w
        margin: 10px auto
        display: flex
        align-items center
        justify-content center
        img
          width: 60px
          display: block
      .check-li
        flex 0.2
      .table-body
        color #333
        font-size: 15px
        min-height: 50px
        display: flex
        align-items center
        border-bottom: 1px solid #e3e4e8
        background-color: #fff
        padding-left: 40px
        .default-check
          width: 18px
          height: 18px
          border: 1px solid #e3e4e8
          border-radius 3px
          cursor pointer
          position: relative
          &::before
            content ''
            position: absolute
            left: -16px
            top: -16px
            width: 18px
            height: 18px
            padding: 16px
            box-sizing content-box
          &.active-check
            border none
            background url("../../../assets/img/robotManagement/selected.png") center no-repeat / cover
        .more-list
          display flex
          flex-direction column
        .btn-ctrl
          display: flex
          align-items center
          cursor pointer
          .ctrl-item
            padding: 0 20px
</style>
