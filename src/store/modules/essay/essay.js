import * as Api from '@/api/essay'
const ESSAY_LIST = 'ESSAY_LIST'

const Essay = {
  state: {
    essayList: [],
  },
  mutations: {
    [ESSAY_LIST](state, essayList) {
      state.essayList = essayList

    }
  },
  actions: {
    // BatchDeleteCategory({ commit }, key) {
    //   return new Promise((resolve, reject) => {
    //     Api.BatchDeleteCategory(key)
    //       .then(() => {
    //         resolve()
    //       })
    //       .catch(err => reject(err))
    //   })
    // },
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
    }
  }
}
export default Essay
