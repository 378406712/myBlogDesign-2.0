import {
  devices
} from '@/api/homepage'
const SET_DEVICES = 'SET_DEVICES'
const homepage = {
  state: {
    //存储共有数据
    devices:[]
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
    [SET_DEVICES](state,devices){
      state.devices.push(...devices)
    }
   
  },
  actions:{
    getDevieces({commit},username){
      return new Promise((resolve,reject)=>{
        devices({username}).then(res=>{
          const {data} =res
         commit(SET_DEVICES,data)
        })
      })
    }
  },

}

export default homepage;
