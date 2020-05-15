<template>
  <div class="home_page">
    <div class="scrollbar" id="bar"></div>
    <!-- 主体区 -->
    <section class="main_container">
      <!-- 壁纸 -->
      <div class="header_top">
        <figure id="centerBg">
          <div class="focus_info">
            <div class="header_avatar">
              <a href>
                <img src="http://q1.qlogo.cn/g?b=qq&nk=378406712&s=640" alt />
              </a>
            </div>
            <div class="header_info">
              <p>猫になりたい</p>
              <div class="social_media">
                <li class="bg-pre">
                  <img
                    class="left_arrow"
                    src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/next-b.svg"
                    alt
                  />
                </li>
                <li>
                  <a href>
                    <img src="/static/image/front/icon-media/github.png" alt />
                  </a>
                </li>
                <li>
                  <a href>
                    <img src="/static/image/front/icon-media/qq.png" alt />
                  </a>
                </li>
                <li>
                  <a href>
                    <img
                      src="/static/image/front/icon-media/bilibili.png"
                      alt
                    />
                  </a>
                </li>
                <li>
                  <a href>
                    <img
                      src="/static/image/front/icon-media/wangyiyun.png"
                      alt
                    />
                  </a>
                </li>
                <li>
                  <a href>
                    <img src="/static/image/front/icon-media/csdn.png" alt />
                  </a>
                </li>
                <li class="bg-next">
                  <img
                    src="https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/next-b.svg"
                    alt
                  />
                </li>
              </div>
            </div>
          </div>
        </figure>
      </div>

      <!-- page内容 -->
      <div id="page" class="site wrapper">
        <!-- 固定顶栏 -->
        <header
          class="site_header"
          :class="shadow ? 'shadow' : ''"
          @scroll.passive="onScroll"
          role="banner"
        >
          <div class="site_top">
            <div class="site_branding">
              <a href>
                <span>Mint Candy</span>
              </a>
            </div>

            <div
              class="h_user_avatar"
              @mouseenter="flag = !flag"
              @mouseleave="flag = !flag"
            >
              <img src="http://q1.qlogo.cn/g?b=qq&nk=378406712&s=640" alt />
              <transition name="fade">
                <div class="header_user_menu" v-show="flag">
                  <div class="header_user_name">
                    Signed in as
                    <div class="userName">轻度</div>
                  </div>
                  <div class="menu_option">
                    <a href target="_blank">管理中心</a>
                    <a href target="_blank">撰写文章</a>
                    <a href target="_blank">个人资料</a>
                    <a href target="_blank">退出登录</a>
                  </div>
                </div>
              </transition>
            </div>

            <div class="search_box">
              <span class="iconfont icon-search" @click="toSearch"></span>
            </div>

            <div class="lower">
              <nav>
                <div class="menu">
                  <ul>
                    <li>
                      <a href="#">Login</a>
                    </li>
                    <li>
                      <a href="#">归档</a>
                    </li>
                    <li>
                      <a href="#">时光轴</a>
                    </li>
                    <li>
                      <a href="#">About Me</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header>
        <!-- page主体 -->

        <div class="page_content">
          <!-- 一言 提示 -->
          <div class="p_notice">
            <i class="iconfont icon-yinliang"></i>
            <div>
              <p class="notice_content">
                {{ hitokoto }}
              </p>
            </div>
          </div>
          <!-- 3张封面图 -->
          <div class="feature">
            <h1 class="fes-title">
              <span class="faa-parent animated-hover">
                <i class="fa fa-snowflake-o fa-spin" aria-hidden="true"></i>
                白色相簿
              </span>
            </h1>

            <div class="f_image" v-for="(item, index) in preson" :key="index">
              <div class="the_feature from_right_left">
                <a href>
                  <div class="img" @mouseover="right(index)">
                    <img class="f_imgs" :src="item.imgUrl" />
                  </div>
                  <div class="info" @mouseleave="left(index)">
                    <h3>{{ item.characters }}</h3>
                    <p>{{ item.name }}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <!-- 文章渲染区 -->
          <div class="content-area" id="primary">
            <main id="main" class="content-main">
              <h1 class="main-title">
                <i class="fa fa-envira" aria-hidden="true"></i> Dirctory
              </h1>
              <article
                class="post post-list-thumb post-list-thumb-left post-list-show"
              >
                <div class="post-thumb">
                  <a href="https://www.qdmmz.cn/archives/387/378406712qq-com/">
                    <img
                      class="lazyload"
                      src="https://www.qdmmz.cn/wp-content/uploads/2019/11/64856256_p0_master1200-1024x509.jpg"
                      alt
                    />
                  </a>
                </div>
                <div class="post-content-wrap">
                  <div class="post-content">
                    <div class="post-date">
                      <i class="iconfont icon-time"></i>发布于 45 分钟前
                    </div>
                    <a
                      href="https://www.qdmmz.cn/archives/387/378406712qq-com/"
                      class="post-title"
                      ><h3>vue-thinking</h3></a
                    >
                    <div class="post-meta">
                      <span
                        ><i class="iconfont icon-attention"></i>25 热度</span
                      >
                      <span class="comments-number"
                        ><i class="iconfont icon-mark"></i
                        ><a
                          href="https://www.qdmmz.cn/archives/387/378406712qq-com/#respond"
                          >NOTHING</a
                        ></span
                      >
                      <span
                        ><i class="iconfont icon-file"></i
                        ><a href="https://www.qdmmz.cn/thinking/">随想</a>
                      </span>
                    </div>
                    <div class="float-content">
                      <p>
                        上周由于主要精力放在微信小程序上，Vue这块儿又看得少了
                        事实证明，不论学习什么，都要经常复习，熟能生巧
                        晚上用vue写页面时，列 …
                      </p>
                      <div class="post-bottom">
                        <a
                          href="https://www.qdmmz.cn/archives/387/378406712qq-com/"
                          class="button-normal"
                          ><i class="iconfont icon-caidan"></i
                        ></a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </main>
          </div>
        </div>
      </div>
    </section>

    <!-- 点击向上 -->
    <!-- <button id="GoTop"></button> -->
    <!-- 搜索页面框 -->
    <form action class="js_search search_model">
      <div class="search_inner">
        <div class="micro">
          <p>想要找点什么呢?</p>
          <span class="iconfont icon-search"></span>
          <input
            type="seach"
            class="text-input"
            placeholder="Search"
            required
          />
        </div>
      </div>

      <div class="search_close" @click="exitSearch"></div>
    </form>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import throttle from '@/utils/throttle'
export default {
  name: 'home',

  data() {
    return {
      flag: false,
      shadow: false,
      hitokoto: '',
      preson: [
        {
          id: 0,
          characters: '冬马和纱',
          name: 'とうま かずさ / Touma Kazusa',
          imgUrl:
            'https://www.qdmmz.cn/wp-content/uploads/2019/11/-e1574170806519.jpg'
        },
        {
          id: 1,
          characters: '轻度喵症',
          name: '軽度 ニャース症 / Clover Liu',
          imgUrl:
            'https://www.qdmmz.cn/wp-content/uploads/2019/11/BA539A16F3F2F6DEDBD66A59AABEB1A6-e1574170914911.jpg'
        },
        {
          id: 2,
          characters: '小木曾雪菜',
          name: 'おぎそ せつな / Ogiso Setsuna',
          imgUrl:
            'https://www.qdmmz.cn/wp-content/uploads/2019/11/-e1574170877377.jpg'
        }
      ]
    }
  },
  methods: {
    onScroll() {
      console.log(123)
    },
    toSearch() {
      $('.js_search').toggleClass('is-visible')
    },
    exitSearch() {
      $('.js_search').removeClass('is-visible')
    },

    right(e) {
      console.log(e)
      $('.info h3').eq(e).addClass('left')
      $('.info p').eq(e).addClass('right')
      $('.info').eq(e).addClass('visible')
    },
    left(e) {
      $('.info h3').eq(e).removeClass('left')
      $('.info p').eq(e).removeClass('right')
      $('.info').eq(e).removeClass('visible')
    },
    addShadow(e) {
      const scrollTop = document.body.scrollTop || window.pageYOffset
      if (scrollTop > 0) {
        this.shadow = true
      } else {
        this.shadow = false
      }
    }
  },
  mounted() {
    axios.get('https://v1.hitokoto.cn/?c=b').then((res) => {
      this.hitokoto = res.data.hitokoto + ' ---' + res.data.from
    })
    window.addEventListener('scroll', throttle(this.addShadow, 200))

    function fun() {
      let h = $(window).height() + 'px'
      $('#centerBg').css('height', h)
    }
    fun()
    $(function () {
      $(window).resize(() => {
        fun()
      })
    })
  }
}
</script>

<style scoped>
@import url(./index.scss);
.home_page {
  overflow: scroll;
}
</style>
