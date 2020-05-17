<template>
  <form action class="js_search search_model">
    <div class="search_inner">
      <div class="micro">
        <p>想要找点什么呢?</p>
        <span class="iconfont icon-search"></span>
        <input type="seach" class="text-input" placeholder="Search" required />
      </div>
    </div>

    <div class="search_close" @click="exitSearch"></div>
  </form>
</template>

<script>
import $ from 'jquery'
export default {
  methods: {
    exitSearch() {
      $('.js_search').removeClass('is-visible')
    }
  }
}
</script>

<style scoped>
@import url(../index.scss);
</style>
