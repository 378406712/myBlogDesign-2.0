<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="panel-box clearFix">
        <div class="t-icons icon-pixiv">
          <svg-icon icon-class="peoples" class="icon-wrapper" />
        </div>
        <div class="t-items">
          <div class="titles">Pixiv</div>
          <count-to
            class="num"
            :startVal="0"
            :endVal="21320"
            :duration="5000"
          ></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="panel-box clearFix">
        <div class="t-icons icon-message">
          <svg-icon icon-class="message" class="icon-wrapper" />
        </div>
        <div class="t-items">
          <div class="titles">Message</div>
          <count-to
            class="num"
            :startVal="0"
            :endVal="35320"
            :duration="5000"
          ></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="panel-box clearFix">
        <div class="t-icons icon-flower">
          <svg-icon icon-class="flower" class="icon-wrapper" />
        </div>
        <div class="t-items">
          <div class="titles">Flower</div>
          <count-to
            class="num"
            :startVal="0"
            :endVal="34620"
            :duration="5000"
          ></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="panel-box clearFix">
        <div class="t-icons icon-shopping">
          <svg-icon icon-class="shopping" class="icon-wrapper" />
        </div>
        <div class="t-items">
          <div class="titles">Shopping</div>
          <count-to
            class="num"
            :startVal="0"
            :endVal="62320"
            :duration="5000"
          ></count-to>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  components: {
    CountTo
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    cursor: pointer;
    margin-bottom: 32px;
    &:hover {
      .icon-wrapper {
        color: #fff;
      }
      .icon-pixiv {
        background: rgb(147, 183, 227);
      }
      .icon-message {
        background: rgb(255, 178, 72);
      }
      .icon-flower {
        background: rgb(107, 230, 193);
      }
      .icon-shopping {
        background: rgb(255, 113, 94);
      }
    }

    .icon-pixiv {
      color: rgb(147, 183, 227);
    }
    .icon-message {
      color: rgb(255, 178, 72);
    }
    .icon-flower {
      color: rgb(107, 230, 193);
    }
    .icon-shopping {
      color: rgb(255, 113, 94);
    }
  }
  .panel-box {
    height: 108px;
    cursor: pointer;
    box-shadow: 0px 0px 5px #2ec7c9;
    border-radius: 15px;
    background-color: #fff;
    .t-icons {
      border-radius: 10px;
      transition: all 0.38s ease-out;
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      .icon-wrapper {
        font-size: 48px;
      }
    }
    .t-items {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .titles {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
        cursor: pointer;
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
          Microsoft YaHei, Arial, sans-serif;
      }
      .num {
        font-size: 20px;
      }
    }
  }
}
</style>
