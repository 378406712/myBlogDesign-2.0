<template>
  <div>
    <div id="content" class="site-content">
      <div id="primary" class="content-area">
        <main id="main" class="site-main" role="main">
          <article id="article" class="hentry">
            <header v-if="boke_essay.special_bg === ''" class="entry-header">
              <h1 class="entry-title">ces</h1>
              <p class="entry-census">发布于 2 分钟前&nbsp;&nbsp;0 次阅读</p>
              <hr />
            </header>
            <div class="entry-content">
              <!-- essay -->
              <h4>动态路由目的</h4>
              <pre
                class="wp-block-code highlight-wrap"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
                contenteditable="false"
              ><code class="hljs javascript" data-rel="TEXT" id="hljs-1"><table class="hljs-ln"><tbody><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-comment">//将404路由单独提出来</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-comment">//notFoundRouterMap.js</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">import</span> Layout <span class="hljs-keyword">from</span> <span class="hljs-string">'@/layout/layout'</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="4"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> [</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="5"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">  {</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="6"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-attr">path</span>: <span class="hljs-string">'*'</span>,</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="7"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-attr">name</span>: <span class="hljs-string">'404'</span>,</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="8"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-attr">component</span>: Layout,</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="9"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-attr">hidden</span>: <span class="hljs-literal">true</span>,</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="10"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-attr">redirect</span>: <span class="hljs-string">'404'</span>,</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="11"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-attr">meta</span>: {</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="12"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">      <span class="hljs-attr">title</span>: <span class="hljs-string">'404'</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="13"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    },</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="14"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-attr">children</span>: [</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="15"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">      {</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="16"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">        <span class="hljs-attr">path</span>: <span class="hljs-string">'404'</span>,</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="17"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">        <span class="hljs-attr">name</span>: <span class="hljs-string">'err0r'</span>,</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="18"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">        <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'@/views/error-page/index'</span>),</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="19"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">        <span class="hljs-attr">meta</span>: { <span class="hljs-attr">icon</span>: <span class="hljs-string">'svg-aperture'</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'404'</span> }</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="20"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">      }</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="21"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    ]</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="22"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">  }</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="23"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">]</div></td></tr></tbody></table></code><a class="copy-code" href="javascript:" data-clipboard-target="#hljs-1" title="拷贝代码"><i class="fa fa-clipboard" aria-hidden="true"></i></a></pre>
            </div>
          </article>
          <footer class="post-footer">
            <div id="pagination">
              <svg-icon icon-class="thank" /> <span>{{ over_tag }}</span>
            </div>
          </footer>

          <section class="post-squares nextprev">
            <div class="post-nepre half previous">
              <a
                href="https://www.qdmmz.cn/378406712qq-com/1229/mongoose%e7%9a%84findoneandupdate/"
                rel="prev"
                ><div
                  class="background lazyload"
                  style="
                    background-image: url('https://www.qdmmz.cn/wp-content/uploads/2020/05/51-1024x576.png');
                  "
                  data-src="https://www.qdmmz.cn/wp-content/uploads/2020/05/51-1024x576.png"
                ></div>
                <span class="label">Previous Post</span>
                <div class="info">
                  <h3>Mongoose的findOneAndUpdate</h3>
                  <hr /></div
              ></a>
            </div>
            <div class="post-nepre half next">
              <a
                href="https://www.qdmmz.cn/378406712qq-com/1236/vue-router%e4%bd%bf%e7%94%a8%e5%a4%9a%e8%af%ad%e8%a8%80%e6%98%be%e7%a4%ba%e4%be%a7%e6%a0%8f/"
                rel="next"
                ><div
                  class="background lazyload"
                  style="
                    background-image: url('https://www.qdmmz.cn/wp-content/uploads/2020/05/44-1024x576.jpg');
                  "
                  data-src="https://www.qdmmz.cn/wp-content/uploads/2020/05/44-1024x576.jpg"
                ></div>
                <span class="label">Next Post</span>
                <div class="info">
                  <h3>vue-router使用多语言显示侧栏</h3>
                  <hr /></div
              ></a>
            </div>
          </section>
          <section class="author-profile">
            <div class="info">
              <a href="#" class="profile"
                ><img
                  src="http://q1.qlogo.cn/g?b=qq&nk=378406712&s=640"
                  height="70"
                  width="70"
              /></a>
              <div class="meta">
                <span class="title">Author</span>
                <h3 itemprop="name">
                  <a
                    v-if="boke_essay.nickname"
                    href="#"
                    itemprop="url"
                    rel="author"
                    >{{ boke_essay.nickname }}</a
                  >
                  <a v-else href="#" itemprop="url" rel="author">{{ name }}</a>
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
import { mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      over_tag: '很高兴你看完了...'
    }
  },
  computed: {
    ...mapState({
      boke_essay: (state) => state.bokepage.boke_essay
    }),
    ...mapGetters(['name', 'avatar'])
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
.highlight-wrap code[data-rel]:before {
  color: #fff;
  content: attr(data-rel);
  height: 30px;
  line-height: 30px;
  background: #21252b;
  font-size: 16px;
  position: absolute;
  margin-top: -30px;
  left: 0;
  width: 100%;
  font-family: Ubuntu, sans-serif;
  font-weight: 700;
  padding: 0 80px;
  text-indent: 15px;
  text-align: center;
  float: left;
  z-index: 1;
  border-radius: 5px 5px 0 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  pointer-events: none;
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
h1,
h2,
h3,
h4,
h5,
h6 {
  clear: both;
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
}
.highlight-wrap:before {
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
.highlight-wrap code {
  background: #1d1f21;
  color: #fff;
  word-break: break-word;
  font-family: 'Source Code Pro', monospace, Helvetica, Tahoma, Arial, STXihei,
    'STHeiti Light', 'Microsoft YaHei', sans-serif;
  padding: 2px;
  text-shadow: none;
  border-radius: 0 0 5px 5px;
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
.post-squares .half {
  width: 50%;
  float: left;
}
.post-squares.nextprev .next .info {
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
//爬
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
h1,
h2,
h3,
h4,
h5,
h6 {
  clear: both;
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
