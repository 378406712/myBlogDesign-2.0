<template>
  <div class="introduction white_bg">
    <canvas></canvas>
    <h1>Hello.</h1>
    <p style="font-weight:500; font-size:2.2em">
      My name is Liu ZW.
    </p>
    <p>
      I am a Grade 4 student of a college, I use
      <a href="https://vuejs.org" target="_blank">Vue.js</a> to rebuild this
      project. The basic project is this
      <a href="https://github.com/Neveryu/vue-cms">One.</a> It is open source
      and published on
      <a href="https://github.com/378406712" target="_blank">GitHub</a>.
    </p>

    <p>
      I have an <a href="https://www.qdmmz.cn" target="_blank">blog</a>
      which I share some experience on it.
    </p>
    <p>
      Now I will show you something about this management.
    </p>
    <p>
      It is a good learning project, including solutions to some common
      problems, such as:
      <a href="http://localhost:8080/rich-editor/quill">rich text</a>, data
      visualization, import and export, custom components,
      <a href="http://localhost:8080/theme/index"> skin changing</a>
      and so on.
    </p>
    <p>I hope that I can make progresses together with <a>you</a>.</p>
  </div>
</template>

<script>
import Belt from '@/utils/color-belt.js'
export default {
  mounted() {
    Belt()
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Rubik:300,500,700');
.white_bg {
  padding: 30px 20px 0px 20px !important;
  background-color: #fff;
}
.introduction {
  font-family: 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: calc(10px + 0.33vw);
  -webkit-font-smoothing: antialiased;
  /* padding: 1vh 2vw; */
  color: #121314;
}
h1 {
  font-size: 4.5em;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0;
}
p {
  font-size: 1.6em;
  font-weight: 300;
  line-height: 1.4;
  max-width: 26em;
  -webkit-user-select: none;
  -moz-user-select: none;
}
a {
  text-decoration: none;
  color: #121314;
  position: relative;
}
a:after {
  content: '';
  position: absolute;
  z-index: -1;
  top: 60%;
  left: -0.1em;
  right: -0.1em;
  bottom: 0;
  transition: top 200ms cubic-bezier(0, 0.8, 0.13, 1);
  background-color: rgba(79, 192, 141, 0.5);
  z-index: 999;
}
a:hover:after {
  top: 0%;
}
canvas {
  position: absolute;
  top: 100px;
  left: -20px;
  z-index: 0;
  width: 102%;
  height: 100%;
  pointer-events: none;
}
</style>
