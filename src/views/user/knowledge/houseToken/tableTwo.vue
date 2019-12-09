<template>
  <div>
    <div class="info">
      <div class="input-title title-one">
        <div class="input-name">机器人是否免费*</div>
      </div>
      <div class="record-type" @click="changeRecord22()">
        <div class="type-box" >
          <div class="fixed-type" >
            <div class="type">{{freeType22}}</div>
            <div class="sel-img"><i class="arrowDown" :class="{'active-Img': activeChange22}"></i></div>
          </div>
          <ul class="selectMenu" :class="{'selectMenuActive': activeChange22}" @click.stop>
            <li v-for="(item, index) in freeArr22" :key="index" @click="chooseType22(item,index)">{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="err-ms">{{errInputMsg21}}</div>

      <div class="input-title title-one">
        <div class="input-name">买机器人需要多少钱？*</div>
      </div>
      <div class="input-box">
        <ul class="ul-one">
          <li class="li-one">
            <input type="text"  v-model.trim="price22" placeholder="" class="input" @input="inputNum22('price22')" :disabled="freeIndex22 === 0" :class="{'disable-input': freeIndex22 === 0}">
          </li>
        </ul>
      </div>
      <div class="err-ms">{{errInputMsg22}}</div>

      <div class="input-title title-one">
        <div class="input-name">有折扣吗?</div><div class="add-icon" @click="addName22(1)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList21" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content" :disabled="freeIndex22 === 0" :class="{'disable-input': freeIndex22 === 0}">
          <div class="delete-icon" @click="delIntr22(1)" v-show="intrList21.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>

      <div class="input-title title-one">
        <div class="input-name">怎么买？</div><div class="add-icon" @click="addName22(2)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList22" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content" :disabled="freeIndex22 === 0" :class="{'disable-input': freeIndex22 === 0}">
          <div class="delete-icon" @click="delIntr22(2)" v-show="intrList22.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>

      <div class="input-title title-one">
        <div class="input-name">支付方式有哪些？</div><div class="add-icon" @click="addName22(3)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList23" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content" :disabled="freeIndex22 === 0" :class="{'disable-input': freeIndex22 === 0}">
          <div class="delete-icon" @click="delIntr22(3)" v-show="intrList23.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>

      <div class="input-title title-one">
        <div class="input-name">有什么售后服务?</div><div class="add-icon" @click="addName22(4)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList24" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content" :disabled="freeIndex22 === 0" :class="{'disable-input': freeIndex22 === 0}">
          <div class="delete-icon" @click="delIntr22(4)" v-show="intrList24.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>
    </div>
    <div class="save-btn save-t" @click="btnSave22()">
      <div class="save">保存</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/dialog'
  export default {
    data() {
      return {
        freeIndex22: -1,
        freeArr22: ['是', '否'],
        freeOrNot22: '',
        activeChange22: false,
        price22: '',
        freeType22: '',
        website22: '',
        product_nickname: '',
        product_name_reason: '',
        product_introduction: '',
        intrList21: [{
          content: "",
        }],
        intrList22: [{
          content: "",
        }],
        intrList23: [{
          content: "",
        }],
        intrList24: [{
          content: "",
        }],
        errInputMsg22: '',
        errInputMsg21: ''
      }
    },
    created() {
      this.getProduct()
    },
    methods: {
      getProduct () {
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
            this.website22 = knowledgeData.product_website
            this.product_nickname = knowledgeData.product_nickname
            this.product_name_reason = knowledgeData.product_name_reason
            this.product_introduction = knowledgeData.product_introduction
            this.price22 = knowledgeData.product_fee
            this.intrList21 = knowledgeData.product_discount_info
            this.intrList22 = knowledgeData.product_purchase_process
            this.intrList23 = knowledgeData.product_payment_method
            this.intrList24 = knowledgeData.product_after_sales_service
            if (knowledgeData.product_free_or_not === 'yes') {
              this.freeIndex22 = 0
              this.freeType22 = '是'
            } else if (knowledgeData.product_free_or_not === 'no') {
              this.freeIndex22 = 1
              this.freeType22 = '否'
            } else {
              this.freeIndex22 = ''
            }
          }
        })
      },
      // 2
      inputNum22 (field) {
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
      addName22(type) {
        let cope = {
          content: "",
          key: 1
        }
        if(type === 1) {
          this.intrList21.push(cope);
        } else if(type === 2) {
          this.intrList22.push(cope);
        } else if(type === 3) {
          this.intrList23.push(cope);
        } else if(type === 4) {
          this.intrList24.push(cope);
        } else if(type === 5) {
          this.intrList5.push(cope);
        }
      },
      // 删除
      delIntr22(index) {
        if (index === 1)  this.intrList21.splice(index, 1);
        if (index === 2)  this.intrList22.splice(index, 1);
        if (index === 3)  this.intrList23.splice(index, 1);
        if (index === 4)  this.intrList24.splice(index, 1);
      },
      // 2
      changeRecord22 () {
        this.activeChange22 = true
      },
      // 2
      chooseType22 (item, index) {
        this.activeChange22 = false
        this.freeIndex22 = index
        this.freeType22 = item
        if (index === 0) {
          this.freeOrNot22 = 'yes'
        } else {
          this.freeOrNot22 = 'no'
        }
      },
      // 2 验证
      verify22 () {
        this.errInputMsg22 = ''
        this.errInputMsg21 = ''
        let flag = true
        if (this.price22 === '' && this.freeIndex22 === 0) {
          this.errInputMsg22 = '请输入机器人价格'
          flag = false
        }
        if (this.freeType22 === '') {
          this.errInputMsg21 = '请输入是或否'
          flag = false
        }
        return flag
      },
      // 2保存
      btnSave22 () {
        if (this.verify22()) {
          let properties = {
            product_free_or_not: this.freeOrNot22,
            product_fee: this.price22,
            product_discount_info: this.intrList21,
            product_purchase_process: this.intrList22,
            product_payment_method: this.intrList23,
            product_after_sales_service: this.intrList24,
            product_website: this.website22,
            product_nickname: this.product_nickname,
            product_name_reason: this.product_name_reason,
            product_introduction: this.product_introduction,
            product_funcs: [],
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
