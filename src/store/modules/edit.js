import * as Api from '@/api/edit'
const GET_STATUS = 'GET_STATUS'
const GET_CATEGORY = 'GET_CATEGORY'
const GET_MEDIA = 'GET_MEDIA'
const MEDIA_DETAIL = 'MEDIA_DETAIL'
const MEDIA_DATE = 'MEDIA_DATE'
const MEDIA_ID = 'MEDIA_ID'
const SPECIAL_BG = 'SPECIAL_BG'
const SHOW_DIALOG = 'SHOW_DIALOG'
const CATEGORY_CHECK = 'CATEGORY_CHECK'
const GET_CATEGORY_C = 'GET_CATEGORY_C'
const SET_PAGES_C = 'SET_PAGES_C'
const SET_SIZES_C = 'SET_SIZES_C'
const SET_TOTALS_C = 'SET_TOTALS_C'
const ESSAY = 'ESSAY'
const Edit = {
  state: {
    essay: {
      showPass: false,
      essayPassword: '',
      radioVisible: 'public',
      showVisible: '公开',
      keepTop: false,
      reCheck: false,
      commentOn: true,
      draft: false,
      trash: false,
      sended:true,
      visible: [
        { status: 'public', info: '所有人可见。', title: '公开' },
        {
          status: 'private',
          info: '只有站点管理员和编辑可见。',
          title: '私密'
        },
        {
          status: 'protect',
          info: '受您选择的密码保护，只有持有密码的人士可查看此文章。',
          title: '密码保护'
        }
      ]
    },
    category: [],
    category_c: [],
    media: [],
    detail: {},
    tempDir: {},
    date: [],
    id: '',
    showDialog: false,
    special_bg: '',
    check: false,
    pages: 1,
    sizes: 8,
    totals: 0
  },

  mutations: {
    [ESSAY](state, essay) {
      state.essay = essay
    },
    [GET_STATUS](state, status) {
      state.status = status
    },
    [GET_CATEGORY](state, category) {
      state.category = category
    },
    [GET_CATEGORY_C](state, category) {
      //先判断slice后的数组长度是否为0，是，则将pages-1，返回新的state.category
      //这里的pages已经变更
      let data = category.slice(
        state.sizes * (state.pages - 1),
        state.sizes * state.pages
      )

      state.category_c = category.slice(
        state.sizes * (state.pages - 1),
        state.sizes * state.pages
      )
      if (data.length === 0) {
        state.pages -= 1
        state.category_c = category
      }
    },
    [GET_MEDIA](state, media) {
      state.media = media
    },
    [MEDIA_DETAIL](state, detail) {
      state.detail = detail
      state.id = detail._id
    },
    [MEDIA_DATE](state, date) {
      state.date = date
    },
    [MEDIA_ID](state, id) {
      state.id = id
    },
    [SPECIAL_BG](state, bg) {
      state.special_bg = bg
    },
    [SHOW_DIALOG](state, dialog) {
      state.showDialog = dialog
    },
    [CATEGORY_CHECK](state, check) {
      state.check = check
    },
    [SET_PAGES_C](state, pages) {
      state.pages = pages
    },
    [SET_SIZES_C](state, sizes) {
      state.sizes = sizes
    },
    [SET_TOTALS_C](state, totals) {
      state.totals = totals
    }
  },
  actions: {
    GetEssayNew({ commit }, keyword) {
      return new Promise((resolve, reject) => {
        Api.GetEssay(keyword)
          .then((res) => {
            commit(ESSAY, res.data)
            resolve()
          })
          .catch((err) => reject(err))
      })
    },
    PostEssay({ commit }, EssayData) {
      return new Promise((resolve, reject) => {
        Api.PostEssay(EssayData).then((res) => {
          commit(GET_STATUS, res.data.status)
          resolve()
        }).catch(err => {
          return reject(err)
        })
      })
    },
    SetCategory({ commit }, CategoryData) {
      return new Promise((resolve, reject) => {
        Api.SetCategory(CategoryData)
          .then((res) => {
            commit(CATEGORY_CHECK, res.data)
            resolve()
          })
          .catch(() => reject())
      })
    },
    GetCategory({ commit }, username) {
      return new Promise((resolve, reject) => {
        Api.GetCategory(username).then((res) => {
          commit(GET_CATEGORY, res.data)
          commit(GET_CATEGORY_C, res.data)
          commit(SET_TOTALS_C, res.data.length)
          resolve()
        }).catch(err => {
          return reject(err)
        })
      })
    },
    GetMedia({ commit }, data) {
      return new Promise((resolve, reject) => {
        Api.GetMedia(data)
          .then((res) => {
            commit(GET_MEDIA, res.data.reverse())
            resolve()
          })
          .then(() => reject())
      })
    },
    MediaDetail({ commit }, detail) {
      return new Promise((resolve, reject) => {
        Api.MediaDetail(detail)
          .then((res) => {
            commit(MEDIA_DETAIL, res.data)
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    ChangeDetail({ commit }, single_media) {
      return new Promise((resolve, reject) => {
        Api.ChangeMedia(single_media).then((res) => {
          commit(MEDIA_DETAIL, res.data)
          resolve()
        }).catch(err => {
          return reject(err)
        })
      })
    },
    GetDate({ commit }, username) {
      return new Promise((resolve, reject) => {
        Api.GetDate(username).then((res) => {
          commit(MEDIA_DATE, res.data)
          resolve()
        }).catch(err => {
          return reject(err)
        })
      })
    },
    SearchMedia({ commit }, keywords) {
      return new Promise((resolve, reject) => {
        Api.SearchMedia(keywords).then((res) => {
          commit('GET_MEDIA', res.data)
          resolve()
        }).catch(err => {
          return reject(err)
        })
      })
    },
    RemoveMedia({ commit }, id) {
      return new Promise((resolve, reject) => {
        Api.RemoveMedia(id).then((res) => {
          commit(GET_STATUS, res.data.status)
          commit(MEDIA_DETAIL, {})
          resolve()
        }).catch(err => {
          return reject(err)
        })
      })
    },
    SearchCategory({ commit }, keywords) {
      return new Promise((resolve, reject) => {
        Api.SearchCategory(keywords).then((res) => {
          commit(GET_CATEGORY, res.data)
          resolve()
        }).catch(err => {
          return reject(err)
        })
      })
    },
    AllCategoryCount({ commit }, username) {
      return new Promise((resolve, reject) => {
        Api.CategoryCountAll(username).then((res) => {
          commit(GET_CATEGORY, res.data)
          commit(GET_CATEGORY_C, res.data)
          resolve()
        }).catch(err => {
          return reject(err)
        })
      })
    },
    SearchCategory_c({ commit }, keywords) {
      return new Promise((resolve, reject) => {
        Api.SearchCategory(keywords).then((res) => {
          commit(GET_CATEGORY_C, res.data)
          resolve()
        }).catch(err => {
          return reject(err)
        })
      })
    }
  }
}
export default Edit
