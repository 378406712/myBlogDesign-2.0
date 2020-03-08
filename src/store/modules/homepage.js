import * as Api from '@/api/homepage'
import {
  MUSIC
} from '@/helper/const'
const GET_DEVICES = 'GET_DEVICES'
const GET_MUSIU = 'GET_MUSIC'
const SET_PAGES = 'SET_PAGES'
const SET_SIZES = 'SET_SIZES'
const SET_TOTALS = 'SET_TOTALS'
const SET_DETAIL = 'SET_DETAIL'
const homepage = {
  state: {
    //存储共有数据
    devices: [],
    music: MUSIC,
    pages: 1,
    sizes: 8,
    totals: 0,
    details: {}
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
      //先判断slice后的数组长度是否为0，是，则将pages-1，返回新的state.decice
      //这里的pages已经变更
      let data = devices.reverse().slice(state.sizes * (state.pages - 1), state.sizes * state.pages)
      if (data.length === 0) {
        state.pages -= 1
      }
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
    [SET_TOTALS](state, totals) {
      state.totals = totals
    },
    [SET_DETAIL](state, details) {
      state.details = details
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
          commit(SET_TOTALS, data.length)
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
    getDetails({
      commit
    }, username) {
      return  new Promise((resolve,reject)=>{
        Api.getUserInfo(username).then((res)=>{
          console.log(res)
        })
      })
    }

  },

}

export default homepage;
