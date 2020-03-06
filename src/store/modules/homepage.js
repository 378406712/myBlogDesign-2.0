import * as Api from '@/api/homepage'
import {
  MUSIC
} from '@/helper/const'
const GET_DEVICES = 'GET_DEVICES'
const GET_MUSIU = 'GET_MUSIC'
const SET_PAGES = 'SET_PAGES'
const SET_SIZES = 'SET_SIZES'
const SET_TOTALS = 'SET_TOTALS'
const homepage = {
  state: {
    //存储共有数据
    devices: [],
    music: MUSIC,
    pages: 1,
    sizes: 8,
    totals:0
  },
  mutations: {
    initstoreList(state, payload) {
      state.flag = payload;
    },
    sliderList(state, payload) {
      state.slider = payload;

      sessionStorage.setItem("sliderStatus", payload);
    },
    userAvatar(state, payload) {
      state.avatar = payload;
    },
    settingList(state, payload) {
      let data = payload.data;
      if (payload.mode) {
        Object.keys(state.setting).forEach(key => {
          if (payload.mode == key) {
            state.setting[key] += data;
            if (payload.mode == "loginCounts") {
              state.setting.loginCounts = data;
            }
            state.setting.username = payload.username;
            state.setting.e_mail = payload.e_mail
          }
        });
      } else {
        state.setting = payload;
      }
    },
    [GET_DEVICES](state, devices) {
      state.devices = devices.reverse().slice(state.sizes * (state.pages - 1), state.sizes * state.pages)
    },
    [GET_MUSIU](state, music) {
      state.music.push(music)
    },
    [SET_PAGES](state, pages) {
      state.pages = pages
    },
    [SET_SIZES](state, sizes) {
      state.sizes = sizes
    },
    [SET_TOTALS](state,totals){
      state.totals = totals
      console.log(state.totals)
    }
  },
  actions: {
    getDevieces({
      commit
    }, username) {
      return new Promise((resolve, reject) => {
        Api.devices({
          username
        }).then(res => {
          const {
            data
          } = res

          commit(GET_DEVICES, data)
          commit (SET_TOTALS,data.length)
          return resolve()
        }).catch(err => reject(err))
      })
    },
    deleteDevices({}, val) {
      return new Promise((resolve, reject) => {
        Api.deleteDevices(val._id).then(() => resolve())
          .catch(err => reject(err))
      })
    },
    BatchDeleteDevices({}, key) {
      return new Promise((resolve, reject) => {
        Api.BatchDeleteDevices(key).then(() => resolve())
          .catch(err => reject(err))
      })
    },
    // changePages({
    //   commit
    // }, pages) {
    //   return new Promise((resolve, reject) => {
    //     commit(SET_PAGE, pages)
    //     commit(GET_DEVICES)
    //     resolve()
    //   })
    // },
    // changeSizes({
    //   commit
    // }, sizes) {
    //   return new Promise((resolve, reject) => {
    //     commit(SET_SIZES, sizes)
    //     commit(GET_DEVICES)
    //     resolve()
    //   })
    // }
  },

}

export default homepage;
