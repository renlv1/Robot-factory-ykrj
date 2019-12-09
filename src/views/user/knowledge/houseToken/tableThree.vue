<template>
  <div>
    <div class="info">
      <div class="input-title title-one">
        <div class="input-name">功能名称 *</div>
      </div>
      <div class="input-box">
        <div class="li-one">
          <input type="text" class="input" v-model.trim="functionName" placeholder="">
        </div>
      </div>
      <div class="err-ms">{{errInputMsg31}}</div>

      <div class="input-title title-one">
        <div class="input-name">功能描述</div><div class="add-icon" @click="addName33(1)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList31" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content">
          <div class="delete-icon" @click="delIntr33(1)" v-show="intrList31.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>

      <div class="input-title title-one">
        <div class="input-name">为什么有这个功能？</div><div class="add-icon" @click="addName33(2)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList32" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content">
          <div class="delete-icon" @click="delIntr33(2)" v-show="intrList32.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>

      <div class="input-title title-one">
        <div class="input-name">如何使用这个功能？</div><div class="add-icon" @click="addName33(3)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList33" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content">
          <div class="delete-icon" @click="delIntr33(3)" v-show="intrList33.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>

      <div class="input-title title-one">
        <div class="input-name">这个功能如何运作？</div><div class="add-icon" @click="addName33(4)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList34" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content">
          <div class="delete-icon" @click="delIntr33(4)" v-show="intrList34.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>

      <div class="input-title title-one">
        <div class="input-name">这个功能是否免费？</div>
      </div>
      <div class="record-type" @click="changeRecord33()">
        <div class="type-box" >
          <div class="fixed-type" >
            <div class="type">{{freeType33}}</div>
            <div class="sel-img"><i class="arrowDown" :class="{'active-Img': activeChange33}"></i></div>
          </div>
          <ul class="selectMenu" :class="{'selectMenuActive': activeChange33}" @click.stop>
            <li v-for="(item, index) in freeArr33" :key="index" @click="chooseType33(item,index)">{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="err-ms">{{errInputMsg32}}</div>

      <div class="input-title title-one">
        <div class="input-name">买这个功能需要多少钱？</div>
      </div>
      <div class="input-box">
        <ul class="ul-one">
          <li class="li-one">
            <input type="text"  v-model.trim="price33" placeholder="" class="input" @input="inputNum33('price33')" :disabled="freeIndex33 === 0" :class="{'disable-input': freeIndex33 === 0}">
          </li>
        </ul>
      </div>
    </div>
    <div class="save-btn save-t" @click="btnSave33()">
      <div class="save">保存</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/dialog'
  export default {
    data() {
      return {
        functionName: '',
        freeIndex33: -1,
        freeArr33: ['是', '否'],
        freeOrNot33: '',
        activeChange33: false,
        price33: '',
        freeType33: '',
        website33: '',
        product_nickname: '',
        product_name_reason: '',
        product_introduction: '',
        intrList31: [{
          content: "",
        }],
        intrList32: [{
          content: "",
        }],
        intrList33: [{
          content: "",
        }],
        intrList34: [{
          content: "",
        }],
        product_free_or_not: '',
        product_discount_info: [],
        product_purchase_process: [],
        product_payment_method: [],
        product_after_sales_service: [],
        errInputMsg31: '',
        errInputMsg32: ''
      }
    },
    created() {
      this.getProduct33()
    },
    methods: {
      getProduct33 () {
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
            this.website33 = knowledgeData.product_website
            this.product_nickname = knowledgeData.product_nickname
            this.product_name_reason = knowledgeData.product_name_reason
            this.product_introduction = knowledgeData.product_introduction
            this.product_discount_info = knowledgeData.product_discount_info
            this.product_purchase_process = knowledgeData.product_purchase_process
            this.product_payment_method = knowledgeData.product_payment_method
            this.product_after_sales_service = knowledgeData.product_after_sales_service
            this.product_free_or_not = knowledgeData.product_free_or_not
            let product_funcs = knowledgeData.product_funcs[0]
            this.functionName = product_funcs.product_func_name
            this.intrList31 = product_funcs.product_func_intro
            this.intrList32 = product_funcs.product_func_reason
            this.intrList33 = product_funcs.how_use_product_function
            this.intrList34 = product_funcs.how_product_function_work
            let freeOrNot33 = product_funcs.product_func_fee_or_not
            if (freeOrNot33 === 'yes') {
              this.freeIndex33 = 0
              this.freeType33 = '是'
            } else if (freeOrNot33 === 'no') {
              this.freeIndex33 = 1
              this.freeType33 = '否'
            } else {
              this.freeIndex33 = -1
            }
            this.price33 = product_funcs.product_func_fee
          }
        })
      },
      inputNum33 (field) {
        let val = this[field]
        if (!/^\d*\.{0,1}\d{0,4}$/.test(val)) { // 不能输入特殊符号+-等,不能输入多个小数点，不能小数点后面超过2位小数
          this[field] = val.substring(0, val.length - 1)
        }
        if (/^\./.test(this[field])) { // 如果是"."
          this[field] = ''
        }
        this[field] = this[field].replace(/[^0-9/.]/g, '') // 只能是数字或者.
        if (this[field] < 0) {
          this[field] = ''
        }
      },
      // 添加
      addName33(type) {
        let cope = {
          content: "",
          key: 1
        }
        if(type === 1) {
          this.intrList31.push(cope);
        } else if(type === 2) {
          this.intrList32.push(cope);
        } else if(type === 3) {
          this.intrList33.push(cope);
        } else if(type === 4) {
          this.intrList34.push(cope);
        } else if(type === 5) {
          this.intrList5.push(cope);
        }
      },
      // 删除
      delIntr33(index) {
        if (index === 1)  this.intrList31.splice(index, 1);
        if (index === 2)  this.intrList32.splice(index, 1);
        if (index === 3)  this.intrList33.splice(index, 1);
        if (index === 4)  this.intrList34.splice(index, 1);
      },
      changeRecord33 () {
        this.activeChange33 = true
      },
      chooseType33 (item, index) {
        this.activeChange33 = false
        this.freeIndex33 = index
        this.freeType33 = item
        if (index === 0) {
          this.freeOrNot33 = 'yes'
        } else {
          this.freeOrNot33 = 'no'
        }
      },
      verify33 () {
        this.errInputMsg31 = ''
        let flag = true
        if (this.functionName === '') {
          this.errInputMsg31 = '功能名称必须填写'
          flag = false
        }
        return flag
      },
      btnSave33 () {
        if (this.verify33()) {
          let product_funcs = [{
            product_func_name: this.functionName,
            product_func_intro: this.intrList31,
            product_func_reason: this.intrList32,
            how_use_product_function: this.intrList33,
            how_product_function_work: this.intrList34,
            product_func_fee_or_not: this.freeOrNot33,
            product_func_fee: this.price33
          }]
          let properties = {
            product_free_or_not: this.product_free_or_not,
            product_fee: this.product_fee,
            product_discount_info: this.product_discount_info,
            product_purchase_process: this.product_purchase_process,
            product_payment_method: this.product_payment_method,
            product_after_sales_service: this.product_after_sales_service,
            product_website: this.website33,
            product_nickname: this.product_nickname,
            product_name_reason: this.product_name_reason,
            product_introduction: this.product_introduction,
            product_funcs: product_funcs,
            product_overall_advantage: [{"content": ""}],
            product_advantage: [],
            product_res_to_ques: [],
            product_comparsion_to_others: []
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
