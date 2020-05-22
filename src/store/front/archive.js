import * as Api from '@/api/front/front-essay'
const ARCHIVE = 'ARCHIVE'
const archive = {
  state: {
    archive: []
  },
  mutations: {
    [ARCHIVE](state, archive) {
      state.archive = archive
      console.log(state.archive)
    }
  },
  actions: {
    getArchive({ commit }, data) {
      return new Promise((resolve, reject) => {
        Api.getTimeAxis(data)
          .then((res) => {
            //commit(ARCHIVE, res.data)
            resolve(res.data)
          })
          .catch((err) => {
            reject()
          })
      })
    }
  }
}

export default archive
