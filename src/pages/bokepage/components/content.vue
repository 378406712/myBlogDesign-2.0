<template>
  <div>
    <div id="content" class="site-content">
      <div id="primary" class="content-area">
        <main id="main" class="site-main" role="main">
          <article
            id="post-1176"
            class="post-1176 post type-post status-publish format-standard has-post-thumbnail hentry category-vue category-vue-router"
          >
            <div class="entry-content">
              <h4>动态路由目的</h4>

              <p>
                简单来说，就是做了权限设置的一些路由，当满足权限，能够进行访问
              </p>

              <h4>问题</h4>

              <p>
                404页面是要写在所有路由的最后面的，用通配符*进行判定，所有问题就是这个【404路由（path：*）要写在最后】
              </p>

              <ul>
                <li>在固定路由表中当然没有问题，直接写在最后</li>
                <li>
                  在动态路由中就有问题了，因为动态路由表由（固定表+动态表）构成
                </li>
              </ul>

              <p>
                那么把404路由放到动态表的最后不就行了？当然不行，或者说这样做不符合常规，动态表中的都是权限路由，404不属于权限部分。要做的就是在总的路由表中把404路由放到最下面。
              </p>

              <h4>做法：</h4>

              <pre
                class="wp-block-code highlight-wrap"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
                contenteditable="false"
                design="by Mashiro"
              ><code class="hljs javascript" data-rel="TEXT" id="hljs-0"><table class="hljs-ln"><tbody><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-comment">//router.js</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> constantRouterMap = [{}...]<span class="hljs-comment">//固定路由表</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> asyncRouterMap = [{}...]<span class="hljs-comment">//权限（动态）路由表</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="4"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({ <span class="hljs-comment">//router实例</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="5"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">  mode: <span class="hljs-string">'history'</span>,</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="6"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">  <span class="hljs-attr">routes</span>: constantRouterMap</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="7"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">})</div></td></tr></tbody></table></code><a class="copy-code" href="javascript:" data-clipboard-target="#hljs-0" title="拷贝代码"><i class="fa fa-clipboard" aria-hidden="true"></i></a></pre>

              <pre
                class="wp-block-code highlight-wrap"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
                contenteditable="false"
                design="by Mashiro"
              ><code class="hljs javascript" data-rel="TEXT" id="hljs-1"><table class="hljs-ln"><tbody><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-comment">//将404路由单独提出来</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-comment">//notFoundRouterMap.js</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">import</span> Layout <span class="hljs-keyword">from</span> <span class="hljs-string">'@/layout/layout'</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="4"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> [</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="5"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">  {</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="6"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-attr">path</span>: <span class="hljs-string">'*'</span>,</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="7"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-attr">name</span>: <span class="hljs-string">'404'</span>,</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="8"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-attr">component</span>: Layout,</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="9"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-attr">hidden</span>: <span class="hljs-literal">true</span>,</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="10"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-attr">redirect</span>: <span class="hljs-string">'404'</span>,</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="11"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-attr">meta</span>: {</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="12"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">      <span class="hljs-attr">title</span>: <span class="hljs-string">'404'</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="13"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    },</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="14"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-attr">children</span>: [</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="15"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">      {</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="16"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">        <span class="hljs-attr">path</span>: <span class="hljs-string">'404'</span>,</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="17"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">        <span class="hljs-attr">name</span>: <span class="hljs-string">'err0r'</span>,</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="18"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">        <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'@/views/error-page/index'</span>),</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="19"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">        <span class="hljs-attr">meta</span>: { <span class="hljs-attr">icon</span>: <span class="hljs-string">'svg-aperture'</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'404'</span> }</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="20"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">      }</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="21"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    ]</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="22"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">  }</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="23"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">]</div></td></tr></tbody></table></code><a class="copy-code" href="javascript:" data-clipboard-target="#hljs-1" title="拷贝代码"><i class="fa fa-clipboard" aria-hidden="true"></i></a></pre>

              <p><strong>关键的一步：</strong></p>

              <pre
                class="wp-block-code highlight-wrap"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
                contenteditable="false"
                design="by Mashiro"
              ><code class="hljs javascript" data-rel="TEXT" id="hljs-2"><table class="hljs-ln"><tbody><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-comment">//在配置权限的permission.js下</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-comment">// 路由全局前置守卫</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">const</span> whiteList = [<span class="hljs-string">'/login'</span>, <span class="hljs-string">'/register'</span>] <span class="hljs-comment">// 白名单</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="4"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="5"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"> ...</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="6"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">         const permissions = resp.permission</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="7"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">            store.dispatch(<span class="hljs-string">'GenerateRoutes'</span>, { permissions})</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="8"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">            .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="9"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">                <span class="hljs-comment">// 动态添加可访问路由表</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="10"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">                router.addRoutes(store.getters.addRouters,notFoundRouterMap)</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="11"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">                 <span class="hljs-comment">//动态路由+将404路由添加到最后</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="12"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">      </div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="13"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"> ...</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="14"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">})</div></td></tr></tbody></table></code><a class="copy-code" href="javascript:" data-clipboard-target="#hljs-2" title="拷贝代码"><i class="fa fa-clipboard" aria-hidden="true"></i></a></pre>
            </div>

            <footer class="post-footer">
              <div class="post-lincenses">
                <a
                  href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
                  target="_blank"
                  rel="nofollow"
                  ><i class="fa fa-creative-commons" aria-hidden="true"></i>
                  知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议</a
                >
              </div>
              <div class="post-tags"></div>

              <div class="post-like">
                <a
                  href="javascript:;"
                  data-action="ding"
                  data-id="1176"
                  class="specsZan"
                >
                  <i class="iconfont icon-like"></i>
                  <span class="count"> 0</span>
                </a>
              </div>

              <div class="post-share">
                <i class="iconfont show-share icon-forward"></i>
              </div>
            </footer>
          </article>

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
            <div
              class="info"
              itemprop="author"
              itemscope=""
              itemtype="http://schema.org/Person"
            >
              <a
                href="https://www.qdmmz.cn/author/378406712@qq.com/"
                class="profile gravatar"
                ><img
                  src="https://www.qdmmz.cn/wp-content/uploads/2020/03/微信图片_20200315225710.jpg"
                  itemprop="image"
                  alt="旧南山忆"
                  height="70"
                  width="70"
              /></a>
              <div class="meta">
                <span class="title">Author</span>
                <h3 itemprop="name">
                  <a
                    href="https://www.qdmmz.cn/author/378406712@qq.com/"
                    itemprop="url"
                    rel="author"
                    >旧南山忆</a
                  >
                </h3>
              </div>
            </div>
            <hr />
            <p><i class="iconfont icon-write"></i>爬。</p>
          </section>
        </main>
        <!-- #main -->
      </div>
      <!-- #primary -->
    </div>
  </div>
</template>

<script>
export default {}
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
.post-footer {
  padding: 20px 0;
  border-bottom: 1px dashed #ddd;
  border-top: 1px dashed #ddd;
  margin-top: 30px;
  height: 82px;
}
.post-lincenses {
  text-align: center;
  padding-bottom: 5px;
  font-size: 14px;
}
.post-tags {
  float: left;
  font-size: 13px;
  color: #b3b3b3;
  text-transform: uppercase;
}
.post-like {
  float: right;
}
.post-like a {
  color: #69d2e7;
  font-size: 13px;
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
}.author-profile {
    padding: 30px 12.78%;
    text-align: center;
}.author-profile .info {
    overflow: hidden;
    text-align: center;
}.author-profile .profile {
    display: inline-block;
    width: 70px;
    height: 70px;
}
.author-profile .profile img {
    max-width: 100%;
    border-radius: 100%;
    padding: 3px;
    border: 1px solid #ddd;
}.author-profile .meta {
    display: block;
    text-align: center;
}.author-profile .meta .title {
    display: none;
}.author-profile .meta h3 {
    margin: 10px 0 0;
    text-transform: none;
}.author-profile .meta h3 a {
    font-size: 18px;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 1px;
    color: #ABABAB;
}.author-profile hr {
    width: 50%;
    height: 0;
    margin: 0;
    background-color: #ccc;
    border: 0;
}.author-profile p {
    font-size: 13px;
    line-height: 30px;
    margin: 15px 0 0;
    color: #7d8588;
    letter-spacing: 0;
    display: inline-block;
    padding: 10px 20px;
    border-top: 1px solid #EFEFEF;
    border-bottom: 1px solid #EFEFEF;
}
//爬
.author-profile i {
    color: #65C186;
    float: none;
    margin-right: 10px;
    font-size: 16px;
}
</style>
