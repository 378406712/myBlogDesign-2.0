const indexpage = {
  state: {
    showTools: false,
    setting_flag: false,
    bodyBg: 'sakura'
  },
  mutations: {
    toShowTools(state, bool) {
      state.showTools = bool
    },
    toShowFlag(state, bool) {
      state.setting_flag = bool
    },
    changeBodyBg(state, bg) {
      state.bodyBg = bg
    }
  }
}

export default indexpage
