<template>
  <div>
    <my-upload
      field="img"
      :width="300"
      :height="300"
      url="/api/account/setAvatar"
      :params="params"
      :headers="headers"
      lang-type="zh"
      v-model="show"
      img-format="png"
      @crop-upload-success="cropUploadSuccess"
    ></my-upload>
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload'

export default {
  props: { params: { type: Object } },
  data() {
    return {
      show: false,
      headers: {
        smail: '*_~'
      },
      imgDataUrl: '' // the datebase64 url of created image
    }
  },
  components: {
    'my-upload': myUpload
  },
  methods: {
    toggleShow() {
      this.show = !this.show
    },
    cropUploadSuccess(data) {
      this.$store.commit('SET_DETAIL', data)
      this.$store.commit('SET_AVATAR', data.url)
    }
  }
}
</script>

<style></style>
