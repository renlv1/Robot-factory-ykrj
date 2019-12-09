<template>
  <div class="charles-w">
    <div class="right-content">
      <div class="top-cont">
        <ul class="tab-ul">
          <li v-for="(item,index) in  $t('houseToken.tabArr')" :key="index" class="tab-li" @click="changeOne(index)" :class="{active: activeChoose === index}">
            <div class="text">{{item}}</div></li>
        </ul>
<!--        0 -->
        <div class="info" v-show="activeChoose === 0">
          <div class="info">
            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text1')}}</div>
            </div>
            <ul class="input-box">
              <li class="li-one">
                <input type="text" class="input" v-model.trim="productNameM" placeholder="" @input="inputChange">
              </li>
            </ul>
            <div class="err-ms" v-show="errInputMsg001">{{errInputMsg001}}</div>
            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text2')}}</div><div class="add-icon" @click="addName01(1)">+ 添加</div>
            </div>
            <ul class="input-box">
              <li class="li-one" v-for="(item, index) in intrList11" :key="index" ref="inputFoucs01">
                <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName01(1, index)">
                <div class="delete-icon" @click="delIntr01(1, index)" v-show="intrList11.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
              </li>
            </ul>

            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text3')}}</div><div class="add-icon" @click="addName01(2)">+ 添加</div>
            </div>
            <ul class="input-box">
              <li class="li-one" v-for="(item, index) in intrList12" :key="index" ref="inputFoucs02">
                <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName01(2, index)">
                <div class="delete-icon" @click="delIntr01(2, index)" v-show="intrList12.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
              </li>
            </ul>

            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text4')}}</div><div class="add-icon" @click="addName01(3)">+ 添加</div>
            </div>
            <ul class="input-box">
              <li class="li-one" v-for="(item, index) in intrList13" :key="index" ref="inputFoucs03">
                <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName01(3, index)">
                <div class="delete-icon" @click="delIntr01(3, index)" v-show="intrList13.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
              </li>
            </ul>

            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text5')}}</div>
            </div>
            <ul class="input-box">
              <li class="li-one">
                <input type="text" class="input" v-model.trim="website00" placeholder="">
              </li>
            </ul>
          </div>
          <div class="save-btn" @click="btnSave01()" :class="{'loading-btn': loadingBtn}">
            <img src="../../../../assets/img/common/loading.gif" alt="" v-show="loadingBtn">
            <div class="save">{{$t('houseToken.text7')}}</div>
          </div>
        </div>
<!--       1-->
        <div class="info" v-show="activeChoose === 1">
          <div class="info">
            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text8')}}*</div>
            </div>
            <div class="record-type" @click="changeRecord22()">
              <div class="type-box" >
                <div class="fixed-type" >
                  <div class="type">{{freeType22}}</div>
                  <div class="sel-img"><i class="arrowDown" :class="{'active-Img': activeChange22}"></i></div>
                </div>
                <ul class="selectMenu" :class="{'selectMenuActive': activeChange22}" @click.stop>
                  <li v-for="(item, index) in  $t('houseToken.freeArr22')" :key="index" @click="chooseType22(item,index)">{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="err-ms">{{errInputMsg21}}</div>

            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text9')}}*</div>
            </div>
            <div class="input-box">
              <ul class="ul-one">
                <li class="li-one">
                  <input type="text"  v-model.trim="price22" placeholder="" class="input" :disabled="freeIndex22 === 0" :class="{'disable-input': freeIndex22 === 0}">
                </li>
              </ul>
            </div>
            <div class="err-ms">{{errInputMsg22}}</div>

            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text10')}}</div><div class="add-icon" @click="addName22(1)">+ 添加</div>
            </div>
            <ul class="input-box">
              <li class="li-one" v-for="(item, index) in intrList21" :key="index" ref="inputFoucs21">
                <input type="text" class="input" placeholder="" v-model.trim="item.content" :disabled="freeIndex22 === 0" :class="{'disable-input': freeIndex22 === 0}" @keyup.enter="addName22(1, index)">
                <div class="delete-icon" @click="delIntr22(1, index)" v-show="intrList21.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
              </li>
            </ul>

            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text11')}}</div><div class="add-icon" @click="addName22(2)">+ 添加</div>
            </div>
            <ul class="input-box">
              <li class="li-one" v-for="(item, index) in intrList22" :key="index" ref="inputFoucs22">
                <input type="text" class="input" placeholder="" v-model.trim="item.content" :disabled="freeIndex22 === 0" :class="{'disable-input': freeIndex22 === 0}" @keyup.enter="addName22(2, index)">
                <div class="delete-icon" @click="delIntr22(2, index)" v-show="intrList22.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
              </li>
            </ul>

            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text12')}}</div><div class="add-icon" @click="addName22(3)">+ 添加</div>
            </div>
            <ul class="input-box">
              <li class="li-one" v-for="(item, index) in intrList23" :key="index" ref="inputFoucs23">
                <input type="text" class="input" placeholder="" v-model.trim="item.content" :disabled="freeIndex22 === 0" :class="{'disable-input': freeIndex22 === 0}" @keyup.enter="addName22(3, index)">
                <div class="delete-icon" @click="delIntr22(3, index)" v-show="intrList23.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
              </li>
            </ul>

            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text13')}}</div><div class="add-icon" @click="addName22(4)">+ 添加</div>
            </div>
            <ul class="input-box">
              <li class="li-one" v-for="(item, index) in intrList24" :key="index" ref="inputFoucs24">
                <input type="text" class="input" placeholder="" v-model.trim="item.content" :disabled="freeIndex22 === 0" :class="{'disable-input': freeIndex22 === 0}" @keyup.enter="addName22(4, index)">
                <div class="delete-icon" @click="delIntr22(4, index)" v-show="intrList24.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
              </li>
            </ul>
          </div>
          <div class="save-btn save-t" @click="btnSave22()" :class="{'loading-btn': loadingBtn}">
            <img src="../../../../assets/img/common/loading.gif" alt="" v-show="loadingBtn">
            <div class="save">{{$t('houseToken.text7')}}</div>
          </div>
        </div>
<!--        2-->
        <div class="info" v-show="activeChoose === 2">
          <div class="info">
            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text14')}} *</div>
            </div>
            <div class="input-box">
              <div class="li-one">
                <input type="text" class="input" v-model.trim="functionName" placeholder="">
              </div>
            </div>
            <div class="err-ms">{{errInputMsg31}}</div>

            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text15')}}</div><div class="add-icon" @click="addName33(1)">+ 添加</div>
            </div>
            <ul class="input-box">
              <li class="li-one" v-for="(item, index) in intrList31" :key="index" ref="inputFoucs31">
                <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName33(1, index)">
                <div class="delete-icon" @click="delIntr33(1, index)" v-show="intrList31.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
              </li>
            </ul>

            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text16')}}</div><div class="add-icon" @click="addName33(2)">+ 添加</div>
            </div>
            <ul class="input-box">
              <li class="li-one" v-for="(item, index) in intrList32" :key="index" ref="inputFoucs32">
                <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName33(2, index)">
                <div class="delete-icon" @click="delIntr33(2, index)" v-show="intrList32.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
              </li>
            </ul>

            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text17')}}</div><div class="add-icon" @click="addName33(3)">+ 添加</div>
            </div>
            <ul class="input-box">
              <li class="li-one" v-for="(item, index) in intrList33" :key="index" ref="inputFoucs33">
                <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName33(3, index)">
                <div class="delete-icon" @click="delIntr33(3, index)" v-show="intrList33.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
              </li>
            </ul>

            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text18')}}</div><div class="add-icon" @click="addName33(4, index)">+ 添加</div>
            </div>
            <ul class="input-box">
              <li class="li-one" v-for="(item, index) in intrList34" :key="index" ref="inputFoucs34">
                <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName33(4, index)">
                <div class="delete-icon" @click="delIntr33(4, index)" v-show="intrList34.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
              </li>
            </ul>

            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text19')}}</div>
            </div>
            <div class="record-type" @click="changeRecord33()">
              <div class="type-box" >
                <div class="fixed-type" >
                  <div class="type">{{freeType33}}</div>
                  <div class="sel-img"><i class="arrowDown" :class="{'active-Img': activeChange33}"></i></div>
                </div>
                <ul class="selectMenu" :class="{'selectMenuActive': activeChange33}" @click.stop>
                  <li v-for="(item, index) in $t('houseToken.freeArr33')" :key="index" @click="chooseType33(item,index)">{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="err-ms">{{errInputMsg32}}</div>

            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text20')}}</div>
            </div>
            <div class="input-box">
              <ul class="ul-one">
                <li class="li-one">
                  <input type="text"  v-model.trim="price33" placeholder="" class="input" :disabled="freeIndex33 === 0" :class="{'disable-input': freeIndex33 === 0}">
                </li>
              </ul>
            </div>
          </div>
          <div class="save-btn save-t" @click="btnSave33()" :class="{'loading-btn': loadingBtn}">
            <img src="../../../../assets/img/common/loading.gif" alt="" v-show="loadingBtn">
            <div class="save">{{$t('houseToken.text7')}}</div>
          </div>
        </div>
<!--        3-->
        <div class="info" v-show="activeChoose === 3">
          <div class="info">
            <!--      1-->
            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text21')}}</div><div class="add-icon" @click="addName55(1)">+  {{$t('houseToken.text6')}}</div>
            </div>
            <ul class="input-box">
              <li class="li-one" v-for="(item, index) in intrList41" :key="index">
                <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName55(1)">
                <div class="delete-icon" @click="delIntr55(1, index)" v-show="intrList41.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
              </li>
            </ul>
            <!--      2-->
            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text22')}}*</div><div class="add-icon" @click="addName55(2)">+  {{$t('houseToken.text6')}}</div>
            </div>
            <ul class="input-box">
              <li class="li-one" v-for="(item, index) in intrList42" :key="index">
                <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName55(2)">
                <div class="delete-icon" @click="delIntr55(2, index)" v-show="intrList42.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
              </li>
            </ul>
            <div class="err-ms">{{errInputMsg41}}</div>
            <!--      3-->
            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text23')}}</div><div class="add-icon" @click="addName55(3)">+  {{$t('houseToken.text6')}}</div>
            </div>
            <ul class="input-box">
              <li class="li-one" v-for="(item, index) in intrList43" :key="index">
                <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName55(3)">
                <div class="delete-icon" @click="delIntr55(3, index)" v-show="intrList43.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
              </li>
            </ul>
            <!--      4-->
            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text24')}}</div><div class="add-icon" @click="addName55(4)">+  {{$t('houseToken.text6')}}</div>
            </div>
            <ul class="input-box">
              <li class="li-one" v-for="(item, index) in intrList44" :key="index">
                <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName55(4)">
                <div class="delete-icon" @click="delIntr55(4, index)" v-show="intrList44.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
              </li>
            </ul>
            <!--      5-->
            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text25')}}</div><div class="add-icon" @click="addName55(5)">+  {{$t('houseToken.text6')}}</div>
            </div>
            <ul class="input-box">
              <li class="li-one" v-for="(item, index) in intrList45" :key="index">
                <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName55(5)">
                <div class="delete-icon" @click="delIntr55(5, index)" v-show="intrList45.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
              </li>
            </ul>
            <!--     6-->
            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text26')}}</div><div class="add-icon" @click="addName55(6)">+  {{$t('houseToken.text6')}}</div>
            </div>
            <ul class="input-box">
              <li class="li-one" v-for="(item, index) in intrList46" :key="index">
                <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName55(6)">
                <div class="delete-icon" @click="delIntr55(6, index)" v-show="intrList46.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
              </li>
            </ul>
            <!--     7-->
            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text27')}}*</div>
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
              <div class="input-name">{{$t('houseToken.text28')}}</div><div class="add-icon" @click="addName55(8)">+  {{$t('houseToken.text6')}}</div>
            </div>
            <ul class="input-box">
              <li class="li-one" v-for="(item, index) in intrList48" :key="index">
                <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName55(8)">
                <div class="delete-icon" @click="delIntr55(8, index)" v-show="intrList48.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
              </li>
            </ul>
            <!--      9-->
            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text29')}}</div><div class="add-icon" @click="addName55(9)">+  {{$t('houseToken.text6')}}</div>
            </div>
            <ul class="input-box">
              <li class="li-one" v-for="(item, index) in intrList49" :key="index">
                <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName55(9)">
                <div class="delete-icon" @click="delIntr55(9, index)" v-show="intrList49.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
              </li>
            </ul>
            <!--      10-->
            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text30')}}</div><div class="add-icon" @click="addName55(10)">+ {{$t('houseToken.text6')}}</div>
            </div>
            <ul class="input-box">
              <li class="li-one" v-for="(item, index) in intrList410" :key="index">
                <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName55(10)">
                <div class="delete-icon" @click="delIntr55(10, index)" v-show="intrList410.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
              </li>
            </ul>
            <!--      11-->
            <div class="input-title title-one">
              <div class="input-name">{{$t('houseToken.text31')}}</div><div class="add-icon" @click="addName55(11)">+ {{$t('houseToken.text6')}}</div>
            </div>
            <ul class="input-box">
              <li class="li-one" v-for="(item, index) in intrList411" :key="index">
                <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName55(11)">
                <div class="delete-icon" @click="delIntr55(11, index)" v-show="intrList411.length > 1"><img src="../../../../assets/img/common/delete.png"></div>
              </li>
            </ul>
          </div>
          <div class="save-btn save-t" @click="btnSave55()">
            <div class="save">{{$t('houseToken.text7')}}</div>
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
        productNameM: '',
        website00: '',
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
        tabArr: ['基本信息', '购买信息', '功能信息'],
        activeChoose: 0,
        knowledgeData: {},
        // 2
        freeIndex22: -1,
        freeArr22: ['是', '否'],
        freeOrNot22: '',
        activeChange22: false,
        price22: '',
        freeType22: '',
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
        errInputMsg21: '',
        // 3
        functionName: '',
        freeIndex33: -1,
        freeArr33: ['是', '否'],
        freeOrNot33: '',
        activeChange33: false,
        price33: '',
        freeType33: '',
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
        errInputMsg32: '',
        // 4
        freeOrNot55: '',
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
        product_func_intro: [],
        product_func_reason: [],
        how_use_product_function: [],
        how_product_function_work: [],
        product_func_fee_or_not: [],
        product_func_fee: [],
        product_fee: []
      }
    },
    created() {
      this.getInput()
      this.productNameM = this.productName01
    },
    computed: {
      productName01 () {
        return this.$route.query.name2
      }
    },
    methods: {
      inputChange () {
        let reg = /^[\u4e00-\u9fa5\u3001\a-zA-Z0-9_\s]+$/
        if (reg.test(this.productNameM)) {
          this.errInputMsg001 = ''
        } else {
          this.errInputMsg001 = this.$t('houseToken.text32')
        }
      },
      // 获取数据
      getInput () {
        let chatbot = this.$route.query.uuid
        this.website00 = ''
        this.intrList11 =[{content: ""}]
        this.intrList12 = [{content: ""}]
        this.intrList13 = [{content: ""}]
        this.$fetch.post('/chatbotknowledge/', {
          event: 'EVENT_GET_PRODUCT_BY_NAME',
          getChatbotProductRequest: {
            chatbot: chatbot,
            product: this.$route.query.name2
          }
        }).then(res => {
          if (res.getChatbotProductResponse) {
            let knowledgeData = JSON.parse(res.getChatbotProductResponse.chatbotProducts[0].properties)
            if (knowledgeData) {
              // 1
              this.website00 = knowledgeData.product_website
              this.intrList11 = knowledgeData.product_nickname || [{content: ""}]
              this.intrList12 = knowledgeData.product_name_reason || [{content: ""}]
              this.intrList13 = knowledgeData.product_introduction || [{content: ""}]
              // 2
              this.price22 = knowledgeData.product_fee
              this.intrList21 = knowledgeData.product_discount_info || [{content: ""}]
              this.intrList22 = knowledgeData.product_purchase_process || [{content: ""}]
              this.intrList23 = knowledgeData.product_payment_method || [{content: ""}]
              this.intrList24 = knowledgeData.product_after_sales_service || [{content: ""}]
              if (knowledgeData.product_free_or_not === 'yes') {
                this.freeIndex22 = 0
                this.freeType22 = this.$t('houseToken.text33')
              } else if (knowledgeData.product_free_or_not === 'no') {
                this.freeIndex22 = 1
                this.freeType22 = this.$t('houseToken.text34')
              } else {
                this.freeIndex22 = ''
              }
              // 3
              this.product_free_or_not = knowledgeData.product_free_or_not
              if (knowledgeData.product_funcs && knowledgeData.product_funcs.length > 0) {
                let product_funcs = knowledgeData.product_funcs[0]
                this.functionName = product_funcs.product_func_name
                if (JSON.stringify(product_funcs.product_func_intro) !== '[]') {
                  this.intrList31 = product_funcs.product_func_intro
                } else {
                  this.intrList31 = [{content: ""}]
                }
                if (JSON.stringify(product_funcs.product_func_reason) !== '[]') {
                  this.intrList32 = product_funcs.product_func_reason
                } else {
                  this.intrList32 = [{content: ""}]
                }
                if (JSON.stringify(product_funcs.how_use_product_function) !== '[]') {
                  this.intrList33 = product_funcs.how_use_product_function
                } else {
                  this.intrList33 = [{content: ""}]
                }
                if (JSON.stringify(product_funcs.how_product_function_work) !== '[]') {
                  this.intrList34 = product_funcs.how_product_function_work
                } else {
                  this.intrList34 = [{content: ""}]
                }
                let freeOrNot33 = product_funcs.product_func_fee_or_not
                if (freeOrNot33 === 'yes') {
                  this.freeIndex33 = 0
                  this.freeType33 = this.$t('houseToken.text33')
                } else if (freeOrNot33 === 'no') {
                  this.freeIndex33 = 1
                  this.freeType33 = this.$t('houseToken.text34')
                } else {
                  this.freeIndex33 = -1
                }
                this.price33 = product_funcs.product_func_fee
              }
              // 4
              this.intrList41 = knowledgeData.product_overall_advantage || [{content: ""}]
              if (knowledgeData.product_advantage && knowledgeData.product_advantage.length > 0) {
                let product_advantage = knowledgeData.product_advantage[0]
                this.intrList42 = product_advantage.product_advantage_name || [{content: ""}]
                this.intrList43 = product_advantage.product_advantage_description || [{content: ""}]
                this.intrList44 = product_advantage.product_advantage_reason || [{content: ""}]
              }
              if (knowledgeData.product_res_to_ques && knowledgeData.product_res_to_ques.length > 0) {
                let product_res_to_ques = knowledgeData.product_res_to_ques[0]
                this.intrList45 = product_res_to_ques.product_negative_feedback || [{content: ""}]
                this.intrList46 = product_res_to_ques.chatbot_response_to_product_negative_feedback || [{content: ""}]
              }
              if (knowledgeData.product_comparsion_to_others && knowledgeData.product_comparsion_to_others.length > 0) {
                let product_comparsion_to_others = knowledgeData.product_comparsion_to_others[0]
                this.classNamePro = product_comparsion_to_others.other_product_name
                this.intrList48 = product_comparsion_to_others.chatbot_response_to_better_than_other_product || [{content: ""}]
                this.intrList49 = product_comparsion_to_others.chatbot_response_to_how_better_than_other_product || [{content: ""}]
                this.intrList410 = product_comparsion_to_others.chatbot_response_to_better_than_other_product_reason || [{content: ""}]
                this.intrList411 = product_comparsion_to_others.chatbot_response_to_worse_than_other_product || [{content: ""}]
              }
            }
          }
        }).catch(err => {
        })
      },
      // 共同的提交数据
      sendDataM () {
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
          product_fee: this.price22,
          product_discount_info: this.intrList21,
          product_purchase_process: this.intrList22,
          product_payment_method: this.intrList23,
          product_after_sales_service: this.intrList24,
          product_website: this.website00,
          product_nickname: this.intrList11,
          product_name_reason: this.intrList12,
          product_introduction: this.intrList13,
          product_funcs: product_funcs
          // product_overall_advantage: this.intrList41,
          // product_advantage: [{
          //   product_advantage_name: this.intrList42,
          //   product_advantage_description: this.intrList43,
          //   product_advantage_reason: this.intrList44,
          // }],
          // product_res_to_ques: [{
          //   product_negative_feedback: this.intrList45,
          //   chatbot_response_to_product_negative_feedback: this.intrList46
          // }],
          // product_comparsion_to_others: [{
          //   other_product_name: this.classNamePro,
          //   chatbot_response_to_better_than_other_product: this.intrList48,
          //   chatbot_response_to_how_better_than_other_product: this.intrList49,
          //   chatbot_response_to_better_than_other_product_reason: this.intrList410,
          //   chatbot_response_to_worse_than_other_product: this.intrList411,
          // }]
        }
        this.$fetch.post('/chatbotknowledge/', {
          createOrUpdateChatbotProductRequest: {
            chatbot: this.$route.query.uuid,
            product: {
              name: this.productNameM,
              properties: JSON.stringify(properties)
            }
          },
          event: 'EVENT_CREATEORUPDATE_PRODUCT'
        }).then(res => {
          this.loadingBtn = false
          if (res.event){
            Dialog({
              content: this.$t('houseToken.text35')
            })
            this.$router.push({
              path: '/user/knowledge/houseToken',
              query: {
                name2: this.productNameM,
                index: this.$route.query.index,
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
              content: this.$t('houseToken.text36')
            })
          }
        }).catch(err => {
          this.loadingBtn = false
          Dialog({
            content: this.$t('houseToken.text36')
          })
        })
      },
      changeOne(index) {
        this.activeChoose = index
      },
      queryRoute () {
        this.activeChoose = 0
        this.errInputMsg001 = ''
        this.productNameM = this.$route.query.name2
      },
      inputFocus (ref, i) {
        setTimeout(() => {
          console.log(ref)
          if(ref) {
            ref[i+1].getElementsByClassName('input')[0].focus()
          }
        },300)
      },
      // 1 添加
      addName01(type, index) {
        let cope = {
          content: "",
        }
        let ref = ''
        if(type === 1) {
          this.intrList11.push(cope);
          ref = this.$refs.inputFoucs01
        } else if(type === 2) {
          this.intrList12.push(cope);
          ref = this.$refs.inputFoucs02
        } else if(type === 3) {
          this.intrList13.push(cope);
          ref = this.$refs.inputFoucs03
        }
        if (index > -1) this.inputFocus(ref, index)
      },
      // 1 删除
      delIntr01(index, mindex) {
        if (localStorage.getItem('__notTips') && localStorage.getItem('__notTips') === localStorage.getItem('__userEmail__')) {
          if (index === 1)  this.intrList11.splice(mindex, 1);
          if (index === 2)  this.intrList12.splice(mindex, 1);
          if (index === 3)  this.intrList13.splice(mindex, 1);
        } else {
          Dialog2({
            okFn: () => {
              if (index === 1)  this.intrList11.splice(mindex, 1);
              if (index === 2)  this.intrList12.splice(mindex, 1);
              if (index === 3)  this.intrList13.splice(mindex, 1);
            }
          })
        }
      },
      // 1 验证
      verify01() {
        this.errInputMsg001 = ''
        let flag = true
        if (this.productNameM === '') {
          this.errInputMsg001 = this.$t('houseToken.text37')
          flag = false
        }
        let reg = /^[\u4e00-\u9fa5\u3001\a-zA-Z0-9_\s]+$/
        if (!reg.test(this.productNameM)) {
          this.errInputMsg001 = this.$t('houseToken.text32')
          flag = false
        }
        return flag
      },
      // 1保存
      btnSave01() {
        if(this.verify01()) {
          this.loadingBtn = true
          if (this.productNameM !== this.$route.query.name2) {
            this.$fetch.post('/chatbotknowledge/', {
              event: "EVENT_DELETE_PRODUCT",
              deleteChatbotKnowledgeRequest: {
                product: this.$route.query.name2,
                chatbot: this.$route.query.uuid
              }
            }).then(res => {
              if (res.event) {
                this.sendDataM()
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
            this.sendDataM()
          }
        }
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
      addName22(type, index) {
        let cope = {
          content: "",
          key: 1
        }
        let ref = ''
        if(type === 1) {
          this.intrList21.push(cope);
          ref = this.$refs.inputFoucs21
        } else if(type === 2) {
          this.intrList22.push(cope);
          ref = this.$refs.inputFoucs22
        } else if(type === 3) {
          this.intrList23.push(cope);
          ref = this.$refs.inputFoucs23
        } else if(type === 4) {
          this.intrList24.push(cope);
          ref = this.$refs.inputFoucs24
        }
        if (index > -1) this.inputFocus(ref, index)
      },
      // 删除
      delIntr22(index, mindex) {
        if (localStorage.getItem('__notTips') && localStorage.getItem('__notTips') === localStorage.getItem('__userEmail__')) {
          if (index === 1)  this.intrList21.splice(mindex, 1);
          if (index === 2)  this.intrList22.splice(mindex, 1);
          if (index === 3)  this.intrList23.splice(mindex, 1);
          if (index === 4)  this.intrList24.splice(mindex, 1);
        } else {
          Dialog2({
            okFn: () => {
              if (index === 1)  this.intrList21.splice(mindex, 1);
              if (index === 2)  this.intrList22.splice(mindex, 1);
              if (index === 3)  this.intrList23.splice(mindex, 1);
              if (index === 4)  this.intrList24.splice(mindex, 1);
            }
          })
        }
      },
      // 2
      changeRecord22 () {
        this.activeChange22 = true
        this.errInputMsg21 = ''
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
          this.errInputMsg22 = this.$t('houseToken.text38')
          flag = false
        }
        if (this.freeType22 === '') {
          this.errInputMsg21 = this.$t('houseToken.text39')
          flag = false
        }
        return flag
      },
      // 2保存
      btnSave22 () {
        if (this.verify22()) {
          this.loadingBtn = true
          this.sendDataM()
        }
      },
      // 3
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
      // 3添加
      addName33(type, index) {
        let cope = {
          content: "",
          key: 1
        }
        let ref = ''
        if(type === 1) {
          this.intrList31.push(cope);
          ref = this.$refs.inputFoucs31
        } else if(type === 2) {
          this.intrList32.push(cope);
          ref = this.$refs.inputFoucs32
        } else if(type === 3) {
          this.intrList33.push(cope);
          ref = this.$refs.inputFoucs33
        } else if(type === 4) {
          this.intrList34.push(cope);
          ref = this.$refs.inputFoucs34
        }
        if (index > -1) this.inputFocus(ref, index)
      },
      // 3删除
      delIntr33(index, mindex) {
        if (localStorage.getItem('__notTips') && localStorage.getItem('__notTips') === localStorage.getItem('__userEmail__')) {
          if (index === 1)  this.intrList31.splice(mindex, 1);
          if (index === 2)  this.intrList32.splice(mindex, 1);
          if (index === 3)  this.intrList33.splice(mindex, 1);
          if (index === 4)  this.intrList34.splice(mindex, 1);
        } else {
          Dialog2({
            okFn: () => {
              if (index === 1)  this.intrList31.splice(mindex, 1);
              if (index === 2)  this.intrList32.splice(mindex, 1);
              if (index === 3)  this.intrList33.splice(mindex, 1);
              if (index === 4)  this.intrList34.splice(mindex, 1);
            }
          })
        }
      },
      // 3
      changeRecord33 () {
        this.activeChange33 = true
      },
      // 3
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
      // 3
      verify33 () {
        this.errInputMsg31 = ''
        let flag = true
        if (this.functionName === '') {
          this.errInputMsg31 = this.$t('houseToken.text40')
          flag = false
        }
        return flag
      },
      // 3保存
      btnSave33 () {
        if (this.verify33()) {
          this.loadingBtn = true
          this.sendDataM()
        }
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
      delIntr55(index, mindex) {
        if (localStorage.getItem('__notTips') && localStorage.getItem('__notTips') === localStorage.getItem('__userEmail__')) {
          if (index === 1)  this.intrList41.splice(mindex, 1);
          if (index === 2)  this.intrList42.splice(mindex, 1);
          if (index === 3)  this.intrList43.splice(mindex, 1);
          if (index === 4)  this.intrList44.splice(mindex, 1);
          if (index === 5)  this.intrList45.splice(mindex, 1);
          if (index === 6)  this.intrList46.splice(mindex, 1);
          if (index === 8)  this.intrList48.splice(mindex, 1);
          if (index === 9)  this.intrList49.splice(mindex, 1);
          if (index === 10) this.intrList410.splice(mindex, 1);
          if (index === 11) this.intrList410.splice(mindex, 1);
        } else {
          Dialog2({
            okFn: () => {
              if (index === 1)  this.intrList41.splice(mindex, 1);
              if (index === 2)  this.intrList42.splice(mindex, 1);
              if (index === 3)  this.intrList43.splice(mindex, 1);
              if (index === 4)  this.intrList44.splice(mindex, 1);
              if (index === 5)  this.intrList45.splice(mindex, 1);
              if (index === 6)  this.intrList46.splice(mindex, 1);
              if (index === 8)  this.intrList48.splice(mindex, 1);
              if (index === 9)  this.intrList49.splice(mindex, 1);
              if (index === 10) this.intrList410.splice(mindex, 1);
              if (index === 11) this.intrList410.splice(mindex, 1);
            }
          })
        }
      },
      // 4
      verify55 () {
        this.errInputMsg41 = ''
        this.errInputMsg42 = ''
        let flag = true
        this.intrList42.forEach(item => {
          if(item.content === '') {
            this.errInputMsg41 = this.$t('houseToken.text41')
            flag = false
          }
        })
        if (this.classNamePro === '') {
          this.errInputMsg42 = this.$t('houseToken.text42')
        }
        return flag
      },
      // 4保存
      btnSave55 () {
        if (this.verify55()) {
          this.sendDataM()
        }
      }
    },
    watch: {
      '$route': 'queryRoute',
      productName01() {
        this.getInput()
      }
    },
    components: {
    }
  }
</script>

<style scoped lang="stylus">
      .err-ms
        margin-top: 10px
        font-size 12px
        color #ff2121
      .loading-m
        width: 100%
        min-height calc(100vh - 80px)
        position: absolute
        left: 0
        top: 0
        display: flex
        justify-content center
        background-color: rgba(0,0,0,.5)
        img
          margin-top: 350px
          width: 150px
          height: 150px
          display: block
      .type
        height: 100%
        min-width 10px
      .right-content
        .top-cont
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
              /*padding  0 30px*/
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
              position: relative
              .delete-icon{
                cursor pointer
                height: 100%
                position: absolute
                right: 0
                top: 0
                padding: 0 20px
                display: flex
                align-items center
                justify-content center
                img{
                  display block
                  width 17px
                }
              }
            }
            .input{
              flex 1
              height: 100%
              padding  0 30px
              border-radius 4px
              &.disable-input{
                background-color: rgb(235, 235, 228)
                cursor not-allowed
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
                height: 100%;
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
