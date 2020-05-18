import * as Api from '@/api/front/front-essay'
const GET_BOKE_ESSAY = 'GET_BOKE_ESSAY'
const bokepage = {
  state: {
    boke_essay: {}
  },
  mutations: {
    [GET_BOKE_ESSAY](state, boke_essay) {
      state.boke_essay = boke_essay
    }
  },
  actions: {
    //文章
    getBokeEssay({ commit }, keywords) {
      return new Promise((resolve, reject) => {
        Api.GetBokeEssay(keywords)
          .then((res) => {
            commit(GET_BOKE_ESSAY, res.data)
            resolve()
          })
          .catch((err) => reject(err))
      })
    }
  }
}

export default bokepage
