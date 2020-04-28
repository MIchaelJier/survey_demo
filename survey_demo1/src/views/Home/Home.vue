<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <van-nav-bar title="问卷调查" fixed placeholder>
      <template #right>
        <router-link to="search" class="search-link">
          <van-icon name="search" size="18" />
        </router-link>
      </template>
      <template #left>
        <van-icon
          name="user-circle-o"
          size="18"
          @click="state.popupShow = !state.popupShow"
        />
        <!-- plus -->
      </template>
    </van-nav-bar>
    <van-pull-refresh v-model="state.isLoading" @refresh="onRefresh">
      <van-list
        v-model="state.loading"
        :finished="state.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="item in state.list" :key="item.id" style="background: #fff">
          <list-item :itemData="item"></list-item>
        </div>
        <!-- <van-cell v-for="item in list" :key="item" :title="item"/> -->
      </van-list>
    </van-pull-refresh>
    <!-- 用户信息弹出层 -->
    <van-popup
      v-model="state.popupShow"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
    >
      <div class="login_box" v-if="!state.isLogin">
        <van-button
          color="linear-gradient(to right, #00f079, #00c061)"
          to="/login?type=1"
          >登录</van-button
        >
        <van-button
          color="linear-gradient(to right, #4bb0ff, #6149f6)"
          to="/login?type=2"
          >注册</van-button
        >
      </div>
      <div class="user_box" v-else>
        <img src="@/assets/images/unLogin.png" alt="" class="user_box-header" />
        <p class="user_box-email">{{ state.userInfo.email }}</p>
        <van-button
          color="linear-gradient(to right, #4bb0ff, #6149f6)"
          size="small"
          round
          @click="signOut"
        >
          退出登录
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { reactive, onMounted, computed, watch } from 'vue-function-api';
import listItem from '@/components/listItem/index';
export default {
  components: {
    listItem
  },
  setup(props, ctx) {
    const state = reactive({
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      reqMax: 10,
      isLogin: computed(() => ctx.store.getters.IsLogin),
      userInfo: {},
      popupShow: false
    });
    function dataReq(first = false) {
      ctx.api.index_recommend().then(res => {
        console.log(res);
        const addList = res.data.list;
        if (first) {
          state.list = addList;
        } else {
          state.list.push(...addList);
        }
        if (addList.length < state.reqMax) {
          state.finished = true;
        }
        state.loading = false;
      });
    }
    function onLoad() {
      setTimeout(() => {
        dataReq();
      }, 1000);
    }
    function onRefresh() {
      setTimeout(() => {
        state.isLoading = false;
        dataReq(true);
      }, 1000);
    }
    // 获取用户信息
    function getUserInfo(vaule) {
      if (vaule) {
        state.userInfo = ctx.store.getters.allInfo;
      }
    }
    // 退出登录
    function signOut() {
      ctx.store.commit('clearUserInfo');
      localStorage.removeItem('survey_userInfo');
      state.popupShow = false;
    }

    onMounted(() => {
      getUserInfo(state.isLogin);
    });

    watch(
      () => state.isLogin,
      vaule => {
        getUserInfo(vaule);
      }
    );

    return {
      state,

      dataReq,
      onLoad,
      onRefresh,
      signOut
    };
  }
};
</script>

<style scoped lang="scss">
@import './Home.scss';
</style>
