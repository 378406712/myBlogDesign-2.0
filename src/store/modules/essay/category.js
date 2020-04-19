import * as Api from '@/api/category'
const SET_SELECTION = 'SET_SELECTION'
const ESSAY_LIST = 'ESSAY_LIST'
const SET_PAGES_C = 'SET_PAGES_C'
const SET_SIZES_C = 'SET_SIZES_C'
const SET_TOTALS_C = 'SET_TOTALS_C'
const GET_CATEGORY_C = 'GET_CATEGORY_C'
const Category = {
  state: {
    category: [],
    selection: [],
    essayList: [],
    pages: 1,
    sizes: 8,
    totals: 0
  },
  mutations: {
    [SET_SELECTION](state, selection) {
      state.selection = selection
    },
    [ESSAY_LIST](state, essayList) {
      state.essayList = essayList
    },
    [GET_CATEGORY_C](state, category) {
      //先判断slice后的数组长度是否为0，是，则将pages-1，返回新的state.category
      //这里的pages已经变更
      let data = category.slice(
        state.sizes * (state.pages - 1),
        state.sizes * state.pages
      )
      if (data.length === 0) {
        state.pages -= 1
      }
      state.category = category.slice(
        state.sizes * (state.pages - 1),
        state.sizes * state.pages
      )
    },
    [SET_PAGES_C](state, pages) {
      state.pages = pages
    },
    [SET_SIZES_C](state, sizes) {
      state.sizes = sizes
    },
    [SET_TOTALS_C](state, totals) {
      state.totals = totals
    }
  },
  actions: {
    BatchDeleteCategory({ commit }, key) {
      return new Promise((resolve, reject) => {
        Api.BatchDeleteCategory(key)
          .then(() => {
            resolve()
          })
          .catch(err => reject(err))
      })
    },
    GetEssay({ commit }, keywords) {
      return new Promise((resolve, reject) => {
        Api.GetEssay(keywords)
          .then(res => {
            commit('ESSAY_LIST', res.data)
            resolve()
          })
          .catch(err => reject(err))
      })
    },
    setCategory_c({ commit }, CategoryData) {
      return new Promise((resolve, reject) => {
        Api.SetCategory(CategoryData).then(res => {
          // commit(CATEGORY_CHECK, res.data)
          resolve()
        })
      })
    },
    getCategory_c({ commit }, username) {
      return new Promise((resolve, reject) => {
        Api.GetCategory(username).then(res => {
          commit(GET_CATEGORY_C, res.data)
          commit(SET_TOTALS_C, res.data.length)
          resolve()
        })
      })
    }
  }
}
export default Category
