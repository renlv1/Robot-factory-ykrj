<template>
  <div class="right-content">
    <div class="top-m">
      <div class="left">
        <img src="../../../assets/img/common/border.png" alt="">
        <span>{{$t('corpus.text17')}}</span>
      </div>
      <div class="right-m">
        <input @change="uploadFile()" ref="uploadFile" type="file" id="uploadFile" />
        <div class="right">
          <img src="../../../assets/img/common/upload.png" alt="">
          <span>{{$t('corpus.text18')}}</span>
        </div>
      </div>
    </div>
    <div class="all-file">{{$t('corpus.text19')}}：{{fileData.length}}</div>
    <ul class="table-header">
      <li>{{$t('corpus.text20')}}</li>
      <li>{{$t('corpus.text21')}}</li>
      <li>{{$t('corpus.text22')}}</li>
      <li>{{$t('corpus.text23')}}</li>
      <li>
        <div class="head-t">{{$t('corpus.text24')}}</div>
      </li>
    </ul>
    <ul class="table-body" v-for="(item, index) in fileData" :key="index">
      <li>{{item.name}}</li>
      <li>{{item.size}} MB</li>
      <li>{{item.state}}</li>
      <li>
        <div class="progress-w">
          <div class="progress-current" :style="{width: progressWidth + '%'}"></div>
        </div>
      </li>
      <li class="btn-ctrl">
        <div class="ctrl-item">
          <img src="../../../assets/img/common/play.png" alt="">
        </div>
        <div class="ctrl-item" @click="deleteFile(index)">
          <img src="../../../assets/img/common/delete.png" alt="">
        </div>
      </li>
    </ul>
    <div class="no-data-w" v-show="fileData.length === 0">
      <div class="img-b">
        <img src="../../../assets/img/common/nodata.png" alt="">
      </div>
      <p>{{$t('corpus.text25')}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/dialog'
  export default {
    data() {
      return {
        progressWidth: 0,
        fileData: []
      }
    },
    methods: {
      beforeAvatarUpload (file) {
        if (!file) return false
        const isLt5M = file.size / 1024 / 1024 < 5
        var f_content = this.$refs.uploadFile.value;
        var fileext=f_content.substring(f_content.lastIndexOf("."),f_content.length)
        fileext = fileext.toLowerCase()
        if (!isLt5M) {
          Dialog({
            content: this.$t('corpus.text26')
          })
          return false
        }
        if (fileext !== '.xls' && fileext !== '.xlsx' && fileext !== '.csv') {
          Dialog({
            content: this.$t('corpus.text27')
          })
          return false
        }
        return true
      },
      deleteFile (index) {
        this.fileData.splice(index, 1)
      },
      // 上传
      uploadFile () {
        let robotId = this.$route.query.uuid
        let file = this.$refs.uploadFile.files[0]
        if (this.beforeAvatarUpload(file)) {
          this.fileData.push({
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(4),
            state: this.$t('corpus.text28')
          })
          let self = this
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onloadend = function () {
            let f = reader.result.split(',')[1]
            self.$fetch.post('/batch', {
              chatbotId: robotId,
              data: f,
              operation: 'BATCH_ADD_ITEMS'
            }).then(res => {
              self.progressWidth = 100
              let msg = ''
              if (res) {
                msg = self.$t('corpus.text29')
              } else {
                msg = self.$t('corpus.text30')
              }
              Dialog({
                content: msg
              })
              self.$refs.uploadFile.value = ''
            })
          }
          this.$refs.uploadFile.value = ''
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .right-content
    padding: 80px 30px 0 60px
    box-sizing content-box
    .top-m
      display: flex
      align-items center
      justify-content space-between
      padding-bottom: 20px
      border-bottom: 1px dashed #ccc
      .left
        font-size: 26px
        color #090d21
        display: flex
        align-items center
        img
          margin-right: 14px
      .right-m
        width: 118px
        height: 38px
        position: relative
        cursor pointer
        overflow: hidden
        #uploadFile
          position: absolute
          left: 0
          top: 0
          opacity: 0
          font-size: 25px;
          cursor: pointer;
          margin-left: -120px;
      .right
        width: 118px
        height: 38px
        display: flex
        align-items center
        justify-content center
        background-color: #3376ff
        color #fff
        border-radius 4px
        img
          margin-right: 6px
    .all-file
      color #3376ff
      font-size: 14px
      margin: 30px 0 50px
    .table-header
      color: #090d21;
      font-size: 16px;
      height: 50px;
      display: flex;
      align-items: center;
      background-color: #f2f3f7;
      border-bottom: 1px solid #e3e4e8;
      padding-left: 40px;
      .head-t
        padding-left: 20px
    .table-body
      padding-left: 40px;
      color: #333;
      font-size: 15px;
      height: 50px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e3e4e8;
      background-color: #fff;
      .btn-ctrl
        display: flex
        align-items center
        cursor pointer
        .ctrl-item
          padding: 0 20px
    li
      flex 1
      .progress-w
        width: 200px
        height: 8px
        position: relative
        border-radius 4px
        background-color: #eaebf0
        .progress-current
          position: absolute
          left: 0
          top: 0
          border-radius 4px
          height: 8px
          background-color: #3376ff
          transition all .3s linear
    .no-data-w
      display: flex
      align-items center
      justify-content center
      flex-direction column
      color #afb3c5
      font-size: 14px
      margin-top: 120px
      .img-b
        width: 70px
        margin-bottom: 10px
        img
          width: 100%
          display: block
</style>
