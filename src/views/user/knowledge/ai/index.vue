<template>
  <div class="ai-w">
    <div class="charles-w">
      <div class="right-content">
        <div class="top-cont">
<!--          <ul class="tab-ul">-->
<!--            <li v-for="(item,index) in tabArr" :key="index" class="tab-li" @click="changeOne(index)" :class="{active: activeChoose === index}">-->
<!--              <div class="text">{{item}}</div>-->
<!--            </li>-->
<!--          </ul>-->
          <!--      0  知识点概述 -->
          <div class="info" v-show="activeChoose === 0">
            <div class="info">
              <div class="input-title title-one" style="margin: 0;">
                <div class="input-name">{{$t('ai.text1')}}*</div>
              </div>
              <ul class="input-box">
                <li class="li-one">
                  <input type="text" class="input" v-model.trim="zhName" placeholder="" @input="inputAA">
                </li>
              </ul>
              <div class="err-ms2" v-show="errInputMsg001">{{errInputMsg001}}</div>
              <div class="input-title title-one">
                <div class="input-name">{{$t('ai.text2')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one">
                  <input type="text" class="input" placeholder="" v-model.trim="enName" @input="inputChange(1)">
                </li>
              </ul>
              <div class="err-ms2" v-show="errInputMsg2">{{errInputMsg2}}</div>
              <div class="input-title title-one">
                <div class="input-name">{{$t('ai.text3')}}</div><div class="add-icon" @click="addName(1)">+ {{$t('ai.text27')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in intrList1" :key="index" ref="inputFoucs01">
                  <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName(1, index)">
                  <div class="delete-icon" @click="delIntr1(1, index)" v-show="intrList1.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
              <div class="input-title title-one">
                <div class="input-name">{{$t('ai.text4')}}</div><div class="add-icon" @click="addName(2)">+ {{$t('ai.text27')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in intrList2" :key="index" ref="inputFoucs02">
                  <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName(2, index)">
                  <div class="delete-icon" @click="delIntr1(2, index)" v-show="intrList2.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
              <div class="input-title title-one">
                <div class="input-name">{{$t('ai.text5')}}</div><div class="add-icon" @click="addName(3)">+ {{$t('ai.text27')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in intrList3" :key="index" ref="inputFoucs03">
                  <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName(3, index)">
                  <div class="delete-icon" @click="delIntr1(3, index)" v-show="intrList3.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
              <div class="input-title title-one">
                <div class="input-name">{{$t('ai.text6')}}</div><div class="add-icon" @click="addName(4)">+ {{$t('ai.text27')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in intrList4" :key="index" ref="inputFoucs04">
                  <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName(4, index)">
                  <div class="delete-icon" @click="delIntr1(4, index)" v-show="intrList4.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
                </li>
              </ul>

              <div class="input-title title-one">
                <div class="input-name">{{$t('ai.text7')}}</div><div class="add-icon" @click="addName(5)">+ {{$t('ai.text27')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in intrList5" :key="index" ref="inputFoucs05">
                  <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName(5, index)">
                  <div class="delete-icon" @click="delIntr1(5, index)" v-show="intrList5.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
            </div>
            <div class="save-btn" @click="btnSave()" :class="{'loading-btn': loadingBtn}">
              <img src="../../../../assets/img/common/loading.gif" alt="" v-show="loadingBtn">
              <div class="save">{{$t('ai.text8')}}</div>
            </div>
          </div>
          <!--        1 具体优点 -->
          <div class="info" v-show="activeChoose === 1">
            <div class="info form-w" v-for="(item2, idx2) in table2" :key="idx2">
              <div class="top-merit">
                <div>{{$t('ai.text9')}}{{idx2 + 1}}</div>
                <div class="right-m" @click="deleteTab2(idx2)">
                  <img src="../../../../assets/img/common/delete.png" alt="">
                  <span>{{$t('ai.text10')}}</span>
                </div>
              </div>
              <div class="input-title title-one">
                <div class="input-name">{{$t('ai.text11')}}*</div><div class="add-icon" @click="addName2(1, idx2)">+ {{$t('ai.text27')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in intrList21[idx2]" :key="index">
                  <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName2(1, idx2)">
                  <div class="delete-icon" @click="delIntr2(1, index, idx2)" v-show="intrList21[idx2].length > 1"><img src="../../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
              <div class="err-ms">{{errInputMsg22[idx2]}}</div>
              <div class="input-title title-one">
                <div class="input-name">{{$t('ai.text12')}}</div><div class="add-icon" @click="addName2(2, idx2)">+ {{$t('ai.text27')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in intrList22[idx2]" :key="index">
                  <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName2(2, idx2)">
                  <div class="delete-icon" @click="delIntr2(2, index, idx2)" v-show="intrList22[idx2].length > 1"><img src="../../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
              <div class="input-title title-one">
                <div class="input-name">{{$t('ai.text13')}}</div><div class="add-icon" @click="addName2(3, idx2)">+ {{$t('ai.text27')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in intrList23[idx2]" :key="index">
                  <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName2(3, idx2)">
                  <div class="delete-icon" @click="delIntr2(3, index, idx2)" v-show="intrList23[idx2].length > 1"><img src="../../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
            </div>
            <div class="save-btn save-btn-add" @click="addTab2">{{$t('ai.text14')}}</div>
            <div class="save-btn save-t" @click="btnSave2()" :class="{'loading-btn': loadingBtn}">
              <img src="../../../../assets/img/common/loading.gif" alt="" v-show="loadingBtn">
              <div class="save">{{$t('ai.text8')}}</div>
            </div>
          </div>
          <!--        2 质疑应对-->
          <div class="info" v-show="activeChoose === 2">
            <div class="info form-w" v-for="(item2, idx3) in table3" :key="idx3">
              <div class="top-merit">
                <div>{{$t('ai.text15')}}{{idx3 + 1}}</div>
                <div class="right-m" @click="deleteTab3(idx3)">
                  <img src="../../../../assets/img/common/delete.png" alt="">
                  <span>{{$t('ai.text16')}}</span>
                </div>
              </div>
              <div class="input-title title-one">
                <div class="input-name">{{$t('ai.text17')}}</div><div class="add-icon" @click="addName33(1, idx3)">+ {{$t('ai.text27')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in reasonList31[idx3]" :key="index">
                  <input type="text" class="input" placeholder="" v-model.trim="item.content"  @keyup.enter="addName33(1, idx3)">
                  <div class="delete-icon" @click="delReason33(1, index, idx3)" v-show="reasonList31[idx3].length > 1"><img src="../../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
              <div class="input-title title-one">
                <div class="input-name">{{$t('ai.text18')}}</div><div class="add-icon" @click="addName33(2, idx3)">+ {{$t('ai.text27')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in reasonList32[idx3]" :key="index">
                  <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName33(2, idx3)">
                  <div class="delete-icon" @click="delReason33(2, index, idx3)" v-show="reasonList32[idx3].length > 1"><img src="../../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
            </div>
            <div class="save-btn save-btn-add" @click="addTab3">{{$t('ai.text19')}}</div>
            <div class="save-btn save-t" @click="btnSave3()" :class="{'loading-btn': loadingBtn}">
              <img src="../../../../assets/img/common/loading.gif" alt="" v-show="loadingBtn">
              <div class="save">{{$t('ai.text8')}}</div>
            </div>
          </div>
          <!--        3 同类知识点-->
          <div class="info" v-show="activeChoose === 3">
            <div class="info form-w"  v-for="(item2, idx4) in table4" :key="idx4">
              <div class="top-merit">
                <div>{{$t('ai.text20')}}{{idx4 + 1}}</div>
                <div class="right-m" @click="deleteTab4(idx4)">
                  <img src="../../../../assets/img/common/delete.png" alt="">
                  <span>{{$t('ai.text21')}}</span>
                </div>
              </div>
              <div class="input-title title-one">
                <div class="input-name">{{$t('ai.text22')}}*</div>
              </div>
              <ul class="input-box">
                <li class="li-one">
                  <input type="text" class="input" placeholder="" v-model.trim="reasonList41[idx4]">
                </li>
              </ul>
              <div class="err-ms">{{errInputMsg4[idx4]}}</div>
              <div class="input-title title-one">
                <div class="input-name">{{$t('ai.text23')}}</div><div class="add-icon" @click="addName4(2, idx4)">+ {{$t('ai.text27')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in reasonList42[idx4]" :key="index">
                  <input type="text" class="input" placeholder="" v-model.trim="item.content"  @keyup.enter="addName4(2, idx4)">
                  <div class="delete-icon" @click="delReason4(2, index, idx4)" v-show="reasonList42[idx4].length > 1"><img src="../../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
              <div class="input-title title-one">
                <div class="input-name">{{$t('ai.text24')}}</div><div class="add-icon" @click="addName4(3, idx4)">+ {{$t('ai.text27')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in reasonList43[idx4]" :key="index">
                  <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName4(3, idx4)">
                  <div class="delete-icon" @click="delReason4(3, index, idx4)" v-show="reasonList43[idx4].length > 1"><img src="../../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
              <div class="input-title title-one">
                <div class="input-name">{{$t('ai.text25')}}</div><div class="add-icon" @click="addName4(4, idx4)">+ {{$t('ai.text27')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in reasonList44[idx4]" :key="index">
                  <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName4(4, idx4)">
                  <div class="delete-icon" @click="delReason4(4, index, idx4)" v-show="reasonList44[idx4].length > 1"><img src="../../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
            </div>
            <div class="save-btn save-btn-add" @click="addTab4()">{{$t('ai.text26')}}</div>
            <div class="save-btn save-t" @click="btnSave4()" :class="{'loading-btn': loadingBtn}">
              <img src="../../../../assets/img/common/loading.gif" alt="" v-show="loadingBtn">
              <div class="save">{{$t('ai.text8')}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/dialog'
  import Dialog2 from '@/components/dialog2'
  export default {
    data() {
      return {
        loadingBtn: false,
        productName: '',
        errInputMsgDialog2: '',
        showDialog: false,
        menuArr: [],
        heightFlag: -1,
        table2: [''],
        table3: [''],
        table4: [''],
        errInputMsg4: [''],
        reasonList41: [''],
        reasonList42: [[{key: 1, content: ''}]],
        reasonList43: [[{key: 1, content: ''}]],
        reasonList44: [[{key: 1, content: ''}]],
        errInputMsg33: '',
        reasonList31: [[{key: 1, content: ""}]],
        reasonList32: [[{key: 1, content: ""}]],
        intrList21: [
          [{key: 1, content: ""}]
        ],
        intrList22: [[{key: 1, content: ""}]],
        intrList23: [[{key: 1, content: ""}]],
        errInputMsg22: [''],
        errInputMsg2: '',
        enName: '',
        intrList1: [{
          content: "",
        }],
        intrList2: [{
          content: "",
        }],
        intrList3: [{
          content: "",
        }],
        intrList4: [{
          content: "",
        }],
        intrList5: [{
          content: "",
        }],
        zhName: '',
        tabArr: ['知识点概述', '具体优点', '质疑应对', '同类知识点'],
        activeChoose: 0,
        errInputMsg001: ''
      }
    },
    created() {
      this.zhName = this.$route.query.name2
      this.getMenu()
    },
    methods: {
      inputAA () {
        let reg = /^[\u4e00-\u9fa5\u3001\a-zA-Z0-9_\s]+$/
        if (reg.test(this.zhName)) {
          this.errInputMsg001 = ''
        } else {
          this.errInputMsg001 = this.$t('ai.text28')
        }
      },
      getRoute () {
        this.zhName = this.$route.query.name2
        this.errInputMsg001 = ''
        this.getMIndex()
      },
      // 获取知识点菜单
      getMenu () {
        let chatbot = this.$route.query.uuid //  64a18818-eb61-41db-a747-de1269880e7b
        this.$fetch.post('/chatbotknowledge/', {
          event: 'EVENT_GET_CONCEPT_NAMES',
          getChatbotConceptRequest: {
            chatbot: chatbot
          }
        }).then(res => {
          if (res.getChatbotConceptResponse) {
            this.menuArr = res.getChatbotConceptResponse.conceptNames
            this.conceptName = res.getChatbotConceptResponse.conceptNames[0]
            this.getMIndex()
          }
        }).catch(() => {
        })
      },
      // tab切换
      changeOne(index) {
        this.activeChoose = index
      },
      // 获取input内容
      getMIndex () {
        this.enName = ''
        this.intrList1 = [{content: ""}]
        this.intrList2 = [{content: ""}]
        this.intrList3 = [{content: ""}]
        this.intrList4 = [{content: ""}]
        this.intrList5 = [{content: ""}]
        let chatbot = this.$route.query.uuid
        this.$fetch.post('/chatbotknowledge/', {
          event: 'EVENT_GET_CONCEPT_BY_NAME',
          getChatbotConceptRequest: {
            chatbot: chatbot,
            concept: this.$route.query.name2
          }
        }).then(res => {
          if (res.getChatbotConceptResponse) {
            let knowledgeData = JSON.parse(res.getChatbotConceptResponse.concept.properties)
            this.enName = knowledgeData.concept_name_english
            this.intrList1 = knowledgeData.concept_other_name || [{content: ""}]
            this.intrList2 = knowledgeData.concept_name_reason || [{content: ""}]
            this.intrList3 = knowledgeData.concept_introduction || [{content: ""}]
            this.intrList4 = knowledgeData.concept_website || [{content: ""}]
            this.intrList5 = knowledgeData.concept_overall_advantage || [{content: ""}]
            let concept_advantage = knowledgeData.concept_advantage
            let intrList21 = []
            let intrList22 = []
            let intrList23 = []
            if (concept_advantage) {
              concept_advantage.forEach((item, index) => { // 具体优点
                if (index !== 0){
                  if (item[0].concept_advantage_name) {
                    intrList21.push(item[0].concept_advantage_name)
                  } else {
                    intrList21.push([{content: ""}])
                  }
                  if (item[1].concept_advantage_description) {
                    intrList22.push(item[1].concept_advantage_description)
                  } else {
                    intrList22.push([{content: ""}])
                  }
                  if (item[2].concept_advantage_reason) {
                    intrList23.push(item[2].concept_advantage_reason)
                  } else {
                    intrList23.push([{content: ""}])
                  }
                }
              })
            } else {
              intrList21 = [[{content: ""}]]
              intrList22 = [[{content: ""}]]
              intrList23 = [[{content: ""}]]
            }
            this.intrList21 = intrList21 || [{content: ""}]
            this.intrList22 = intrList22 || [{content: ""}]
            this.intrList23 = intrList23 || [{content: ""}]
            let concept_res_to_ques = knowledgeData.concept_res_to_ques // 质疑应对
            let reasonList31 = []
            let reasonList32 = []
            if (concept_res_to_ques) {
              concept_res_to_ques.forEach((item, index) => {
                if (item[0].concept_negative_feedback) {
                  reasonList31.push(item[0].concept_negative_feedback)
                } else {
                  reasonList31.push([{content: ""}])
                }
                if (item[1].chatbot_response_to_concept_negative_feedback) {
                  reasonList32.push(item[1].chatbot_response_to_concept_negative_feedback)
                } else {
                  reasonList32.push([{content: ""}])
                }
              })
            } else {
              reasonList31 = [[{content: ""}]]
              reasonList32 = [[{content: ""}]]
            }
            this.reasonList31 = reasonList31 || [{content: ""}]
            this.reasonList32 = reasonList32 || [{content: ""}]
            let concept_comparsion_to_others = knowledgeData.concept_comparsion_to_others // 同类知识点
            let reasonList41 = []
            let reasonList42 = []
            let reasonList43 = []
            let reasonList44 = []
            if (concept_comparsion_to_others) {
              concept_comparsion_to_others.forEach((item, index) => {
                if (index > 0) {
                  this.table4.push('')
                }
                if (item[0].other_concept_name) {
                  reasonList41.push(item[0].other_concept_name)
                } else {
                  reasonList41.push('')
                }
                if (item[1].chatbot_response_to_better_than_other_concept) {
                  reasonList42.push(item[1].chatbot_response_to_better_than_other_concept)
                } else {
                  reasonList42.push([{content: ""}])
                }
                if (item[2].chatbot_response_to_how_better_than_other_concept) {
                  reasonList43.push(item[2].chatbot_response_to_how_better_than_other_concept)
                } else {
                  reasonList43.push([{content: ""}])
                }
                if (item[4].chatbot_response_to_worse_than_other_concept) {
                  reasonList44.push(item[4].chatbot_response_to_worse_than_other_concept)
                } else {
                  reasonList44.push([{content: ""}])
                }
              })
            } else {
              reasonList42 = [[{content: ""}]]
              reasonList43 = [[{content: ""}]]
              reasonList44 = [[{content: ""}]]
            }
            this.reasonList41 = reasonList41 || ['']
            this.reasonList42 = reasonList42 || [{content: ""}]
            this.reasonList43 = reasonList43 || [{content: ""}]
            this.reasonList44 = reasonList44 || [{content: ""}]
          }
        })
      },
      inputChange () {
        let reg = /[^a-zA-Z]/
        if (reg.test(this.enName)) {
          this.errInputMsg2 = this.$t('ai.text29')
        } else {
          this.errInputMsg2 = ''
        }
      },
      inputFocus (ref, i) {
        setTimeout(() => {
          if(ref) {
            ref[i+1].getElementsByClassName('input')[0].focus()
          }
        },300)
      },
      // 知识点 添加
      addName(type, index) {
        let cope = {
          name: "",
        }
        let ref = ''
        if(type === 1) {
          this.intrList1.push(cope);
          ref = this.$refs.inputFoucs01
        } else if(type === 2) {
          this.intrList2.push(cope);
          ref = this.$refs.inputFoucs02
        } else if(type === 3) {
          this.intrList3.push(cope);
          ref = this.$refs.inputFoucs03
        } else if(type === 4) {
          this.intrList4.push(cope);
          ref = this.$refs.inputFoucs04
        } else if(type === 5) {
          this.intrList5.push(cope);
          ref = this.$refs.inputFoucs05
        }
        if (index > -1) this.inputFocus(ref, index)
      },
      // 知识点 删除
      delIntr1(index, mindex) {
        if (localStorage.getItem('__notTips') && localStorage.getItem('__notTips') === localStorage.getItem('__userEmail__')) {
          if (index === 1) {
            this.intrList1.splice(mindex, 1)
          } else if (index === 2) {
            this.intrList2.splice(mindex, 1)
          } else if (index === 3) {
            this.intrList3.splice(mindex, 1)
          } else if (index === 4) {
            this.intrList4.splice(mindex, 1)
          } else if (index === 5) {
            this.intrList5.splice(mindex, 1)
          }
        } else {
          Dialog2({
            okFn: () => {
              if (index === 1) {
                this.intrList1.splice(mindex, 1)
              } else if (index === 2) {
                this.intrList2.splice(mindex, 1)
              } else if (index === 3) {
                this.intrList3.splice(mindex, 1)
              } else if (index === 4) {
                this.intrList4.splice(mindex, 1)
              } else if (index === 5) {
                this.intrList5.splice(mindex, 1)
              }
            }
          })
        }
      },
      // 知识点 验证
      verify() {
        this.errInputMsg001 = ''
        this.errInputMsg2 = ''
        let flag = true
        if (this.zhName === '') {
          this.errInputMsg001 = this.$t('ai.text30')
          flag = false
        }
        let reg3 = /^[\u4e00-\u9fa5\u3001\a-zA-Z0-9_\s]+$/
        if (!reg3.test(this.zhName)) {
          this.errInputMsg001 = this.$t('ai.text28')
          flag = false
        }
        return flag
      },
      // 知识点 保存
      btnSave() {
        if(this.verify()) {
          this.loadingBtn = true
          if (this.zhName !== this.$route.query.name2) {
            this.$fetch.post('/chatbotknowledge/', {
              event: "EVENT_DELETE_CONCEPT",
              deleteChatbotKnowledgeRequest: {
                concept: this.$route.query.name2,
                chatbot: this.$route.query.uuid
              }
            }).then(res => {
              if (res.event) {
                this.sendData()
              } else {
                this.loadingBtn = false
                Dialog({
                  content: this.$t('houseToken.text36')
                })
              }
            }).catch(() => {
              Dialog({
                content: this.$t('houseToken.text36')
              })
            })
          } else {
            this.sendData()
          }
        }
      },
      // 添加 优点 tab
      addTab2 () {
        this.table2.push('')
        this.intrList21.push([{key: 1, content: ""}])
        this.intrList22.push([{key: 1, content: ""}])
        this.intrList23.push([{key: 1, content: ""}])
      },
      // 删除 优点 tab
      deleteTab2 (index) {
        this.table2.splice(index, 1)
      },
      // 具体优点  添加
      addName2(type, idex2) {
        let cope = {
          content: "",
          key: 1
        }
        console.log(this.intrList21)
        if(type === 1) {
          this.intrList21[idex2].push(cope);
        } else if(type === 2) {
          this.intrList22[idex2].push(cope);
        } else if(type === 3) {
          this.intrList23[idex2].push(cope);
        }
      },
      // 具体优点  删除
      delIntr2(index, mindex, idx2) {
        if (localStorage.getItem('__notTips') && localStorage.getItem('__notTips') === localStorage.getItem('__userEmail__')) {
          if (index === 1) this.intrList21[idx2].splice(mindex, 1);
          if (index === 2) this.intrList22[idx2].splice(mindex, 1);
          if (index === 3) this.intrList23[idx2].splice(mindex, 1);
        } else {
          Dialog2({
            okFn: () => {
              if (index === 1) this.intrList21[idx2].splice(mindex, 1);
              if (index === 2) this.intrList22[idx2].splice(mindex, 1);
              if (index === 3) this.intrList23[idx2].splice(mindex, 1);
            }
          })
        }
      },
      // 具体优点 验证
      verify2(){
        let flag = true
        this.intrList21.forEach((it2,index2) => {
          it2.forEach(item => {
            if(item.content === '') {
              this.errInputMsg22 = this.$t('ai.text32')
              flag =false
            }
          })
        })
        return flag
      },
      // 具体优点  保存
      btnSave2() {
        if(this.verify2()) {
          this.loadingBtn = true
          this.sendData()
        }
      },
      // 质疑应对 添加 一个
      addName33 (type, idx3) {
        let cope = {
          content: "",
          key: 1
        }
        if(type === 1) {
          this.reasonList31[idx3].push(cope);
        } else if(type === 2) {
          this.reasonList32[idx3].push(cope);
        }
      },
      // 质疑应对 添加 form
      addTab3 () {
        this.table3.push('')
        this.reasonList31.push([{key: 1, content: ""}])
        this.reasonList32.push([{key: 1, content: ""}])
      },
      //  质疑应对 删除 form
      deleteTab3 (idx3) {
        this.table3.splice(idx3, 1)
      },
      // 质疑应对 删除
      delReason33 (index, mindex, idx3) {
        if (localStorage.getItem('__notTips') && localStorage.getItem('__notTips') === localStorage.getItem('__userEmail__')) {
          if (index === 1) this.reasonList31[idx3].splice(mindex, 1);
          if (index === 2) this.reasonList32[idx3].splice(mindex, 1);
        } else {
          Dialog2({
            okFn: () => {
              if (index === 1) this.reasonList31[idx3].splice(mindex, 1);
              if (index === 2) this.reasonList32[idx3].splice(mindex, 1);
            }
          })
        }
      },
      // 质疑应对 保存
      btnSave3 () {
        this.loadingBtn = true
        this.sendData()
      },
      // 保存接口
      sendData () {
        let concept_res_to_ques = [] // 质疑数据
        this.table3.forEach((item, index) => {
          let arr3 = [
            {concept_negative_feedback: this.reasonList31[index]},
            {chatbot_response_to_concept_negative_feedback: this.reasonList32[index]}
          ]
          concept_res_to_ques.push(arr3)
        })
        let concept_comparsion_to_others = [] // 同类知识点
        this.table4.forEach((item, index) => {
          let reason =  [{key: 1, content: ""}]
          let arr4 = [
            {other_concept_name: this.reasonList41[index]},
            {chatbot_response_to_better_than_other_concept: this.reasonList42[index]},
            {chatbot_response_to_how_better_than_other_concept: this.reasonList43[index]},
            {chatbot_response_to_better_than_other_concept_reason: reason},
            {chatbot_response_to_worse_than_other_concept: this.reasonList44[index]},
          ]
          concept_comparsion_to_others.push(arr4)
        })
        let concept_advantage = [{content: ''}] // 具体优点
        this.table2.forEach((item, index) => {
          let arr2 = [
            {concept_advantage_name: this.intrList21[index]},
            {concept_advantage_description: this.intrList22[index]},
            {concept_advantage_reason: this.intrList23[index]},
          ]
          concept_advantage.push(arr2)
        })
        let properties = {
          concept_name_chinese:this.zhName,
          concept_name_english: this.enName,
          concept_other_name: this.intrList1,
          concept_name_reason: this.intrList2,
          concept_introduction: this.intrList3,
          concept_website: this.intrList4,
          concept_overall_advantage: this.intrList5
          // concept_res_to_ques: concept_res_to_ques,
          // concept_comparsion_to_others: concept_comparsion_to_others,
          // concept_advantage: concept_advantage
        }
        this.$fetch.post('/chatbotknowledge/', {
          createOrUpdateChatbotConceptRequest: {
            chatbot: this.$route.query.uuid,
            concept: {
              name: this.zhName,
              properties: JSON.stringify(properties)
            }
          },
          event: 'EVENT_CREATEORUPDATE_CONCEPTS'
        }).then(res => {
          if (res.event){
            Dialog({
              content: this.$t('ai.text33')
            })
            this.$router.push({
              path: '/user/knowledge/ai',
              query: {
                name2: this.zhName,
                index: 1,
                mindex: this.$route.query.mindex,
                uuid: this.$route.query.uuid,
                name: this.$route.query.name,
                apiKey: this.$route.query.apiKey,
                createdAt: this.$route.query.createdAt,
                endpoint: this.$route.query.endpoint
              }
            })
          } else {
            Dialog({
              content: this.$t('ai.text34')
            })
          }
          this.loadingBtn = false
        }).catch(err => {
          this.loadingBtn = false
          Dialog({
            content: this.$t('ai.text34')
          })
        })
      },
      // 同类知识点 删除
      delReason4 (index, mindex, idx4) {
        if (localStorage.getItem('__notTips') && localStorage.getItem('__notTips') === localStorage.getItem('__userEmail__')) {
          if (index === 1) this.reasonList41[idx4].splice(mindex, 1);
          if (index === 2) this.reasonList42[idx4].splice(mindex, 1);
          if (index === 3) this.reasonList43[idx4].splice(mindex, 1);
          if (index === 4) this.reasonList44[idx4].splice(mindex, 1);
        } else {
          Dialog2({
            okFn: () => {
              if (index === 1) this.reasonList41[idx4].splice(mindex, 1);
              if (index === 2) this.reasonList42[idx4].splice(mindex, 1);
              if (index === 3) this.reasonList43[idx4].splice(mindex, 1);
              if (index === 4) this.reasonList44[idx4].splice(mindex, 1);
            }
          })
        }
      },
      // 同类知识点 添加
      addName4 (type, idx4) {
        let cope = {
          content: "",
          key: 1
        }
        if(type === 1) {
          this.reasonList41[idx4].push('');
        } else if(type === 2) {
          this.reasonList42[idx4].push(cope);
        } else if(type === 3) {
          this.reasonList43[idx4].push(cope);
        } else if(type === 4) {
          this.reasonList44[idx4].push(cope);
        }
      },
      deleteTab4 (idx4) {
        this.table4.splice(idx4, 1)
      },
      addTab4 () {
        this.table4.push('')
        this.reasonList41.push('')
        this.reasonList42.push([{key: 1, content: ""}])
        this.reasonList43.push([{key: 1, content: ""}])
        this.reasonList44.push([{key: 1, content: ""}])
      },
      // 同类知识点 保存
      btnSave4 () {
        this.table4.forEach((item, index) => {
          if(this.reasonList41[index] === '') {
            this.errInputMsg4[index] = this.$t('ai.text32')
            return false
          } else {
            this.loadingBtn = true
            this.sendData()
          }
        })
      }
    },
    watch: {
      '$route': 'getRoute'
    },
    components: {
    }
  }
</script>

<style scoped lang="stylus">
.err-ms2
  color #fd3e4b
  margin-top: 10px
.ai-w
  .charles-w
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
            background: url("../../../../assets/img/common/minus.png") no-repeat center / cover
.form-w
  margin-bottom: 20px
.err-ms
  margin-top: 10px
  margin-left: 30px
  font-size 12px
  color #ff2121
.top-merit
  display: flex
  align-items center
  justify-content space-between
  color #fd3e4b
  padding-bottom: 30px
  border-bottom: 1px dashed #ccc
  .right-m
    display: flex
    align-items center
    cursor pointer
    img
      margin-right: 10px
.right-content
  width: 100%
  // padding: 60px 30px 30px 60px
  .top-cont
    width: 100%;
    height auto
    overflow: auto
    .top-m
      height: 80px
      padding-bottom: 40px
      box-sizing content-box
      font-size: 18px;
      color: #090d21;
      width: 100%;
      border-bottom: 1px dashed #ccc;
      .top-c
        display: flex;
        align-items: center;
        justify-content space-between
        background-color: #f2f3f7
      .left
        display: flex
        align-items center
        .list-m
          display: flex
          align-items center
          margin-right: 130px
          img
            margin-right: 14px
    .tab-ul{
      display flex
      background #F2F3F7
      border-radius 6px
      height 60px
      margin-bottom: 50px
      .tab-li{
        display flex
        align-items center
        justify-content center
        cursor pointer
        font-size 18px
        color #090d21
        flex 1
        &.active{
          border-radius 6px
          background #3376ff
          color #fff
          .text {
            border-right none
          }
        }
        &:last-child .text{
          border-right none
        }
        .text{
          width: 100%
          text-align: center
          border-right: 1px solid #090d21
        }
      }
    }
    .save-btn{
      cursor pointer
      height 50px
      background #3376ff
      text-align center
      color #fff
      font-size 18px
      border-radius 6px
      margin 50px 0
      position relative
      display: flex
      align-items center
      justify-content center
      &.loading-btn{
        pointer-events none
      }
      img{
        width: 30px
        display: block
        margin-right: 10px
      }
    }
    .wrap{
      display flex
      .title-one{
        margin-top 20px
      }
      .wrap-left{
        flex 1
        margin-right 20px
      }
      .wrap-right{
        flex 1
      }
    }
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
    .title-one{
      margin-top 50px
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
          height 100%
          display: flex
          align-items center
          justify-content center
          padding: 0 30px
          box-sizing content-box
          margin-right: -30px
          img{
            display block
            width 17px
          }
        }
      }
      .input{
        height: 100%
        flex 1
      }
    }
    .record-type{
      cursor: pointer;
      user-select:none;
      width: 100%
      height: 50px;
      line-height 50px
      background #F2F3F7
      border-radius 4px
      font-size 16px
      color #b3b3b3
      position: relative;
      .type-box{
        width: 100%;
        height: 100%;
        .fixed-type{
          color #090d21
          padding:  0 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .sel-img{
          top: 40%;
          transform: translate(-50%);
          right: 20px;
          /*position: absolute;*/
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all .5s;
          .arrowDown{
            display: inline-block;
            width: 16px;
            height: 10px;
            background: url("../../../../assets/img/robotManagement/pull.png") no-repeat;
            background-position: center;
            background-size: cover!important;
            &.active-Img{
              transform: rotate(180deg);
            }
          }
        }
        .selectMenu{
          display: none;
          transition: all .3s linear;
          position: absolute;
          top: 60px;
          width: 100%;
          height: 0;
          verflow-y: hidden;
          z-index: 99;
          box-shadow: 0 2px 2px rgba(153, 153, 153, .2);
          &.selectMenuActive{
            display: block;
            height: auto;
          }
          li{
            line-height 40px
            border-bottom 1px solid #ededed
            padding-left: 20px;
            background #F2F3F7
            height: 40px;
            font-size: 18px;
            color: #999;
            &:hover{
              background #f1f1f1
              font-size: 18px;
              color: #090d21;
            }
          }
        }
      }
    }
</style>
