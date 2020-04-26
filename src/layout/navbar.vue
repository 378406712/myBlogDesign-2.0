<template>
  <div class="top-navbar">
    <el-menu mode="horizontal" text-color="#5a5e66" active-text-color="#5a5e66">
      <!-- <router-link to="/home" style="display: table;float:left">
        <el-menu-item index="1" class="title-name">{{
          $t('navbar.title')
        }}</el-menu-item>
      </router-link> -->
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
      <change-theme class="theme-container"></change-theme>

      <el-tooltip
        effect="dark"
        :content="$t('navbar.screenfull')"
        placement="bottom"
      >
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>

      <div class="lang-select">
        <lang-select></lang-select>
      </div>

      <div class="avatar-container">
        <el-dropdown trigger="click">
          <div class="avatar-wrapper">
            <img class="user-avatar" :src="avatar" />
            <div class="username-wrapper">
              <span class="user-name">{{ name }}</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <router-link class="inlineBlock" to="/user/profile">
              <el-dropdown-item>{{ $t('navbar.profile') }}</el-dropdown-item>
            </router-link>

            <a
              target="_blank"
              href="https://github.com/378406712/myBlogDesign-2.0"
            >
              <el-dropdown-item>{{ $t('navbar.github') }}</el-dropdown-item>
            </a>
            <el-dropdown-item @click.native="logout">
              <span style="display:block;">{{ $t('navbar.logOut') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import LangSelect from '@/components/lang-select'
import Screenfull from '@/components/screenfull'
import ChangeTheme from '@/components/theme'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: '',
  components: {
    LangSelect,
    Screenfull,
    ChangeTheme,
    Breadcrumb
  },
  computed: {
    ...mapGetters(['name', 'avatar'])
  },
  methods: {
    ...mapActions({
      userLogout: 'logout'
    }),

    logout() {
      this.userLogout()
        .then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
.top-navbar {
  width: 100%;
  z-index: 10;
  height:50px

  .el-menu {
    border-bottom: none !important;
        box-shadow: 0 1px 4px rgba(0,21,41,0.08);
    .lang-select {
      position: absolute;
      top: 18px;
      right: 150px;
    }

    .lang-select /deep/ .el-dropdown {
      font-size: 20px;
    color: #5a5e66;
    }

    .avatar-container {
      position: absolute;
      top: 8px;
      right: 30px;

      .avatar-wrapper {
        cursor: pointer;
      }
    }

    .avatar-container /deep/ .user-avatar {
     cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
      vertical-align: middle;
    }

    .username-wrapper {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      color:#5a5e66
    }
  }
}

.top-navbar /deep/ .el-menu-item {
  font-size: 20px;

  &:hover {
    background-color: transparent;
  }

  &:focus {
    background-color: transparent;
  }
}

.top-navbar /deep/ .theme-container {
  position: absolute;
  top: 15px;
  right: 225px;
color: #5a5e66;
 font-size: 24px;
  cursor: pointer;
  // background-image linear-gradient(red, blue)
}

.top-navbar .screenfull {
  position: absolute;
  top: 20px;
  right: 190px;
}
   .breadcrumb-container {
   float:left;
    margin-left: 15px!important;

  }
</style>
