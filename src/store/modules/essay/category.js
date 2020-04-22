import * as Api from '@/api/category'
const SET_SELECTION = 'SET_SELECTION'
const ESSAY_LIST = 'ESSAY_LIST'

const GET_CATEGORY_DETAIL = 'GET_CATEGORY_DETAIL'
const CATEGORY_PIC = 'CATEGORY_PIC'
const Category = {
  state: {
    category: [],
    selection: [],
    essayList: [],

    detail: {
      category: '',
      alias: '',
      desc: '',
      pic: '',
      sum: 0
    }
  },
  mutations: {
    [SET_SELECTION](state, selection) {
      state.selection = selection
    },
    [ESSAY_LIST](state, essayList) {
      state.essayList = essayList
    },

    [GET_CATEGORY_DETAIL](state, detail) {
      state.detail = detail
    },
    [CATEGORY_PIC](state, pic) {
      state.detail.pic = pic
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
    //文章
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
    GetCategoryDetail({ commit }, id) {
      return new Promise((resolve, reject) => {
        Api.GetCategoryDetail(id)
          .then(res => {
            commit('GET_CATEGORY_DETAIL', res.data)
            resolve()
          })
          .catch(() => reject())
      })
    },
    updateCategory({ commit }, data) {
      return new Promise((resolve, reject) => {
        Api.alterCategory(data)
          .then(res => {
            commit('GET_CATEGORY_DETAIL', res.data)
            resolve()
          })
          .catch(() => reject())
      })
    }
  }
}
export default Category
