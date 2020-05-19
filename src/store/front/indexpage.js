import { getBg, setBg } from '@/common/select-bg'
import * as Api from '@/api/front/front-essay'
const FRONT_ESSAY_LIST = 'FRONT_ESSAY_LIST'
const indexpage = {
  state: {
    showTools: false,
    setting_flag: false,
    bodyBg: getBg() || 'sakura',
    FrontEssay: []
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
    },
    [FRONT_ESSAY_LIST](state, essay) {
      state.FrontEssay = essay.reverse()
    }
  },
  actions: {
    //获取所有已发送文章列表
    FrontEssay({ commit }, keyword) {
      return new Promise((resolve, reject) => {
        Api.GetEssayList(keyword)
          .then((res) => {
            commit(FRONT_ESSAY_LIST, res.data)
            resolve()
          })
          .catch((err) => reject(err))
      })
    }
  }
}

export default indexpage
