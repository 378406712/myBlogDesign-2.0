<template>
  <div>
    <Media />
  </div>
</template>

<script>
import Media from '@/components/media/index'
export default {
  components: { Media },
  mounted() {
    //  console.log(this.$store.)
    this.$store.commit('SHOW_DIALOG', true)
  }
}
</script>

<style scoped>
.el-dialog__wrapper {
  position: static;
}
.el-dialog__wrapper {
  z-index: 0 !important;

}
.v-modal{
  background-color: transparent!important;

}
</style>
