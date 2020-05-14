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
      :value.sync="show"
      img-format="png"
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
    }
  },
  events: {
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field) {
      console.log('-------- crop success --------')
      this.imgDataUrl = imgDataUrl
    },
    /**
     * upload success
     *
     * [param] jsonData   server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log('-------- upload success --------')
      console.log(jsonData)
      console.log('field: ' + field)
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log('field: ' + field)
    }
  }
}
</script>

<style></style>
