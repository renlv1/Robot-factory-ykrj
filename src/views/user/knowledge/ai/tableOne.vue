<template>
  <div>
    <div class="info">
      <div class="input-title title-one">
        <div class="input-name">知识点名称(中文)*</div>
      </div>
      <ul class="input-box">
        <li class="li-one">
          <input type="text" class="input" v-model.trim="zhName" placeholder="">
          </li>
      </ul>
      <div class="input-title title-one">
        <div class="input-name">知识点名称(英文)*</div>
      </div>
      <ul class="input-box">
        <li class="li-one">
          <input type="text" class="input" placeholder="" v-model.trim="enName" @input="inputChange(1)">
          </li>
      </ul>
      <div class="err-ms2" v-show="errInputMsg2">{{errInputMsg2}}</div>
      <div class="input-title title-one">
        <div class="input-name">知识点别称</div><div class="add-icon" @click="addName(1)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList1" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content">
          <div class="delete-icon" @click="delIntr(1)" v-show="intrList1.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>
      <div class="input-title title-one">
        <div class="input-name">各种原因</div><div class="add-icon" @click="addName(2)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList2" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content">
          <div class="delete-icon" @click="delIntr(2)" v-show="intrList2.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>
      <div class="input-title title-one">
        <div class="input-name">整体介绍</div><div class="add-icon" @click="addName(3)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList3" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content">
          <div class="delete-icon" @click="delIntr(3)" v-show="intrList3.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>
      <div class="input-title title-one">
        <div class="input-name">官网</div><div class="add-icon" @click="addName(4)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList4" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content">
          <div class="delete-icon" @click="delIntr(4)" v-show="intrList4.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>

      <div class="input-title title-one">
        <div class="input-name">请描述知识点的整体优点</div><div class="add-icon" @click="addName(5)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList5" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content">
          <div class="delete-icon" @click="delIntr(5)" v-show="intrList5.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>
    </div>
    <div class="save-btn" @click="btnSave()">
      <div class="save">保存</div>
      <div class="err-ms" v-show="errInputMsg">{{errInputMsg}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/dialog'
  export default {
    data() {
      return {
        errInputMsg2: '',
        zhName: '',
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
        errInputMsg: '',
      }
    },
    created() {
      this.getMIndex()
      this.zhName = this.$route.query.name

    },
    methods: {
      getMIndex () {
        let chatbot = '64a18818-eb61-41db-a747-de1269880e7b'
        this.$fetch.post('/chatbotknowledge/', {
          event: 'EVENT_GET_CONCEPT_BY_NAME',
          getChatbotConceptRequest: {
            chatbot: chatbot,
            concept: this.$route.query.name
          }
        }).then(res => {
          if (res.getChatbotConceptResponse) {
            let knowledgeData = JSON.parse(res.getChatbotConceptResponse.concept.properties)
            this.enName = knowledgeData.concept_name_english
            this.intrList1 = knowledgeData.concept_other_name
            this.intrList2 = knowledgeData.concept_name_reason
            this.intrList3 = knowledgeData.concept_introduction
            this.intrList4 = knowledgeData.concept_website
            this.intrList5 = knowledgeData.concept_overall_advantage
          }
        })
      },
      inputChange () {
        let reg = /[^a-zA-Z]/
        if (reg.test(this.enName)) {
          this.errInputMsg2 = '请输入英文'
        } else {
          this.errInputMsg2 = ''
        }
      },
      // 添加
      addName(type) {
        let cope = {
          name: "",
        }
        if(type === 1) {
          this.intrList1.push(cope);
        } else if(type === 2) {
          this.intrList2.push(cope);
        } else if(type === 3) {
          this.intrList3.push(cope);
        } else if(type === 4) {
          this.intrList4.push(cope);
        } else if(type === 5) {
          this.intrList5.push(cope);
        }
      },
      delIntr(index) {
        if (index === 1)  this.intrList1.splice(index, 1);
        if (index === 2)  this.intrList2.splice(index, 1);
        if (index === 3)  this.intrList3.splice(index, 1);
        if (index === 4)  this.intrList4.splice(index, 1);
        if (index === 5)  this.intrList5.splice(index, 1);
      },
      verify() {
        this.errInputMsg = ''
        let flag = true
        if (this.zhName === '') {
          this.errInputMsg = '请输入知识点中文名称'
          flag = false
        }
        if (this.enName === '') {
          this.errInputMsg = '请输入知识点英文名称'
          flag = false
        }
        let reg = /[^a-zA-Z]/
        if (reg.test(this.enName)) {
          this.errInputMsg2 = '请输入英文'
          flag = false
        }
        return flag
      },
      // 保存
      btnSave() {
        if(this.verify()) {
          let concept = {
            concept_name_chinese: this.zhName,
            concept_name_english: this.enName
          }
          let properties = {
            concept_name_chinese:this.zhName,
            concept_name_english: this.enName,
            concept_other_name: this.intrList1,
            concept_name_reason: this.intrList2,
            concept_introduction: this.intrList3,
            concept_website: this.intrList4,
            concept_overall_advantage: this.intrList5,
            // concept_advantage: [
            //   {content: ''},
            //   {
            //     concept_advantage_name: [{key: '', content: ''}],
            //     concept_advantage_description: [{key: '', content: ''}],
            //     concept_advantage_reason: [{key: '', content: ''}]
            //   }
            //   ],
            // concept_res_to_ques: [
            //   {
            //     concept_negative_feedback:  [{key: '', content: ''}],
            //     chatbot_response_to_concept_negative_feedback:[{key: '', content: ''}],
            //   }
            //   ],
            // concept_comparsion_to_others: [
            //   {
            //     other_concept_name: '',
            //     chatbot_response_to_better_than_other_concept: [{key: '', content: ''}],
            //     chatbot_response_to_how_better_than_other_concept: [{key: '', content: ''}],
            //     chatbot_response_to_better_than_other_concept_reason: [{key: '', content: ''}],
            //     chatbot_response_to_worse_than_other_concept:[{key: '', content: ''}],
            //   }
            //   ]
          }
          this.$fetch.post('/chatbotknowledge/', {
            createOrUpdateChatbotConceptRequest: {
              chatbot: '64a18818-eb61-41db-a747-de1269880e7b',
              concept: {
                name: this.zhName,
                properties: JSON.stringify(properties)
              }
            },
            event: 'EVENT_CREATEORUPDATE_CONCEPTS'
          }).then(res => {
            if (res.getChatbotConceptResponse){
              Dialog({
                concent: '保存成功'
              })
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .err-ms2{
    margin-top: 10px
    margin-left: 30px
    font-size: 14px
    color #ff2121
  }
  .title-one{
    margin-top 50px
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
  .save-btn{
    cursor pointer
    height 50px
    background #3376ff
    text-align center
    line-height 50px
    color #fff
    font-size 18px
    border-radius 6px
    margin 60px 0 40px
    position relative
    .err-ms{
      position absolute
      font-size 12px
      color #ff2121
      top -40px
      left 0
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
    .input{
      flex 1
      height: 100%
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
