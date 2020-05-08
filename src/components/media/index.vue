<template>
  <el-dialog
    top="1.5%"
    @open="handleOpen"
    @close="handleClose"
    custom-class="special-bg"
    :visible="showDialog"
    width="95%"
  >
    <div slot="title" class="special-title">
      <span>特色图片</span>
    </div>
    <Pane ref="paneMedia" v-on:selectId="selectId" />
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :disabled="!id" @click="selectSpecial"
        >选 择</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import Pane from './components/pane'
import { mapState, mapMutations } from 'vuex'
import { SpecialPicData } from '@/helper/const-essay-special'
export default {
  props: {
    target: String
  },
  components: { Pane },
  data() {
    return {
      ...SpecialPicData,
      select_id: '',
      check_id: ''
    }
  },
  methods: {
    ...mapMutations([
      'MEDIA_DETAIL',
      'MEDIA_ID',
      'SPECIAL_BG',
      'SHOW_DIALOG',
      'CATEGORY_PIC'
    ]),
    handleOpen() {
      if (this.special_bg.length) {
        this.MEDIA_ID(this.check_id)
      }
      this.$nextTick(() => {
        this.$refs.paneMedia.getMedia()
      })
    },
    handleClose() {
      if (this.special_bg.length === 0 || !this.special_bg.length) {
        this.MEDIA_DETAIL('')
      }
      this.SHOW_DIALOG(false)
      this.search = ''
      this.saved = false
    },

    selectSpecial() {
      if (this.target === 'Essay') {
        this.SPECIAL_BG(this.detail.file)
      }
      if (this.target === 'CategoryForm') {
        this.$emit('PropPic', this.detail.file)
      } else if (this.target === 'DetailForm') {
        this.CATEGORY_PIC(this.detail.file)
      }
      this.SHOW_DIALOG(false)
      this.MEDIA_ID(this.select_id)
      this.check_id = this.select_id
    },
    selectId(val) {
      this.select_id = val
    }
  },
  computed: {
    ...mapState({
      detail: (state) => state.edit.detail,
      id: (state) => state.edit.id,
      showDialog: (state) => state.edit.showDialog,
      special_bg: (state) => state.edit.special_bg
    })
  },
  beforeDestroy() {
    this.MEDIA_ID('')
    this.SHOW_DIALOG(false)
  }
}
</script>
<style scoped>
@import url('../../style/attachment-detail.scss');
</style>
