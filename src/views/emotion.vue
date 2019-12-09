<template>
    <div class="emotion">
      <div class="closeImg" @click="goBack()">
        <img src="../assets/img/newFunction/close.png">
      </div>
      <div class="wrap">
        <div class="function-t">人脸识别</div>
        <div class="bottom-line"></div>
        <div class="function-c">【 分析检测到的人脸 】</div>
        <div class="c-t">AI会自动获取用户的面部表情，肢体语言等信号对用户的人脸和情绪进行自动识别。</div>
        <div class="upload-cont">
          <div class="img-box">
            <ul class="ul-parent">
              <li class="li-child" v-for="(item,index) in imgArr" :key="index" @click="changeFn(item, index)" :class="{active: liActive === index}">
                <img :src="item">
                <div class="delete-box"  @click.stop.prevent="deleteIndex(index)">
                  <div class="delete-icon"><img class="delete" src="../assets/img/newFunction/det.png"></div>
                </div>
              </li>
              <!--              <div  class="upload-box" v-show="isMaxLoading2">-->
              <!--                <input @change="fileChange2()" ref="uploadFile2" accept="image/*" placeholder="" type="file" class="upload_file" id="upload_file2"/>-->
              <!--                <div  class="text"><img class="upload_add" src="../assets/img/newFunction/upload_add.svg" alt=""></div>-->
              <!--              </div>-->
            </ul>
            <div class="btn-box">
              <div class="btn-upload">
                <input @change="uploadImg()" ref="uploadFile" type="file" id="uploadFile" accept="image/*" multiple="multiple" />
                <img width="14" height="14" src="../assets/img/newFunction/upload.png">
                <div class="btn-fn">上传图片</div>
              </div>
              <div class="tips">图片大小不超过3.5M</div>
            </div>
          </div>
          <div class="left-box">
            <div class="upload-img" :class="{activeImg: imgDataObj}">
              <!--          <div class="success-box" v-show="imgDataObj">-->
              <!--            <img src="" alt="" class="success-img" id="imageID">-->
              <!--          </div>-->
              <div class="success-box" v-show="imgDataObj">
                <img :src="imgDataObj" alt="" class="success-img">
              </div>
              <!--              <input @change="uploadImg()" ref="uploadFile" type="file" id="uploadFile" accept="image/*" multiple="multiple" />-->
              <!--              <div class="upload-box" v-show="isMaxLoading">-->
              <!--                <img src="../assets/img/newFunction/add.png" alt="" class="upload-icon">-->
              <!--                <span>上传图片</span>-->
              <!--              </div>-->
              <v-loading v-show="loadingShow"></v-loading>
            </div>
            <a class="btn-download" :href="imgDataObj" download >
              <img width="14" height="14" src="../assets/img/newFunction/download.png">
              <div class="download-fn">下载图片</div>
            </a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Dialog from '@/components/dialog'
    export default {
       data() {
         return{
           liActive: 0,
           isMaxLoading2: true,
           imgArr: [
             require('@/assets/img/emotion/happy.jpg'),
             require('@/assets/img/emotion/surprise.jpg'),
             require('@/assets/img/emotion/fear.jpg'),
             require('@/assets/img/emotion/sad.jpg'),
             require('@/assets/img/emotion/angry.jpg'),
             require('@/assets/img/emotion/neutral.jpg')
           ],
           imgArr2: [
             require('@/assets/img/emotion/0.jpg'),
             require('@/assets/img/emotion/1.jpg'),
             require('@/assets/img/emotion/2.jpg'),
             require('@/assets/img/emotion/3.jpg'),
             require('@/assets/img/emotion/4.jpg'),
             require('@/assets/img/emotion/5.jpg')
           ],
           uploadShow: true,
           imgDataObj: '',
           errInputMsg: '',
           loadingShow: false,
           isMaxLoading: true,
           myfile1: '',
         }
       },
      created () {
        this.imgDataObj = this.imgArr2[0]
      },
      components: {
        vLoading: resolve => require(['@/components/loading.vue'], resolve),
      },
      methods: {
        deleteIndex(index) {
          this.imgArr.splice(index, 1)
          this.imgArr2.splice(index, 1)
          this.imgDataObj = ''
        },
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
          image.src = this.imgDataObj;
        },
        changeFn(item, index) {
          let config = {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': 'EwTdkNBUuS9PqpGHL0YEQ4eJPFpBT4BvaOveNl96'
            }
          }
          this.liActive = index
          let a = item.indexOf(',')
          let f = item.substring(a + 1)
          this.isMaxLoading = false
          this.loadingShow = true
          this.imgDataObj = ''
          if(a > -1) {
            this.$http.post(`${this.$api}facedetection`, {
              encoded_objImg: f,
            },config).then(res => {
              let msg = ''
              if (res.status === 200) {
                let data = res.data.result
                this.loadingShow = false
                this.uploadShow = true
                msg = this.$t('corpus.text30')
                let base = "data:image/png;base64," + data
                this.imgDataObj = base
              } else {
                this.uploadShow = true
                this.isMaxLoading = true
                this.loadingShow = false
                msg = this.$t('corpus.text30')
              }
              Dialog({
                content: msg
              })
            }).catch(err => {
              this.uploadShow = true
              this.isMaxLoading = true
              this.loadingShow = false
              console.log(err)
            })
          } else {
            this.imgDataObj = this.imgArr2[index]
            this.uploadShow = true
            this.isMaxLoading = true
            this.loadingShow = false
          }
        },
        goBack() {
          this.$router.push({
            path: '/aiExploration',
            query: {name: 'a'}
          })
        },
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
          if (this.imgArr.length >= 6) {
            Dialog({
              content:  '最多上传6张'
            })
            return
          }
          let self = this
          let reader = new FileReader()
          reader.readAsDataURL(imgObj)
          reader.onloadend = function () {
            let f = reader.result.split(',')[1]
            let img =  "data:image/png;base64," + f
            self.imgArr.push(img)
            if (self.imgArr.length >= 6) {
              this.isMaxLoading2 = false
            }
            self.$refs.uploadFile.value = ''
          }
        }
      }
    }
</script>

<style scoped lang="stylus">
.emotion{
  padding-bottom 100px
}
.upload-cont{
  display flex
  .left-box{
    border 1px solid #e4e4e4
    padding 20px
    width 450px
    height 700px
    position relative
    .btn-download{
      overflow: hidden
      display: flex;
      align-items: center;
      justify-content: center;
      background-color #3376ff
      color #fff
      cursor pointer
      border-radius 4px
      width 90%
      height 40px
      position absolute
      bottom 30px
      text-align center
      line-height 40px
      img{
        margin-right 10px
      }
    }
  }
  .img-box{
    padding 20px
    margin-right 20px
    width: 408px
    height: 700px
    /*border 1px dashed #ddd*/
    background-color #f6f7fb
    box-sizing border-box
    position relative
    /*overflow hidden*/
    .ul-parent{
      width 100%
      display flex
      flex-wrap wrap
      .li-child{
        position relative
        cursor pointer
        width 180px
        height 160px
        margin-right 8px
        margin-bottom 10px
        img{
          display block
          width 100%
          height 100%
        }
        &:nth-child(2n){
          margin-right 0
        }
        &:nth-child(5){
          margin-bottom 0
        }
        .delete-box{
          display none
          background-color: rgba(0,0,0,0.7);
          z-index: 9;
          position: absolute;
          bottom: 0;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 32px;
          .delete-icon{
            width: 20px;
            height: 20px;
            .delete{
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }
        &.active{
          border 1px solid #3376ff
        }
        &:hover{
          .delete-box{
            display: flex;
          }
        }
      }
      .upload-box{
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position relative
        width 200px
        height 200px
        overflow hidden
        #upload_file2 {
          /*width 100%*/
          /*height 100%*/
          position: absolute
          left: 0
          top: 0
          opacity: 0
          margin-left -900px
          font-size: 200px;
          cursor: pointer;
          .text {
            width: 44px;
            height: 44px;

            .upload_add {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
.upload-img{
  /*margin-right 50px*/
  /*background-color #f6f7fb*/
  /*border 1px solid #ddd*/
  width: 410px
  height: 630px
  position: relative
  cursor pointer
  overflow: hidden
  display flex
  justify-content center
  align-items center
  box-sizing border-box
  &.activeImg{
    background-color #fff
    max-width 410px
    height: 500px
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
  position absolute
  bottom 30px
  /*margin-top 50px*/
  display flex
  justify-content space-between
  align-items center
  .tips{
    color #C1C2C4
    margin-left 20px
  }
  .btn-upload{
    overflow: hidden
    display: flex;
    align-items: center;
    justify-content center
    border 1px solid #3376ff
    background-color #fff
    color #3376ff
    cursor pointer
    border-radius 4px
    width 150px
    height 40px
    position relative
    text-align center
    line-height 40px
    img{
      margin-right 10px
    }
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
