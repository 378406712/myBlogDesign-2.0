import * as Api from '@/api/front/front-essay'
const GET_BOKE_ESSAY = 'GET_BOKE_ESSAY'
const bokepage = {
  state: {
    boke_essay: {},
    boke_essay_this: {},
    boke_essay_previous: {},
    boke_essay_next: {}
  },
  mutations: {
    [GET_BOKE_ESSAY](state, boke_essay) {
      // state.boke_essay = boke_essay
      const boke = JSON.parse(JSON.stringify(boke_essay))
      boke.map((item) => {
        const keys = Object.keys(item)[0]
        switch (keys) {
          case 'now':
            state.boke_essay_this = item[keys][0]
            break
          case 'previous':
            state.boke_essay_previous = item[keys][0]
            break
          case 'next':
            state.boke_essay_next = item[keys][0]
            break
        }
      })
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
