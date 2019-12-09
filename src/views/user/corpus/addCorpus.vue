<template>
  <div class="right-content v-right-content">
    <div class="path-navigation">
      <span @click="goback" class="link">{{$t('corpus.text1')}} > </span>
      <span class="current-path">{{navText}}</span>
    </div>
    <div>
<!--      1 意图-->
      <div>
        <div class="input-title title-one">
          <div class="input-name">{{$t('corpus.text2')}}</div>
        </div>
        <ul class="input-box">
          <li class="li-one">
            <input type="text" class="input" placeholder="" v-model.trim="intention">
          </li>
        </ul>
      </div>
<!--      2 问句-->
      <div>
        <div class="input-title title-one">
          <div class="input-name">{{$t('corpus.text3')}}*</div><div class="add-icon" @click="addName(1)">+ {{$t('corpus.text6')}}</div>
        </div>
        <ul class="input-box">
          <li v-for="(item, index) in questionsArr" :key="index">
            <div class="li-one">
              <input type="text" class="input" placeholder="" v-model.trim="item.name" @focus="focusInput(index, 1)" @blur="blurInput(index, 1)">
              <div class="delete-icon" @click="delIntr(index, 1)" v-show="questionsArr.length > 1"><img src="../../../assets/img/common/delete.png"></div>
            </div>
            <div class="error-m">{{item.errorText}}</div>
          </li>
        </ul>
      </div>
<!--      3 关键词-->
      <div>
        <div class="input-title title-one">
          <div class="input-name">{{$t('corpus.text4')}}</div><div class="add-icon" @click="addName(2)">+ {{$t('corpus.text6')}}</div>
        </div>
        <ul class="input-box">
          <li class="li-one" v-for="(item, index) in keywordsArr" :key="index">
            <input type="text" class="input" placeholder="" v-model.trim="item.name" >
            <div class="delete-icon" @click="delIntr(index, 2)" v-show="keywordsArr.length > 1"><img src="../../../assets/img/common/delete.png"></div>
          </li>
        </ul>
      </div>
<!--      4 答句-->
      <div>
        <div class="input-title title-one">
          <div class="input-name">{{$t('corpus.text5')}}*</div><div class="add-icon" @click="addName(3)">+ {{$t('corpus.text6')}}</div>
        </div>
        <ul class="input-box">
          <li  v-for="(item, index) in answersArr" :key="index">
            <div class="li-one">
              <input type="text" class="input" placeholder="" v-model.trim="item.name"  @focus="focusInput(index, 2)" @blur="blurInput(index, 2)">
              <div class="delete-icon" @click="delIntr(index, 3)" v-show="answersArr.length > 1"><img src="../../../assets/img/common/delete.png"></div>
            </div>
            <div class="error-m">{{item.errorText}}</div>
          </li>
        </ul>
      </div>
      <div class="save" @click="saveCorpus" :class="{'loading-btn': loadingBtnShow}">
        <img src="../../../assets/img/common/loading.gif" alt="" v-show="loadingBtnShow">
        <span>添加或修改语料</span>
      </div>
    </div>
    <div class="ctrl-w">
      <div class="flex-item" v-if="batchFlag">
        <div class="add-btn red-btn" @click="deleteSome">批量删除</div>
        <div class="add-btn cancel-btn" @click="cancelBatch">取消</div>
      </div>
      <div class="add-btn red-btn" v-else @click="showBatch">批量删除</div>
    </div>
    <div class="table-w">
<!--    table 头部  -->
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
<!--      搜索栏-->
      <ul class="table-header table-input">
        <!--        全选-->
        <li class="check-li" v-show="batchFlag === true">
          <div></div>
        </li>
        <li><input type="text" placeholder="请输入意图" v-model.trim="intent"></li>
        <li><input type="text" placeholder="请输入问句" v-model.trim="question"></li>
        <li><input type="text" placeholder="请输入词组" v-model.trim="keyword"></li>
        <li class="answer-list" ><input type="text" placeholder="请输入答案" v-model.trim="answers"></li>
        <li> <el-date-picker
          v-model="dataTime"
          class="date-input"
          type="date"
          :placeholder="$t('corpus.text36')">
        </el-date-picker></li>
        <li><div class="search-btn" @click="searchData">搜索</div></li>
      </ul>
      <div class="loading-w" v-show="loadingShow">
        <img src="../../../assets/img/common/loading.gif" alt="">
      </div>
<!--    table 数据 -->
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
    <div class="loading-w-m" v-show="axiosShow">
      <img src="../../../assets/img/common/loading.gif" alt="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/dialog'
  export default {
    data() {
      return {
        listAxios: [],
        intent: '',
        cIntention: '',
        question: '',
        keyword: '',
        answers: '',
        dataTime: '',
        loadingShow: true,
        checkAll: false,
        chatbotCorpusList: [],
        allChatbot: [],
        totalPage: 0,
        noLength: false,
        axiosShow: false,
        batchFlag: false,
        loadingBtnShow: false,
        btnText: this.$t('corpus.text7'),
        navText: this.$t('corpus.text8'),
        answersArr: [
          {name: '', errorText: ''}
        ],
        questionsArr: [
          {name: '', errorText: ''}
        ],
        keywordsArr: [
          {name: ''}
        ],
        intention: '',
        website: '',
        intrList: [
          {
            name: "",
          }
        ],
        pageSize: 10,
        activeIndex: 0,
        menuArr: [
          {name: this.$t('corpus.text9'), icon: ''},
          {name: this.$t('corpus.text10'), icon: ''}
        ],
        edScenario: '',
        chatbot: this.$route.query.chatbot
      }
    },
    created () {
      this.getRobot()
      if (this.$route.query.listdata) {
        this.getEditor()
      }
    },
    methods: {
      editorOne (item) {
        this.intention = item.intent
        this.cIntention = item.intent
        this.edScenario = item.scenario
        this.questionsArr = this.getObj(item.questions)
        this.keywordsArr = this.getObj(item.keywords)
        this.answersArr = this.getObj(item.answers)
      },
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
      // 搜索
      searchData () {
        if (this.intent === '' && this.question === '' && this.answers === '' && this.keyword === '' && !this.dataTime) {
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
            if (this.intent === '' && this.question === '' && this.answers === '' && this.keyword !== '') { // 只有词组
              item.keywords.forEach(m => {
                if (this.keyword === m) {
                  this.chatbotCorpusList.push(item)
                  this.chatbotCorpusList = this.objectFilters(this.chatbotCorpusList, 'scenario')
                }
              })
            }
            if (this.intent === '' && this.question === '' && this.answers !== '' && this.keyword === '') { // 只有答案
              item.answers.forEach(m => {
                if (this.answers === m) {
                  this.chatbotCorpusList.push(item)
                  this.chatbotCorpusList = this.objectFilters(this.chatbotCorpusList, 'scenario')
                }
              })
            }
            if (this.intent === '' && this.question === '' && this.answers === '' && this.keyword === '' && this.dataTime) { // 只有时间
              let dTime = this.$changeDate(this.dataTime, '.', 3)
              let mTime = this.dataInit(item.updatedAt)
              if (dTime === mTime) {
                this.chatbotCorpusList.push(item)
              }
            }
          })
          this.chatbotCorpusList = this.chatbotCorpusList.slice(0,this.pageSize)
          this.totalPage = Math.ceil(this.chatbotCorpusList.length / this.pageSize)
        }
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
      // 显示批量操作
      showBatch () {
        this.batchFlag = true
      },
      // 日期格式化
      dataInit (time) {
        return time.substring(0,10)
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
      // 第几页 跳转
      parentTurnPage (page) {
        this.chatbotCorpusList = this.allChatbot.slice(this.pageSize * (page - 1), this.pageSize * page)
        if (this.chatbotCorpusList.length === 0) {
          this.noLength = true
        }
      },
      // 获取列表
      getRobot () {
        this.chatbot = this.$route.query.uuid
        this.$fetch.get('/chatbotcorpus/', {
          chatbot: this.chatbot
        }).then(response => {
          this.loadingShow = false
          this.noLength = false
          this.allChatbot = response.chatbotCorpusList
          if (response.chatbotCorpusList.length > 0) {
            let corpusList = response.chatbotCorpusList
            corpusList.forEach((item) => {
              item.checkFlag = false
            })
            this.chatbotCorpusList = corpusList.slice(0,this.pageSize)
            this.totalPage = Math.ceil(corpusList.length / this.pageSize)
          } else {
            this.chatbotCorpusList = []
            this.totalPage = 0
            this.noLength = true
          }
        }).catch(() => {
          this.loadingShow = false
        })
      },
      // 返回上一页
      goback () {
        let query = {
          uuid: this.$route.query.uuid,
          name: this.$route.query.name,
          apiKey: this.$route.query.apiKey,
          createdAt: this.$route.query.createdAt,
          endpoint: this.$route.query.endpoint
        }
        this.$router.push({
          path: '/user/corpusMenu/corpus',
          query: query
        })
      },
      // 获取要修改的数据
      getEditor () {
        this.btnText = this.$t('corpus.text11')
        this.navText = this.$t('corpus.text12')
        let listdata = JSON.parse(this.$route.query.listdata)
        this.intention = listdata.intent
        this.questionsArr = this.getObj(listdata.questions)
        this.keywordsArr = this.getObj(listdata.keywords)
        this.answersArr = this.getObj(listdata.answers)
      },
      getObj (data) {
        let answers = []
        data.forEach((item) => {
          let obj3 = {}
          obj3.name = item
          answers.push(obj3)
        })
        return answers
      },
      uuidv4 () {
        return 'Scenario-xxxxxxxx-xxxx-yxxx-yxxx-yyyxyxyyxyyy'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      },
      // 保存
      saveCorpus () {
        let flag = true
        this.questionsArr.forEach((item, index) => {
          if (item.name === '') {
            this.questionsArr[index].errorText = this.$t('corpus.text13')
            flag = false
          } else {
            this.questionsArr[index].errorText = ''
            flag = true
          }
        })
        this.answersArr.forEach((item, index) => {
          if (item.name === '') {
            this.answersArr[index].errorText = this.$t('corpus.text14')
            flag = false
          } else {
            this.answersArr[index].errorText = ''
            flag = true
          }
        })
        if (flag === true) {
          this.loadingBtnShow = true
          let answers = []
          this.answersArr.forEach((item) => {
            answers.push(item.name)
          })
          let questions = []
          this.questionsArr.forEach((item) => {
            questions.push(item.name)
          })
          let keywords = []
          this.keywordsArr.forEach((item) => {
            keywords.push(item.name)
          })
          if (this.$route.query.listdata) { // 修改
            let listdata = JSON.parse(this.$route.query.listdata)
            let newIntent = '' // 只有当需求修改意图名称时，才使用此标签，不需要修改意图名称时，请使用空白或去除此标签
            if (listdata.intent === this.intention) {
              newIntent = ''
            } else {
              newIntent = this.intention
            }
            this.$fetch.patch('/chatbotcorpus/', {
              chatbot: this.chatbot,
              intent: listdata.intent,
              newIntent: newIntent,
              keywords: keywords,
              questions: questions,
              answers: answers,
              scenario: listdata.scenario
            }).then(res => {
              this.intention = ''
              this.questionsArr = [{name: '', errorText: ''}]
              this.keywordsArr = [{name: ''}]
              this.answersArr = [{name: '', errorText: ''}]
              if (JSON.stringify(res) === '{}') {
                this.getRobot()
                this.loadingBtnShow = false
                Dialog({
                  content: '修改成功'
                })
                // let query = {
                //   uuid: this.$route.query.uuid,
                //   name: this.$route.query.name,
                //   apiKey: this.$route.query.apiKey,
                //   createdAt: this.$route.query.createdAt,
                //   endpoint: this.$route.query.endpoint
                // }
                // Dialog({
                //   content: this.$t('corpus.text15'),
                //   okFn: () => {
                //     this.$router.push({
                //       path: '/user/corpusMenu/corpus',
                //       query: query
                //     })
                //   }
                // })
              } else {
                this.loadingBtnShow = false
                Dialog({
                  content: '修改失败'
                })
              }
            }).catch(() => {
              this.loadingBtnShow = false
              Dialog({
                content: '修改失败'
              })
            })
          } else {
            if (this.edScenario) { // 修改
              let cIntent = ''
              if (this.cIntention === this.intention) {
                cIntent = ''
              } else {
                cIntent = this.cIntention
              }
              this.$fetch.patch('/chatbotcorpus/', {
                chatbot: this.chatbot,
                intent: this.intention,
                newIntent: cIntent,
                keywords: keywords,
                questions: questions,
                answers: answers,
                scenario: this.edScenario
              }).then(res => {
                this.intention = ''
                this.questionsArr = [{name: '', errorText: ''}]
                this.keywordsArr = [{name: ''}]
                this.answersArr = [{name: '', errorText: ''}]
                if (JSON.stringify(res) === '{}') {
                  this.getRobot()
                  Dialog({
                    content: '修改成功'
                  })
                  this.loadingBtnShow = false
                } else {
                  this.loadingBtnShow = false
                  Dialog({
                    content: '修改失败'
                  })
                }
              }).catch(() => {
                this.loadingBtnShow = false
                Dialog({
                  content: '修改失败'
                })
              })
            } else { // 添加
              this.$fetch.post('/chatbotcorpus/', {
                chatbot: this.chatbot,
                intent: this.intention,
                keywords: keywords,
                questions: questions,
                answers: answers,
                scenario: this.uuidv4()
              }).then(res => {
                this.intention = ''
                this.questionsArr = [{name: '', errorText: ''}]
                this.keywordsArr = [{name: ''}]
                this.answersArr = [{name: '', errorText: ''}]
                if (JSON.stringify(res) === '{}') {
                  this.loadingBtnShow = false
                  this.getRobot()
                  Dialog({
                    content: '添加成功'
                  })
                } else {
                  this.loadingBtnShow = false
                  Dialog({
                    content: '添加失败'
                  })
                }
              }).catch(() => {
                this.loadingBtnShow = false
                Dialog({
                  content: '添加失败'
                })
              })
            }
          }
        }
      },
      // 添加
      addName(type) {
        let cope = {
          name: "",
        }
        if(type === 1) {
          this.questionsArr.push(cope);
        } else if(type === 2) {
          this.keywordsArr.push(cope);
        } else if(type === 3) {
          this.answersArr.push(cope);
        }
      },
      focusInput (index, type) {
        if (type === 1) {
          if (this.questionsArr[index].name !== '') {
            this.questionsArr[index].errorText = ''
          }
        } else if (type === 2) {
          if (this.answersArr[index].name !== '') {
            this.answersArr[index].errorText = ''
          }
        }
      },
      blurInput (index, type) {
        if (type === 1) {
          if (this.questionsArr[index].name === '') {
            this.questionsArr[index].errorText = this.$t('corpus.text13')
          } else {
            this.questionsArr[index].errorText = ''
          }
        } else if (type === 2) {
          if (this.answersArr[index].name === '') {
            this.answersArr[index].errorText = this.$t('corpus.text14')
          } else {
            this.answersArr[index].errorText = ''
          }
        }

      },
      // 删除
      delIntr(index, type) {
        if (type === 1) this.questionsArr.splice(index, 1)
        if (type === 2) this.keywordsArr.splice(index, 1)
        if (type === 3) this.answersArr.splice(index, 1)
      }
    },
    components: {
      turnPage: resolve => require(['@/components/turnPage.vue'], resolve)
    }

  }
</script>

<style scoped lang="stylus">
  /* 控制编辑区域的 */
  /*控制下拉小箭头的*/
.right-content
  .loading-w-m
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
    img
      width: 60px
      display: block
  .path-navigation
    font-size: 20px
    color #090d21
    padding-bottom: 20px
    border-bottom: 1px dashed #ccc
    .link
      cursor pointer
    .current-path
      color #3376ff
  .input-title{
    display flex
    justify-content space-between
    margin-top 30px
    margin-bottom 20px
    .input-name{
      font-size 18px
      color #090d21
    }
    .add-icon{
      cursor pointer
      font-size 18px
      color #3376ff
    }
  }
  .input-box{
    width 100%
    .li-one{
      padding  0 30px
      display flex
      justify-content space-between
      align-items center
      margin-top 30px
      width 100%
      height 50px
      color #090d21
      font-size 16px
      border-radius 4px
      background #F2F3F7
      .delete-icon{
        cursor pointer
        width 17px
        height 20px
        img{
          display block
          width 100%
        }
      }
    }
    .error-m{
      font-size: 16px
      color red
      margin-top: 10px
    }
    .input{
      flex 1
      height: 100%
    }
  }
  .save
    cursor pointer
    width: 300px
    height 50px
    background #3376ff
    text-align center
    line-height 50px
    color #fff
    font-size 18px
    border-radius 6px
    margin 30px auto 40px
    position relative
    display: flex
    align-items center
    justify-content center
    &.loading-btn
      pointer-events none
    img
      width: 30px
      display: block
      margin-right: 10px
  .table-w
    width 100%
    li
      flex 1
      text-align: center
      overflow:hidden;
      text-overflow:ellipsis;
      padding: 10px 20px
      @media screen and (max-width: 1400px)
        padding: 6px
    //.answer-list
      //flex 2
    .table-header
      color #090d21
      font-size: 16px
      height: 50px
      display: flex
      align-items center
      background-color: #f2f3f7
      border-bottom: 1px solid #e3e4e8
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
    .table-input
      background-color: #fff
      li
        padding: 0 20px
      .date-input
        width: 100%
      .date-input >>> input
        width: 100%
        font-size: 14px
        height: 30px
        line-height: 30px
      input
        width: 100%
        height: 30px
        border: 1px solid #e3e4e8
        padding-left: 10px
        font-size: 14px
        text-align: center
      .search-btn
        width 100%
        border-radius 4px
        height: 30px
        line-height: 30px
        cursor pointer
        color #fff
        text-align: center
        background-color: #3376ff
    .loading-w
      margin: 10px auto
      display: flex
      align-items center
      justify-content center
      img
        width: 60px
        display: block
     .check-li
       width 50px
       flex none
    .table-body
      color #333
      font-size: 15px
      min-height: 50px
      display: flex
      align-items center
      border-bottom: 1px solid #e3e4e8
      background-color: #fff
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
  .ctrl-w
    display: flex
    align-items flex-end
    justify-content flex-end
    margin-bottom: 20px
    .flex-item
      display: flex
      align-items center
    .cancel-btn
      background-color: #ccc
      margin-left: 20px
    .add-btn
      width: 118px
      height: 38px
      background-color: #3376ff
      color #fff
      border-radius 4px
      display: flex
      align-items center
      justify-content center
      font-size: 14px
      cursor pointer
      margin-left: 20px
    .red-btn
      background-color: #fd3e4b
</style>
