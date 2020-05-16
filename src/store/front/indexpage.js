import { getBg, setBg } from '@/common/select-bg'

const indexpage = {
  state: {
    showTools: false,
    setting_flag: false,
    bodyBg: getBg() || 'sakura'
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
      setBg(bg)
    }
  }
}

export default indexpage
