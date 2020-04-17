import * as Api from '@/api/category'
const SET_SELECTION = 'SET_SELECTION'
const ESSAY_LIST = 'ESSAY_LIST'
const Category = {
  state: {
    selection: [],
    essayList: []
  },
  mutations: {
    [SET_SELECTION](state, selection) {
      state.selection = selection
    },
    [ESSAY_LIST](state, essayList) {
      state.essayList = essayList
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
    }
  }
}
export default Category
