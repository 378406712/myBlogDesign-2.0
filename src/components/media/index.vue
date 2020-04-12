<template>
  <ul class="pic-list cleanFix">
    <el-scrollbar class="el_scroll el-media" :native="false">
      <li
        v-for="item in media"
        :key="item._id"
        :class="
          id === item._id
            ? 'attachment save-ready details'
            : 'attachment save-ready'
        "
        @click="handleDetail(item._id)"
      >
        <div class="attachment-preview">
          <div class="thumbnail">
            <div class="centered">
              <img :src="item.file" draggable="false" alt="特色图片" />
            </div>
          </div>
        </div>
        <button type="button" :class="id === item._id ? 'check' : 'check none'">
          <span
            @mouseover="minus = !minus"
            @mouseleave="minus = !minus"
            :class="minus ? ' media-modal-icon minus' : 'media-modal-icon'"
          ></span
          ><span class="screen-reader-text">取消选择</span>
        </button>
      </li>
    </el-scrollbar>
  </ul>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      check: '',
      minus: false
    }
  },
  methods: {
    ...mapActions(['MediaDetail']),
    ...mapMutations(['MEDIA_ID']),

    async handleDetail(id) {
      if (this.id === id) {
        this.MEDIA_ID()
        this.check = ''

        return
      } else {
        await this.MediaDetail({ params: { _id: id, username: this.name } })
        this.MEDIA_ID(id)
      }
    }
  },
  computed: {
    ...mapState({
      media: state => state.edit.media,
      id: state => state.edit.id
    }),
    ...mapGetters(['name'])
  }
}
</script>

<style scoped>
.none {
  display: none;
}
.minus {
  background-position: -60px 0 !important;
}
.pic-list {
  position: absolute;
  top: 50px;
  left: -10px;
  right: 300px;
  bottom: 0;
  overflow: auto;
  outline: 0;
  margin: 0;
  padding: 2px 8px 0;
}
.attachment {
  width: 14.28%;
  position: relative;
  float: left;
  padding: 8px;
  margin: 0;
  color: #444;
  cursor: pointer;
  list-style: none;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /* width: 25%; */
  box-sizing: border-box;
}
.attachment-preview {
  position: relative;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(0, 0, 0, 0.05);
  background: #eee;
  cursor: pointer;
}
.attachment-preview:before {
  content: '';
  display: block;
  padding-top: 100%;
}
.attachment .thumbnail {
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 1;
  transition: opacity 0.1s;
}
.attachment .thumbnail .centered {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translate(50%, 50%);
}
.attachment .thumbnail:after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.attachment .thumbnail .centered img {
  position: absolute;
  top: 0;
  left: 0;
  max-height: 100%;
  transform: translate(-50%, -50%);
}
.attachment .check {
  height: 24px;
  width: 24px;
  padding: 0;
  border: 0;
  position: absolute;
  z-index: 10;
  top: 2px;
  right: 1px;
  outline: 0;
  background: #eee;
  cursor: pointer;
  background-color: #0073aa;
  box-shadow: 0 0 0 1px #fff, 0 0 0 2px #0073aa;
}
.attachment .check .media-modal-icon {
  display: block;
  background-position: -21px 0;

  height: 15px;
  width: 15px;
  margin: 5px;
}

.media-modal-icon {
  background-image: url(/static/image/uploader-icons.png);
  background-repeat: no-repeat;
}
.screen-reader-text {
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  -webkit-clip-path: inset(50%);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  word-wrap: normal !important;
}
.details {
  /* box-shadow: inset 0 0 0 3px #fff, inset 0 0 0 7px #0073aa; */
  box-shadow: inset 0 0 2px 3px #fff, inset 0 0 0 7px #5b9dd9;
}

.el-media >>> .el-scrollbar__bar.is-vertical {
  margin-top: 6px;
}
</style>
