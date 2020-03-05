<template>
  <div>
    <el-dialog
      title="title"
      :visible.sync="visible"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <el-form :model="form">
        <el-form-item :label="form.label1" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="form.label2" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      visible: this.show,
      form: {
        name: '',
        label1: 'URL',
        label2: 'COVER'
      },
      formLabelWidth: '80px'
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show() {
      this.visible = this.show
    }
  }
}
</script>
<style lang="stylus" scoped>
      
 /deep/ .el-dialog  {
    width:40%
}
</style>