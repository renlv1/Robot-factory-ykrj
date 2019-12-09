<template>
  <div class="emotion">
    <div class="closeImg" @click="goBack()">
      <img src="../assets/img/newFunction/close.png">
    </div>
    <div class="wrap">
      <div class="function-t">风格转换</div>
      <div class="bottom-line"></div>
      <div class="function-c">【 转换任意风格，修出最美照片 】</div>
      <div class="c-t">AI可以将用户上传的照片文件进行风格的任意转换，帮助用户获取想要的照片风格。</div>
      <div class="style-box">
        <div class="tab-style">
          <ul class="ul-parent" v-show = "tabShow">
            <li v-for="(item ,index) in tabArr" :key="index" class="li-child" @click="changeOne(index)" :class="{active: activeChoose === index}" >{{item}}</li>
          </ul>
          <ul class="ul-parent" v-show = "!tabShow">
            <li v-for="(item ,index) in tabArr2" :key="index" class="li-child li-item" @click="changeOne(index)" :class="{active: activeChoose === index}" >{{item}}</li>
          </ul>
        </div>
        <div class="upload-img" :class="{activeImg: imgOld}" v-if="activeChoose === 0">
          <div class="success-box" v-show="imgOld">
            <img :src="imgOld" alt="" class="success-img">
          </div>
        </div>
        <div class="upload-img" :class="{activeImg: snowImg}" v-else-if="snowImg">
          <!--          <div class="success-box" v-show="imgDataObj">-->
          <!--            <img src="" alt="" class="success-img" id="imageID">-->
          <!--          </div>-->
          <div class="success-box" v-show="snowImg">
            <img :src="snowImg" alt="" class="success-img">
          </div>
          <!--        <v-loading v-show="loadingShow"></v-loading>-->
          <!--                <input @change="uploadImg2()" ref="uploadFile2" type="file" id="uploadFile2" accept="image/*" multiple="multiple" />-->
          <!--                <div class="upload-box" v-show="isMaxLoading">-->
          <!--                  <img src="../assets/img/newFunction/add.png" alt="" class="upload-icon">-->
          <!--                  <span>上传图片</span>-->
          <!--                </div>-->
        </div>
        <div class="upload-img" :class="{activeImg: imgDataObj}" v-else>
          <div class="success-box" v-show="imgDataObj">
            <img :src="imgDataObj" alt="" class="success-img">
          </div>
          <v-loading v-show="loadingShow"></v-loading>
        </div>
        <div class="btn-box">
          <div class="btn-upload">
            <input @change="uploadImg()" ref="uploadFile" type="file" id="uploadFile" accept="image/*" multiple="multiple" />
            <img width="14" height="14" src="../assets/img/newFunction/upload.png">
            <div class="btn-fn">上传图片</div>
          </div>
          <div class="tips">图片大小不超过3.5M</div>
          <a class="btn-download" :href="imgOld" download v-if="activeChoose === 0">
            <img width="14" height="14" src="../assets/img/newFunction/download.png">
            <div class="download-fn">下载图片</div>
          </a>
          <a class="btn-download" :href="snowImg" download v-else-if="snowImg">
            <img width="14" height="14" src="../assets/img/newFunction/download.png">
            <div class="download-fn">下载图片</div>
          </a>
          <a class="btn-download" :href="imgDataObj" download v-else>
            <img width="14" height="14" src="../assets/img/newFunction/download.png">
            <div class="download-fn">下载图片</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {compress, dataURItoBlob} from '@/assets/js/upload'
  import Dialog from '@/components/dialog'
  export default {
    data() {
      return{
        tabShow: true,
        imgOld: require('../assets/img/newFunction/oldImg.jpg'), // 原图
        snowImg: '',
        activeChoose: 0,
        tabArr: ['原图','风格一','风格二','风格三','风格四','风格五','风格六','风格七','风格八','风格九'],
        tabArr2: ['原图','风格一','风格二','风格三','风格四','风格五','风格六','风格七','风格八','风格九','雪山展示图'],
        uploadShow: true,
        imgDataObj: '', // 新图
        errInputMsg: '',
        loadingShow: false,
        isMaxLoading: true,
        myfile1: '',
        wave: '',
        uploadOldImg: '',
        imgLoad: '', // 传给后台的字段
        downloadImg: '',
        flag: 0,
        styleArr: [], // 风格
      }
    },
    created() {
      this.getStyle()
    },
    components: {
      vLoading: resolve => require(['@/components/loading.vue'], resolve),
    },
    methods: {
      downloadIamge() {//下载图片地址和图片名
        var image = new Image();
        // 解决跨域 Canvas 污染问题
        image.setAttribute("crossOrigin", "anonymous");
        image.onload = function() {
          var canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          var context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, image.width, image.height);
          var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

          var a = document.createElement("a"); // 生成一个a元素
          var event = new MouseEvent("click"); // 创建一个单击事件
          a.download = name || "photo"; // 设置图片名称
          a.href = url; // 将生成的URL设置为a.href属性
          a.dispatchEvent(event); // 触发a的单击事件
        };
        let downloadImg
        if(this.activeChoose === 0) {
          downloadImg = this.imgOld
        } else {
          downloadImg = this.imgDataObj
        }
        image.src = downloadImg;
      },
      // 切换风格
      changeOne(index) {
        // if(this.imgOld === '') {
        //   Dialog({
        //     content: '请上传图片'
        //   })
        //   return
        // }
        this.activeChoose = index
        let config = {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'EwTdkNBUuS9PqpGHL0YEQ4eJPFpBT4BvaOveNl96'
          }
        }
        this.snowImg = ''
        this.imgDataObj = ''
        let _uploadImg
        if(this.tabShow) {
          this.imgDataObj =  require(`../assets/img/styleTransfer/style${index}.jpg`)
        } else {
          if(index === 0) {
            this.flag = 0
          } else if (index === 10) {
            this.flag = 1
          }
          if(index !== 10 && index !== 0 ){
            this.imgDataObj =  require(`../assets/img/styleTransfer/style${index}.jpg`)
            _uploadImg = this.imgLoad
          } else {
            this.snowImg = require('../assets/img/newFunction/oldImg.jpg')
          }
        }
        if(this.flag === 0 && !this.tabShow && index !== 0 && index !== 10) {
          // this.activeChoose = index
          this.loadingShow = true
          this.imgDataObj = ''
          this.uploadShow = false
          this.$http.post(`${this.$api}styletransfer`, {
            operation: 'TransferStyle',
            model_name: this.styleArr[index-1].name,
            encoded_objImg: _uploadImg
          },config).then(res => {
            if (res.status === 200) {
              let data = res.data.result
              this.loadingShow = false
              this.uploadShow = true
              let base = "data:image/png;base64," + data
              this.downloadImg = base
              this.imgDataObj = base
            } else {
              this.uploadShow = true
              this.isMaxLoading = true
              this.loadingShow = false
            }
          }).catch(err => {
            console.log(err)
            Dialog({
              content: self.$t('corpus.text29')
            })
          })
        }
      },
      goBack() {
        this.$router.push({
          path: '/aiExploration',
          query: {name: 'a'}
        })
      },
      // 获取风格
      getStyle() {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'EwTdkNBUuS9PqpGHL0YEQ4eJPFpBT4BvaOveNl96'
          }
        }
        this.$http.post(`${this.$api}styletransfer`,{
          operation: 'GetStyles'
        },config).then(res => {
          this.styleArr = res.data.available_styles
        })
      },
      // 上传图片
      uploadImg () {
        let imgVal = this.$refs.uploadFile
        let imgObj = imgVal.files[0]
        if (imgObj) {
          let isLt2M = imgObj.size / 1024 / 1024 <= 3.5
          let isType = /(jpg|png|JPG|PNG|jpeg)$/g.test(imgObj.type)
          if (!isType) {
            Dialog({
              content:  '格式不正确'
            })
            imgVal.value = ''
            return
          }
          if (!isLt2M) {
            Dialog({
              content:  '图片超过3.5M'
            })
            imgVal.value = ''
            return
          }
        } else {
          return
        }
        let self = this
        let reader = new FileReader()
        reader.readAsDataURL(imgObj)
        self.imgOld = ''
        self.activeChoose = 0
        reader.onloadend = function (e) {
          let f = reader.result.split(',')[1]
          self.imgLoad = f
          let base = "data:image/png;base64," + f
          self.downloadImg = base
          self.$refs.uploadFile.value = ''
          let result2 = this.result
          let img2 = new Image()
          img2.src = result2
          img2.onload = function () {
            self.imgUrl = result2
            let data = compress(img2)
            let blob = dataURItoBlob(data)
            let reader2 = new FileReader()
            reader2.readAsArrayBuffer(blob)
            reader2.onloadend = function () {
              let a = new File([this.result], imgObj.name)
              let b = new FileReader()
              b.readAsDataURL(a)
              b.onloadend = function () {
                let a = this.result.split(';')
                let c = this.result.split(',')
                self.imgLoad = c[1]
                self.imgOld = 'data:image/png;' + a[1]
                self.tabShow = false
              }
            }
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .emotion{
    padding-bottom 100px
  }
  .style-box{
    padding 20px
    background-color #fff
    width 930px
    height auto
    border 1px solid #ddd
    display flex
    flex-direction column
    /*align-items center*/
  }
  .tab-style{
    display flex
    border-radius 4px
    height 80px
    margin-bottom 50px
    .ul-parent{
      display flex
      flex-wrap wrap
      .li-child{
        /*width 80px*/
        height 100%
        border-radius 4px
        background-color #f6f7fb
        margin-right 10px
        white-space: nowrap
        padding 0 15px
        display flex
        align-items center
        justify-content center
        cursor pointer
        font-size 16px
        color #666
        &.li-item{
          &:last-child{
            margin 20px 0
          }
        }
        &.active{
          border 1px solid #3376ff
          color #3376ff
        }
        &:last-child{
          margin-right 0
        }
      }
    }
  }

  .upload-img{
    margin  60px auto 0
    background-color #f6f7fb
    border 1px solid #ddd
    width: 800px
    height: 460px
    position: relative
    /*cursor pointer*/
    overflow: hidden
    display flex
    justify-content center
    align-items center
    &.activeImg{
      max-width 400px
      height: auto
      border none
    }
    .success-box{
      width 100%
      .success-img{
        width 100%
      }
    }
    #uploadFile {
      width 100%
      height 100%
      position: absolute
      left: 0
      top: 0
      opacity: 0
      font-size: 20px;
      cursor: pointer;
    }
    .upload-box{
      display flex
      align-items center
      justify-content center
      flex-direction column
      .upload-icon{
        display block
        width 100px
      }
      span{
        display block
        margin-top 32px
        font-size 20px
        color #ccc
      }
    }
  }
  .btn-sure{
    position relative
    cursor pointer
    margin-top 40px
    text-align center
    line-height 40px
    width 400px
    height 40px
    background-color #3376ff
    border-radius 4px
    color #fff
    font-size 16px
    .err-ms{
      position absolute
      font-size 12px
      color #ff2121
      top -40px
      left 0
    }
  }
  .btn-box{
    margin-top 50px
    display flex
    justify-content space-between
    align-items center
    padding 0 20px
    /*width 810px*/
    .tips{
      color #C1C2C4
      margin-left -320px
    }
    img{
      margin-right 10px
    }
    .btn-download{
      overflow: hidden
      display: flex;
      align-items: center;
      justify-content: center;
      background-color #3376ff
      color #fff
      cursor pointer
      border-radius 4px
      width 150px
      height 40px
      position relative
      text-align center
      line-height 40px
    }
    .btn-upload{
      overflow: hidden
      display: flex;
      align-items: center;
      justify-content: center;
      background-color #fff
      color #3376ff
      cursor pointer
      border-radius 4px
      width 150px
      border 1px solid #3376ff
      height 40px
      position relative
      text-align center
      line-height 40px
      #uploadFile {
        font-size 30px
        position: absolute;
        top: 0;
        left: 0;
        margin-left -135px
        /*width: 100%*/
        /*height: 100%*/
        display: block;
        cursor: pointer;
        opacity: 0;
      }
    }
  }
</style>
