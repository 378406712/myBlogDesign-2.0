<template>
  <div class="grey_bg">
    <h2 class="heading-inline">文章</h2>
    <router-link to="/edit/post-new">写文章</router-link>
    <hr class="header-end" />
    <ul class="subsubsub">
      <li class="all">
        <a href="edit.php?post_type=post"
          >全部<span class="count">（66）</span></a
        >
        |
      </li>
      <li class="publish">
        <a href="edit.php?post_status=publish&amp;post_type=post"
          >已发布<span class="count">（61）</span></a
        >
        |
      </li>
      <li class="draft">
        <a href="edit.php?post_status=draft&amp;post_type=post"
          >草稿<span class="count">（3）</span></a
        >
        |
      </li>
      <li class="pending">
        <a href="edit.php?post_status=pending&amp;post_type=post"
          >待审<span class="count">（2）</span></a
        >
        |
      </li>
      <li class="trash">
        <a href="edit.php?post_status=trash&amp;post_type=post"
          >回收站<span class="count">（5）</span></a
        >
      </li>
    </ul>
    <el-form>
      <el-form-item>
        <p class="search-box">
          <el-input
            style="width:auto"
            v-model="searchCategory"
            size="mini"
          ></el-input>
          <el-button size="mini" @click="handleSearch">搜索分类目录</el-button>
          <el-button
            class="control"
            @click="drawer = true"
            type="primary"
            size="mini"
            >显示选项</el-button
          >
        </p>
      </el-form-item>
      <Operation v-on:getCategory="getCategory" />

      <el-table
        :data="category"
        @selection-change="handleChange"
        :row-class-name="tableRowClassName"
        style="width: 100%"
      >
        <el-table-column :selectable="selectable" type="selection" width="45">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="400">
          <template slot-scope="scope">
            <img :src="scope.row.pic" style="width: 50px;height: 50px" />
          </template>
        </el-table-column>
        <el-table-column sortable prop="author" label="作者">
          <template slot-scope="scope">
            <router-link :to="'/edit/category-detail/' + scope.row._id">
              {{ scope.row.category }}</router-link
            >
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="category"
          label="分类目录"
        ></el-table-column>
        <el-table-column sortable prop="comment" label="评论"></el-table-column>
        <el-table-column sortable prop="date" label="日期"></el-table-column>

        <el-table-column sortable prop="click_sum" label="点击数">
          <template slot-scope="scope">
            <router-link :to="'/edit/all-essay/' + scope.row.category">
              {{ scope.row.category }}</router-link
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <Operation v-on:getCategory="getCategory" />
    <el-drawer :visible.sync="drawer">
      <SettingForm />
    </el-drawer>
  </div>
</template>

<script>
import Operation from './components/operation'
import SettingForm from './components/settingForm'
export default {
  components: { Operation, SettingForm },
  data() {
    return {
      drawer: false,
      searchCategory: '',
      category: [],
    }
  },
  methods: {
    handleSearch() {},
    getCategory() {},
    selectable(row, index) {
      if (row.category !== '未分类') return true
      else {
        return false
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) 'warning-row'
      else {
        return 'success-row'
      }
      return ''
    },
    handleChange() {}
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
