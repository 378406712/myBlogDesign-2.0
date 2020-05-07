<template>
  <div class="card card-large-icons">
    <div class="card-icon bg-primary">
      <span class="svg-container">
        <svg-icon icon-class="skull" />
      </span>
    </div>
    <div class="card-body">
      <h4>删除账号</h4>
      <p>您的所有数据都会被删除，无法找回</p>
      <a class="card-cta" @click="removePass">
        申请删除
        <span class="svg-container">
          <svg-icon icon-class="chevron-right" />
        </span>
      </a>
    </div>
  </div>
</template>
<script>
import { ComfirmMsg, Msg } from '@/utils/message'
export default {
  methods: {
    removePass() {
      ComfirmMsg()
        .then(() => {
          this.$emit('removePass')
        })
        .catch(() => Msg('已取消删除', 'info'))
    }
  }
}
</script>
<style lang="stylus" scoped>
@import url('../../../style/card.css');
</style>
