import * as Api from '@/api/homepage'
import {
  MUSIC
} from '@/helper/const'
const GET_DEVICES = 'GET_DEVICES'
const GET_MUSIU = 'GET_MUSIC'
const homepage = {
  state: {
    //存储共有数据
    devices: [],
    music: MUSIC
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
      state.devices = devices.reverse()
    },
    [GET_MUSIU](state, music) {
      state.music.push(music)
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
    }
  },

}

export default homepage;
