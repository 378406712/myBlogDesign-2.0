<template>
  <el-drawer
    custom-class="drawers"
    :before-close="handleClose"
    :visible.sync="drawer"
    :with-header="false"
  >
    <!-- 头像 -->
    <el-divider content-position="left" style="padding:20px">
      <el-button type="primary" round>编辑资料</el-button>
    </el-divider>
    <div class="demo-fit" style="padding:20px 20px 0px 20px;diplay:flex">
      <div class="block">
        <el-avatar style="vertical-align:middle" shape="circle" :size="100" :src="avatar"></el-avatar>
        <div class="block_item1">
          <span class="title" style="margin-left:20px">昵称 ： {{ detailData.nickname }}</span>
          <span class="title" style="margin-left:20px;marginTop:10px">
            性别 ：
            <span class="svg-container">
              <svg-icon v-if="detailData.sex == '男'" icon-class="odoko" />
              <svg-icon v-if="detailData.sex == '女'" icon-class="onnna" />
            </span>
            <!-- <svg v-if="detailData.sex == '男'" aria-hidden="true" class="icon_svg">
              <use xlink:href="#iconnan" />
            </svg>-->

            <!-- <svg v-else-if="detailData.sex == '女'" aria-hidden="true" class="icon_svg">
              <use xlink:href="#iconnv" />
            </svg>-->
          </span>
        </div>
      </div>
      <el-divider></el-divider>
    </div>
    <!-- 个性签名，地区，职业等 -->
    <div class="more_detail">
      <p>
        <svg aria-hidden="true" class="icon_svg">
          <use xlink:href="#iconqianming" />
        </svg>
        个性签名：{{ detailData.desc }}
      </p>
      <el-divider></el-divider>
      <p>
        <svg aria-hidden="true" class="icon_svg">
          <use xlink:href="#iconlingdai" />
        </svg>
        职业：{{ detailData.job }}
      </p>
      <p>
        <svg aria-hidden="true" class="icon_svg">
          <use xlink:href="#iconnb-" />
        </svg>
        家乡：{{ detailData.hometown }}
      </p>
      <p>
        <svg aria-hidden="true" class="icon_svg">
          <use xlink:href="#icondangao" />
        </svg>
        生日：{{ detailData.birthday }}
      </p>
    </div>
  </el-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    detailData: Object,
    drawer: Boolean
  },
  data() {
    return {}
  },
  methods: {
    handleClose() {
      this.$emit('closeDrawer', !this.drawer)
    }
  },
  computed: {
    ...mapGetters(['name', 'avatar'])
  }
}
</script>

<style scoped>
.demo-fit .block {
  display: flex;
}
.demo-fit .block .block_item1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.drawers {
  /* background-image: url('../media_icon/iloli.gif'); */
  background-position: 150px 420px;
  background-repeat: no-repeat;
}
/* icon font */
.icon_svg {
  width: 25px;
  height: 25px;
  margin-right: 10px;
  vertical-align: middle;
}
.more_detail {
  padding: 0 20px 20px 20px;
}
</style>