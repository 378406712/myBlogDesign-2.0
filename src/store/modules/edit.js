import * as Api from '@/api/edit'
//const SET_PIC = 'SET_PIC'
const GET_STATUS = 'GET_STATUS'
const SET_CATEGORY = 'SET_CATEGORY'
const GET_CATEGORY = 'GET_CATEGORY'
const GET_MEDIA = 'GET_MEDIA'
const MEDIA_DETAIL = 'MEDIA_DETAIL'
const Edit = {
  state: {
    status: '',
    category: [],
    media: [],
    detail: {},
    id: ''
  },
  mutations: {
    [GET_STATUS](state, status) {
      state.status = status
    },
    [GET_CATEGORY](state, category) {
      state.category = category
    },
    [GET_MEDIA](state, media) {
      state.media = media
    },
    [MEDIA_DETAIL](state, detail) {
      state.detail = detail
      console.log(state.detail)
    }
  },
  actions: {
    PostEssay({ commit }, EssayData) {
      return new Promise((resolve, reject) => {
        Api.PostEssay(EssayData).then(res => {
          commit(GET_STATUS, res.data.status)
          resolve()
        })
      })
    },
    SetCategory({}, CategoryData) {
      return new Promise((resolve, reject) => {
        Api.SetCategory(CategoryData).then(res => {
          console.log(res.data.status)
          // commit(SET_CATEGORY, res.data)
          resolve()
        })
      })
    },
    GetCategory({ commit }, username) {
      return new Promise((resolve, reject) => {
        Api.GetCategory(username).then(res => {
          console.log(res.data)
          commit(GET_CATEGORY, res.data)
          resolve()
        })
      })
    },
    GetMedia({ commit }, username) {
      return new Promise((resolve, reject) => {
        Api.GetMedia(username)
          .then(res => {
            commit(GET_MEDIA, res.data.reverse())
            resolve()
          })
          .then(() => reject())
      })
    },
    MediaDetail({ commit }, detail) {
      return new Promise((resolve, reject) => {
        Api.MediaDetail(detail)
          .then(res => {
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
        Api.ChangeMedia(single_media).then(res => {
          commit(MEDIA_DETAIL, res.data)
          resolve()
        })
      })
    }
  }
}
export default Edit
