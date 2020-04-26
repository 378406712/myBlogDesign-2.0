<template>
  <el-drawer
    custom-class="loli-drawers"
    :before-close="handleClose"
    :visible.sync="drawer"
    :with-header="false"
  >
    <!-- 头像 -->
    <el-divider content-position="left" style="padding:20px">
      <el-button type="primary" round @click="jumpToCenter">编辑资料</el-button>
    </el-divider>
    <div class="demo-fit">
      <div class="block">
        <el-avatar
          class="rotateImg"
          style="vertical-align:middle"
          shape="circle"
          :size="100"
          :src="detailData.url"
        ></el-avatar>
        <div class="block_item1">
          <span class="title" style="margin-left:20px"
            >昵称 ：{{ detailData.nickname }}</span
          >
          <span class="title" style="margin-left:20px;marginTop:10px">
            性别 ：
            <span class="svg-container">
              <svg-icon v-if="detailData.sex == '男'" icon-class="odoko" />
              <svg-icon v-if="detailData.sex == '女'" icon-class="onnna" />
            </span>
          </span>
        </div>
      </div>
      <el-divider></el-divider>
    </div>
    <!-- 个性签名，地区，职业等 -->
    <div class="more_detail">
      <p>
        <svg-icon icon-class="personal_signature" />
        个性签名：
      </p>
      <span class="personal_signature"> {{ detailData.desc }}</span>
      <el-divider></el-divider>
      <p>
        <svg-icon icon-class="job" />
        职业：{{ detailData.job }}
      </p>
      <p>
        <svg-icon icon-class="hometown" />
        家乡：<span> {{ detailData.hometown }}</span>
      </p>
      <p>
        <svg-icon icon-class="birthday" />
        生日：{{ detailData.birthday }}
      </p>
    </div>
  </el-drawer>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['SET_VISIBLE', 'SET_DRAWER']),
    handleClose() {
      this.SET_DRAWER(false)
    },
    jumpToCenter() {
      this.$router.push('/user/account')
      this.SET_DRAWER(false)
    }
  },
  computed: {
    ...mapGetters(['name', 'avatar']),
    ...mapState({
      detailData: state => state.homepage.details,
      drawer: state => state.homepage.drawers
    })
  }
}
</script>

<style scoped>
.demo-fit {
  padding: 20px 20px 0px 20px;
}
.demo-fit .block {
  display: flex;
}
.demo-fit .block .block_item1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.more_detail {
  padding: 0 20px 20px 20px;
}
.personal_signature {
  letter-spacing: 1px;
  line-height: 25px;
  text-indent: 2em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>

<style lang="stylus">
.loli-drawers {
  background-position: 220px 340px;
  background-repeat: no-repeat;
  background-image: url('/static/image/beautify/iloli.gif');
  background-size: 12rem;
}
.rotateImg {
  width: 100%;
  height: 100%;
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.1, 1.1);
    filter: contrast(130%);
  }
}
</style>
