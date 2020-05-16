<template>
  <div class="feature">
    <h1 class="fes-title">
      <svg-icon icon-class="snow" />
      白色相簿
    </h1>

    <div class="f_image" v-for="(item, index) in cover" :key="index">
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
</template>

<script>
import $ from 'jquery'
export default {
  data() {
    return {
      cover: [
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
    right(e) {
      $('.info h3').eq(e).addClass('left')
      $('.info p').eq(e).addClass('right')
      $('.info').eq(e).addClass('visible')
    },
    left(e) {
      $('.info h3').eq(e).removeClass('left')
      $('.info p').eq(e).removeClass('right')
      $('.info').eq(e).removeClass('visible')
    }
  }
}
</script>

<style scoped></style>
