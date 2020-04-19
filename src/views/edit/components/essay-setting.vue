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
          <el-input
            placeholder="请输入目录查询"
            @input="handleSearch"
            v-model="search"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <el-card class="box-card category">
          <el-checkbox-group
            v-model="Classify_Category.checkCategory"
            v-for="(item, index) in category"
            :key="index"
          >
            <el-checkbox
              :label="item.category"
              :checked="check._id === item._id && check.category !== '未分类'"
            ></el-checkbox>
          </el-checkbox-group>
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
            @click="SHOW_DIALOG(true)"
            type="button"
            class="editor-post-featured-image__toggle"
            v-if="!special_bg"
          >
            设置特色图片
          </button>
          <button
            v-if="special_bg"
            type="button"
            class="components-button editor-post-featured-image__preview"
            aria-label="编辑或更新此图像"
            @click="SHOW_DIALOG(true)"
          >
            <div class="components-responsive-wrapper">
              <div style="padding-bottom: 100%;"></div>
              <img
                :src="special_bg"
                class="components-responsive-wrapper__content"
              />
            </div>
          </button>
          <el-button
            @click="SHOW_DIALOG(true)"
            v-if="special_bg"
            style="margin:10px"
          >
            更换图像</el-button
          ><button
            v-if="special_bg"
            type="button"
            class="components-button is-link is-destructive"
            style="margin:10px"
            @click="changeSpecial"
          >
            取消特色图片
          </button>
        </div>
      </el-collapse-item>
    </el-collapse>
    <SpecialPic />
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
import SpecialPic from './components/special-pic'
import { Msg } from '@/utils/message'
import { EssaySettingData } from '@/helper/const-essay-setting'
export default {
  props: {
    disabled: Boolean
  },
  components: { SpecialPic },
  data() {
    return {
      ...EssaySettingData
    }
  },
  methods: {
    ...mapActions(['SearchCategory']),
    ...mapMutations(['SPECIAL_BG', 'SHOW_DIALOG', 'MEDIA_ID']),
    changeSpecial() {
      this.SPECIAL_BG('')
      this.MEDIA_ID('')
    },
    addCategory() {
      const { createCategory } = this.Classify_Category
      if (createCategory !== '') {
        this.$emit('addCategory', {
          username: this.name,
          category: createCategory,
          alias: createCategory.toLowerCase(),
          desc: '—',
          pic: 'http://localhost:3001/random/1.jpg',
          sum: 0
        })
        this.Classify_Category.createCategory = ''
      } else {
        Msg('目录不能为空', 'error')
      }
    },
    toPublish() {
      let { checkCategory } = this.Classify_Category
      if (!checkCategory.length) {
        checkCategory.push('未分类')
      }
      const { special_bg } = this
      this.$emit('toPublish', {
        ...this.Status_Visible,
        checkCategory: checkCategory,
        special_bg
      })
      this.Classify_Category.checkCategory = []
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
    handleSearch(item) {
      this.SearchCategory({
        params: {
          username: this.name,
          keywords: item
        }
      })
    }
  },
  computed: {
    ...mapGetters(['name']),
    ...mapState({
      category: state => state.edit.category,
      special_bg: state => state.edit.special_bg,
      check: state => state.edit.check
    })
  }
}
</script>
<style lang="stylus" scoped>
@import url('../../../style/attachment-detail.css')
</style>
