<template>
  <div class="grey_bg">
    <h2>新增文章</h2>
    <el-row>
      <el-col :span="18">
        <div class="tips">
          <el-input
            placeholder="添加标题"
            @input="changeTitle"
            v-model="title"
          ></el-input>
        </div>
        <el-upload
          id="img-upload"
          action="/api/edit/media"
          accept="image/*"
          :multiple="false"
          :show-file-list="false"
          :on-success="richUploadSuccess"
          :before-upload="beforeUploadEdit"
          style="height: 10px;"
        >
        </el-upload>
        <div id="quill-editor" ref="quill-editor"></div>
        <!-- quill字数统计 -->
        <div class="quill-count">
          <span class="number"
            >{{ richCurrentLength }}/{{ richMaxLength }}</span
          >
        </div>
        <el-divider content-position="left">富文本内容</el-divider>
        <div class="ql-editor" v-html="content"></div>
        <el-divider content-position="center">End</el-divider>
      </el-col>
      <el-col :span="6">
        <EssaySetting
          :disabled="disabled"
          v-on:addCategory="addCategory"
          v-on:toPublish="toPublish"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
//import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import Quill from 'quill'
import ImageResize from 'quill-image-resize-module'
import { ImageDrop } from 'quill-image-drop-module'
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import { Msg, ComfirmMsg } from '@/utils/message'
import EssaySetting from './components/essay-setting'
Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop)

export default {
  components: { EssaySetting },
  // 富文本工具栏配置
  toolbarOptions: [
    [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
    ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
    [{ indent: '-1' }, { indent: '+1' }], // 缩进
    [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
    [{ align: [] }], // 对齐方式
    ['clean'], // 清除字体样式
    ['image']
  ],
  // 自定义富文本的图片上传
  imageFunction(val) {
    if (val) {
      document.querySelector('#img-upload input').click()
    } else {
      this.quill.format('image', false)
    }
  },
  data() {
    return {
      disabled: true,
      title: '',
      // 富文本内容
      quillUpdateImg: false,
      content: '',
      richMaxLength: 800,
      richCurrentLength: 0
    }
  },
  watch: {
    content() {
      // 富文本内容长度
      this.richCurrentLength = this.quill.getLength() - 1
      if (this.richCurrentLength > 0 || this.title) this.disabled = false
      else this.disabled = true
      let numWrapper = document.querySelector('.quill-count')
      if (this.richCurrentLength > this.richMaxLength) {
        numWrapper.style.color = 'red'
      } else {
        numWrapper.style.color = '#666'
      }
    }
  },
  methods: {
    ...mapMutations(['SPECIAL_BG']),
    ...mapActions(['PostEssay', 'SetCategory', 'GetCategory', 'CategoryCount']),
    async addCategory(category) {
      await this.SetCategory(category)
      this.getCategory()
    },
    beforeUploadEdit() {
      this.quillUpdateImg = true
    },
    // 富文本中的图片上传
    richUploadSuccess(response, file, fileList) {
      /**
       *
       * 如果上传成功
       * ps：不同的上传接口，判断是否成功的标志也不一样，需要看后端的返回
       * 通常情况下，应该有返回上传的结果状态（是否上传成功）
       * 以及，图片上传成功后的路径
       * 将路径赋值给 imgUrl
       */
      if (response[0].file) {
        let imgUrl = response[0].file
        // 获取光标所在位置
        let length = this.quill.getSelection().index
        // 插入图片，res为服务器返回的图片链接地址
        this.quill.insertEmbed(length, 'image', imgUrl)
        // 调整光标到最后
        this.quill.setSelection(length + 1)
        this.quillUpdateImg = false
      } else {
        // 提示信息，需引入Message
        this.$message.error('图片插入失败')
      }
    },
    onEditorChange(eventName, ...args) {
      if (eventName === 'text-change') {
        // args[0] will be delta
        // 获取富文本内容
        this.content = document.querySelector(
          '#quill-editor'
        ).children[0].innerHTML
      } else if (eventName === 'selection-change') {
        // args[0] will be old range
      }
    },
    initQuill() {
      const quill = new Quill('#quill-editor', {
        // 编辑器配置选项
        theme: 'snow',
        placeholder: 'Compose an epic...',
        debug: 'error',
        modules: {
          toolbar: {
            container: this.$options.toolbarOptions,
            handlers: {
              // 自定义功能
              image: this.$options.imageFunction
            }
          },
          imageDrop: true,
          imageResize: {
            modules: ['Resize', 'DisplaySize', 'Toolbar'],
            handleStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            toolbarStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            toolbarButtonStyles: {},
            toolbarButtonSvgStyles: {}
          }
        }
      })
      this.quill = quill
      /**
       * 监听富文本变化
       * editor-change 包括 text-change、selection-change
       * 你也可以分别监听 text-change 和 selection-change
       * 文档：https://quilljs.com/docs/api/#text-change
       */
      quill.on('editor-change', this.onEditorChange)
    },
    async toPublish(visiable) {
      const EssayData = {
        ...visiable,
        title: this.title,
        essay: this.content,
        username: this.name
      }
      this.PostEssay(EssayData)
        .then(() => {
          if (this.status === 'SUCCESS') {
            this.CategoryCount(EssayData)
            this.publish = '更新'
            return Msg('发布成功', 'success')
          } else if (this.status === 'ERROR') return Msg('发布失败', 'error')
        })
        .catch(() => Msg('发布失败', 'error'))
    },
    changeTitle(data) {
      if (this.richCurrentLength > 0 || data) this.disabled = false
      else this.disabled = true
    },
    getCategory() {
      this.GetCategory({ params: { username: this.name } })
    },
    unClassify() {
      this.SetCategory({
        username: this.name,
        category: '未分类',
        alias: '未分类',
        desc: '—',
        pic: 'http://localhost:3001/random/2.jpg'
      })
    }
  },
  mounted() {
    this.initQuill()
    this.unClassify()
    this.getCategory()
  },
  computed: {
    ...mapGetters(['name']),
    ...mapState({
      status: state => state.edit.status
    })
  },
  beforeDestroy() {
    this.quill = null
    delete this.quill
  },
  beforeRouteLeave(to, from, next) {
    if (!this.disabled) {
      ComfirmMsg('当前页面数据未保存，确定离开?')
        .then(() => {
          this.SPECIAL_BG('')
          next()
        })
        .catch(() => {
          Msg('已取消删除', 'info')
          next(false)
        })
    } else {
      this.SPECIAL_BG('')
      next()
    }
  }
}
</script>
<style lang="stylus" scoped>
.main-container {
  max-width: 100%;
  min-width: 800px;
  margin: 20px 0 20px 30px;
}
.tips {
  width: 100%;
  padding: 15px 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  // line-height: 2;
}

.font {
  font-size: 18px;
}
#quill-editor {
  /*width: 80%;*/
  height: 300px;
}
/*字数统计*/
.quill-count {
  border: 1px solid #ccc;
  border-top: none;
  height: 30px;
  line-height: 30px;
  text-align: right;
  padding-right: 10px;
  font-size: 14px;
  color: #666;
}
/* 内容返显 */
.ql-editor {
  margin-bottom: 50px;
}
h2{
  margin-top: 0;
}
.grey-bg{
  background:#fff
}
.grey_bg {
  padding: 30px 20px 0px 20px !important;
}
</style>
