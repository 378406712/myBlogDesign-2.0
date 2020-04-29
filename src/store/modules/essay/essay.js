import * as Api from '@/api/essay'
const ESSAY_LIST = 'ESSAY_LIST'
const ESSAY_STATUS = 'ESSAY_STATUS'
const Essay = {
  state: {
    essayList: [],
    num: { all: 0, sended: 0, pend: 0, trash: 0 }
  },
  mutations: {
    [ESSAY_LIST](state, essayList) {
      state.essayList = essayList
    },
    [ESSAY_STATUS](state, essayList) {
      state.num.all = essayList.length
      const reCheckNum = []
      essayList.map(item => {
        if (item.reCheck === true) {
          reCheckNum.push(item)
        }
      })
      state.num.pend = reCheckNum.length
      state.num.sended = essayList.length - reCheckNum.length
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
            commit('ESSAY_STATUS', res.data)

            resolve()
          })
          .catch(err => reject(err))
      })
    },
    SearchEssay({ commit }, keywords) {
        return new Promise((resolve, reject) => {
          Api.SearchEssay(keywords).then(res => {
            commit(ESSAY_LIST, res.data)
            resolve()
          })
        })
      }
  }
}
export default Essay
