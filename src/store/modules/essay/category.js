import * as Api from '@/api/category'
const SET_SELECTION = 'SET_SELECTION'
const Category = {
  state: {
    selection: []
  },
  mutations: {
    [SET_SELECTION](state, selection) {
      state.selection = selection
    }
  },
  actions: {
    BatchDeleteCategory({ commit }, key) {
      console.log(key)
      return new Promise((resolve, reject) => {
        Api.BatchDeleteCategory(key)
          .then(res => {
            console.log(res.data)
            resolve()
          })
          .catch(err => reject(err))
      })
    }
  }
}
export default Category
