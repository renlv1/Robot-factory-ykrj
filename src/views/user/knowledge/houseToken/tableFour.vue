<template>
  <div>
    <div class="info">
<!--      1-->
      <div class="input-title title-one">
        <div class="input-name">请描述产品的整体优点</div><div class="add-icon" @click="addName55(1)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList41" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content">
          <div class="delete-icon" @click="delIntr55(1)" v-show="intrList41.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>
      <!--      2-->
      <div class="input-title title-one">
        <div class="input-name">产品的具体优点名称*</div><div class="add-icon" @click="addName55(2)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList42" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content">
          <div class="delete-icon" @click="delIntr55(2)" v-show="intrList42.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>
      <div class="err-ms">{{errInputMsg41}}</div>
      <!--      3-->
      <div class="input-title title-one">
        <div class="input-name">产品的具体优点的详细描述</div><div class="add-icon" @click="addName55(3)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList43" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content">
          <div class="delete-icon" @click="delIntr55(3)" v-show="intrList43.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>
      <!--      4-->
      <div class="input-title title-one">
        <div class="input-name">为什么产品具有这个优点?</div><div class="add-icon" @click="addName55(4)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList44" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content">
          <div class="delete-icon" @click="delIntr55(4)" v-show="intrList44.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>
      <!--      5-->
      <div class="input-title title-one">
        <div class="input-name">用户可能质疑产品什么?</div><div class="add-icon" @click="addName55(5)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList45" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content">
          <div class="delete-icon" @click="delIntr55(5)" v-show="intrList45.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>
      <!--     6-->
      <div class="input-title title-one">
        <div class="input-name">机器人的回应是什么?</div><div class="add-icon" @click="addName55(6)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList46" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content" >
          <div class="delete-icon" @click="delIntr55(6)" v-show="intrList46.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>
      <!--     7-->
      <div class="input-title title-one">
        <div class="input-name">同类产品名称*</div>
      </div>
      <div class="input-box">
        <ul class="ul-one">
          <li class="li-one">
            <input type="text"  v-model.trim="classNamePro" placeholder="" class="input">
          </li>
        </ul>
      </div>
      <div class="err-ms">{{errInputMsg42}}</div>
      <!--      8-->
      <div class="input-title title-one">
        <div class="input-name">当用户说你的产品比另一个产品好或差不多时，你的机器人的回应是：</div><div class="add-icon" @click="addName55(8)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList48" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content" >
          <div class="delete-icon" @click="delIntr55(8)" v-show="intrList48.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>
      <!--      9-->
      <div class="input-title title-one">
        <div class="input-name">当用户问你的产品比另一个产品好在哪里时，你的机器人的回应是：</div><div class="add-icon" @click="addName55(9)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList49" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content" >
          <div class="delete-icon" @click="delIntr55(9)" v-show="intrList49.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>
      <!--      10-->
      <div class="input-title title-one">
        <div class="input-name">当用户问为什么你的产品比另一个产品好时，你的机器人的回应是：</div><div class="add-icon" @click="addName55(10)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList410" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content" >
          <div class="delete-icon" @click="delIntr55(10)" v-show="intrList410.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>
      <!--      11-->
      <div class="input-title title-one">
        <div class="input-name">当用户说你的产品比另一个产品差时，你的机器人的回应是：</div><div class="add-icon" @click="addName55(11)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList411" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content" >
          <div class="delete-icon" @click="delIntr55(11)" v-show="intrList411.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>
    </div>
    <div class="save-btn save-t" @click="btnSave55()">
      <div class="save">保存</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/dialog'
  export default {
    data() {
      return {
        freeOrNot55: '',
        price55: '',
        website55: '',
        product_nickname: '',
        product_name_reason: '',
        product_introduction: '',
        classNamePro: '',
        intrList41: [{
          content: "",
        }],
        intrList42: [{
          content: "",
        }],
        intrList43: [{
          content: "",
        }],
        intrList44: [{
          content: "",
        }],
        intrList45: [{
          content: "",
        }],
        intrList46: [{
          content: "",
        }],
        intrList7: [{
          content: "",
        }],
        intrList48: [{
          content: "",
        }],
        intrList49: [{
          content: "",
        }],
        intrList410: [{
          content: "",
        }],
        intrList411: [{
          content: "",
        }],
        errInputMsg41: '',
        errInputMsg42: '',
        functionName: '',
        product_func_intro: [],
        product_func_reason: [],
        how_use_product_function: [],
        how_product_function_work: [],
        product_func_fee_or_not: [],
        product_func_fee: [],
        product_after_sales_service: [],
        product_fee: [],
        product_discount_info: [],
        product_purchase_process: [],
        product_payment_method: []
      }
    },
    created() {
      this.getProduct55()
    },
    methods: {
      getProduct55 () {
        let chatbot = '64a18818-eb61-41db-a747-de1269880e7b'
        this.$fetch.post('/chatbotknowledge/', {
          event: 'EVENT_GET_PRODUCT_BY_NAME',
          getChatbotProductRequest: {
            chatbot: chatbot,
            product: this.$route.query.name
          }
        }).then(res => {
          if (res.getChatbotProductResponse) {
            let knowledgeData = JSON.parse(res.getChatbotProductResponse.chatbotProducts[0].properties)
            console.log(knowledgeData)
            this.website55 = knowledgeData.product_website
            this.product_nickname = knowledgeData.product_nickname
            this.product_name_reason = knowledgeData.product_name_reason
            this.product_introduction = knowledgeData.product_introduction
            this.price55 = knowledgeData.product_fee
            this.product_discount_info = knowledgeData.product_discount_info
            this.product_purchase_process = knowledgeData.product_purchase_process
            this.product_payment_method = knowledgeData.product_payment_method
            this.product_after_sales_service = knowledgeData.product_after_sales_service
            let product_funcs = knowledgeData.product_funcs[0]
            this.functionName = product_funcs.product_func_name
            this.product_func_intro = product_funcs.product_func_intro
            this.product_func_reason = product_funcs.product_func_reason
            this.how_use_product_function = product_funcs.how_use_product_function
            this.how_product_function_work = product_funcs.how_product_function_work
            this.product_func_fee_or_not = product_funcs.product_func_fee_or_not
            this.product_func_fee = product_funcs.product_func_fee

            this.intrList41 = knowledgeData.product_overall_advantage
            let product_advantage = knowledgeData.product_advantage[0]
            if (product_advantage) {
              this.intrList42 = product_advantage.product_advantage_name
              this.intrList43 = product_advantage.product_advantage_description
              this.intrList44 = product_advantage.product_advantage_reason
            }
            let product_res_to_ques = knowledgeData.product_res_to_ques[0]
            if (product_res_to_ques) {
              this.intrList45 = product_res_to_ques.product_negative_feedback
              this.intrList46 = product_res_to_ques.chatbot_response_to_product_negative_feedback
            }
            let product_comparsion_to_others = knowledgeData.product_comparsion_to_others[0]
            if (product_comparsion_to_others) {
              this.classNamePro = product_comparsion_to_others.other_product_name
              this.intrList48 = product_comparsion_to_others.chatbot_response_to_better_than_other_product
              this.intrList49 = product_comparsion_to_others.chatbot_response_to_how_better_than_other_product
              this.intrList410 = product_comparsion_to_others.chatbot_response_to_better_than_other_product_reason
              this.intrList411 = product_comparsion_to_others.chatbot_response_to_worse_than_other_product
            }
          }
        })
      },
      // 4添加
      addName55(type) {
        let cope = {
          content: "",
          key: 1
        }
        if(type === 1) {
          this.intrList41.push(cope);
        } else if(type === 2) {
          this.intrList42.push(cope);
        } else if(type === 3) {
          this.intrList43.push(cope);
        } else if(type === 4) {
          this.intrList44.push(cope);
        } else if(type === 5) {
          this.intrList45.push(cope);
        } else if(type === 6) {
          this.intrList46.push(cope);
        } else if(type === 8) {
          this.intrList48.push(cope);
        } else if(type === 9) {
          this.intrList49.push(cope);
        } else if(type === 10) {
          this.intrList410.push(cope);
        } else if(type === 11) {
          this.intrList411.push(cope);
        }
      },
      // 4删除
      delIntr55(index) {
        if (index === 1)  this.intrList41.splice(index, 1);
        if (index === 2)  this.intrList42.splice(index, 1);
        if (index === 3)  this.intrList43.splice(index, 1);
        if (index === 4)  this.intrList44.splice(index, 1);
        if (index === 5)  this.intrList45.splice(index, 1);
        if (index === 6)  this.intrList46.splice(index, 1);
        if (index === 8)  this.intrList48.splice(index, 1);
        if (index === 9)  this.intrList49.splice(index, 1);
        if (index === 10) this.intrList410.splice(index, 1);
        if (index === 11) this.intrList410.splice(index, 1);
      },
      // 4
      verify55 () {
        this.errInputMsg41 = ''
        this.errInputMsg42 = ''
        let flag = true
        this.intrList42.forEach(item => {
          if(item.content === '') {
            this.errInputMsg41 = '请输入产品的具体优点名称'
            flag = false
          }
        })
        if (this.classNamePro === '') {
          this.errInputMsg42 = '请输入同类产品名称'
        }
        return flag
      },
      // 4
      btnSave55 () {
        if (this.verify55()) {
          let product_funcs = [{
            product_func_name: this.functionName,
            product_func_intro: this.product_func_intro,
            product_func_reason: this.product_func_reason,
            how_use_product_function: this.how_use_product_function,
            how_product_function_work: this.how_product_function_work,
            product_func_fee_or_not: this.product_func_fee_or_not,
            product_func_fee: this.product_func_fee
          }]
          let properties = {
            product_free_or_not: this.freeOrNot55,
            product_fee: this.price55,
            product_discount_info: this.intrList41,
            product_purchase_process: this.intrList42,
            product_payment_method: this.intrList43,
            product_after_sales_service: this.intrList44,
            product_website: this.website55,
            product_nickname: this.product_nickname,
            product_name_reason: this.product_name_reason,
            product_introduction: this.product_introduction,
            product_funcs: product_funcs,
            product_overall_advantage: this.intrList41,
            product_advantage: [{
              product_advantage_name: this.intrList42,
              product_advantage_description: this.intrList43,
              product_advantage_reason: this.intrList44,
            }],
            product_res_to_ques: [{
              product_negative_feedback: this.intrList45,
              chatbot_response_to_product_negative_feedback: this.intrList46
            }],
            product_comparsion_to_others: [{
              other_product_name: this.classNamePro,
              chatbot_response_to_better_than_other_product: this.intrList48,
              chatbot_response_to_how_better_than_other_product: this.intrList49,
              chatbot_response_to_better_than_other_product_reason: this.intrList410,
              chatbot_response_to_worse_than_other_product: this.intrList411,
            }]
          }
          this.$fetch.post('/chatbotknowledge/', {
            createOrUpdateChatbotProductRequest: {
              chatbot: '64a18818-eb61-41db-a747-de1269880e7b',
              product: {
                name: this.$route.query.name,
                properties: JSON.stringify(properties)
              }
            },
            event: 'EVENT_CREATEORUPDATE_PRODUCT'
          }).then(res => {
            if (res.event){
              Dialog({
                content: '保存成功'
              })
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .err-ms
    font-size 14px
    color #ff2121
    margin-top: 10px
  .top-merit{
    display: flex
    align-items center
    justify-content space-between
    color #fd3e4b
    padding-bottom: 30px
    border-bottom: 1px dashed #ccc
    .right-m{
      display: flex
      align-items center
      cursor pointer
      img{
        margin-right: 10px
      }
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
  .save-btn{
    cursor pointer
    height 50px
    background #3376ff
    text-align center
    line-height 50px
    color #fff
    font-size 20px
    border-radius 6px
    margin 60px 0 40px
    position relative
  }
  .save-btn-add{
    margin-bottom: 0
    background-color: #e1ebff
    color #3376ff
  }
  .save-t{
    margin-top: 20px
  }
  .input-box{
    width 100%
    .li-one{
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
        padding: 0 30px
        img{
          display block
          width 17px
        }
      }
    }
    .input{
      padding  0 30px
      flex 1
      height: 100%
      border-radius 4px
      &.disable-input{
        cursor:no-drop
        background-color: #ccc
      }
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
        height: 100%
        .type{
          height: 100%
          min-width 10px
        }
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
