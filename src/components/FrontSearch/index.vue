<template>
  <form action class="js_search search_model">
    <div class="search_inner">
      <div class="micro">
        <svg-icon icon-class="search" />
        <input
          type="seach"
          class="text-input"
          placeholder="想要找点什么呢?"
          required
          v-model.trim="essay"
          @input="toSearch"
        />
      </div>
      <div class="ins-section-wrapper">
        <div class="ins-section-container" id="PostlistBox">
          <section class="ins-section">
            <header class="ins-section-header">文章</header>
            <div
              v-for="(item, index) in SearchEssayList"
              :key="index"
              class="ins-selectable ins-search-item"
            >
              <a :href="'/front/bokepage?essay_id=' + item._id">
                <header>
                  <svg-icon id="document" icon-class="document" />
                  <span v-html="item.title"></span
                  ><svg-icon id="comment" icon-class="comment" />{{
                    item.commentData.length
                  }}
                </header>
                <p v-html="item.essay" class="ins-search-preview"></p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div class="search_close" @click="exitSearch"></div>
  </form>
</template>
<script>
import $ from 'jquery'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      essay: ''
    }
  },
  methods: {
    ...mapActions(['SearchEssayFront']),
    exitSearch() {
      $('.js_search').removeClass('is-visible')
    },
    async toSearch() {
      const keyword = {
        params: {
          username: this.$store.getters.name,
          words: this.essay
        }
      }

      await this.SearchEssayFront(keyword).then((res) => {
        this.Mark(res)
      })
    },
    Mark(essay) {
      if (this.essay === '') {
        this.$store.commit('SEARCH_ESSAY_LIST', essay)
      } else {
        var reg = new RegExp(this.essay, 'gi')
        let arr = []
        essay.map((item) => {
          if (reg.test(item.title)) {
            item.title = item.title.replace(
              reg,
              '<mark class="search-keyword">' + this.essay + '</mark>'
            )
          }
          if (reg.test(item.essay)) {
            item.essay = item.essay.replace(
              reg,
              '<mark class="search-keyword">' + this.essay + '</mark>'
            )
          }
          arr.push(item)
        })
        this.$store.commit('SEARCH_ESSAY_LIST', arr)
      }
    }
  },
  computed: {
    ...mapState({
      SearchEssayList: (state) => state.indexpage.SearchEssayList
    })
  }
}
</script>

<style scoped>
@import url(./index.scss);

</style>
