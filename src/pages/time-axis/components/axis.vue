<template>
  <div id="content" class="site-content">
    <div id="main">
      <header class="page-header">
        <h1 class="cat-title">时光轴</h1>
        <span class="cat-des"><p>TimeLine</p> </span>
      </header>
      <div id="main-part">
        <article class="art">
          <div class="art-main">
            <div class="art-content">
              <img
                width="150"
                height="150"
                src="/static/image/time-axis-s.jpg"
                class="attachment-post-thumbnail size-post-thumbnail wp-post-image"
              />
             
             
              <div id="archives">
                <p style="text-align: right;">
                  <!-- [<span id="al_expand_collapse" style="cursor: s-resize;"
                    >全部展开/收缩</span
                  >] -->
                </p>
                <div v-for="(item, index) in archive" :key="index">
                  <h3 class="al_year">
                    {{ item.year
                    }}<span id="post-num"
                      >({{ item.monthArr.length }} 篇文章)</span
                    >
                  </h3>
                  <ul class="al_mon_list">
                    <li
                      class="al_li"
                      v-for="(data, index) in item.monthArr"
                      :key="index"
                    >
                      <span class="al_mon" style="cursor: s-resize;"
                        ><span style="color: #0bf;">{{ data.time }}</span>
                      </span>

                      <ul class="al_post_list" style="">
                        <li>
                          <router-link
                            v-html="data.title"
                            :to="{
                              path: '/front/bokepage',
                              query: { essay_id: data._id }
                            }"
                          >
                          </router-link
                          ><span
                            >({{ data.commentData.length }}
                            <svg-icon icon-class="comment" />
                            / <svg-icon icon-class="file" />
                            {{ data.checkCategory[0] }}
                            <span
                              class="fa fa-commenting"
                              aria-hidden="true"
                            ></span
                            >)</span
                          >
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions(['getArchive']),
    getTimeAxis() {
      this.getArchive({
        params: {
          username: this.name,
          sended: true
        }
      }).then((res) => {
        this.sortDate(res)
      })
    },
    sortDate(archive) {
      let ArchiveArr = []
      archive.map((item) => {
        let index = -1
        const year = item.selectDate.substring(0, 4)
        let alreadyExists = ArchiveArr.some((currentValue, i) => {
          if (year === currentValue.year) {
            index = i
            return true
          }
        })
        if (!alreadyExists) {
          let monthArr = []
          monthArr.push(item)
          ArchiveArr.push({
            year: year,
            monthArr: monthArr
          })
        } else {
          ArchiveArr[index].monthArr.push(item)
        }
      })
      this.$store.commit('ARCHIVE', ArchiveArr)
      //   this.sortMonth(ArchiveArr)
    }
  },
  computed: {
    ...mapState({
      archive: (state) => state.archive.archive
    }),
    ...mapGetters(['name'])
  },
  mounted() {
    this.getTimeAxis()
  }
}
</script>

<style scoped>
@import url(../index.scss);
#post-num {
  margin-left: 10px;
  color: #9ed36a;
  font-size: 15px;
}
#status {
  position: absolute;
  left: 160px;
  top: 0;
}
</style>
