<template>
  <div class="components-container main-container">
    <h2>新增文章</h2>
    <el-row :gutter="20">
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
          action="/api/edit/essayPic"
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
                  <div v-for="(item, i) in visible" :key="i">
                    <el-radio
                      @change="VisibleChange"
                      v-model="radioVisible"
                      :label="item.status"
                    >
                      {{ item.title }}</el-radio
                    >
                    <p class="visible-info">
                      {{ item.info }}
                    </p>
                  </div>
                  <el-button class="btn-control" slot="reference">{{
                    showVisible
                  }}</el-button>
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
                <div v-for="o in 1" :key="o" class="text item">
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
import { mapActions, mapGetters, mapState } from 'vuex'
import { ComfirmMsg, Msg } from '@/utils/message'
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
      // 可见性
      disabled: true,
      publish: '发布',
      radioVisible: 'public',
      showVisible: '公开',
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
      ],
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
    ...mapActions(['PostEssay']),

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
      if (response.file) {
        let imgUrl = response.file
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
    toPublish() {
      const EssayData = {
        visiable: this.radioVisible,
        title: this.title,
        essay: this.content,
        username: this.name
      }
      this.PostEssay(EssayData)
        .then(() => {
          if (this.status === 'SUCCESS') {
            this.publish = '更新'
            return Msg('发布成功', 'success')
          } else if (this.status === 'ERROR') return Msg('发布失败', 'error')
        })
        .catch(() => Msg('发布失败', 'error'))
    },
    VisibleChange(data) {
      switch (data) {
        case 'public':
          this.showVisible = '公开'
          break
        case 'private':
          ComfirmMsg('您希望现在私密地发布此文章吗？').then(
            () => (this.showVisible = '私密')
          )
          break
        case 'protect':
          this.showVisible = '密码保护'
          break
      }
    },
    changeTitle(data) {
      if (this.richCurrentLength > 0 || data) this.disabled = false
      else this.disabled = true
    }
  },
  mounted() {
    this.initQuill()
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
  }
}
</script>

<style lang="stylus" scoped>
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
