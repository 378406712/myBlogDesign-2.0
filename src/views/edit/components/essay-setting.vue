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
      custom-class="special-bg"
      :visible.sync="Special_Pic.showDialog"
      width="95%"
    >
      <div slot="title" class="special-title">
        <span>特色图片</span>
      </div>
      <el-tabs
        v-model="Special_Pic.activeName"
        type="border-card"
        @tab-click="handleClick"
      >
        <el-tab-pane name="uploadDocs">
          <span slot="label"><i class="el-icon-upload"></i> 上传文件</span>

          <div class="upload-ui">
            <h2 class="upload-instructions drop-instructions">
              拖文件到任何地方来上传
            </h2>
            <p class="upload-instructions drop-instructions">或</p>
            <button
              type="button"
              class="browser button button-hero"
              style="display: inline-block; position: relative; z-index: 1;"
            >
              选择文件
            </button>
          </div>
        </el-tab-pane>
        <el-tab-pane name="mediaStore">
          <span slot="label"><i class="el-icon-camera-solid"></i> 媒体库</span
          >媒体库</el-tab-pane
        >
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
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  props: {
    disabled: Boolean
  },
  data() {
    return {
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
      Special_Pic: {
        showDialog: false,
        activeName: 'uploadDocs'
      },
      publish: '发布',
      search: '',

      activeNames: ['1', '2', '3']
    }
  },
  methods: {
    ...mapActions(['SetCategory']),

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
    }
  },
  computed: {
    ...mapGetters(['name']),
    ...mapState({
      category: state => state.edit.category
    })
  },

  filters: {
    filterCategory(value) {}
  }
}
</script>

<style lang="stylus" scoped>
.upload-ui{
  text-align center;
  margin-top 11%
}
.special-title{
    font-size: 22px;
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
