<template>
  <div class="charles-w">
    <div class="charles-m">
<!--      <div class="left-menu">-->
<!--      <ul class="menu-uls">-->
<!--        <li class="menu-list" v-for="(item, index) in menuArr" :key="index"-->
<!--            @click="gotoPath(index)"-->
<!--            :class="{'active-list': activeIndex === index}">-->
<!--          <p class="name">{{item.name}}</p>-->
<!--          <div class="icon-m">-->
<!--            <img src="../../../assets/img/common/minus.png" alt="">-->
<!--          </div>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
      <div class="right-content">
        <div class="top-cont">
          <ul class="tab-ul">
            <li v-for="(item,index) in $t('setting.tabArr')" :key="index" class="tab-li" @click="changeOne(index)" :class="{active: activeChoose === index}">{{item}}</li>
          </ul>
          <v-loading v-show="loadingShow"></v-loading>
          <div class="show-c" v-show="!loadingShow">
            <div class="info" v-show="activeChoose === 0">
              <div class="input-title title-one">
                <div class="input-name">{{$t('setting.text1')}}*</div>
              </div>
              <ul class="input-box">
                <li class="li-one">
                  <input type="text" class="input" v-model.trim="robotName">
                </li>
              </ul>
              <div class="input-title title-one">
                <div class="input-name">{{$t('setting.text3')}}</div>
              </div>
              <div class="record-type" @click="changeRecord()">
                <div class="type-box" >
                  <div class="fixed-type" >
                    <div class="lang">{{languageType}}</div>
                    <div class="sel-img"><i class="arrowDown" :class="{'active-Img': activeChange}"></i></div>
                  </div>
                  <ul class="selectMenu" :class="{'selectMenuActive': activeChange}" @click.stop>
                    <li v-for="(item, index) in $t('setting.languageArr')" :key="index" @click="chooseType(item)">{{item}}</li>
                  </ul>
                </div>
              </div>
              <div class="input-title title-one">
                <div class="input-name">{{$t('setting.text4')}}</div><div class="add-icon" @click="addName(2)">+ {{$t('setting.text5')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in reasonList" :key="index" @keyup.enter="addName(2,index)"  ref="reasonRef">
                  <input type="text" class="input reason-input" v-model.trim="item.content">
                  <div class="delete-icon" @click="delReason(index)" v-show="reasonList.length > 1"><img src="../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
              <div class="input-title title-one">
                <div class="input-name">{{$t('setting.text7')}}</div><div class="add-icon" @click="addName(3)">+ {{$t('setting.text74')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in intrList" :key="index" ref="intrRef"  @keyup.enter="addName(3,index)">
                  <input type="text" class="input"  v-model.trim="item.content">
                  <div class="delete-icon" @click="delIntr(index)" v-show="intrList.length > 1"><img src="../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
              <div class="input-title title-one">
                <div class="input-name">{{$t('setting.text9')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one">
                  <input type="text" class="input" v-model.trim="website">
                  <!--                <div class="delete-icon" ><img src="../../../assets/img/common/delete.png"></div>-->
                </li>
              </ul>
              <div class="input-title title-one">
                <div class="input-name">{{$t('setting.text11')}}</div><div class="add-icon" @click="addName(4)">+ {{$t('setting.text74')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in productsList" :key="index" >
                  <input type="text" class="input" v-model.trim="item.content" >
<!--                  <div class="delete-icon" @click="delProduct(index, item)" v-show="productsList.length > 1"><img src="../../../assets/img/common/delete.png"></div>-->
                </li>
              </ul>
            </div>
            <div class="info" v-show="activeChoose === 1">
              <div class="input-title title-one">
                <div class="input-name">{{$t('setting.text13')}}*</div>
              </div>
              <div class="record-type" @click="changeRecord()">
                <div class="type-box" >
                  <div class="fixed-type" >
                    <div class="free-or-no">{{freeType}}</div>
                    <div class="sel-img"><i class="arrowDown" :class="{'active-Img': activeChange}"></i></div>
                  </div>
                  <ul class="selectMenu" :class="{'selectMenuActive': activeChange}" @click.stop>
                    <li v-for="(item, index) in $t('setting.freeArr')" :key="index" @click="chooseType(item,1)">{{item}}</li>
                  </ul>
                </div>
              </div>
              <div class="input-title title-one">
                <div class="input-name">{{$t('setting.text14')}}</div>
              </div>
              <div class="input-box">
                <ul class="ul-one">
                  <li class="li-one">
                    <input type="text"  v-model.trim="robotPrice"  class="input" v-if="freeType === $t('setting.text78')">
                    <input type="text"  v-model.trim="robotPrice" class="input input-disable"  v-else disabled >
                  </li>
                </ul>
              </div>
              <div class="input-title title-one">
                <div class="input-name">{{$t('setting.text16')}}</div><div class="add-icon" @click="addName(9)">+ {{$t('setting.text74')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in  discountList" :key="index" @keyup.enter="addName(9,index)" ref="discountRef">
                  <input type="text" class="input" v-model.trim="item.content" v-if="freeType === $t('setting.text78')">
                  <input type="text" class="input input-disable"  v-model.trim="item.content" v-else disabled >
                  <div class="delete-icon" @click="delDiscount(index)" v-show="discountList.length > 1"><img src="../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
              <div class="input-title title-one">
                <div class="input-name">{{$t('setting.text18')}}</div><div class="add-icon" @click="addName(10)">+ {{$t('setting.text74')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in  purchaseList" :key="index" @keyup.enter="addName(10,index)" ref="purchaseRef">
                  <input type="text" class="input" v-model.trim="item.content" v-if="freeType === $t('setting.text78')">
                  <input type="text" class="input input-disable" v-model.trim="item.content" v-else disabled >
                  <div class="delete-icon" @click="delPurchase(index)" v-show="purchaseList.length > 1"><img src="../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
              <div class="input-title title-one">
                <div class="input-name">{{$t('setting.text20')}}</div><div class="add-icon" @click="addName(11)">+ {{$t('setting.text74')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in  payList" :key="index" @keyup.enter="addName(11,index)" ref="payRef">
                  <input type="text" class="input"  v-model.trim="item.content" v-if="freeType === $t('setting.text78')">
                  <input type="text" class="input input-disable" v-model.trim="item.content"  v-else disabled >
                  <div class="delete-icon" @click="delPay(index)" v-show="payList.length > 1"><img src="../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
              <div class="input-title title-one">
                <div class="input-name">{{$t('setting.text22')}}</div><div class="add-icon" @click="addName(12)">+ {{$t('setting.text74')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in  serviceList" :key="index" @keyup.enter="addName(12,index)" ref="serviceRef">
                  <input type="text" class="input" v-model.trim="item.content" v-if="freeType === $t('setting.text78')">
                  <input type="text" class="input input-disable"  v-model.trim="item.content"  v-else disabled>
                  <div class="delete-icon" @click="delService(index)" v-show="serviceList.length > 1"><img src="../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
            </div>
            <div class="info" v-show="activeChoose === 2">
              <div class="input-title title-one">
                <div class="input-name">{{$t('setting.text24')}}*</div>
              </div>
              <ul class="input-box">
                <li class="li-one" >
                  <input type="text" class="input" v-model.trim="functionName">
                </li>
              </ul>
              <div class="input-title title-one">
                <div class="input-name">{{$t('setting.text26')}}</div><div class="add-icon" @click="addName(5)">+ {{$t('setting.text74')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in descriptionList" :key="index" @keyup.enter="addName(5,index)" ref="descriptionRef">
                  <input type="text" class="input" v-model.trim="item.content">
                  <div class="delete-icon" @click="delDescription(index)" v-show="descriptionList.length > 1"><img src="../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
              <div class="input-title title-one">
                <div class="input-name">{{$t('setting.text28')}}</div><div class="add-icon" @click="addName(6)">+ {{$t('setting.text74')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in effectList" :key="index" @keyup.enter="addName(6,index)" ref="effectRef">
                  <input type="text" class="input" v-model.trim="item.content">
                  <div class="delete-icon" @click="delEffect(index)" v-show="effectList.length > 1"><img src="../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
              <div class="input-title title-one">
                <div class="input-name">{{$t('setting.text30')}}</div><div class="add-icon" @click="addName(7)">+ {{$t('setting.text74')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in usetList" :key="index" @keyup.enter="addName(7,index)" ref="usetRef">
                  <input type="text" class="input"  v-model.trim="item.content">
                  <div class="delete-icon" @click="delUse(index)" v-show="usetList.length > 1"><img src="../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
              <div class="input-title title-one">
                <div class="input-name">{{$t('setting.text32')}}</div><div class="add-icon" @click="addName(8)">+ {{$t('setting.text74')}}</div>
              </div>
              <ul class="input-box">
                <li class="li-one" v-for="(item, index) in workList" :key="index" @keyup.enter="addName(8,index)" ref="workRef">
                  <input type="text" class="input"  v-model.trim="item.content">
                  <div class="delete-icon" @click="delWork(index)" v-show="workList.length > 1"><img src="../../../assets/img/common/delete.png"></div>
                </li>
              </ul>
              <div class="input-title title-one">
                <div class="input-name">{{$t('setting.text34')}}*</div>
              </div>
              <div class="record-type" @click="changeRecord()">
                <div class="type-box" >
                  <div class="fixed-type" >
                    <div class="func-or-no">{{freeFunc}}</div>
                    <div class="sel-img"><i class="arrowDown" :class="{'active-Img': activeChange}"></i></div>
                  </div>
                  <ul class="selectMenu" :class="{'selectMenuActive': activeChange}" @click.stop>
                    <li v-for="(item, index) in $t('setting.freeArr')" :key="index" @click="chooseType(item,2)">{{item}}</li>
                  </ul>
                </div>
              </div>
              <div class="input-title title-one">
                <div class="input-name">{{$t('setting.text35')}}*</div>
              </div>
              <ul class="input-box">
                <li class="li-one" >
                  <input type="text" class="input" v-model.trim="price" v-if="freeFunc === $t('setting.text78')" >
                  <input type="text" class="input input-disable"  v-model.trim="price" disabled v-else>
                </li>
              </ul>
            </div>
            <div class="info" v-show="activeChoose === 3">
              <div class="wrap">
                <div class="wrap-left">
                  <div class="input-title title-one">
                    <div class="input-name">{{$t('setting.text37')}}</div>
                  </div>
                  <ul class="input-box">
                    <li class="li-one" >
                      <input type="text" class="input"  v-model.trim="father">
                    </li>
                  </ul>
                </div>
                <div class="wrap-right">
                  <div class="input-title title-one">
                    <div class="input-name">{{$t('setting.text39')}}</div>
                  </div>
                  <ul class="input-box">
                    <li class="li-one" >
                      <input type="text" class="input" v-model.trim="mother" >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="wrap">
                <div class="wrap-left">
                  <div class="input-title title-one">
                    <div class="input-name">{{$t('setting.text41')}}</div>
                  </div>
                  <ul class="input-box">
                    <li class="li-one" >
                      <input type="text" class="input" v-model.trim="birth" >
                    </li>
                  </ul>
                </div>
                <div class="wrap-right">
                  <div class="input-title title-one">
                    <div class="input-name">{{$t('setting.text43')}}</div>
                  </div>
                  <ul class="input-box">
                    <li class="li-one" >
                      <input type="text" class="input" v-model.trim="animals" >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="wrap">
                <div class="wrap-left">
                  <div class="input-title title-one">
                    <div class="input-name">{{$t('setting.text45')}}</div>
                  </div>
                  <ul class="input-box">
                    <li class="li-one" >
                      <input type="text" class="input" v-model.trim="sex" >
                    </li>
                  </ul>
                </div>
                <div class="wrap-right">
                  <div class="input-title title-one">
                    <div class="input-name">{{$t('setting.text47')}}</div>
                  </div>
                  <ul class="input-box">
                    <li class="li-one" >
                      <input type="text" class="input" v-model.trim="blood" >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="wrap">
                <div class="wrap-left">
                  <div class="input-title title-one">
                    <div class="input-name">{{$t('setting.text49')}}</div>
                  </div>
                  <ul class="input-box">
                    <li class="li-one" >
                      <input type="text" class="input" v-model.trim="star" >
                    </li>
                  </ul>
                </div>
                <div class="wrap-right">
                  <div class="input-title title-one">
                    <div class="input-name">{{$t('setting.text51')}}</div>
                  </div>
                  <ul class="input-box">
                    <li class="li-one">
                      <input type="text" class="input" v-model.trim="race" >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="wrap">
                <div class="wrap-left">
                  <div class="input-title title-one">
                    <div class="input-name">{{$t('setting.text53')}}</div>
                  </div>
                  <ul class="input-box">
                    <li class="li-one" >
                      <input type="text" class="input" v-model.trim="weight" >
                    </li>
                  </ul>
                </div>
                <div class="wrap-right">
                  <div class="input-title title-one">
                    <div class="input-name">{{$t('setting.text55')}}</div>
                  </div>
                  <ul class="input-box">
                    <li class="li-one" >
                      <input type="text" class="input" v-model.trim="stature" >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="wrap">
                <div class="wrap-left">
                  <div class="input-title title-one">
                    <div class="input-name">{{$t('setting.text57')}}</div>
                  </div>
                  <ul class="input-box">
                    <li class="li-one" >
                      <input type="text" class="input" v-model.trim="looks" >
                    </li>
                  </ul>
                </div>
                <div class="wrap-right">
                  <div class="input-title title-one">
                    <div class="input-name">{{$t('setting.text59')}}</div>
                  </div>
                  <ul class="input-box">
                    <li class="li-one" >
                      <input type="text" class="input" v-model.trim="education" >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="wrap">
                <div class="wrap-left">
                  <div class="input-title title-one">
                    <div class="input-name">{{$t('setting.text61')}}</div>
                  </div>
                  <ul class="input-box">
                    <li class="li-one" >
                      <input type="text" class="input" v-model.trim="marriage" >
                    </li>
                  </ul>
                </div>
                <div class="wrap-right">
                  <div class="input-title title-one">
                    <div class="input-name">{{$t('setting.text63')}}</div>
                  </div>
                  <ul class="input-box">
                    <li class="li-one" >
                      <input type="text" class="input" v-model.trim="character" >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="wrap">
                <div class="wrap-left">
                  <div class="input-title title-one">
                    <div class="input-name">{{$t('setting.text65')}}</div>
                  </div>
                  <ul class="input-box">
                    <li class="li-one" >
                      <input type="text" class="input" v-model.trim="birthplace" >
                    </li>
                  </ul>
                </div>
                <div class="wrap-right">
                  <div class="input-title title-one">
                    <div class="input-name">{{$t('setting.text67')}}</div>
                  </div>
                  <ul class="input-box">
                    <li class="li-one">
                      <input type="text" class="input" v-model.trim="storage"  >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="wrap">
                <div class="wrap-left">
                  <div class="input-title title-one">
                    <div class="input-name">{{$t('setting.text69')}}</div>
                  </div>
                  <ul class="input-box">
                    <li class="li-one" >
                      <input type="text" class="input" v-model.trim="roboticist" >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="save-btn" @click="btnSave()">
             <div class="save" :class="{'toLogin': isOkBtn, 'loading-btn': loadShow}"> <img src="../../../assets/img/common/loading.gif" alt="" class="loading-m" v-show="loadShow">{{$t('setting.text82')}}</div>
              <div class="err-ms" v-show="errInputMsg">{{errInputMsg}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="safeDialog">
      <div class="dialog-w dialog-safe-w" v-show="addRobotDialog">
        <div class="dialog-safe" >
          <div class="close" @click="close()">
            <div class="close-icon"></div>
          </div>
          <div class="dialog-title">{{$t('setting.text71')}}</div>
          <div class="robot-name">{{$t('setting.text72')}}</div>
          <div class="form-item">
            <input type="text" :placeholder="$t('setting.text73')" class="input" v-model.trim="productName">
          </div>
          <div class="g-dialog-btn-wrap" @click="addProduct()">
            <div class="err-ms" v-show="errInputTip">{{errInputTip}}</div>
            <div class="g-dialog-btn g-dialog-cancel" :class="{'toLogin': isOkBtn, 'loading-btn': loadShow}"> <img src="../../../assets/img/common/loading.gif" alt="" class="loading-m" v-show="loadRobot">{{$t('setting.text74')}}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Dialog from '../../../components/dialog/index'
  import Dialog2 from '../../../components/dialog2/index'
  export default {
    data() {
      return {
        loadRobot: false,
        isOkBtn: false,
        loadShow: false,
        loadingShow: true,
        addRobotDialog: false,
        productName: '',
        activeIndex: 0,
        menuArr: [
          {name: '机器人档案', icon: ''}
        ],
        tabArr: ['基本信息', '购买信息', '功能信息', '更多信息'],
        // activeChoose: parseInt(localStorage.getItem('__activeTab__')) || 0,
        activeChoose: 0,
        nameList: [], // 机器人别称数组
        reasonList: [{key: this.keyId, content: ''}], // 原因数组
        intrList: [], // 自我介绍数组
        productsList: [], // 产品数组
        descriptionList: [{key: this.keyId, content: ''}], // 功能描述数组
        effectList: [{key: this.keyId, content: ''}], // 为什么有这个功能数组
        usetList: [{key: this.keyId, content: ''}], // 如何使用这个功能数组
        workList: [{key: this.keyId, content: ''}], // 这个功能如何运作数组
        discountList: [{
          content: ''
        }], // 折扣数组
        purchaseList: [{
          content: ''
        }], // 怎么买数组
        payList: [{
          content: ''
        }], // 支付方式数组
        serviceList: [{
          content: ''
        }], // 售后服务数组
        robotName: this.$route.query.name, // 机器人名称
        NameReason: '', // 名称原因
        introduction: '', // 自我介绍
        website: '', // 官网
        products: '', // 代理产品
        robotPrice: '', // 机器人价格
        price: '', // 功能价格
        discount: '', // 折扣
        buy: '', // 怎么买
        payType: '', // 支付方式
        service: '', // 售后服务
        functionName: '', // 功能名称
        father: '', // 父亲
        mother: '', // 母亲
        birth: '', // 生日
        animals: '', // 生肖
        sex: '', // 性别
        blood: '', // 血型
        star: '', // 星座
        race: '', // 种族
        weight: '', // 体重
        stature: '', // 身高
        looks: '', // 长相
        education: '', // 学历
        marriage: '', // 婚恋情况
        character: '', // 性格
        birthplace: '', // 出生地
        storage: '', // 存储方式
        roboticist: '', // 机器人创造者
        languageType: '',
        languageArr: ['中文', '英文'],
        freeType: '',
        freeFunc: '',
        freeArr: ['是', '否'],
        activeChange: false,
        free_or_not: '', // 是否免费
        freeFunc_or_not: '',
        agentProducts: '',
        agentList: [],
        delProList: [], // 删除代理产品数组
        errInputMsg: '',
        errInputTip: '',
        username: '',
        keyId: 1,
        oldProductList: [], // 老的产品数据
        newProductList: [], // 新的产品数据
        activeTab: '',
      }
    },
    created() {
      this.userPool = new this.$AmazonCognitoIdentity.CognitoUserPool(this.$poolData);
      this.getChatbots()
      this.getAccount()
      this.getChatRobot()
      this.getRobotInfo()
      this.getRobotPro()
      this.getConceptNames()
    },
    mounted() {
      // this.getActiveIndex()
      // console.log(typeof localStorage.getItem('__activeTab__'))
    },
    watch: {
      // '$route': 'getActiveIndex'
    },
    methods: {
      verifyInput(field) {
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
      close() {
        this.addRobotDialog = false
        this.errInputTip = ''
        this.productName = ''
      },
      isLoggedIn() {
        return this.userPool.getCurrentUser() != null;
      },
      // 检测用户
      getAuthenticateUser(){
        return this.userPool.getCurrentUser();
      },
      getChatbots() {
        var userPool = new this.$AmazonCognitoIdentity.CognitoUserPool(this.$poolData);
        var cognitoUser = userPool.getCurrentUser();
        let _this = this
        if(this.isLoggedIn()) {
          cognitoUser.getSession(function (err, session) {
            if(!session.idToken) {
              this.getAuthenticateUser().signOut()
            }
            _this.username = session.idToken.payload.email
          })
        }
      },
      getAccount(){
        this.$fetch.post('/account',{
          operation: 'GetAccount',
          username: this.username
        }).then(res => {
          if(res) {
            // this.loadingShow = false
            if(res.language === 'ZH') {
              this.languageType = this.$t('setting.text75')
            } else if(res.language === 'EN') {
              this.languageType = this.$t('setting.text76')
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取概念
      getConceptNames() {
        let getChatbotConceptRequest = {
          chatbot: this.$route.query.uuid
        }
        this.$fetch.post('/chatbotknowledge/',{
          event: 'EVENT_GET_CONCEPT_NAMES',
          getChatbotConceptRequest: getChatbotConceptRequest
        }).then(res => {
          if(res) {
            // this.loadingShow = false
            // console.log(res)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 机器人语言
      getChatRobot() {
        this.$fetch.get('/chatbotregistration/' + this.$route.query.uuid).then(res => {
          if(res) {
            // this.loadingShow = false
            if(res.language === 'ZH') {
              this.languageType = this.$t('setting.text75')
            } else if(res.language === 'EN') {
              this.languageType = this.$t('setting.text76')
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取代理产品
      getRobotPro() {
        let getChatbotProductRequest = {
          chatbot: this.$route.query.uuid
        }
        this.$fetch.post('/chatbotknowledge/',{
          event: 'EVENT_GET_PRODUCT_NAMES',
          getChatbotProductRequest: getChatbotProductRequest
          // chatbot: this.$route.query.uuid
        }).then(res => {
          if(res) {
            this.loadingShow = false
            if(res.getChatbotProductResponse.chatbotProductNames.length > 0) {
              for(let i =0; i < res.getChatbotProductResponse.chatbotProductNames.length; i++) {
                let cope = {
                  content: res.getChatbotProductResponse.chatbotProductNames[i],
                }
                this.productsList.push(cope)
                // this.oldProductList.push(cope)
              }
            } else {
              this.productsList.push({content: '',})
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取机器人信息
      getRobotInfo() {
        let getChatbotPropertiesRequest = {
          chatbot: this.$route.query.uuid
        }
        this.$fetch.post('/chatbotknowledge/',{
          event: 'EVENT_GET_CHATBOTPROPERTIES',
          getChatbotPropertiesRequest: getChatbotPropertiesRequest
          // chatbot: this.$route.query.uuid
        }).then(res => {
          if(res) {
              // this.loadingShow = false
              if(res.getChatbotPropertiesResponse) {
                let properties = JSON.parse(res.getChatbotPropertiesResponse.properties)
              // console.log(properties)
                this.robotName = properties.chatbot_name
                if(properties.chatbot_name_reason.length > 0) {
                  this.nameList = properties.chatbot_nickname
                } else {
                  this.nameList.push({key: this.keyId, content: ''})
                }
                this.reasonList =  properties.chatbot_name_reason
              if(properties.chatbot_name_reason.length > 0) {
                this.reasonList = properties.chatbot_name_reason
              } else {
                this.reasonList.push({key: this.keyId, content: ''})
              }
                if(properties.chatbot_introduction) {
                  this.intrList = properties.chatbot_introduction
                } else {
                  this.intrList.push({key: this.keyId, content: ''})
                }
                this.website = properties.chatbot_website
                if(properties.chatbot_free_or_not === 'yes') {
                  this.freeType = this.$t('setting.text77')
                } else {
                  this.freeType = this.$t('setting.text78')
                }
                this.robotPrice = properties.chatbot_fee
                this.discountList = properties.chatbot_discount_info
                this.purchaseList = properties.chatbot_purchase_process
                this.payList = properties.chatbot_payment_method
                this.serviceList = properties.chatbot_after_sales_service
                let chatbot_funcs = properties.chatbot_funcs[0]
                // console.log(chatbot_funcs)
                this.functionName = chatbot_funcs.chatbot_func_name
                if(chatbot_funcs.chatbot_func_intro.length > 0) {
                  this.descriptionList = chatbot_funcs.chatbot_func_intro
                } else {
                  this.descriptionList.push({key: this.keyId, content: ''})
                }
                if(chatbot_funcs.chatbot_func_reason.length > 0) {
                  this.effectList = chatbot_funcs.chatbot_func_reason
                } else {
                  this.effectList.push({key: this.keyId, content: ''})
                }
               if(chatbot_funcs.how_use_chatbot_function.length > 0) {
                 this.usetList = chatbot_funcs.how_use_chatbot_function
               } else {
                 this.usetList.push({key: this.keyId, content: ''})
               }
               if(chatbot_funcs.how_chatbot_function_work.length > 0) {
                 this.workList = chatbot_funcs.how_chatbot_function_work
               } else {
                 this.workList.push({key: this.keyId, content: ''})
               }
              if(chatbot_funcs.chatbot_func_free_or_not === 'yes') {
                this.freeFunc = this.$t('setting.text77')
              } else {
                this.freeFunc = this.$t('setting.text78')
              }
              if(chatbot_funcs.chatbot_func_fee) {
                this.price = chatbot_funcs.chatbot_func_fee
              }
               if(properties.chatbot_father) {
                  this.father = properties.chatbot_father
               }
              if(properties.chatbot_mother) {
                this.mother = properties.chatbot_mother
              }
              if(properties.date_of_birth) {
                this.birth = properties.date_of_birth
              }
              if(properties.blood_type) {
                this.blood = properties.blood_type
              }
              if(properties.chinese_zodiac_animal) {
                this.animals = properties.chinese_zodiac_animal
              }
              if(properties.chatbot_sex) {
                // if(properties.chatbot_sex === 'male') {
                //   this.sex = '男'
                // } else if(properties.chatbot_sex === 'female') {
                //   this.sex = '女'
                // }
                this.sex = properties.chatbot_sex
              }
              if(properties.horoscope_sign) {
                this.star = properties.horoscope_sign
              }
              if(properties.race) {
                this.race = properties.race
              }
              if(properties.weight) {
                this.weight = properties.weight
              }
              if(properties.height) {
                this.stature = properties.height
              }
              if(properties.appearance) {
                this.looks = properties.appearance
              }
              if(properties.education) {
                this.education = properties.education
              }
              if(properties.marital_status) {
                this.marriage = properties.marital_status
              }
              if(properties.personality) {
                this.character = properties.personality
              }
              if(properties.place_of_born) {
                this.birthplace = properties.place_of_born
              }
              if(properties.storage_method) {
                this.storage = properties.storage_method
              }
              if(properties.chatbot_creator) {
                this.roboticist = properties.chatbot_creator
              }
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      gotoPath (index) {
        this.activeIndex = index
      },
      changeRecord() {
        this.activeChange = !this.activeChange
      },
      // 是否免费
      chooseType(item,type) {
        if(item === this.$t('setting.text75')){
          this.languageType = item
        } else if(item ===this.$t('setting.text76')) {
          this.languageType = item
        }
        if(type === 1) {
          this.freeType = item
        } else if(type === 2) {
          this.freeFunc = item
        }
        this.discountList = [{content: ''}]
        this.purchaseList = [{content: ''}]
        this.payList = [{content: ''}]
        this.serviceList = [{content: ''}]
        this.robotPrice = ''
        this.price = ''
        if(this.freeType === this.$t('setting.text77') ) {
          this.free_or_not = 'yes'
        } else if(this.freeType === this.$t('setting.text78')) {
          this.free_or_not = 'no'
        }
        if(this.freeFunc === this.$t('setting.text77')) {
          this.freeFunc_or_not = 'yes'
        } else if(this.freeFunc === this.$t('setting.text78')) {
          this.freeFunc_or_not = 'no'
        }
        this.activeChange = !this.activeChange
      },
      changeOne(index) {
        this.errInputMsg = ''
        this.activeChoose = index
        this.activeChange = false
        // localStorage.setItem('__activeTab__', index)
      },
      // 添加
      addName(type,i) {
        let data = {
          content: "",
        }
        let data2 = {
          key: this.keyId,
          content: "",
        }
        if(type === 1) {
          this.nameList.push(data2);
        } else if(type === 2) {
          if(i === 0 || i) {
            this.reasonList.push(data2);
            // console.log(this.$refs.reasonRef.length,this.$refs.reasonRef[i+1])
            // console.log(this.$refs.reasonRef)
            setTimeout(() => {
              if(this.$refs.reasonRef) {
                this.$refs.reasonRef[i+1].getElementsByClassName('input')[0].focus()
              }
            },300)
          } else {
            this.reasonList.push(data2);
            // setTimeout(() => {
            //   for(let j = 0; j < this.reasonList.length; j++) {
            //     if(this.reasonList[j].content === '') {
            //       this.$refs.reasonRef[j].getElementsByClassName('input')[0].focus()
            //       return
            //     }
            //   }
            // },300)
          }
        } else if(type === 3) {
          if(i === 0 || i) {
            this.intrList.push(data2);
            setTimeout(() => {
              if(this.$refs.intrRef) {
                this.$refs.intrRef[i+1].getElementsByClassName('input')[0].focus()
              }
            },300)
          } else {
            this.intrList.push(data2);
          }
        } else if(type === 4) {
          // this.productsList.push(data);
          this.errInputTip = ''
          this.addRobotDialog = true
          this.productName = ''
        } else if(type === 5) {
          if(i  === 0 || i) {
            this.descriptionList.push(data2);
            setTimeout(() => {
              if(this.$refs.descriptionRef) {
                this.$refs.descriptionRef[i+1].getElementsByClassName('input')[0].focus()
              }
            },300)
          } else {
            this.descriptionList.push(data2);
          }
        }  else if(type === 6) {
          if(i  === 0 || i) {
            this.effectList.push(data2);
            setTimeout(() => {
              if(this.$refs.effectRef) {
                this.$refs.effectRef[i+1].getElementsByClassName('input')[0].focus()
              }
            },300)
          } else {
            this.effectList.push(data2);
          }
        }  else if(type === 7) {
          if(i  === 0 || i) {
            this.usetList.push(data2);
            setTimeout(() => {
              if(this.$refs.usetRef) {
                this.$refs.usetRef[i+1].getElementsByClassName('input')[0].focus()
              }
            },300)
          } else {
            this.usetList.push(data2);
          }
        }  else if(type === 8) {
          if(i  === 0 || i) {
            this.workList.push(data2);
            setTimeout(() => {
              if(this.$refs.workRef) {
                this.$refs.workRef[i+1].getElementsByClassName('input')[0].focus()
              }
            },300)
          } else {
            this.workList.push(data2);
          }
        } else if(type === 9) {
          if(i  === 0 || i) {
            this.discountList.push(data);
            setTimeout(() => {
              if(this.$refs.discountRef) {
                this.$refs.discountRef[i+1].getElementsByClassName('input')[0].focus()
              }
            },300)
          } else {
            this.discountList.push(data);
          }
        } else if(type === 10) {
          if(i  === 0 || i) {
            this.purchaseList.push(data);
            setTimeout(() => {
              if(this.$refs.purchaseRef) {
                this.$refs.purchaseRef[i+1].getElementsByClassName('input')[0].focus()
              }
            },300)
          } else {
            this.purchaseList.push(data);
          }
        } else if(type === 11) {
          if(i  === 0 || i) {
            this.payList.push(data);
            setTimeout(() => {
              if(this.$refs.payRef) {
                this.$refs.payRef[i+1].getElementsByClassName('input')[0].focus()
              }
            },300)
          } else {
            this.payList.push(data);
          }
        } else if(type === 12) {
          if(i  === 0 || i) {
            this.serviceList.push(data);
            setTimeout(() => {
              if(this.$refs.serviceRef) {
                this.$refs.serviceRef[i+1].getElementsByClassName('input')[0].focus()
              }
            },300)
          } else {
            this.serviceList.push(data);
          }
        }
      },
      // 删除
      delName(index) {
        this.nameList.splice(index, 1);
      },
      // 删除名称原因
      delReason(index) {
        if (localStorage.getItem('__notTips') && localStorage.getItem('__notTips') === localStorage.getItem('__userEmail__')) {
          this.reasonList.splice(index, 1);
        } else {
          Dialog2({
            okFn: () => {
              this.reasonList.splice(index, 1);
            }
          })
        }
      },
      // 删除自我介绍
      delIntr(index) {
        if (localStorage.getItem('__notTips') && localStorage.getItem('__notTips') === localStorage.getItem('__userEmail__')) {
          this.intrList.splice(index, 1);
        } else {
          Dialog2({
            okFn: () => {
              this.intrList.splice(index, 1);
            }
          })
        }
      },
      // 删除代理产品
      delProduct(index, item) {
        if (localStorage.getItem('__notTips') && localStorage.getItem('__notTips') === localStorage.getItem('__userEmail__')) {
          this.productsList.splice(index, 1);
          let list = []
          list.push(item.content)
          for(let i =0; i < list.length; i++) {
            let cope = {
              content: list[i],
            }
            this.delProList.push(cope)
          }
        } else {
          Dialog2({
            okFn: () => {
              this.productsList.splice(index, 1);
              let list = []
              list.push(item.content)
              for(let i =0; i < list.length; i++) {
                let cope = {
                  content: list[i],
                }
                this.delProList.push(cope)
              }
            }
          })
        }
        // Dialog2({
        //   content: '是否删除这条信息',
        //   type: '取消',
        //   okText: '确定',
        //   okFn: () => {
        //     this.productsList.splice(index, 1);
        //     let list = []
        //     list.push(item.content)
        //     for(let i =0; i < list.length; i++) {
        //       let cope = {
        //         content: list[i],
        //       }
        //       this.delProList.push(cope)
        //     }
        //   }
        // })
        // console.log(this.delProList)
      },
      // 删除功能描述
      delDescription(index) {
        if (localStorage.getItem('__notTips') && localStorage.getItem('__notTips') === localStorage.getItem('__userEmail__')) {
          this.descriptionList.splice(index, 1);
        } else {
          Dialog2({
            okFn: () => {
              this.descriptionList.splice(index, 1);
            }
          })
        }
        // Dialog2({
        //   content: '是否删除这条信息',
        //   type: '取消',
        //   okText: '确定',
        //   okFn: () => {
        //     this.descriptionList.splice(index, 1);
        //   }
        // })
      },
      // 删除功能原因
      delEffect(index) {
        if (localStorage.getItem('__notTips') && localStorage.getItem('__notTips') === localStorage.getItem('__userEmail__')) {
          this.effectList.splice(index, 1);
        } else {
          Dialog2({
            okFn: () => {
              this.effectList.splice(index, 1);
            }
          })
        }
        // }
        // Dialog2({
        //   content: '是否删除这条信息',
        //   type: '取消',
        //   okText: '确定',
        //   okFn: () => {
        //     this.effectList.splice(index, 1);
        //   }
        // })
      },
      // 删除使用这个功能
      delUse(index) {
        if (localStorage.getItem('__notTips') && localStorage.getItem('__notTips') === localStorage.getItem('__userEmail__')) {
          this.usetList.splice(index, 1);
        } else {
          Dialog2({
            okFn: () => {
              this.usetList.splice(index, 1);
            }
          })
        }
        // Dialog2({
        //   content: '是否删除这条信息',
        //   type: '取消',
        //   okText: '确定',
        //   okFn: () => {
        //     this.usetList.splice(index, 1);
        //   }
        // })
      },
      // 删除这个功能如何运作
      delWork(index) {
        if (localStorage.getItem('__notTips') && localStorage.getItem('__notTips') === localStorage.getItem('__userEmail__')) {
          this.workList.splice(index, 1);
        } else {
          Dialog2({
            okFn: () => {
              this.workList.splice(index, 1);
            }
          })
        }
        // Dialog2({
        //   content: '是否删除这条信息',
        //   type: '取消',
        //   okText: '确定',
        //   okFn: () => {
        //     this.workList.splice(index, 1);
        //   }
        // })
      },
      // 删除折扣
      delDiscount(index) {
        if (localStorage.getItem('__notTips') && localStorage.getItem('__notTips') === localStorage.getItem('__userEmail__')) {
          this.discountList.splice(index, 1);
        } else {
          Dialog2({
            okFn: () => {
              this.discountList.splice(index, 1);
            }
          })
        }
        // Dialog2({
        //   content: '是否删除这条信息',
        //   type: '取消',
        //   okText: '确定',
        //   okFn: () => {
        //     this.discountList.splice(index, 1);
        //   }
        // })
      },
      // 删除怎么买
      delPurchase(index) {
        if (localStorage.getItem('__notTips') && localStorage.getItem('__notTips') === localStorage.getItem('__userEmail__')) {
          this.purchaseList.splice(index, 1);
        } else {
          Dialog2({
            okFn: () => {
              this.purchaseList.splice(index, 1);
            }
          })
        }
        // Dialog2({
        //   content: '是否删除这条信息',
        //   type: '取消',
        //   okText: '确定',
        //   okFn: () => {
        //     this.purchaseList.splice(index, 1);
        //   }
        // })
      },
      // 删除支付方式
      delPay(index) {
        if (localStorage.getItem('__notTips') && localStorage.getItem('__notTips') === localStorage.getItem('__userEmail__')) {
          this.payList.splice(index, 1);
        } else {
          Dialog2({
            okFn: () => {
              this.payList.splice(index, 1);
            }
          })
        }
        // Dialog2({
        //   content: '是否删除这条信息',
        //   type: '取消',
        //   okText: '确定',
        //   okFn: () => {
        //     this.payList.splice(index, 1);
        //   }
        // })
      },
      // 删除售后服务
      delService(index) {
        if (localStorage.getItem('__notTips') && localStorage.getItem('__notTips') === localStorage.getItem('__userEmail__')) {
          this.serviceList.splice(index, 1);
        } else {
          Dialog2({
            okFn: () => {
              this.serviceList.splice(index, 1);
            }
          })
        }
        // Dialog2({
        //   content: '是否删除这条信息',
        //   type: '取消',
        //   okText: '确定',
        //   okFn: () => {
        //     this.serviceList.splice(index, 1);
        //   }
        // })
      },
      // 验证
      verify() {
        let flag = true
        // var productsReg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！%@#￥……&*（）——|{}【】‘；：”“'。，、？]")
        let reg = /^[\u4e00-\u9fa5\u3001\a-zA-Z0-9_\s]+$/
        if(this.activeChoose === 0) {
          if (this.robotName === '') {
            this.errInputMsg = this.$t('setting.text2')
            flag = false
          }
          if (!reg.test(this.robotName)) {
            this.errInputMsg = this.$t('setting.text79')
            flag = false
          }
          if(this.languageType === '') {
            this.errInputMsg = this.$t('robotManagement.text13')
            flag = false
          }
          // this.reasonList.forEach(item => {
          //   if(item.content === '') {
          //     this.errInputMsg = '请输入名称原因'
          //     flag = false
          //     return false
          //   }
          // })
          // this.intrList.forEach(item => {
          //   if(item.content === '') {
          //     this.errInputMsg = '请输入自我介绍'
          //     flag =false
          //     return false
          //   }
          // })
          // if (this.website === '') {
          //   this.errInputMsg = '请输入官网'
          //   flag = false
          // }
          this.productsList.forEach(item => {
           if (!reg.test(item.content)) {
              this.errInputMsg = this.$t('setting.text79')
              flag =false
              return false
            }
          })
          return flag
        } else if (this.activeChoose === 1) {
          if(this.freeType === '') {
            this.errInputMsg = this.$t('houseToken.text39')
            flag = false
          }
          // if (this.robotPrice === '' && this.freeType === this.$t('setting.text78')) {
          //   this.errInputMsg = this.$t('setting.text36')
          //   flag = false
          //   return false
          // }
          // this.discountList.forEach(item => {
          //   if(item.content === '' && this.freeType === this.$t('setting.text78')) {
          //     this.errInputMsg = this.$t('setting.text17')
          //     flag =false
          //     return false
          //   }
          // })
          // this.purchaseList.forEach(item => {
          //   if(item.content === '' && this.freeType === this.$t('setting.text78')) {
          //     this.errInputMsg = this.$t('setting.text19')
          //     flag =false
          //     return false
          //   }
          // })
          // this.payList.forEach(item => {
          //   if(item.content === '' && this.freeType === this.$t('setting.text78')) {
          //     this.errInputMsg = this.$t('setting.text21')
          //     flag =false
          //     return false
          //   }
          // })
          // this.serviceList.forEach(item => {
          //   if(item.content === '' && this.freeType === '否') {
          //     this.errInputMsg = '请输入售后服务'
          //     flag =false
          //     return false
          //   }
          // })
          return flag
        } else if (this.activeChoose === 2) {
          if(this.functionName === '') {
            this.errInputMsg = this.$t('setting.text25')
            flag = false
          }
          // this.descriptionList.forEach(item => {
          //   if(item.content === '') {
          //     this.errInputMsg = '请输入功能描述'
          //     flag =false
          //     return false
          //   }
          // })
          // this.effectList.forEach(item => {
          //   if(item.content === '') {
          //     this.errInputMsg = '请输入为什么有这个功能'
          //     flag =false
          //     return false
          //   }
          // })
          // this.usetList.forEach(item => {
          //   if(item.content === '') {
          //     this.errInputMsg = '请输入如何使用这个功能'
          //     flag =false
          //     return false
          //   }
          // })
          // this.workList.forEach(item => {
          //   if(item.content === '') {
          //     this.errInputMsg = '请输入这个功能如何运作'
          //     flag =false
          //     return false
          //   }
          // })
          if(this.freeFunc === '') {
            this.errInputMsg = this.$t('houseToken.text39')
            flag = false
            return false
          }
          if(this.price === '' && this.freeFunc === this.$t('setting.text78')) {
            this.errInputMsg = this.$t('setting.text36')
            flag = false
            return false
          }
          return flag
        } else if (this.activeChoose === 3) {
          // if(this.father === '') {
          //   this.errInputMsg = '请输入父亲'
          //   flag = false
          //   return false
          // }
          // if(this.mother === '') {
          //   this.errInputMsg = '请输入母亲'
          //   flag =false
          //   return false
          // }
          // if(this.birth === '') {
          //   this.errInputMsg = '请输入生日'
          //   flag =false
          //   return false
          // }
          // if(this.animals === '') {
          //   this.errInputMsg = '请输入生肖'
          //   flag =false
          //   return false
          // }
          // if(this.sex === '') {
          //   this.errInputMsg = '请输入性别'
          //   flag =false
          //   return false
          // }
          // let checkSex = /^[男女]$/
          // if(!checkSex.test(this.sex)) {
          //   this.errInputMsg = '输入的性别不对'
          //   flag =false
          //   return false
          // }
          // if(this.blood === '') {
          //   this.errInputMsg = '请输入血型'
          //   flag =false
          //   return false
          // }
          // if(this.star === '') {
          //   this.errInputMsg = '请输入星座'
          //   flag =false
          //   return false
          // }
          // if(this.race === '') {
          //   this.errInputMsg = '请输入种族'
          //   flag =false
          //   return false
          // }
          // if(this.weight === '') {
          //   this.errInputMsg = '请输入体重'
          //   flag =false
          //   return false
          // }
          // if(this.stature === '') {
          //   this.errInputMsg = '请输入身高'
          //   flag =false
          //   return false
          // }
          // if(this.looks === '') {
          //   this.errInputMsg = '请输入长相'
          //   flag =false
          //   return false
          // }
          // if(this.education === '') {
          //   this.errInputMsg = '请输入学历'
          //   flag =false
          //   return false
          // }
          // if(this.marriage === '') {
          //   this.errInputMsg = '请输入婚姻情况'
          //   flag =false
          //   return false
          // }
          // if(this.character === '') {
          //   this.errInputMsg = '请输入性格'
          //   flag =false
          //   return false
          // }
          // if(this.birthplace === '') {
          //   this.errInputMsg = '请输入出生地'
          //   flag =false
          //   return false
          // }
          // if(this.storage === '') {
          //   this.errInputMsg = '请输入存储方式'
          //   flag =false
          //   return false
          // }
          // if(this.roboticist === '') {
          //   this.errInputMsg = '请输入机器人创造者'
          //   flag =false
          //   return false
          // }
          return true
        }
      },
      // 保存
      btnSave() {
        // console.log(this.verify())
        if(this.verify()) {
          this.errInputMsg = ''
          if(this.activeChoose === 0) {
            // this.productsList = []
            // this.edit()
            // this.editProduct()
            // this.addProduct()
            // this.getRobotPro()
          }
          this.loadShow = true
          this.saveRobot()
          this.delPro()
          this.saveAccount()
          this.getProductName()
        }
      },
      // 机器人语言
      saveAccount() {
        let language
        if(this.languageType === this.$t('setting.text75')){
          language = 'ZH'
        } else if(this.languageType === this.$t('setting.text76')) {
          language = 'EN'
        }
        this.$fetch.patch('/chatbotregistration/', {
          apiKey: this.$route.query.apiKey,
          createdAt: this.$route.query.createdAt,
          endpoint: this.$route.query.endpoint,
          language: language,
          name: this.robotName,
          uuid: this.$route.query.uuid,
        }).then(res => {
          if(res) {
            // this.loadingShow = false
            // this.loadShow = false
            if(res.language === 'ZH') {
              this.languageType = this.$t('setting.text75')
            } else if(res.language === 'EN') {
              this.languageType = this.$t('setting.text76')
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 删除代理产品
      delPro() {
        for(let i=0; i <this.delProList.length; i++ ) {
          let deleteChatbotKnowledgeRequest = {
            chatbot: this.$route.query.uuid,
            product: this.delProList[i].content
          }
          this.$fetch.post('/chatbotknowledge/',{
            event: 'EVENT_DELETE_PRODUCT',
            deleteChatbotKnowledgeRequest: deleteChatbotKnowledgeRequest
          }).then(res => {
            if(res){
              // this.loadShow = false
              // this.productsList = []
              // this.getRobotPro()
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      getProductName() {
        for(let i =0; i < this.productsList.length; i++) {
          let getChatbotProductRequest = {
            chatbot: this.$route.query.uuid,
            product: this.productsList[i].content
          }
          this.$fetch.post('/chatbotknowledge/', {
            event: 'EVENT_GET_PRODUCT_BY_NAME',
            getChatbotProductRequest: getChatbotProductRequest
          }).then(res => {
            if(res) {
              // this.loadShow = false
              // console.log(res)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      // 保存信息
      saveRobot() {
        // let formData = new FormData()
        // let chatbot_sex
        // if(this.sex === '男') {
        //   chatbot_sex = 'male'
        // } else if(this.sex === '女') {
        //   chatbot_sex = 'female'
        // }
        let funcs = []
        let obj = {}
        obj.chatbot_func_name = this.functionName
        obj.chatbot_func_intro = this.descriptionList
        obj.chatbot_func_reason = this.effectList
        obj.how_use_chatbot_function = this.usetList
        obj.how_chatbot_function_work = this.workList
        obj.chatbot_func_free_or_not = this.freeFunc_or_not
        obj.chatbot_func_fee = this.price
        funcs.push(obj)
        let properties = {}
        properties.chatbot_name = this.robotName
        properties.chatbot_nickname = this.nameList
        properties.chatbot_name_reason = this.reasonList
        properties.chatbot_introduction = this.intrListstatus
        properties.chatbot_website = this.website
        properties.chatbot_free_or_not = this.free_or_not
        properties.chatbot_fee = this.robotPrice
        properties.chatbot_discount_info = this.discountList
        properties.chatbot_purchase_process = this.purchaseList
        properties.chatbot_payment_method = this.payList
        properties.chatbot_after_sales_service = this.serviceList
        properties.chatbot_funcs = funcs
        properties.chatbot_mother = this.mother
        properties.chatbot_father = this.father
        properties.date_of_birth = this.birth
        properties.chinese_zodiac_animal = this.animals
        properties.blood_type = this.blood
        properties.horoscope_sign = this.star
        properties.race = this.race
        properties.weight = this.weight
        properties.height = this.stature
        properties.appearance = this.looks
        properties.education = this.education
        properties.marital_status = this.marriage
        properties.personality = this.character
        properties.place_of_born = this.birthplace
        properties.storage_method = this.storage
        properties.chatbot_creator = this.roboticist
        properties.chatbot_sex = this.sex
        let chatbotProperties = {
          properties : JSON.stringify(properties)
        }
        let createOrUpdateChatbotPropertiesRequest = {
          chatbot: this.$route.query.uuid,
          chatbotProperties: chatbotProperties
        }
        this.$fetch.post('/chatbotknowledge/',{
          event: 'EVENT_CREATEORUPDATE_CHATBOTPROPERTIES',
          createOrUpdateChatbotPropertiesRequest: createOrUpdateChatbotPropertiesRequest
        }).then(res => {
          if(res){
            this.loadShow = false
            Dialog({
              content: this.$t('setting.text83'),
              okText: this.$t('setting.text81'),
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },

       // 添加代理产品
      addProduct() {
        var productsReg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！%@#￥……&*（）——|{}【】‘；：”“'。，、？]")
        let reg = /^[\u4e00-\u9fa5\u3001\a-zA-Z0-9_\s]+$/
        if(!reg.test(this.productName)) {
          this.errInputTip = this.$t('setting.text79')
          return false
        }
        if(this.productName === '') {
          this.errInputTip = this.$t('setting.text73')
          return false
        }
        this.loadRobot = true
        let cope = {
          content: this.productName,
        }
        let product = {}
        let properties = {}
        product.name = this.productName
        product.properties = JSON.stringify(properties)
        let createOrUpdateChatbotProductRequest = {
          chatbot: this.$route.query.uuid,
          product: product
        }
        this.$fetch.post('/chatbotknowledge/', {
          event: 'EVENT_CREATEORUPDATE_PRODUCT',
          createOrUpdateChatbotProductRequest: createOrUpdateChatbotProductRequest
        }).then(res => {
          if(res){
            this.loadRobot = false
            this.addRobotDialog = false
            this.errInputTip = ''
              Dialog({
              content: this.$t('setting.text80'),
              okText: this.$t('setting.text81'),
              okFn: () => {
                this.productsList.push(cope)
              }
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 修改产品名称
      // editProduct() {
      //   for(let i=0; i <this.newProductList.length; i++ ) {
      //     if(this.oldProductList[i] !== this.newProductList[i]){
      //       let deleteChatbotKnowledgeRequest = {
      //         chatbot: this.$route.query.uuid,
      //         product: this.oldProductList[i]
      //       }
      //       this.$fetch.post('/chatbotknowledge/',{
      //         event: 'EVENT_DELETE_PRODUCT',
      //         deleteChatbotKnowledgeRequest: deleteChatbotKnowledgeRequest
      //       }).then(res => {
      //         if(res){
      //           let product = {}
      //           let properties = {}
      //           product.name = this.newProductList[i]
      //           product.properties = JSON.stringify(properties)
      //           let createOrUpdateChatbotProductRequest = {
      //             chatbot : this.$route.query.uuid,
      //             product: product
      //           }
      //           this.$fetch.post('/chatbotknowledge/', {
      //             event: 'EVENT_CREATEORUPDATE_PRODUCT',
      //             createOrUpdateChatbotProductRequest: createOrUpdateChatbotProductRequest
      //           }).then(res => {
      //             if(res){
      //               this.loadShow = false
      //             }
      //           }).catch(err => {
      //             console.log(err)
      //           })
      //         }
      //       }).catch(err => {
      //         console.log(err)
      //       })
      //     }
      //   }
      // },
      // 聚焦
      focusInput(index, content) {
        this.errInputMsg = ''
        var productsReg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！%@#￥……&*（）——|{}【】‘；：”“'。，、？]")
        if(productsReg.test(content)) {
          // this.errInputMsg = '不允许出现特殊字符'
          return false
        } else {
          // this.oldProductList.push(content)
          console.log(this.oldProductList)
          this.agentProducts = content
          // console.log(this.agentProducts)
        }
        // console.log(content)
      },
      // 失去焦点
      changeInput(index, content) {
        // console.log(content)
        var productsReg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！%@#￥……&*（）——|{}【】‘；：”“'。，、？]")
        if(productsReg.test(content)) {
          this.errInputMsg = this.$t('setting.text79')
          return false
        }
        // this.productsList.forEach(item => {
        //   if(item.content === '') {
        //     this.errInputMsg = '请输入代理产品'
        //     flag =false
        //     return false
        //   } else if (productsReg.test(item.content)) {
        //     this.errInputMsg = '不允许出现特殊字符'
        //     flag =false
        //     return false
        //   }
        // })
        // this.newProductList.push(content)
        // console.log(this.newProductList)
        if(this.agentProducts !== content){
          let deleteChatbotKnowledgeRequest = {
            chatbot: this.$route.query.uuid,
            product: this.agentProducts
          }
          this.$fetch.post('/chatbotknowledge/',{
            event: 'EVENT_DELETE_PRODUCT',
            deleteChatbotKnowledgeRequest: deleteChatbotKnowledgeRequest
          }).then(res => {
            if(res){
              let product = {}
              let properties = {}
              product.name = content
              product.properties = JSON.stringify(properties)
              let createOrUpdateChatbotProductRequest = {
                chatbot : this.$route.query.uuid,
                product: product
              }
              this.$fetch.post('/chatbotknowledge/', {
                event: 'EVENT_CREATEORUPDATE_PRODUCT',
                createOrUpdateChatbotProductRequest: createOrUpdateChatbotProductRequest
              }).then(res => {
                if(res){
                  this.loadShow = false
                }
              }).catch(err => {
                console.log(err)
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }
    },
    components: {
      vLoading: resolve => require(['@/components/loading.vue'], resolve),
      // vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve)
    }
  }
</script>

<style scoped lang="stylus">
  .charles-w
    height: calc(100vh - 80px);
    .charles-m
      display: flex
      height: 100%
      .left-menu
        width: 320px
        height: 100%
        background-color: #0d1125
        position: fixed
        left: 300px
        top: 80px
        bottom: 0
        .menu-uls
          .menu-list
            height: 68px
            margin: 10px 0
            display: flex
            align-items center
            justify-content space-between
            color #fff
            font-size: 16px
            padding-left: 42px
            cursor pointer
            padding-right: 20px
            &:nth-child(1)
              margin-top: 0
            &.active-list
              color #3376ff
              background-color: #1d243c
            .img-box
              width: 44px
              height: 44px
              border-radius 50%
              background-color: #fff
              display: flex
              align-items center
              justify-content center
              margin-right: 14px
            .icon-m
              width: 24px
      .right-content
        position: absolute
        left: 320px
        right: 0
        @media screen and (max-width: 1400px){
          left: 200px
        }
        .top-cont
          padding: 60px 60px 0 60px;
          width: 100%;
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
            .tab-li{
              /*border-right 1px solid #090d21*/
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
              }
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
            margin 50px 0
            position relative
            .save{
              display flex
              align-items center
              text-align center
              justify-content center
              .loading-m{
                width: 30px
                margin-right: 10px
                display: block
              }
            }
            .err-ms{
              position absolute
              font-size 12px
              color #ff2121
              top -40px
              left 0
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
              position relative
              display flex
              justify-content space-between
              align-items center
              margin-top 30px
              width 100%
              height 50px
              color #090d21
              font-size 16px
              border-radius 4px
              .delete-icon{
                position absolute
                right 20px
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
              background #F2F3F7
              padding  0 30px
              flex 1
              height 100%
              &.input-disable{
                background-color: rgb(235, 235, 228)
                cursor:no-drop
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
              }
              .sel-img{
                top: 50%;
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
                  background: url("../../../assets/img/robotManagement/pull.png") no-repeat;
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
        background url("../../../assets/img/common/close.png")
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
          top: 50%;
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
            background: url("../../../assets/img/robotManagement/pull.png") no-repeat;
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
</style>
