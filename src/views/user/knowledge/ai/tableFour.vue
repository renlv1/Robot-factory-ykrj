<template>
  <div>
    <div class="info">
      <div class="top-merit">
        <div>同类知识点一</div>
        <div class="right-m">
          <img src="../../../../assets/img/common/delete.png" alt="">
          <span>删除此知识点</span>
        </div>
      </div>
      <div class="input-title title-one">
        <div class="input-name">同类知识点名称*</div><div class="add-icon" @click="addName4(1)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in reasonList41" :key="index">
          <input type="text" class="input" placeholder="请输入名称原因" v-model.trim="item.content">
          <div class="delete-icon" @click="delReason4(1, index)" v-show="reasonList41.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>
      <div class="input-title title-one">
        <div class="input-name">当用户说你的知识点比另一个知识点好或差不多时，你的机器人的回应是：</div><div class="add-icon" @click="addName4(2)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in reasonList42" :key="index">
          <input type="text" class="input" placeholder="请输入名称原因" v-model.trim="item.content">
          <div class="delete-icon" @click="delReason4(2, index)" v-show="reasonList42.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>
      <div class="input-title title-one">
        <div class="input-name">当用户问你的知识点比另一个知识点好在哪里时，你的机器人的回应是：</div><div class="add-icon" @click="addName4(3)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in reasonList43" :key="index">
          <input type="text" class="input" placeholder="请输入名称原因" v-model.trim="item.content">
          <div class="delete-icon" @click="delReason4(3, index)" v-show="reasonList43.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>
      <div class="input-title title-one">
        <div class="input-name">当用户问你的知识点比另一个知识点差时，你的机器人的回应是：</div><div class="add-icon" @click="addName4(4)">+ 添加</div>
      </div>
      <ul class="input-box">
        <li class="li-one" v-for="(item, index) in reasonList44" :key="index">
          <input type="text" class="input" placeholder="请输入名称原因" v-model.trim="item.content">
          <div class="delete-icon" @click="delReason4(4, index)" v-show="reasonList44.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
        </li>
      </ul>
    </div>
    <div class="err-ms" v-show="errInputMsg4">{{errInputMsg4}}</div>
    <div class="save-btn save-btn-add">添加质疑应对点</div>
    <div class="save-btn save-t" @click="btnSave4()">
      <div class="save">保存</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        errInputMsg4: '',
        reasonList41: [{key: 1, content: ''}],
        reasonList42: [{key: 1, content: ''}],
        reasonList43: [{key: 1, content: ''}],
        reasonList44: [{key: 1, content: ''}],
      }
    },
    created() {
    },
    methods: {
      delReason4 () {},
      addName4 () {},
      btnSave4 () {}
    }
  }
</script>

<style scoped lang="stylus">
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
  .two-top{
    margin-top: 50px
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
    .err-ms{
      position absolute
      font-size 12px
      color #ff2121
      top -40px
      left 0
    }

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
