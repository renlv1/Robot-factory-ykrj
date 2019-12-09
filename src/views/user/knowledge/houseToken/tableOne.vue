<template>
  <div>
    <div class="info">
      <div class="input-title title-one">
        <div class="input-name">产品名称</div>
      </div>
      <ul class="input-box">
        <li class="li-one">
          <input type="text" class="input" v-model.trim="productName01" placeholder="">
        </li>
      </ul>

      <div class="input-title title-one">
        <div class="input-name">产品别称</div><div class="add-icon" @click="addName01(1)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList11" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content">
          <div class="delete-icon" @click="delIntr01(1)" v-show="intrList11.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>

      <div class="input-title title-one">
        <div class="input-name">各种原因</div><div class="add-icon" @click="addName01(2)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList12" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content">
          <div class="delete-icon" @click="delIntr01(2)" v-show="intrList12.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>

      <div class="input-title title-one">
        <div class="input-name">整体介绍</div><div class="add-icon" @click="addName01(3)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in intrList13" :key="index">
          <input type="text" class="input" placeholder="" v-model.trim="item.content">
          <div class="delete-icon" @click="delIntr01(3)" v-show="intrList13.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>

      <div class="input-title title-one">
        <div class="input-name">官网</div>
      </div>
      <ul class="input-box">
        <li class="li-one">
          <input type="text" class="input" v-model.trim="website11" placeholder="">
        </li>
      </ul>
    </div>
    <div class="save-btn" @click="btnSave01()">
      <div class="save">保存</div>
      <div class="err-ms" v-show="errInputMsg001">{{errInputMsg001}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/dialog'
  export default {
    data() {
      return {
        website11: '',
        intrList11: [{
          content: "",
        }],
        intrList12: [{
          content: "",
        }],
        intrList13: [{
          content: "",
        }],
        errInputMsg001: '',
      }
    },
    computed: {
      productName01 () {
        return this.$route.query.name
      }
    },
    watch: {
      productName01() {
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
            if (knowledgeData) {
              this.website11 = knowledgeData.product_website
              this.intrList11 = knowledgeData.product_nickname || [{content: ""}]
              this.intrList12 = knowledgeData.product_name_reason || [{content: ""}]
              this.intrList13 = knowledgeData.product_introduction || [{content: ""}]
            }
          }
        })
      }
    },
    methods: {
      // 添加
      addName01(type) {
        let cope = {
          content: "",
        }
        if(type === 1) {
          this.intrList11.push(cope);
        } else if(type === 2) {
          this.intrList12.push(cope);
        } else if(type === 3) {
          this.intrList13.push(cope);
        } else if(type === 4) {
          this.intrList4.push(cope);
        } else if(type === 5) {
          this.intrList5.push(cope);
        }
      },
      delIntr01(index) {
        if (index === 1)  this.intrList11.splice(index, 1);
        if (index === 2)  this.intrList12.splice(index, 1);
        if (index === 3)  this.intrList13.splice(index, 1);
        if (index === 4)  this.intrList4.splice(index, 1);
        if (index === 5)  this.intrList5.splice(index, 1);
      },
      verify01() {
        this.errInputMsg001 = ''
        let flag = true
        if (this.productName01 === '') {
          this.errInputMsg001 = '请输入产品名称'
          flag = false
        }
        return flag
      },
      // 保存
      btnSave01() {
        if(this.verify01()) {
          let properties = {
            product_website: this.website11,
            product_nickname: this.intrList11,
            product_name_reason: this.intrList12,
            product_introduction: this.intrList13,
            product_discount_info: [{"content": ""}],
            product_purchase_process: [{"content": ""}],
            product_payment_method: [{"content": ""}],
            product_after_sales_service: [{"content": ""}],
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
                name: this.productName01,
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
