<template>
  <div class="tips" style="height:100%">
    <el-collapse v-model="activeNames">
      <el-button :disabled="disabled" @click="toPublish" type="primary">{{
        publish
      }}</el-button>
      <el-collapse-item title="状态与可见性" name="1">
        <div class="units">
          <span>可见性</span>
          <el-popover
            width="250.25"
            placement="bottom"
            title="文章可见性"
            trigger="click"
          >
            <div v-for="(item, i) in Status_Visible.visible" :key="i">
              <el-radio
                @change="VisibleChange"
                v-model="Status_Visible.radioVisible"
                :label="item.status"
              >
                {{ item.title }}</el-radio
              >
              <p class="visible-info">
                {{ item.info }}
              </p>
            </div>
            <div>
              <el-input
                v-model="Status_Visible.essayPassword"
                v-if="Status_Visible.showPass"
                type="password"
                show-password
                placeholder="使用安全的密码"
                suffix-icon="el-icon-lock"
              ></el-input>
            </div>

            <el-button class="is-link" slot="reference">{{
              Status_Visible.showVisible
            }}</el-button>
          </el-popover>
        </div>
        <div class="select">
          <el-checkbox v-model="Status_Visible.keepTop"
            >在博客中置顶</el-checkbox
          >
        </div>
        <div class="select">
          <el-checkbox v-model="Status_Visible.reCheck">等待复审</el-checkbox>
        </div>
      </el-collapse-item>
      <el-collapse-item title="分类目录" name="2">
        <div>
          <div>搜索分类目录</div>
          <el-input placeholder="请输入内容" v-model="search">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <el-card v-if="category.length" class="box-card category">
          <div v-for="(item, index) in category" :key="index" class="select">
            <el-checkbox-group v-model="Classify_Category.checkCategory">
              <el-checkbox :label="item.category"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-card>
        <button
          type="button"
          class="is-link"
          @click="
            Classify_Category.newCategory = !Classify_Category.newCategory
          "
        >
          添加新分类目录
        </button>
        <div v-if="Classify_Category.newCategory">
          <div class="editor-post">新分类目录</div>
          <el-input
            placeholder="请输入内容"
            v-model="Classify_Category.createCategory"
          />
          <el-button style="marginTop:5px" @click="addCategory" type="primary">
            添加新分类目录</el-button
          >
        </div>
      </el-collapse-item>

      <el-collapse-item title="特色图片" name="3">
        <div class="editor-post-featured-image">
          <button
            @click="Special_Pic.showDialog = true"
            type="button"
            class="editor-post-featured-image__toggle"
          >
            设置特色图片
          </button>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-dialog
      top="3%"
      @open="handleOpen"
      @close="handleClose"
      custom-class="special-bg"
      :visible.sync="Special_Pic.showDialog"
      width="95%"
    >
      <div slot="title" class="special-title">
        <span>特色图片</span>
      </div>
      <el-tabs v-model="Special_Pic.activeName" type="border-card">
        <el-tab-pane name="uploadDocs">
          <span slot="label"><i class="el-icon-upload"></i> 上传文件</span>

          <div class="upload-ui">
            <h2>
              拖文件到任何地方来上传
            </h2>
            <p>或</p>
            <el-upload
              action="/api/edit/media"
              multiple
              :limit="1"
              ref="mediaUpload"
              :data="UploadFile.extraData"
              :show-file-list="false"
              :on-progress="handleProgress"
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
            >
              <el-button>点击上传</el-button>
            </el-upload>
          </div>
          <div class="post-upload-ui">
            <p class="max-upload-size">
              只能上传jpg/png文件，且不超过500kb
            </p>
          </div>
        </el-tab-pane>
        <el-tab-pane name="mediaStore" class="media-store">
          <span slot="label"><i class="el-icon-camera-solid"></i> 媒体库</span>
          <div class="clearFix media-options">
            <div class="selectDate">
              <el-select placeholder="请选择">
                <el-option> </el-option>
              </el-select>
            </div>
            <div class="searchPic">
              <el-input
                class="searchPic-input"
                placeholder="请输入内容"
              ></el-input>
            </div>
          </div>
          <Media />
          <div class="media-sidebar">
            <div v-if="detail.file">
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
                    <button type="button" class="button-link delete-attachment">
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
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false"
          >选 择</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import Media from '@/components/media'
import Extname from '@/utils/extname'
export default {
  props: {
    disabled: Boolean
  },
  components: { Media },
  data() {
    return {
      spinner: false,
      saved: false,
      /**
       * @enum
       * @param {Boolean} showPass 显示密码保护框
       * @param {String} essayPassword 密码保护框双向绑定
       * @param {String} radioVisible 传给后台判断的文章状态(公开/私密/密码保护)
       * @param {String} showVisible 可见性按钮文字
       * @param {Boolean} keepTop 是否置顶
       * @param {Boolean} reCheck 等待复审（存入草稿）
       * @param {Array} visible v-for的可见性数据
       */
      Status_Visible: {
        showPass: false,
        essayPassword: '',
        radioVisible: 'public',
        showVisible: '公开',
        keepTop: '',
        reCheck: '',
        visible: [
          { status: 'public', info: '所有人可见。', title: '公开' },
          {
            status: 'private',
            info: '只有站点管理员和编辑可见。',
            title: '私密'
          },
          {
            status: 'protect',
            info: '受您选择的密码保护，只有持有密码的人士可查看此文章。',
            title: '密码保护'
          }
        ]
      },
      /**
       * @enum
       * @param {String} createCategory 输入框中填的目录
       * @param {Boolean} newCategory 显示新增分类输入框
       */
      Classify_Category: {
        createCategory: '',
        newCategory: false,
        checkCategory: []
      },
      /**
       * @enum
       * @param {Boolean} showDialog 显示特色图片dialog
       * @param {Boolean} activeName 初始显示的标签页
       */
      Special_Pic: {
        showDialog: false,
        activeName: 'uploadDocs'
      },
      /**
       * @enum
       * @param {Number} percentage 进度条数字
       * @param {Boolean} none 是否显示进度条内容
       * @param {String}  media_title 标题
       * @param {String} size 大小
       * @param {Number} pic_width 宽度
       * @param {Number} pic_height 高度
       * @param {String} date 日期
       */
      UploadFile: {
        percentage: 0,
        none: true,
        src: '',
        showDetail: '',
        extraData: {
          media_title: '',
          size: '',
          date: '',
          pic_width: '',
          pic_height: '',
          file_name: '',
          description: ''
        },
        colors: [
          { color: '#f56c6c', percentage: 20 },
          { color: '#e6a23c', percentage: 40 },
          { color: '#5cb87a', percentage: 60 },
          { color: '#1989fa', percentage: 80 },
          { color: '#6f7ad3', percentage: 100 }
        ]
      },
      publish: '发布',
      search: '',
      activeNames: ['1', '2', '3']
    }
  },
  methods: {
    ...mapActions(['GetMedia', 'ChangeDetail']),
    ...mapMutations(['MEDIA_DETAIL']),

    addCategory() {
      this.$emit('addCategory', {
        username: this.name,
        category: this.Classify_Category.createCategory
      })
      this.Classify_Category.createCategory = ''
    },
    toPublish() {
      const {
        radioVisible,
        essayPassword,
        keepTop,
        reCheck
      } = this.Status_Visible
      const { checkCategory } = this.Classify_Category
      this.$emit('toPublish', {
        radioVisible,
        essayPassword,
        keepTop,
        reCheck,
        checkCategory
      })
    },
    VisibleChange(data) {
      switch (data) {
        case 'public':
          this.Status_Visible.showVisible = '公开'
          this.Status_Visible.showPass = false
          break
        case 'private':
          this.Status_Visible.showVisible = '私密'
          this.Status_Visible.showPass = false
          break
        case 'protect':
          this.Status_Visible.showVisible = '密码保护'
          this.Status_Visible.showPass = true
          break
      }
    },
    handleOpen() {
      this.getMedia()
    },
    handleClose() {
      this.detail.file = ''
      this.saved = false
    },
    getMedia() {
      this.GetMedia({ params: { username: this.name } })
    },
    //上传文件
    beforeUpload(file) {
      const _this = this
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
          _this.UploadFile.extraData.size =
            Math.round((100 * file.size) / 1024 / 1024) / 100 + 'MB'
          _this.UploadFile.extraData.date = _this
            .$moment()
            .format('YYYY年MM月DD日mm分')
          resolve()
        }
      })
    },
    handleProgress(event, file, fileList) {
      this.Special_Pic.activeName = 'mediaStore'
      this.UploadFile.none = false
      this.UploadFile.percentage = Math.floor(event.percent)
    },
    handleSuccess(response, file, fileList) {
      this.UploadFile.none = true
      // this.detail.file = response[0].file
      this.MEDIA_DETAIL(response[0])
      this.$refs.mediaUpload.clearFiles()
      this.getMedia()
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
    }
  },
  computed: {
    ...mapGetters(['name']),
    ...mapState({
      category: state => state.edit.category,
      detail: state => state.edit.detail
    })
  },

  filters: {
    filterCategory(value) {}
  }
}
</script>

<style lang="stylus" scoped>
//附件详情
@import url('../../../style/attachment-detail.css');
.pic-form{
padding-right:10px
}
//媒体库
.media-sidebar {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 300px;
    padding: 0 16px 0;
    z-index: 75;
    background: #f3f3f3;
    border: 1px solid #ddd;

    overflow: auto;
}
.selectDate{
  float left
}
 .searchPic{
    max-width: 33%;
      float right

 }
 .media-store{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
 }
 .media-options{
   position: absolute;
    top: 0;
    left: -15px;
    right: 300px;
    z-index: 100;
    height: 60px;
    padding: 0 16px;
    border: 0 solid #ddd;
    overflow: hidden
}


//上传文件
.none{
  display:none
}
.max-upload-size,.upload-ui{
   text-align center;
}
.upload-ui{
  margin-top 10%
}
.special-title{
    font-size: 22px;
}
>>>.el-collapse {
  border-top: 0px
}
>>> .el-tabs__content{
  height 420px
}
>>> .el-dialog__body {
    padding: 0px 20px;}
>>>   .el-dialog__header {
    padding: 0 0 20px 20px
}
>>> .el-popover{
  right:100%!important
}
>>> .el-popover__title{
 font-weight 600
 font-size 13px
}
>>> .el-radio__label{
  font-weight 600
  font-size 13px
}
.visible-info{
  margin-top: 0;
  margin-left: 27px
}
.editor-post-featured-image__toggle {
  width:100%;
    border: 1px dashed #a2aab2;
    background-color: #edeff0;
    line-height: 20px;
    padding: 8px 0;
    text-align: center;
}
.editor-post-featured-image__toggle:hover{
    background-color: #f8f9f9;
}
.editor-post{
      margin-top: 12px;
}
.is-link{
      margin: 0;
    padding: 0;
    box-shadow: none;
    border: 0;
    border-radius: 0;
    background: none;
    outline: none;
    text-align: left;
    color: #0073aa;
    text-decoration: underline;
    transition-property: border,background,color;
    transition-duration: .05s;
    transition-timing-function: ease-in-out;
}
.is-link:hover{
    color: #00a0d2;
}
.category{
  margin-top 10px
  margin-bottom:10px
}
.select{
  margin-top:5px
}
.units{
 display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top 5px
}
>>> .el-collapse-item__header{
  font-weight: bold;
}
</style>
