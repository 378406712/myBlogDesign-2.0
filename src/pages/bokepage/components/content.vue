<template>
  <div>
    <div id="content" class="site-content">
      <div id="primary" class="content-area">
        <main id="main" class="site-main" role="main">
          <article id="article" class="hentry">
            <header
              v-if="boke_essay_this.special_bg === ''"
              class="entry-header"
            >
              <h1 class="entry-title">{{ boke_essay_this.title }}</h1>
              <p class="entry-census">发布于 {{ boke_essay_this.date }}</p>
              <hr />
            </header>
            <!--essay内容  -->
            <div class="entry-content" v-html="boke_essay_this.essay"></div>
          </article>
          <footer class="post-footer">
            <div id="pagination">
              <svg-icon icon-class="thank" /> <span>{{ over_tag }}</span>
            </div>
          </footer>
          <section class="post-squares nextprev">
            <div class="post-nepre half previous" v-if="boke_essay_previous">
              <a href="javascript:;"
                ><div
                  v-if="
                    boke_essay_previous && boke_essay_previous.special_bg !== ''
                  "
                  class="background lazyload"
                  :style="{
                    backgroundImage:
                      'url(' + boke_essay_previous.special_bg + ')'
                  }"
                ></div>
                <div
                  v-else
                  class="background lazyload"
                  :style="{
                    backgroundImage:
                      'url(http://localhost:3001/random/' +
                      Math.floor(Math.random() * 8 + 1) +
                      '.jpg)'
                  }"
                ></div>
                <span class="label">{{ previous }}</span>
                <div class="info">
                  <h3>{{ boke_essay_previous.title }}</h3>
                  <hr /></div
              ></a>
            </div>
            <div v-if="boke_essay_next" class="post-nepre half next">
              <a href="javascript:;"
                ><div
                  v-if="boke_essay_next.special_bg !== ''"
                  class="background lazyload"
                  :style="{
                    backgroundImage: 'url(' + boke_essay_next.special_bg + ')'
                  }"
                ></div>
                <div
                  v-else
                  class="background lazyload"
                  :style="{
                    backgroundImage:
                      'url(http://localhost:3001/random/' +
                      Math.floor(Math.random() * 8 + 1) +
                      '.jpg)'
                  }"
                ></div>
                <span class="label">{{ next }}</span>
                <div class="info">
                  <h3>{{ boke_essay_next.title }}</h3>
                  <hr /></div
              ></a>
            </div>
          </section>
          <section class="author-profile">
            <div class="info">
              <a href="javascripe:;" class="profile"
                ><img
                  src="http://q1.qlogo.cn/g?b=qq&nk=378406712&s=640"
                  height="70"
                  width="70"
              /></a>
              <div class="meta">
                <span class="title">Author</span>
                <h3 itemprop="name">
                  <a v-if="boke_essay_this.nickname" href="javascripe:;">{{
                    boke_essay_this.nickname
                  }}</a>
                  <a v-else href="javascripe:;">{{ name }}</a>
                </h3>
              </div>
            </div>
            <hr />
            <p><svg-icon icon-class="write" />爬。</p>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      over_tag: '很高兴你看完了...',
      previous: 'Previous Post',
      next: 'Next Post'
    }
  },
  computed: {
    ...mapState({
      boke_essay_this: (state) => state.bokepage.boke_essay_this,
      boke_essay_previous: (state) => state.bokepage.boke_essay_previous,
      boke_essay_next: (state) => state.bokepage.boke_essay_next
    }),
    ...mapGetters(['name', 'avatar'])
  },
  updated() {
    $(function () {
      $('.ql-syntax').addClass('highlight-wrap')
    })
    if (this.boke_essay_next && this.boke_essay_previous) {
      $('.post-squares .half').css('width', '50%')
    } else {
      $('.post-squares .half').css('width', '100%')
    }
  }
}
</script>
<style lang="scss" scoped>
#content {
  animation: main 1s;
}
.site-content {
  max-width: 800px;
  padding: 0 10px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(255, 255, 255, 0.8);
}
.site-header:before {
  content: '';
  display: table;
  table-layout: fixed;
}

.site-main {
  padding: 40px 0 0;
}
.hentry {
  margin: 0 0 1.5em;
}
article {
  display: block;
}
.entry-content {
  position: relative;
}
.entry-content h3,
.entry-content h4,
.entry-content h5 {
  padding-left: 16px;
}

.entry-content p {
  line-height: 30px;
}
.entry-content p {
  color: #797979;
}
.entry-content ul {
  list-style: disc;
  border: 1px dashed #e4e4e4;
  padding: 15px 10px 15px 50px;
  color: #616161;
  margin-left: 0;
  border-radius: 10px;
}

.clear:after,
.comment-content:after,
.entry-content:after,
.site-content:after,
.site-footer:after,
.site-header:after {
  clear: both;
}

.post-squares {
  overflow: hidden;
  width: 100%;
  margin: 55px 0;
  background: #000;
}
.post-squares.nextprev .previous {
  text-align: left;
}
.post-squares .half {
  width: 50%;
  float: left;
}
.post-squares.nextprev a {
  width: 100%;
}
.post-squares .background {
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  background-size: cover;
  -webkit-transition: opacity 0.15s ease-out;
  -moz-transition: opacity 0.15s ease-out;
  transition: opacity 0.15s ease-out;
}
.post-squares.nextprev .previous .label {
  top: 40px;
  left: 40px;
}
.post-squares.nextprev .label {
  position: absolute;
  z-index: 100;
}
.post-squares .label {
  font-size: 13px;
  display: block;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}
.post-squares.nextprev .previous .info {
  bottom: 40px;
  left: 40px;
}
.post-squares.nextprev .info {
  position: absolute;
  width: 70%;
}
.post-squares .info {
  z-index: 98;
}
.post-squares h3 {
  font-size: 14px;
  font-weight: 400;
  line-height: 30px;
  margin: 20px 0;
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}
.post-squares.nextprev .previous hr {
  float: left;
  margin: 0;
}
.post-squares hr {
  width: 15%;
  height: 0;
  border: 0;
  background: rgba(255, 255, 255, 0.6);
}
.post-squares.nextprev .next .info {
  right: 40px;
  bottom: 40px;
  text-align: right;
}
.post-squares.nextprev a,
.post-squares.nextprev article {
  height: 150px;
  padding: 55px 40px;
  text-align: left;
}
.post-squares.nextprev a,
.post-squares.nextprev article {
  height: 150px;
  padding: 55px 40px;
  text-align: left;
  position: relative;
  display: block;
  float: left;
  overflow: hidden;
}
a:active,
a:hover {
  outline: 0;
  color: orange;
}
.post-squares.nextprev .next .label {
  top: 40px;
  right: 40px;
}
.post-squares a:hover > .background,
.post-squares article:hover > .background {
  opacity: 0.6;
}
.author-profile {
  padding: 30px 12.78%;
  text-align: center;
}
.author-profile .info {
  overflow: hidden;
  text-align: center;
}
.author-profile .profile {
  display: inline-block;
  width: 70px;
  height: 70px;
}
.author-profile .profile img {
  max-width: 100%;
  border-radius: 100%;
  padding: 3px;
  border: 1px solid #ddd;
}
.author-profile .meta {
  display: block;
  text-align: center;
}
.author-profile .meta .title {
  display: none;
}
.author-profile .meta h3 {
  margin: 10px 0 0;
  text-transform: none;
}
.author-profile .meta h3 a {
  font-size: 18px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 1px;
  color: #ababab;
}
.author-profile hr {
  width: 50%;
  height: 0;
  margin: 0;
  background-color: #ccc;
  border: 0;
}
.author-profile p {
  font-size: 13px;
  line-height: 30px;
  margin: 15px 0 0;
  color: #7d8588;
  letter-spacing: 0;
  display: inline-block;
  padding: 10px 20px;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
}
.author-profile svg {
  color: #69d2e7;
  float: none;
  margin-right: 10px;
  font-size: 18px;
}
#article .entry-header {
  text-align: center;
  margin: 0 auto;
}
h1.entry-title {
  font-size: 24px;
  font-weight: 300;
}
.entry-census {
  font-size: 12px;
  margin: 0;
  color: #888;
}
.entry-header hr {
  width: 30%;
  height: 1px;
  border: 0;
  background: #efefef;
  margin: 20px auto;
}

.post-footer {
  padding: 32px 0;
  margin: 80px 0 80px;
  border-bottom: 1px dashed #ddd;
  border-top: 1px dashed #ddd;
  height: 82px;
  #pagination {
    width: 100%;

    text-align: center;

    display: inline-block;
    span {
      color: #989898;
      font-size: 15px;
    }
    svg {
      font-size: 21px;
      margin-left: 5px;
    }
  }
}
</style>
<style lang="stylus">
pre,
code {
  font-family: Consolas !important;
  font-size: 18px !important;
  color:#fff!important;
}
.highlight-wrap {
  position: relative;
  background: #21252b;
  border-radius: 5px;
  font: 15px/22px 'Microsoft YaHei', Arial, Sans-Serif;
  line-height: 1.6;
  margin-bottom: 1.6em;
  max-width: 100%;
  overflow: auto;
  text-shadow: none;
  color: #000;
  padding-top: 30px;
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.4);
}.highlight-wrap:before {
  content: ' ';
  position: absolute;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  background: #fc625d;
  width: 12px;
  height: 12px;
  left: 12px;
  margin-top: -18px;
  -webkit-box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
  box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
  z-index: 2;
}
.highlight-wrap:after{
  // content: url(/static/image/beautify/clip-board.svg);
  content:'CODE'
  position:absolute;
  left:50%;
  top: 0;
  font-size: 16px;
  font-family: Ubuntu, sans-serif;
  font-weight: 700;
}.entry-content h4:after {
    content: ">";
    position: absolute;
    left: 0;
    color: #FF6D6D;
}.entry-content h3, .entry-content h4, .entry-content h5 {
    padding-left: 16px;
}
.entry-content h3 {
    padding-bottom: 8px;
    border-bottom: 1px dashed #ddd;
    color: #737373;
}
.entry-content h3:after {
    content: "#";
    position: absolute;
    left: 0;
    color: #FF6D6D;
}.entry-content ul {
    list-style: disc;
    border: 1px dashed #E4E4E4;
    padding: 15px 10px 15px 50px;
    color: #616161;
    margin-left: 0;
    border-radius: 10px;
}
.entry-content ol {
    list-style: decimal;
    border: 1px dashed #E4E4E4;
    padding: 15px 10px 15px 50px;
    color: #616161;
    margin-left: 0;
    border-radius: 10px;
}
.entry-content ol li, .entry-content ul li {
    padding: 8px 0;
}
.entry-content blockquote:before, .entry-content blockquote:after {
    display: block;
}
.entry-content blockquote {
    margin: 0;
    padding: 30px 60px;
    position: relative;
    text-align: center;
}
blockquote:before {
    content: url(/static/image/beautify/left-quotation.svg);
    font-size: 3rem;
    position: absolute;
    top: -25px;
    left: 12px;
    font-family: FontAwesome;
    width:44px
}blockquote:after {
   content: url(/static/image/beautify/right-quotation.svg);
    font-size: 3rem;
    position: absolute;
    bottom: -25px;
    right: -5px;
}
</style>
