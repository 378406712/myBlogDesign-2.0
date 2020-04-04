<template>
  <ul class="pic-list cleanFix">
    <el-scrollbar class="el_scroll el-media" :native="false">
      <li v-for="o in 36" :key="o" class="attachment save-ready">
        <div class="attachment-preview">
          <div class="thumbnail">
            <div class="centered">
              <img
                src="https://www.qdmmz.cn/wp-content/uploads/2020/03/109951163745497280-300x141.png"
                draggable="false"
                alt=""
              />
            </div>
          </div>
        </div>

        <button type="button" class="check" tabindex="-1">
          <span class="media-modal-icon"></span
          ><span class="screen-reader-text">取消选择</span>
        </button>
      </li>
    </el-scrollbar>
  </ul>
</template>
<script>
export default {}
</script>

<style scoped>
.pic-list {
  position: absolute;
  top: 50px;
  left: -15px;
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
  display: none;
  height: 24px;
  width: 24px;
  padding: 0;
  border: 0;
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  outline: 0;
  background: #eee;
  cursor: pointer;
  box-shadow: 0 0 0 1px #fff, 0 0 0 2px rgba(0, 0, 0, 0.15);
}
.attachment .check .media-modal-icon {
  display: block;
  background-position: -1px 0;
  height: 15px;
  width: 15px;
  margin: 5px;
}
.media-modal-icon {
  background-image: url(http://www.qdmmz.cn/wp-includes/images/uploader-icons.png);
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

.el-media >>> .el-scrollbar__bar.is-vertical {
  margin-top: 6px;
}
</style>
