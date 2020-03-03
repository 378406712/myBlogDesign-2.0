const center = {
  state: {
    //存储共有数据
    flag: true,
    avatar: null,
    slider: 0,
    setting: {
      username: "",
      e_mail: "",
      alterPass: 0,
      updateData: 0,
      editEssay: 0,
      readComment: 0,
      loginCounts: 0
    }
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
    }
  }
}

export default center;
