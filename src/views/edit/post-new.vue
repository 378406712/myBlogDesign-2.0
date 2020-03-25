<template>
  <div class="components-container main-container">
    <h2>新增文章</h2>
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="tips">
          <el-input placeholder="添加标题" v-model="title"></el-input>
        </div>

        <el-upload
          id="img-upload"
          action="/api/edit/post-new"
          :multiple="false"
          :show-file-list="false"
          :on-error="errors"
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
        <div class="tips" style="height:100%">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-button @click="publish" type="primary">发布</el-button>
            <el-collapse-item title="状态与可见性" name="1">
              <div class="units">
                <span>可见性</span>
                <el-popover
                  placement="bottom"
                  title="标题"
                  width="200"
                  trigger="click"
                  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
                >
                  <el-button class="btn-control" slot="reference"
                    >公开</el-button
                  >
                </el-popover>
              </div>
              <div class="units">
                <span>时间</span>
                <el-popover
                  placement="bottom"
                  title="标题"
                  width="200"
                  trigger="click"
                  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
                >
                  <el-button class="btn-control" slot="reference"
                    >公开</el-button
                  >
                </el-popover>
              </div>
              <div class="select">
                <el-checkbox v-model="top">在博客中置顶</el-checkbox>
              </div>
              <div class="select">
                <el-checkbox v-model="recheck">等待复审</el-checkbox>
              </div>
            </el-collapse-item>
            <el-collapse-item title="分类目录" name="2">
              <div>
                <div>搜索分类目录</div>
                <el-input placeholder="请输入内容" v-model="search">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </div>

              <el-card class="box-card category">
                <div v-for="o in 4" :key="o" class="text item">
                  <div class="select">
                    <el-checkbox v-model="top">在博客中置顶</el-checkbox>
                  </div>
                </div>
              </el-card>
              <button
                type="button"
                class="is-link"
                @click="newCategory = !newCategory"
              >
                添加新分类目录
              </button>
              <div v-if="newCategory">
                <div class="editor-post">新分类目录</div>
                <el-input placeholder="请输入内容" v-model="createCategory" />
                <el-button style="marginTop:5px" type="primary">
                  添加新分类目录</el-button
                >
              </div>
            </el-collapse-item>

            <el-collapse-item title="特色图片" name="3">
              <div class="editor-post-featured-image">
                <button
                  type="button"
                  class="editor-post-featured-image__toggle"
                >
                  设置特色图片
                </button>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import Quill from 'quill'
import ImageResize from 'quill-image-resize-module'
import { ImageDrop } from 'quill-image-drop-module'
import { mapActions } from 'vuex'
Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop)

export default {
  // 富文本工具栏配置
  toolbarOptions: [
    [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
    ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
    [{ indent: '-1' }, { indent: '+1' }], // 缩进
    [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
    [{ align: [] }], // 对齐方式
    ['clean'], // 清除字体样式
    ['image'],
    ['custom'] // 添加一个自定义功能
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
      search: '',
      createCategory: '',
      newCategory: false,
      top: '',
      recheck: '',
      activeNames: ['1', '2', '3'],
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
      let numWrapper = document.querySelector('.quill-count')
      if (this.richCurrentLength > this.richMaxLength) {
        numWrapper.style.color = 'red'
      } else {
        numWrapper.style.color = '#666'
      }
    }
  },
  methods: {
    ...mapActions(['setPic']),
    handleChange(val) {
      //console.log(val)
    },

    beforeUploadEdit(file) {
      // const windowURL = window.URL || window.webkitURL
      // const newURL = windowURL.createObjectURL(file)
      // this.quillUpdateImg = true
      // const form = new FormData()
      // form.append('file', file, file.name)
      this.quillUpdateImg = true
      // this.setPic({ url: newURL })
    },
    // 富文本中的图片上传
    richUploadSuccess(response, file, fileList) {
      console.log(response)
      /**
       *
       * 如果上传成功
       * ps：不同的上传接口，判断是否成功的标志也不一样，需要看后端的返回
       * 通常情况下，应该有返回上传的结果状态（是否上传成功）
       * 以及，图片上传成功后的路径
       * 将路径赋值给 imgUrl
       */
      if (response.files.file) {
        let imgUrl = response.files.file
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
    // 初始化自定义的quill工具栏
    // 拿到quill实例以后，在执行自定义toolbar的操作
    initCustomQullToolbar() {
      const timeButton = document.querySelector('.ql-custom')
      timeButton.style.cssText = 'width: 80px; outline: none;'
      timeButton.innerText = '自定义'
    },
    // 给自定义的按钮功能加上方法
    quillCustomFunction() {
      const h = this.$createElement
      this.$notify({
        type: 'success',
        title: '自定义一个quill功能',
        message: h(
          'i',
          { style: 'color: teal' },
          '可不可以让我自定义一个 Quill 的功能？可不可以让我自定义一个 Quill 的功能？'
        )
      })
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
              image: this.$options.imageFunction,
              custom: this.quillCustomFunction
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
      // 拿到quill实例以后，在执行自定义toolbar的操作
      this.initCustomQullToolbar()
      /**
       * 监听富文本变化
       * editor-change 包括 text-change、selection-change
       * 你也可以分别监听 text-change 和 selection-change
       * 文档：https://quilljs.com/docs/api/#text-change
       */
      quill.on('editor-change', this.onEditorChange)
    },
    publish() {
      console.log(this.content)
    },

    errors(data) {
      console.log(data)
    }
  },
  mounted() {
    this.initQuill()
  },
  beforeDestroy() {
    this.quill = null
    delete this.quill
  }
}
</script>

<style lang="stylus" scoped>
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
.main-container {
  max-width: 100%;
  min-width: 800px;
  margin: 20px 0 20px 30px;
}
.tips {
  width: 100%;
  padding: 15px 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  line-height: 2;
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
</style>
