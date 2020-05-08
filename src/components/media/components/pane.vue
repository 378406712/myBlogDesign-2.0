<template>
  <div class="media-panel">
    <el-tabs v-model="Special_Pic.activeName" type="border-card">
      <el-tab-pane name="uploadDocs">
        <span slot="label"><i class="el-icon-upload"></i> 上传文件</span>
        <el-upload
          action="/api/edit/media"
          multiple
          accept="image/*"
          :limit="1"
          ref="mediaUpload"
          :data="UploadFile.extraData"
          :show-file-list="false"
          :on-progress="handleProgress"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          class="fullUpload"
          drag
        >
          <div class="upload-ui">
            <h2>
              拖文件到任何地方来上传
            </h2>
            <p>或</p>
            <el-button>点击上传</el-button>
          </div>
          <div class="post-upload-ui">
            <p class="max-upload-size">
              只能上传jpg/png等图片文件，且不超过5Mb
            </p>
          </div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane name="mediaStore" class="media-store">
        <span slot="label"><i class="el-icon-camera-solid"></i> 媒体库</span>
        <div class="clearFix media-options">
          <div class="selectDate">
            <el-select
              v-model="select"
              placeholder="全部日期"
              @change="getMedia()"
            >
              <el-option label="全部日期" value="all"></el-option>
              <el-option
                v-for="(item, index) in DateList"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
          <div class="searchPic">
            <el-input
              @input="handleSearch"
              class="searchPic-input"
              placeholder="请输入内容"
              v-model="search"
            ></el-input>
          </div>
        </div>
        <Media v-on="$listeners"  />
        <div class="media-sidebar">
          <div v-if="id">
            <div
              class="media-uploader-status"
              :style="{ display: UploadFile.none ? 'none' : 'block' }"
            >
              <h2>正上传</h2>
              <el-progress
                :percentage="UploadFile.percentage"
                :color="UploadFile.colors"
              ></el-progress>
              <p>{{ detail.media_title }}</p>
            </div>
            <div class="attachment-details save-ready">
              <h2>
                附件详情
                <span class="settings-save-status">
                  <span class="spinner" v-if="spinner"></span>
                  <span class="saved" v-if="saved">已保存。</span>
                </span>
              </h2>

              <div class="attachment-info">
                <div class="thumbnail">
                  <img :src="detail.file" draggable="false" alt="图片缩略" />
                </div>
                <div class="details">
                  <div class="filename">
                    {{ detail.media_title }}
                  </div>
                  <div class="uploaded">
                    {{ detail.date }}
                  </div>
                  <div class="file-size">
                    {{ detail.size }}
                  </div>
                  <div class="dimensions">
                    {{ detail.pic_width }}×{{ detail.pic_height }}像素
                  </div>
                  <a
                    class="edit-attachment"
                    href="https://www.qdmmz.cn/wp-admin/post.php?post=1028&amp;action=edit&amp;image-editor"
                    target="_blank"
                    >编辑图像</a
                  >
                  <button
                    @click="handleRemove"
                    type="button"
                    class="button-link delete-attachment"
                  >
                    永久删除
                  </button>
                </div>
              </div>
            </div>
            <el-form
              ref="detailForm"
              class="pic-form"
              label-position="right"
              label-width="80px"
            >
              <el-form-item label="标题" prop="media_title">
                <el-input
                  @change="handleTitle"
                  v-model="detail.file_name"
                ></el-input>
              </el-form-item>
              <el-form-item label="图片描述" prop="pic_describe">
                <el-input
                  @change="handleDescribe"
                  v-model="detail.description"
                  type="textarea"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="复制链接"
                v-model="detail.file"
                prop="copy_url"
              >
                <el-input v-model="detail.file" disabled></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Media from './media.vue'
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import Extname from '@/utils/extname'
import { Msg, ComfirmMsg } from '@/utils/message'
import JudgeSize from '@/utils/size'
import { SpecialPicData } from '@/helper/const-essay-special'
export default {
  components: { Media },
   data() {
    return {
      ...SpecialPicData,
      select_id: '',
      check_id: ''
    }
  },
  methods: {
     ...mapActions([
      'GetMedia',
      'ChangeDetail',
      'GetDate',
      'SearchMedia',
      'RemoveMedia'
    ]),
    ...mapMutations([
      'MEDIA_DETAIL',
      'MEDIA_ID',
      'SPECIAL_BG',
      'SHOW_DIALOG',
      'CATEGORY_PIC'
    ]),
   
    async getMedia() {
      await this.GetMedia({
        params: { username: this.name, date: this.select }
      })
      await this.GetDate({ params: { username: this.name } })
      this.isSame(this.date)
    },
    //上传文件
    beforeUpload(file) {
      const isLt3M = file.size / 1024 / 1024 < 5
      const _this = this
      if (isLt3M) {
        return new Promise((resolve, reject) => {
          const windowURL = window.URL || window.webkitURL
          const img = new Image()
          img.src = windowURL.createObjectURL(file)
          img.onload = function() {
            _this.UploadFile.extraData.file_name = Extname(file.name)
            _this.UploadFile.extraData.description =
              _this.UploadFile.extraData.description
            _this.UploadFile.extraData.username = _this.name
            _this.UploadFile.extraData.media_title = file.name
            _this.UploadFile.extraData.pic_width = img.width
            _this.UploadFile.extraData.pic_height = img.height
            _this.UploadFile.extraData.media_title = file.name
            _this.UploadFile.extraData.size = JudgeSize(file.size)
            _this.UploadFile.extraData.date = _this
              .$moment()
              .format('YYYY年MM月DD日mm分')
            _this.UploadFile.extraData.selectDate = _this
              .$moment()
              .format('YYYY年MM月')
            resolve()
          }
        })
      } else {
        Msg('上传头像图片大小不能超过 3MB!', 'error')
        return isLt3M
      }
    },
    handleProgress(event, file, fileList) {
      this.Special_Pic.activeName = 'mediaStore'
      this.UploadFile.none = false
      this.UploadFile.percentage = Math.floor(event.percent)
    },
    handleSuccess(response, file, fileList) {
      this.UploadFile.none = true
      this.MEDIA_DETAIL(response[0])
      this.MEDIA_ID(response[0]._id)
      this.getMedia()
      this.$refs.mediaUpload.clearFiles()
    },
    handleDescribe(e) {
      this.ChangeDetail({
        id: this.detail._id,
        description: e,
        identify: 'description'
      }).then(() => {
        this.Spinner()
      })
    },
    handleTitle(e) {
      this.ChangeDetail({
        id: this.detail._id,
        file_name: e,
        identify: 'file_name'
      }).then(() => {
        this.Spinner()
      })
    },
    Spinner() {
      return new Promise(resolve => {
        this.spinner = true
        setTimeout(() => {
          resolve()
        }, 1000)
      }).then(() => {
        this.spinner = false
        this.saved = true
        setTimeout(() => {
          this.saved = false
        }, 1000)
      })
    },
    isSame(date) {
      let array = []
      date.map(item => {
        array.push(item.selectDate)
      })
      this.DateList = Array.from(new Set(array)).reverse()
    },
    handleSearch(item) {
      this.SearchMedia({
        params: {
          username: this.name,
          keywords: item
        }
      })
    },
    handleRemove() {
      ComfirmMsg()
        .then(() => {
          this.RemoveMedia({ username: this.name, _id: this.id }).then(() => {
            if (this.status === 'SUCCESS') {
              this.SPECIAL_BG('')
              return Msg('删除成功', 'success')
            } else if (this.status === 'ERROR') return Msg('删除失败', 'error')
          })
          this.getMedia()
        })
        .catch(() => Msg('已取消删除', 'info'))
    },

    selectId(val) {
      this.select_id = val
    }
  },
  computed: {
    ...mapGetters(['name']),
    ...mapState({
      detail: (state) => state.edit.detail,
      media: (state) => state.edit.media,
      date: (state) => state.edit.date,
      id: (state) => state.edit.id,
      status: (state) => state.edit.status,
      showDialog: (state) => state.edit.showDialog,
      special_bg: (state) => state.edit.special_bg
    })
  }
}
</script>

<style lang="scss" scoped>
@import url('../../../style/attachment-detail.scss');

</style>
