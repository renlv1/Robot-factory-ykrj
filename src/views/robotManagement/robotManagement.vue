<template>
    <div class="robot-management">
      <div class="robot-box">
        <div class="robot-title">
          <div class="title"><span class="img-box"><img src="../../assets/img/common/border.png"></span><span class="title-c">机器人管理</span></div>
          <div class="btn-box">
<!--            <div class="delete" @click="deleteAll()" v-show="!allDelete">批量删除</div>-->
<!--            <div class="cancel" @click="btnCancel()" v-show="allDelete">取消</div>-->
<!--            <div class="cancel remove" @click="btnRemove()" v-show="allDelete">删除</div>-->
          </div>
        </div>
        <div class="add-robot" @click="addRobot()">+ {{$t('robotManagement.text1')}}</div>
<!--        <v-loading v-show="loadingShow"></v-loading>-->
        <table class="commonTableList">
          <thead>
          <tr>
            <td>
                <div class="checkone-check" :class="{'checkActive': checkAllFlag === true}" @click="checkAllList" v-show="allDelete"></div>
<!--              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>-->
            </td>
            <td class="robot">{{$t('robotManagement.text2')}}</td>
            <td class="language">{{$t('robotManagement.text3')}}</td>
            <td class="status">{{$t('robotManagement.text4')}}</td>
            <td class="operation">{{$t('robotManagement.text5')}}</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item ,index) in robotArr" :key="index" v-show="robotShow">
            <td>
              <div class="checkone-check" :class="{'checkActive': item.flag === true}"  @click="checkOne(item, index)" ref="tdref" v-show="allDelete"></div>
<!--              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">-->
<!--                <el-checkbox :label="item.name" :key="index"></el-checkbox>-->
<!--              </el-checkbox-group>-->
            </td>
            <td class="robot toset" @click="gotoSet(item)"><div class="chatHead fa fa-linux" ></div><div class="user-name">{{item.name}}</div></td>
            <td class="language">{{language(item.language)}}</td>
            <td class="status">{{$t('robotManagement.text6')}}</td>
            <td class="operation">
              <div class="chat" @click="gotoChat(item)"><img src="../../assets/img/robotManagement/chat.png"></div>
<!--              <div class="chat" @click="exportExcel(item)"><img src="../../assets/img/robotManagement/data.png"></div>-->
              <div class="delete" @click="btnDelete(item.uuid, index,item)"><img src="../../assets/img/robotManagement/delete.png"></div>
            </td>
          </tr>
          </tbody>
          <v-loading v-show="loadingShow"></v-loading>
          <div class="empty-data" v-show="emptyDatas">
            <div class="noData"><img src="../../assets/img/common/nodata.png"></div>
            <p class="text">{{$t('robotManagement.text7')}}</p>
          </div>
        </table>
      </div>
<!--      新增机器人弹窗-->
      <transition name="safeDialog">
        <div class="dialog-w dialog-safe-w" v-show="addRobotDialog">
          <div class="dialog-safe" >
            <div class="close" @click="close()">
              <div class="close-icon"></div>
            </div>
            <div class="dialog-title">{{$t('robotManagement.text8')}}</div>
            <div class="robot-name">{{$t('robotManagement.text9')}}</div>
            <div class="form-item">
              <input type="text" :placeholder="$t('robotManagement.text10')" class="input" v-model.trim="robotName">
            </div>
            <div class="robot-name">{{$t('robotManagement.text11')}}</div>
            <div class="record-type" @click="changeRecord()">
              <div class="type-box" >
                <div class="fixed-type" >
                  {{languageType}}
                  <div class="sel-img"><i class="arrowDown" :class="{'active-Img': activeChange}"></i></div>
                </div>
                <ul class="selectMenu" :class="{'selectMenuActive': activeChange}" @click.stop>
                  <li v-for="(item, index) in $t('robotManagement.languageArr')" :key="index" @click="chooseType(item,index)">{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="g-dialog-btn-wrap">
              <div class="err-ms" v-show="errInputMsg">{{errInputMsg}}</div>
              <div class="g-dialog-btn g-dialog-cancel" @click="okCallback()" :class="{'toLogin': isOkBtn, 'loading-btn': loadShow}"><img src="../../assets/img/common/loading.gif" alt="" class="loading-m" v-show="loadShow">{{$t('robotManagement.text12')}}</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
  // import Bus from '@/assets/js/bus'
  import Dialog from '../../components/dialog/index'
    export default {
        data() {
          return{
            isOkBtn: false,
            loadShow: false,
            robotShow: false,
            emptyDatas:false,
            checkedNames: [],
            chatbots: [],
            robotPage: '', // 分页
            totalPage: 0,
            loadingShow: true,
            excelList: [], // 导出的数据
            robotArr: [], // 机器人数组
            robotList: [],
            list: [],
            allDelete: false, // 判断是否批量删除
            languageArr: ['中文', '英文'],
            activeChange: false,
            languageType: this.$t('robotManagement.text13'),
            robotName: '', // 机器人名称
            errInputMsg: '',
            addRobotDialog: false,
            checkAllFlag: false, // 全选
            noCheckBox: false,
            pageSize: 10,
            pageIndex: 1,
            AllFlag: false,
            // checkFlag: false,
            checkData: [],
            checkedCities: [],
            checkAll: false,
            isIndeterminate: true,
            userPool: {},
            username: '',
            errMsg: ''
          }
        },
      created() {
        if (localStorage.getItem('__userEmail__')) {
          // this.userPool = new this.$AmazonCognitoIdentity.CognitoUserPool(this.$poolData);
          // this.getChatbots()
          this.getAccount()
        } else {
          this.$router.push('/login')
        }
      },
      methods: {
        handleCheckAllChange(val) {
          console.log(val)
          this.checkedCities = val ? this.robotArr : [];
          this.isIndeterminate = false;
          console.log(this.checkedCities)
        },
        // 单选
        handleCheckedCitiesChange(value) {
          console.log(value)
          let checkedCount = value.length;
          console.log(value.length)
          this.checkAll = checkedCount === this.robotArr.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.robotArr.length;
          console.log(checkedCount)
        },
        //单选
        checkOne(item, index) {
          // console.log(this.$refs.tdref[index].className)
          if (this.$refs.tdref[index].className === 'checkActive checkone-check') {
            this.$refs.tdref[index].className = 'checkone-check'
            let idIndex = this.checkData.indexOf(item.uuid)  // 如果已经包含就去除
            this.checkData.splice(idIndex, 1)
          } else {
            this.$refs.tdref[index].className = 'checkActive checkone-check'
            this.checkData.push(item.uuid) // 如果没有包含就添加
          }
          // console.log(this.checkData)
          // let idIndex = this.checkData.indexOf(item.uuid)
          // if (idIndex >= 0) { // 如果已经包含就去除
          //   this.checkData.splice(idIndex, 1)
          // } else { // 如果没有包含就添加
          //   this.checkData.push(item.uuid)
          // }
          let leng = 0
          for (let i =0; i < this.robotArr.length; i++) {
            if (this.$refs.tdref[index].className === 'checkActive checkone-check') {
              leng++
            }
          }
          if (this.checkData.length === this.robotArr.length) {
            this.checkAllFlag = true
          } else {
            this.checkAllFlag = false
          }
        },
        // 全选
        checkAllList() {
          this.checkData = []
          this.checkAllFlag = !this.checkAllFlag
          if(this.checkAllFlag === true) {
            for(let i =0; i < this.robotArr.length; i++) {
              this.checkData.push(this.robotArr[i].uuid)
              if(this.$refs.tdref[i].className === 'checkone-check') {
                this.$refs.tdref[i].className = 'checkActive checkone-check'
              }
            }
          } else if(!this.checkAllFlag) {
            for(let i =0; i < this.robotArr.length; i++) {
              this.$refs.tdref[i].className = 'checkone-check'
            }
          }
          // console.log(this.robotArr)
          // console.log(this.checkData)
          // this.robotArr.forEach(item => {
          //   if(this.checkAllFlag) {
          //     console.log('44')
          //     item.flag = true
          //     this.checkData.push(item.uuid)
          //   } else {
          //     for(let i =0; i < this.robotArr.length; i++) {
          //       if (this.$refs.tdref[i].className === 'checkActive checkone-check') {
          //         this.$refs.tdref[i].classList.remove('checkActive')
          //         console.log(this.$refs.tdref[i].className)
          //       }
          //     }
          //     item.flag = false
          //     this.checkData = []
          //   }
          // })
        },
        // 获取机器人
          getAccount(){
            if (localStorage.getItem('__userEmail__')) {
              this.username = localStorage.getItem('__userEmail__')
            }
            this.$fetch.post('/account',{
              operation: 'GetAccount',
              username: this.username
            }).then(res => {
              if(res) {
                this.loadingShow = false
                this.robotShow = true
                this.chatbots = res.chatbots
                // this.username = res.username
                if(this.chatbots.length > 0) {
                  this.emptyDatas = false
                  for(let i =0; i < this.chatbots.length; i++) {
                    this.$fetch.get('/chatbotregistration/' + this.chatbots[i]).then(res => {
                      if(res) {
                        this.loadingShow = false
                        // this.list.push(res)
                        // this.list.forEach(val => {
                        //   val.flag = false
                        // })
                        this.robotArr.push(res)
                        // this.checkData = []
                      }
                    }).catch(err => {
                      this.loadingShow = false
                      console.log(err)
                    })
                  }
                } else {
                  this.emptyDatas = true
                  this.loadingShow = false
                }
              } else {
                this.emptyDatas = true
                this.loadingShow = false
              }
            }).catch(err => {
              this.loadingShow = false
              this.emptyDatas = true
              console.log(err)
            })
          },
          // 新增
        addRobot() {
          this.errInputMsg = ''
          this.robotName = ''
          this.languageType =  this.$t('robotManagement.text13')
          this.addRobotDialog = true
        },
        chooseType(item) {
          this.languageType = item
          this.activeChange = !this.activeChange
        },
        changeRecord() {
          this.activeChange = !this.activeChange
        },
        // 关闭机器人弹窗
        close() {
          this.addRobotDialog = false
        },
        // 判断语言
        language(type) {
          if(type === 'ZH') return  this.$t('robotManagement.text14')
          if(type === 'EN') return  this.$t('robotManagement.text15')
        },
        gotoSet(item) {
          this.$router.push({
            path: '/user/setting',
            query: {
              uuid: item.uuid,
              name: item.name,
              apiKey: item.apiKey,
              createdAt: item.createdAt,
              endpoint: item.endpoint,
            }
          })
        },
        gotoChat(item) {
          this.$router.push({
            path: '/aiChat',
            query: {
              apiKey: item.apiKey
            }
          })
        },
        //导出的方法
        exportExcel(item) {
          let cope = {
            userName: 'user'+ item.name +  this.$t('robotManagement.text16')
          }
          this.excelList.push(cope)
          require.ensure([], () => {
            const { export_json_to_excel } = require('../../excel/Export2Excel');
            const tHeader = [ this.$t('robotManagement.text17')];
            // 上面设置Excel的表格第一行的标题
            const filterVal = ['userName'];
            // 上面的index、nickName、name是tableData里对象的属性
            const list = this.excelList;  //把data里的tableData存到list
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, 'excel');
          })
        },
        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
        },
        // 点击取消批量删除
        btnCancel() {
          this.allDelete = !this.allDelete
          if(this.checkAllFlag) {
            this.checkAllFlag = false
          }
        },
        // 批量删除
        btnRemove() {
          if(this.checkData.length > 0) {
            Dialog({
              title:  this.$t('robotManagement.text18'),
              type:  this.$t('robotManagement.text19'),
              cancelText:  this.$t('robotManagement.text20'),
              okText:  this.$t('robotManagement.text21'),
              content:  this.$t('robotManagement.text22'),
              okFn: () => {
                this.loadingShow = true
                this.robotShow = false
                this.checkAllFlag = false
                // this.robotList = this.robotArr
                for (let i=0; i< this.checkData.length; i++){
                  this.$fetch.delete('/chatbotregistration/'+ this.checkData[i] + '/' + this.username).then(res => {
                    if(JSON.stringify(res) === '{}') {
                     //  this.list = []
                     //  this.robotArr = []
                     //  this.getAccount()
                      this.checkAllFlag = false
                      // this.robotList = this.robotArr
                      // for(let j =0; j < this.robotList.length; j++) {
                      //   if(this.robotList[j].uuid === this.checkData[i]) {
                      //     this.robotList.splice(j, 1)
                      //     this.checkData.splice(i,1)
                      //   }
                      // }
                      for(let j =0; j < this.robotArr.length; j++) {
                        // console.log(this.robotArr[j].uuid === this.checkData[i])
                        if(this.robotArr[j].uuid === this.checkData[i]) {
                          this.robotArr.splice(j, 1)
                          this.checkData.splice(i,1)
                        }
                      }
                      // this.robotArr = this.robotList.filter(item => item.uuid === this.checkData[i])
                      if(this.robotArr.length > 0) {
                        this.emptyDatas = false
                      } else {
                        this.emptyDatas = true
                      }
                      for(let k =0; k < this.robotArr.length; k++) {
                        this.$refs.tdref[k].className = 'checkone-check'
                      }
                      if(this.checkData.length === 0) {
                        this.loadingShow = false
                        this.robotShow = true
                        Dialog({
                          content:  this.$t('robotManagement.text23'),
                          okText:  this.$t('robotManagement.text24'),
                        })
                      }
                    } else {
                      this.checkAllFlag = false
                      this.loadingShow = false
                      this.robotShow = true
                      this.emptyDatas = true
                    }
                  }).catch(err => {
                    console.log(err)
                  })
                }
                // this.robotArr = this.robotList
              }
            })
          } else {
            Dialog({
              content:  this.$t('robotManagement.text25'),
              okText:  this.$t('robotManagement.text24'),
            })
          }
        },
        // 显示批量删除
        deleteAll() {
          this.allDelete = !this.allDelete
        },
        // 删除单个
        btnDelete(uuid, index,item) {
          Dialog({
            title:  this.$t('robotManagement.text18'),
            type:  this.$t('robotManagement.text19'),
            cancelText: this.$t('robotManagement.text20'),
            okText:  this.$t('robotManagement.text21'),
            content:  this.$t('robotManagement.text26')+item.name+'？',
            okFn: () => {
              this.$fetch.delete('/chatbotregistration/'+ uuid + '/' + this.username).then(res => {
                if(JSON.stringify(res) === '{}') {
                  Dialog({
                    content: this.$t('robotManagement.text23'),
                    okText:  this.$t('robotManagement.text24'),
                    okFn: () => {
                      this.robotArr.splice(index, 1)
                      if(this.robotArr.length > 0) {
                        this.emptyDatas = false
                      } else {
                        this.emptyDatas = true
                      }
                      this.checkData = []
                      this.checkAllFlag = false
                      for(let k =0; k < this.robotArr.length; k++) {
                        this.$refs.tdref[k].className = 'checkone-check'
                      }
                    }
                  })
                }
              }).catch(err => {
                console.log(err)
              })
            }
          })
        },
        // 添加机器人
        okCallback() {
          const uuidv1 = require('uuid/v1');
          let uuid = uuidv1()
          // var robotNameReg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！%@#￥……&*（）——|{}【】‘；：”“'。，、？]")
          let reg = /^[\u4e00-\u9fa5\u3001\a-zA-Z0-9_\s]+$/
          this.errInputMsg = ''
          if (this.robotName === '') {
            this.errInputMsg =   this.$t('robotManagement.text27')
            return
          }
          if(!reg.test(this.robotName)) {
            this.errInputMsg =  this.$t('robotManagement.text28')
            return false
          }
          if (this.languageType === this.$t('robotManagement.text13')) {
            this.errInputMsg =  this.$t('robotManagement.text13')
            return
          }
          this.loadShow = true
          let language = ''
          if(this.languageType ===  this.$t('robotManagement.text14')) {
            language = 'ZH'
          } else if(this.languageType === this.$t('robotManagement.text15')) {
            language = 'EN'
          }
          this.$fetch.post('/chatbotregistration/',{
            language: language,
            name: this.robotName,
            username: this.username,
            uuid: uuid
          }).then(res => {
            if(res.uuid) {
              this.$fetch.get('/chatbotregistration/' + res.uuid).then(res => {
                if(res) {
                  this.loadShow = false
                  this.emptyDatas = false
                  this.robotArr.push(res)
                  this.addRobotDialog = false
                  Dialog({
                    content: this.$t('robotManagement.text30'),
                    okText:  this.$t('robotManagement.text24')
                  })
                  this.checkAllFlag = false
                  this.checkData = []
                  // for(let k =0; k < this.robotArr.length; k++) {
                  //   this.$refs.tdref[k].className = 'checkone-check'
                  // }
                  // console.log(this.robotArr)
                } else {
                  this.checkData = []
                  this.loadShow = false
                  this.loadingShow = false
                  this.addRobotDialog = false
                  Dialog({
                    content: res.errorMessage,
                    okText:  this.$t('robotManagement.text24')
                  })
                }
              }).catch(res => {
                Dialog({
                  content: this.$t('robotManagement.text29'),
                  okText:  this.$t('robotManagement.text24')
                })
                this.loadShow = false
                this.loadingShow = false
                this.addRobotDialog = false
                console.log(res)
              })
            } else {
              this.checkData = []
              this.loadShow = false
              this.addRobotDialog = false
              this.loadingShow = false
              this.checkAllFlag = false
              for(let k =0; k < this.robotArr.length; k++) {
                this.$refs.tdref[k].className = 'checkone-check'
              }
              if(localStorage.getItem('discoveryLang') === 'CN') {
                if(res.errorMessage === 'Please upgrade your account as the allowed limit has been reached.') {
                  this.errMsg  = '请升级您的帐户，因为已达到允许的限制。'
                } else if(res.errorMessage === 'java.lang.NullPointerException') {
                  this.errMsg  = '添加失败'
                } else if(res.errorMessage === 'Unable to create a new chatbot, please try again later.') {
                  this.errMsg  = '无法创建新的聊天机器人，请稍后再试。'
                } else {
                  this.errMsg = res.errorMessage
                }
              } else {
                this.errMsg = res.errorMessage
              }

              Dialog({
                content: this.errMsg,
                okText:  this.$t('robotManagement.text24')
              })
            }
          }).catch(err => {
            this.addRobotDialog = false
            console.log(err)
          })
        },
        // parentTurnPage (page) {
        //   this.robotPage = page
        //   this.getRobotList(page)
        // }
      },
      components: {
        vLoading: resolve => require(['@/components/loading.vue'], resolve),
        // vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve)
      }
    }
</script>

<style scoped lang="stylus">
.robot-management{
  display flex
  justify-content center
  width: 100%
  background #e4e4e6
  min-height calc(100vh - 80px)
  .robot-box{
    padding 90px 90px 320px
    margin 50px auto 90px
    /*height 900px*/
    width 85%
    background #fff
    /*overflow-y scroll*/
    .robot-title{
      padding-bottom 20px
      display flex
      justify-content space-between
      border-bottom 1px dashed #ccc
      .title{
        display flex
        align-items center
        .img-box{
          width 4px
          height 26px
          img{
            width 100%
          }
        }
        .title-c{
          margin-left 14px
          font-size 26px
          color #090d21
        }
      }
      .btn-box{
        display flex
        .delete{
          line-height 38px
          text-align center
          width 118px
          height 38px
          background #fd3e4b
          color #fff
          font-size 14xp
          cursor pointer
          border-radius 4px
        }
        .cancel{
          line-height 38px
          text-align center
          width 118px
          height 38px
          background #ccc
          color #fff
          font-size 14px
          cursor pointer
          border-radius 4px
          margin-left 20px
        }
        .remove{
          background #fd3e4b
        }
      }
    }
    .add-robot{
      cursor pointer
      height 38px
      width 132px
      border-radius 4px
      background #3376ff
      margin 30px 0
      color #fff
      line-height 38px
      text-align center
    }
    .commonTableList{
      display: block;
      thead {
        display: block;
        tr{
          line-height 50px
          height 50px
          background #F2F3F7
          display flex
          align-items center
          border-bottom 1px solid #e3e4e8
          td{
            /*display: block;*/
            text-align: center;
          }
          .robot{
            flex 1
          }
          .language{
            flex 1
          }
          .status{
            flex 1
          }
          .operation{
            flex 1
          }
          .all{
            margin-left 30px
            display flex
            align-items center
            justify-content center
            cursor pointer
            border-radius 3px
            width 18px
            height 18px
            border 1px dashed #3376ff
            .all-choose{
              width 8px
              height 8px
              background #3376ff
            }
          }
        }
      }
      tbody{
        width: 100%;
        display: block;
        /*overflow-y scroll*/
        tr{
          line-height 50px
          height 50px
          background #fff
          display flex
          align-items center
          border-bottom 1px solid #e3e4e8
          td{
            text-align: center;
            display flex
            justify-content center
            align-items center
          }
          .robot{
            cursor pointer
            flex 1
            .chatHead{
              font-size 28px
              width 30px
              height 30px
            }
            .user-name{
              /*width 100px*/
            }
          }
          .language{
            flex 1
          }
          .status{
            flex 1
          }
          .operation{
            flex 1
            display flex
            justify-content center
            align-items center
            .chat{
              cursor pointer
              margin-left 30px
              width 20px
              height 20px
              img{
               display block
               width 100%
              }
            }
            .delete{
              cursor pointer
              margin-left 30px
              width 17px
              height 20px
              img{
                display block
                width 100%
              }
            }
          }
        }
      }
      .checkone-check{
        margin-left 30px
        cursor pointer
        background #fff
        border-radius 3px
        width 16px
        height 16px
        border 1px solid #e3e4e8
        position: relative;
        &.checkActive{
          &:before{
            content ''
            background-image url("../../assets/img/robotManagement/selected.png")
            background-position center
            background-repeat no-repeat
            display block
            width 16px
            height 16px
          }
        }
        &.isChecked{
          background-color: #409EFF;
          border-color: #409EFF;
          &::before{
            transform: rotate(45deg) scaleY(1);
          }
        }
        &.no-CheckBox{
          background-color: #edf2fc;
          cursor: not-allowed;
        }
      }
    }
  }
}
.dialog-safe-w
  display: flex
  align-items center
  justify-content center
  position: fixed
  left: 0
  top: 0
  right: 0
  bottom:0
  width: 100%
  height: 100%
  z-index: 200
  color #000
  background-color: rgba(0,0,0,.4)
  &.safeDialog-enter, &.safeDialog-leave-to
    opacity: 0;
    .dialog-safe
      transform: translate(0, -5%)
  &.safeDialog-enter-active
    transition: .3s;
    .dialog-safe
      transition: .3s
  &.safeDialog-leave-active
    transition: .1s;
    .dialog-safe
      transition: .1s
  .dialog-safe
    width: 600px
    background-color: #fff
    position: relative
    border-radius 4px
    color #17161f
    font-size: 28px;
    transform: translate(0, 0)
    padding: 0 40px
    .close{
      cursor pointer
      width 21px
      height 21px
      position absolute
      right 20px
      top 40px
      .close-icon{
        width 21px
        height 21px
        background url("../../assets/img/common/close.png")
      }
    }
    .dialog-title
      font-size: 20px
      font-weight: bold
      color #17161f
      padding: 50px 0 60px
      text-align: center
    .robot-name{
      font-size: 20px
      color #17161f
      margin-bottom 20px
    }
    .g-dialog-btn-wrap
      position relative
      border-radius 6px
      cursor pointer
      width 100%
      height 68px
      background #3376ff
      color #fff
      font-size 20px
      margin-top 50px
      display: flex
      align-items center
      justify-content center
      margin-bottom 50px
    .record-type{
      cursor: pointer;
      user-select:none;
      width: 100%
      height: 50px;
      line-height 50px
      background #f5f5f5
      border-radius 4px
      font-size 16px
      color #b3b3b3
      position: relative;
      .type-box{
        width: 100%;
        height: 100%;
        .fixed-type{
          color #b3b3b3
          padding-left: 30px;
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
            background: url("../../assets/img/robotManagement/pull.png") no-repeat;
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
            border-bottom 1px solid #ededed
            padding-left: 20px;
            background #f5f5f5
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
    .form-item
      margin-bottom: 40px
      .label
        margin-bottom: .2rem
      .input
        height 50px
        width 100%
        background #f5f5f5
        border-radius 4px
        padding-left 30px
        font-size 16px
        color #000
        &::-webkit-input-placeholder{
          color:#b3b3b3
        }
        &::-moz-placeholder{   /* Mozilla Firefox 19+ */
          color:#b3b3b3
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
          color:#b3b3b3
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
          color:#b3b3b3
        }
    .err-ms
      position absolute
      font-size 12px
      color #ff2121
      top -30px
      left 0
    .shortMsg
      position relative
      .payMsg-box
        .payMsg
          width 100%
          height .8rem
          background-color #f5f6fa
          border-radius 40px
          font-size 28px
          padding 0 30px
        .sendMsg
          position absolute
          top 0
          right 0
          height: 100%
          padding: 0 20px
          background-color transparent
          border none
          outline none
          font-size: 28px
          color #00a6f1
    .g-dialog-btn
      display flex
      justify-content center
      align-items center
      text-align center
      .loading-m{
        width: 30px
        margin-right: 10px
        display: block
      }
    .comfirm
      width: 100%
      height: 1rem
      display: flex
      align-items center
      justify-content center
      color #b79961
.empty-data{
  margin-top 50px
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #999;
  .noData{
    width: 70px;
    height: 69px;
    //margin-left: .5rem;
    margin-bottom: 20px;
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
