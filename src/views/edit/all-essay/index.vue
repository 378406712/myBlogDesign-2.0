<template>
  <div class="grey_bg">
    <h2 class="heading-inline">文章</h2>
    <router-link to="/edit/post-new">写文章</router-link>
    <el-divider></el-divider>
    <el-form>
      <el-form-item>
        <ul class="subsubsub">
          <li v-for="(item, index) in subtitle" :key="index">
            <a href="javascript:;" @click="pushSetting(item.status)"
              >{{ item.title
              }}<span class="count">（{{ num[item.status] }}）</span></a
            >
            <span v-if="item.status != 'trash'">|</span>
          </li>
        </ul>
        <p class="search-box">
          <el-input
            style="width: auto;"
            v-model="searchEssay"
            @focus="clearTag"
            size="mini"
          ></el-input>
          <el-button size="mini" @click="handleSearch(searchEssay)"
            >搜索文章</el-button
          >
          <el-button
            class="control"
            @click="drawer = true"
            type="primary"
            size="mini"
            >显示选项</el-button
          >
        </p>
      </el-form-item>

      <Operation
        v-on:getEssay="getEssay"
        v-on:getEssayNum="getEssayNum"
        :DateList="DateList"
        :CategoryList="CategoryList"
      />
      <EssayTable v-on:getEssay="getEssay" v-on:getEssayNum="getEssayNum" />
    </el-form>
    <Operation
      v-on:getEssay="getEssay"
      :DateList="DateList"
      :CategoryList="CategoryList"
    />
    <el-drawer :visible.sync="drawer">
      <SettingForm v-on:getEssay="getEssay" />
    </el-drawer>
  </div>
</template>

<script>
import Operation from './components/operation'
import SettingForm from './components/settingForm'
import EssayTable from './components/essay-table'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  components: { Operation, SettingForm, EssayTable },
  data() {
    return {
      DateList: [],
      CategoryList: [],
      drawer: false,
      searchEssay: '',
      keywordSetting: 'all',
      subtitle: [
        { title: '全部', status: 'all' },
        { title: '已发送', status: 'sended' },
        { title: '草稿', status: 'draft' },
        { title: '待审', status: 'pend' },
        { title: '回收站', status: 'trash' }
      ]
    }
  },
  methods: {
    ...mapActions([
      'GetEssay',
      'SearchEssay',
      'AllCategoryCount',
      'EssayDate',
      'EssayCategory',
      'GetEssayNum',
      'GetTrashNum'
    ]),
    clearTag() {
      this.tag = ''
    },
    handleSearch(val) {
      this.SearchEssay({
        params: {
          username: this.name,
          keywords: val,
          tag: this.tag
        }
      })
    },
    async getEssay() {
      await this.GetEssay({
        params: {
          username: this.name,
          keyword: this.keywordSetting
        }
      })
      await this.EssayDate({ params: { username: this.name } })
      await this.EssayCategory({ params: { username: this.name } })
      this.isCategory(this.Essaycategory)
      this.isSame(this.date)
    },
    getEssayNum() {
      this.GetEssayNum({
        params: {
          username: this.name,
          keyword: 'all'
        }
      })
      this.GetTrashNum({  params: {
          username: this.name,
          keyword: 'all'
        }})
    },
    isCategory(Essaycategory) {
      let array = []
      Essaycategory.map((item) => {
        array.push(item.category)
      })
      this.CategoryList = array
    },
    isSame(date) {
      let array = []
      date.map((item) => {
        array.push(item.selectDate)
      })

      this.DateList = Array.from(new Set(array)).reverse()
    },
    pushSetting(key) {
      this.keywordSetting = key
      this.getEssay()
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.$route.query.tag) {
        vm.tag = vm.$route.query.tag
        vm.handleSearch(vm.$route.params.category)
      } else {
        vm.getEssay()
      }
      vm.getEssayNum()
    })
  },
  computed: {
    ...mapGetters(['name']),
    ...mapState({
      num: (state) => state.essay.num,
      date: (state) => state.essay.date,
      Essaycategory: (state) => state.essay.category
    })
  }
}
</script>

<style lang="scss" scoped>
.heading-inline {
  margin-top: 0;
  display: inline-block;
  margin: 0;
  margin-right: 5px;
}
.heading-inline + a {
  margin-left: 4px;
  padding: 6px 8px;
  position: relative;
  top: -3px;
  text-decoration: none;
  border: 1px solid #ccc;
  border-radius: 2px;
  background: #f7f7f7;
  text-shadow: none;
  font-weight: 600;
  font-size: 13px;
  line-height: normal;
  color: #0073aa;
  margin-left: 0;
}

.heading-inline + a:hover {
  color: #fff;
  background-color: rgb(24, 144, 255);
}
.header-end {
  visibility: hidden;
  margin: -2px 0 0;
}
.subsubsub {
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
  font-size: 13px;
  float: left;
  color: #666;
  z-index: 999999;
}
.subsubsub li {
  display: inline-block;
  margin: 0;
  padding: 0;
  white-space: nowrap;
}
.subsubsub a {
  line-height: 2;
  padding: 0.2em;
  text-decoration: none;
  color: #0073aa;
}
.subsubsub a .count,
.subsubsub a.current .count {
  color: #555d66;
  font-weight: 400;
}
.search-box {
  float: right;
  margin: 0;
}
>>> .el-form-item {
  margin-bottom: 0;
}
.control {
  margin-left: 35px;
}
</style>
