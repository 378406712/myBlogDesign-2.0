import * as Api from '@/api/homepage'
const SET_DEVICES = 'SET_DEVICES'
const DEL_DEVICES = 'DEL_DEVICES'
const homepage = {
  state: {
    //存储共有数据
    devices: []
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
      console.log(payload)
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
    [SET_DEVICES](state, devices) {
      state.devices.push(...devices.reverse())
   
    },
    [DEL_DEVICES](state,index){
      state.devices.splice(index,1)
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
          commit(SET_DEVICES, data)
          return resolve()
        }).catch(err => reject(err))
      })
    },
    deleteDevices({commit}, val) {
     
      return new Promise((resolve, reject) => {
        Api.deleteDevices(val._id).then(() => {
          commit(DEL_DEVICES, val.index)
            return resolve()
          })

          .catch(err => reject(err))
      })
    }
  },

}

export default homepage;
