<template>
  <el-card class="box-card-component" style="margin-left: 8px;">
    <div slot="header" class="box-card-header">
      <img :src="detailData.url" />
      <strong class="showUser">{{ name }}</strong>
      <strong class="changeAva" @click="dealPic">更换头像</strong>
      <div class="right-triangle"></div>
    </div>
    <div class="person-data" style="position: relative;">
      <div style="" class="progress-item">
        <span>账号</span>
        <li>{{ name }}</li>
      </div>
      <el-divider></el-divider>
      <div class="progress-item">
        <span>个性签名</span>
        <li>{{ detailData.desc }}</li>
      </div>
      <el-divider></el-divider>
      <div class="progress-item">
        <span>昵称</span>
        <li>{{ detailData.nickname }}</li>
      </div>
      <el-divider></el-divider>
      <div class="progress-item">
        <span>邮箱</span>
        <li>{{ e_mail }}</li>
      </div>
      <el-divider></el-divider>
      <router-link style="color: #1890ff; fontsize: 14px;" to="/account/account"
        >添加更多资料</router-link
      >
    </div>
    <my-upload :params="params" ref="imageCrop" />
  </el-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import myUpload from '@/components/ImageCropper'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  components: {
    myUpload
  },
  data() {
    return {
      params: {},
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      }
    }
  },
  computed: {
    ...mapGetters(['name', 'avatar', 'e_mail', 'language']),
    ...mapState({
      detailData: (state) => state.account.form
    })
  },
  methods: {
    dealPic() {
      this.$refs.imageCrop.toggleShow()
      this.params = {
        username: this.name,
        image: this.detailData.url
      }
    },

    close() {
      this.show = false
    },
    cropSuccess() {}
  },
  mounted() {
    this.$store.dispatch('getInfo', { params: { username: this.name } })
  }
}
</script>

<style lang="scss">
.box-card-component {
  .el-card__header {
    padding: 0px !important;
    overflow: hidden;
  }
}
</style>
<style lang="scss" scoped>
.person-data div {
  li {
    margin-bottom: 10px;
    margin-top: 5px;
  }
  span {
    color: rgb(170, 169, 169);
    font-size: 12px;
  }
}
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }
  .panThumb {
    z-index: 100;
    height: 70px !important;
    width: 70px !important;
    position: absolute !important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none !important;
    /deep/ .pan-info {
      box-shadow: none !important;
    }
  }
  .progress-item {
    font-size: 14px;
  }
  @media only screen and (max-width: 1510px) {
    .mallki-text {
      display: none;
    }
  }
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 8px 0;
}
.right-triangle {
  width: 0;
  height: 0px;
  z-index: 101;
  border-color: transparent #fff #fff transparent;
  border-width: 20px 150px 20px 156px;
  border-style: solid;
  font-size: 16px;
  line-height: 20px;
  position: absolute;
  bottom: 0px;
}
>>> .el-card__header {
  border-bottom: 0px;
}
.showUser {
  font-size: 25px;
  position: absolute;
  left: 5px;
  bottom: 20px;
  color: #1890ff;
  font-weight: 800;
}
.changeAva {
  position: absolute;
  right: 5px;
  top: 20px;
  color: #fff;
  font-size: 21px;
}
.box-card-header img {
  filter: contrast(95%);
  -webkit-filter: contrast(95%);
  transition: all 0.2s linear;

  &:hover {
    transform: scale(1.1, 1.1);
    filter: contrast(100%);
  }
}
</style>
