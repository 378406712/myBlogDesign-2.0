<template>
  <div class="header_info">
    <p>猫になりたい</p>
    <div class="social_media">
      <li class="bg-pre">
        <img class="left_arrow" :src="anchor" />
      </li>
      <li v-for="(item, index) in link" :key="index">
        <a href=""><img :src="item.links" alt="" /></a>
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
          links: '/static/image/front/icon-media/github.png'
        },
        {
          links: '/static/image/front/icon-media/qq.png'
        },
        {
          links: '/static/image/front/icon-media/bilibili.png'
        },
        {
          links: '/static/image/front/icon-media/wangyiyun.png'
        },
        {
          links: '/static/image/front/icon-media/csdn.png'
        }
      ],
      anchor:
        'https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/next-b.svg'
    }
  }
}
</script>

<style scoped>
</style>
