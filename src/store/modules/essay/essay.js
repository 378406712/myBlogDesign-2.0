import * as Api from '@/api/essay'
const ESSAY_LIST = 'ESSAY_LIST'
const ESSAY_STATUS = 'ESSAY_STATUS'
const ESSAY_PAGES = 'ESSAY_PAGES'
const ESSAY_SIZES = 'ESSAY_SIZES'
const ESSAY_TOTALS = 'ESSAY_TOTALS'
const SET_SELECTION = 'SET_SELECTION'
const ESSAY_DATE = 'ESSAY_DATE'
const GET_CATEGORY = 'GET_CATEGORY'
const SETTING = 'SETTING'
const TABLOID = 'TABLOID'
const Essay = {
  state: {
    essayList: [],
    selection: [],
    category: [],
    date: [],
    num: { all: 0, sended: 0, pend: 0, trash: 0 },
    pages: 1,
    sizes: 8,
    totals: 0,
    setting:['分类目录', '评论', '日期', '点击数'],
    tabloid: 'tabloid-view',
  },
  mutations: {
    [SETTING](state, setting) {
      state.setting = setting
    },
    [TABLOID](state, tabloid) {
      state.tabloid = tabloid
    },

    [GET_CATEGORY](state, category) {
      state.category = category
    },
    [SET_SELECTION](state, selection) {
      state.selection = selection
    },
    [ESSAY_LIST](state, essayList) {
      //先判断slice后的数组长度是否为0，是，则将pages-1，返回新的state.category
      //这里的pages已经变更
      let data = essayList.slice(
        state.sizes * (state.pages - 1),
        state.sizes * state.pages
      )
      state.essayList = essayList.slice(
        state.sizes * (state.pages - 1),
        state.sizes * state.pages
      )
      if (data.length === 0) {
        state.pages -= 1
        state.essayList = essayList
      }
    },
    [ESSAY_DATE](state, date) {
      state.date = date
    },
    [ESSAY_STATUS](state, essayList) {
      state.num.all = essayList.length
      const reCheckNum = []
      essayList.map((item) => {
        if (item.reCheck === true) {
          reCheckNum.push(item)
        }
      })
      state.num.pend = reCheckNum.length
      state.num.sended = essayList.length - reCheckNum.length
    },
    [ESSAY_PAGES](state, pages) {
      state.pages = pages
    },
    [ESSAY_SIZES](state, sizes) {
      state.sizes = sizes
    },
    [ESSAY_TOTALS](state, totals) {
      state.totals = totals
    },
  },
  actions: {
    BatchDeleteEssay({ commit }, key) {
      return new Promise((resolve, reject) => {
        Api.BatchDeleteEssay(key)
          .then(() => {
            resolve()
          })
          .catch((err) => reject(err))
      })
    },
    //文章
    GetEssay({ commit }, keywords) {
      return new Promise((resolve, reject) => {
        Api.GetEssay(keywords)
          .then((res) => {
            commit(ESSAY_LIST, res.data)
            commit(ESSAY_STATUS, res.data)
            commit(ESSAY_TOTALS, res.data.length)

            resolve()
          })
          .catch((err) => reject(err))
      })
    },
    SearchEssay({ commit }, keywords) {
      return new Promise((resolve, reject) => {
        Api.SearchEssay(keywords).then((res) => {
          commit(ESSAY_LIST, res.data)
          resolve()
        })
      })
    },
    EssayDate({ commit }, username) {
      return new Promise((resolve, reject) => {
        Api.EssayDate(username).then((res) => {
          commit(ESSAY_DATE, res.data)
          resolve()
        })
      })
    },
    EssayCategory({ commit }, username) {
      return new Promise((resolve, reject) => {
        Api.GetCategory(username).then((res) => {
          commit(GET_CATEGORY, res.data)
          resolve()
        })
      })
    },
    FilterEssay({ commit }, keywords) {
      return new Promise((resolve, reject) => {
        Api.FilterEssay(keywords).then((res) => {
          commit(ESSAY_LIST, res.data)
        })
        resolve()
      })
    },
  },
}
export default Essay
