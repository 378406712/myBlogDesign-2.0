<template>
  <div class="grey_bg">
    <Media ref="MediaGallery" />
  </div>
</template>

<script>
import Media from '@/components/media/components/pane'
export default {
  components: { Media },
  mounted() {
    this.$refs.MediaGallery.getMedia()
  }
}
</script>

<style scoped></style>
