<template>
  <div class="content-area" id="primary">
    <main id="main" class="content-main clearFix">
      <h1 class="main-title">
        <i class="fa fa-envira" aria-hidden="true"></i
        ><svg-icon icon-class="anchor" /> Dirctory
      </h1>
      <div>
        <article
          v-for="(item, index) in essay"
          :key="index"
          class="post post-list-thumb post-list-show"
          :class="
            index % 2 == 0 ? 'post-list-thumb-left' : 'post-list-thumb-right'
          "
        >
          <div class="post-thumb">
            <router-link
              :to="{ path: '/front/bokepage', query: { essay_id: item._id } }"
            >
              <img
                v-cloak
                v-if="item.special_bg !== ''"
                class="lazyload"
                v-lazy="item.special_bg"
              />
              <img
                v-else
                v-cloak
                class="lazyload"
                v-lazy="
                  'http://localhost:3001/random/' +
                  Math.floor(Math.random() * 8 + 1) +
                  '.jpg'
                "
              />
            </router-link>
          </div>
          <div class="post-content-wrap">
            <div class="post-content">
              <div class="post-date">
                <svg-icon icon-class="time" />发布于 {{ item.date }}
              </div>
              <router-link
                :to="{ path: '/front/bokepage', query: { essay_id: item._id } }"
                class="post-title"
                ><h3>{{ item.title }}</h3></router-link
              >
              <div class="post-meta">
                <span class="comments-number"
                  ><svg-icon icon-class="comment" />
                  <span v-if="item.commentData.length === 0">NOTHING </span>
                  <span v-else class="noticom"
                    >{{ item.commentData.length }} 条评论
                  </span>
                </span>
                <span
                  ><svg-icon icon-class="file" /><a href="#">{{
                    item.checkCategory[0]
                  }}</a>
                </span>
              </div>
              <div class="float-content">
                <p
                  v-text="item.essay.slice(0, 200).replace(/<[^>]+>/g, '')"
                ></p>

                <div class="post-bottom">
                  <router-link
                    :to="{
                      path: '/front/bokepage',
                      query: { essay_id: item._id }
                    }"
                    class="button-normal"
                    ><svg-icon icon-class="more"
                  /></router-link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
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
    this.getEssay()
  }
}
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
@import url(../index.scss);
</style>
