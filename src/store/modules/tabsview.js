const SET_TABSVIEW = 'SET_TABSVIEW'
const DEL_TABSVIEW = 'DEL_TABSVIEW'

const tabsview = {
  state: {
    visitedTabsView: [],
    cachedViews: []
  },
  mutations: {
    [SET_TABSVIEW](state, view) {
      if (state.visitedTabsView.find((n) => n.path === view.path)) {
        return
      }
      state.visitedTabsView.push({ name: view.meta.title, path: view.path })
    },
    [DEL_TABSVIEW](state, view) {
      for (let [i, v] of state.visitedTabsView.entries()) {
        if (v.path === view.path || v.name === view.name) {
          state.visitedTabsView.splice(i, 1)
        }
      }
    },
    ADD_CACHED_VIEW: (state, view) => {
      if (state.cachedViews.includes(view.name)) return
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
        console.log(state.cachedViews)
      }
    }
  },
  actions: {
    // 添加一个新的tabsView
    addVisitedTabsView({ commit }, view) {
      commit(SET_TABSVIEW, view)
      commit('ADD_CACHED_VIEW', view)
    },
    // 关闭一个tabsView
    delVisitedTabsView({ commit, state }, view) {
      return new Promise((resolve, reject) => {
        commit(DEL_TABSVIEW, view)
        resolve([...state.visitedTabsView])
      })
    }
  },
  getters: {
    visitedTabsView: (state) => state.visitedTabsView
  }
}

export default tabsview
