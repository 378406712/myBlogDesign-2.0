<template>
  <div class="header_info">
    <p>猫になりたい</p>
    <div class="social_media">
      <li class="bg-pre">
           <img class="left_arrow" :src="anchor" alt />
      </li>
      <li v-for="(item, index) in link" :key="index">
        <a :href="item.target"><img :src="item.links" alt="" /></a>
      </li>
      <li class="bg-next">
        <img :src="anchor" alt />
      </li>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      link: [
        {
          links: '/static/image/front/icon-media/github.png',
          target: 'https://github.com/378406712'
        },
        {
          links: '/static/image/front/icon-media/sina.png',
          target: 'https://weibo.com/5436833930/profile?topnav=1&wvr=6&is_all=1'
        },
        {
          links: '/static/image/front/icon-media/qq.png',
          target: 'tencent://message/?uin=378406712'
        },
        {
          links: '/static/image/front/icon-media/bilibili.png',
          target: 'https://space.bilibili.com/3280104/'
        },
        {
          links: '/static/image/front/icon-media/wangyiyun.png',
          target: 'https://music.163.com/#/user/home?id=124380020'
        },
        {
          links: '/static/image/front/icon-media/csdn.png',
          target: 'https://blog.csdn.net/qq_40944918'
        }
      ],
      anchor:
        'https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/next-b.svg'
    }
  }
}
</script>

<style scoped>

@import url(../index.scss);

</style>
