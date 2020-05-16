<template>
  <div>
    <div
      class="changeSkin-gear no-select"
      style="bottom: 0px;"
      v-if="showTools"
    >
      <div class="keys" @click="toggleTools">
        <span id="open-skinMenu">
          <i class="iconfont icon-gear inline-block rotating"></i>&nbsp;
          切换主题 | SCHEME TOOL
        </span>
      </div>
    </div>
    <div :class="setting_flag ? 'show' : ''" class="skin-menu no-select">
      <div class="theme-controls row-container">
        <ul class="menu-list">
          <li v-for="(i, k) in setting" @click="changeBg(i.tag)" :key="k">
            <svg-icon :icon-class="i.type" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      setting: [
        {
          type: 'bing',
          tag: 'scene'
        },

        {
          type: 'flower',
          tag: 'sakura'
        },
        {
          type: 'dot',
          tag: 'dot'
        },
        {
          type: 'slack',
          tag: 'grid'
        },

        {
          type: 'superpowers',
          tag: 'orange'
        },
        {
          type: 'moon',
          tag: 'girl'
        },

        {
          type: 'pixiv',
          tag: 'star'
        },
        {
          type: 'television',
          tag: 'pc'
        }
      ]
    }
  },
  computed: {
    showTools() {
      return this.$store.state.indexpage.showTools
    },
    setting_flag() {
      return this.$store.state.indexpage.setting_flag
    }
  },
  methods: {
    toggleTools() {
      this.$store.commit('toShowFlag', !this.setting_flag)
    },
    changeBg(tag) {
      this.$store.commit('changeBodyBg', tag)
      this.$store.commit('toShowFlag', false)
    }
  }
}
</script>

<style></style>
