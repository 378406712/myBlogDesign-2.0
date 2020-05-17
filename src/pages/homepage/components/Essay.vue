<template>
  <div class="content-area" id="primary">
    <main id="main" class="content-main clearFix">
      <h1 class="main-title">
        <i class="fa fa-envira" aria-hidden="true"></i
        ><svg-icon icon-class="anchor" /> Dirctory
      </h1>
      <article
        v-for="(item, index) in essay"
        :key="index"
        class="post post-list-thumb post-list-show"
        :class="
          index % 2 == 0 ? 'post-list-thumb-left' : 'post-list-thumb-right'
        "
      >
        <div class="post-thumb">
          <a href="#">
            <img class="lazyload" :src="item.special_bg" />
          </a>
        </div>
        <div class="post-content-wrap">
          <div class="post-content">
            <div class="post-date">
              <i class="iconfont icon-time"></i>发布于 {{ item.date }}
            </div>
            <a href="#" class="post-title"
              ><h3>{{ item.title }}</h3></a
            >
            <div class="post-meta">
              <span><i class="iconfont icon-attention"></i>25 热度</span>
              <span class="comments-number"
                ><svg-icon icon-class="comment" /><a href="#">NOTHING</a></span
              >
              <span
                ><svg-icon icon-class="file" /><a href="#">{{
                  item.checkCategory[0]
                }}</a>
              </span>
            </div>
            <div class="float-content">
              <p v-text="item.essay.slice(0, 100).replace(/<[^>]+>/g, '')"></p>

              <div class="post-bottom">
                <a href="#" class="button-normal"
                  ><svg-icon icon-class="more"
                /></a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions(['FrontEssay']),
    async getEssay() {
      await this.FrontEssay({
        params: {
          username: this.name,
          keyword: 'sended'
        }
      })
    }
  },
  computed: {
    ...mapGetters(['name']),
    ...mapState({
      essay: (state) => state.indexpage.FrontEssay
    }),
    time_diff() {}
  },
  mounted() {
    this.getEssay().then(() => {
      console.log(this.essay)
    })
  }
}
</script>

<style lang="scss" scoped></style>
