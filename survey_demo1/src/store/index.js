import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
    getUserInfo(state) {
      const u = JSON.parse(localStorage.getItem('survey_userInfo'));
      if (u && Object.keys(u).length !== 0) {
        state.userInfo = u;
      }
    },
    clearUserInfo(state) {
      state.userInfo = {};
    }
  },
  getters: {
    // 获取登录信息
    allInfo: state => state.userInfo,
    // 获取登录状态
    IsLogin: state => Object.keys(state.userInfo).length !== 0
  },
  actions: {},
  modules: {}
});
