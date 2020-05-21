import { getBg, setBg } from '@/common/select-bg'
import * as Api from '@/api/front/front-essay'
const FRONT_ESSAY_LIST = 'FRONT_ESSAY_LIST'
const SEARCH_ESSAY_LIST = 'SEARCH_ESSAY_LIST'
const indexpage = {
  state: {
    showTools: false,
    setting_flag: false,
    bodyBg: getBg() || 'sakura',
    FrontEssay: [],
    SearchEssayList: []
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
    },
    [SEARCH_ESSAY_LIST](state, essay) {
      state.SearchEssayList = essay
      console.log(state.SearchEssayList)
    }
  },
  actions: {
    //获取所有已发送文章列表
    FrontEssay({ commit }, keyword) {
      return new Promise((resolve, reject) => {
        Api.GetEssayList(keyword)
          .then((res) => {
            commit(FRONT_ESSAY_LIST, res.data)
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    SearchEssayFront({ commit }, keyword) {
      return new Promise((resolve, reject) => {
        Api.searchEssay(keyword)
          .then((res) => {
            resolve(res.data)
          })
          .catch((err) => reject(err))
      })
    }
  }
}

export default indexpage
