<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <van-nav-bar :title="state.isShowMySurvey ? '问卷结果统计':'问卷调查'"
                 fixed
                 placeholder>
      <template #right>
        <router-link to="search"
                     class="search-link">
          <van-icon name="search"
                    size="18" />
        </router-link>
      </template>
      <template #left>
        <van-icon name="user-circle-o"
                  size="18"
                  @click="state.popupShow = !state.popupShow" />
      </template>
    </van-nav-bar>
    <van-pull-refresh v-model="state.isLoading"
                      @refresh="onRefresh">
      <van-list v-model="state.loading"
                :finished="state.finished"
                finished-text="没有更多了"
                @load="onLoad"
                ref="list">
        <div v-for="item in state.list"
             :key="item.id"
             style="background: #fff">
          <list-item :itemData="item"
                     :goPage=" state.isShowMySurvey ? '/show' : '/about'"></list-item>
        </div>
        <!-- <van-cell v-for="item in list" :key="item" :title="item"/> -->
      </van-list>
    </van-pull-refresh>
    <!-- 用户信息弹出层 -->
    <van-popup v-model="state.popupShow"
               closeable
               position="bottom"
               :style="{ height: state.isLogin ? '50%' : '30%' }">
      <div class="login_box"
           v-if="!state.isLogin">
        <van-button color="linear-gradient(to right, #00f079, #00c061)"
                    to="/login?type=1">登录</van-button>
        <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)"
                    to="/login?type=2">注册</van-button>
      </div>
      <div class="user_box"
           v-else>
        <img src="@/assets/images/unLogin.png"
             alt=""
             class="user_box-header" />

        <p class="user_box-email">{{ state.userInfo.email }}</p>
        <van-cell-group>
          <van-cell title="我的问卷统计"
                    is-link
                    @click="showMySurvey" />
          <van-cell title="创建新问卷"
                    is-link
                    to="edit" />
        </van-cell-group>
        <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)"
                    size="small"
                    round
                    @click="signOut">
          退出登录
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  reactive,
  ref,
  onMounted,
  computed,
  watch,
  inject
} from 'vue-function-api';
import { Dialog } from 'vant';
import TaskSlice from '@/common/taskSlice';
const listItem = () => import('@/components/listItem/index');
export default {
  components: {
    listItem
  },
  // inject: ['reload'],
  setup(props, ctx) {
    console.log(ctx, props);
    const search = ref('');
    const state = reactive({
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      isLogin: computed(() => ctx.store.getters.IsLogin),
      isShowMySurvey: false,
      userInfo: {},
      popupShow: false
    });
    // inject
    const reload = inject('reload');
    // 分页请求设置
    const size = 10;
    let page = 1;

    // 切片优化
    function taskPush(addList) {
      TaskSlice.init({
        sliceList: addList.length,
        callback: i => {
          state.list.push(addList[i]);
        }
      });
    }

    function dataReq(first = false) {
      if (first) {
        page = 1;
        state.isLoading = false;
        state.finished = false;
      }
      if (state.isLoading || state.finished) {
        state.loading = false;
        return;
      }
      ctx.api
        .index_recommend({
          size,
          page,
          search: search.value
        })
        .then(res => {
          const addList = res.data;
          // 如果是第一次请求
          if (first) {
            // 原始操作
            // state.list = addList;

            // 切片优化
            state.list = [];
            taskPush(addList);
          } else {
            // state.list.push(...addList);
            taskPush(addList);
          }
          if (addList.length < size) {
            console.log('已经加载全部');
            state.finished = true;
          }
          page++;
          state.loading = false;
        });
    }
    function onLoad() {
      setTimeout(() => {
        // state.isShowMySurvey = false;
        dataReq();
      }, 1000);
    }
    function onRefresh() {
      search.value = '';
      state.isShowMySurvey = false;
      ctx.store.commit('changeSearchValue', '');
      setTimeout(() => {
        dataReq(true);
      }, 1000);
    }
    // 获取用户信息
    function getUserInfo(vaule) {
      if (vaule) {
        state.userInfo = ctx.store.getters.allInfo;
      }
    }
    // 获取我的问卷
    function showMySurvey() {
      if (!state.isLogin) return;
      ctx.store.commit('changeSearchValue', state.userInfo._id);
      state.isShowMySurvey = true;
      state.popupShow = false;
      reload(true, () => {
        ctx.router.push('/');
      });
    }
    // 退出登录
    function signOut() {
      Dialog.confirm({
        title: '提示',
        message: '确定退出登录?',
        showCancelButton: true
      })
        .then(action => {
          if (action === 'confirm') {
            // 确认的回调
            ctx.store.commit('clearUserInfo');
            localStorage.removeItem('survey_userInfo');
          }
        })
        .catch(err => {
          if (err === 'cancel') {
            console.log('取消');
          }
        });
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
    watch(
      () => ctx.store.getters.getSearchValue,
      vaule => {
        search.value = vaule;
        if (state.isShowMySurvey) {
          dataReq(true);
        }
      }
    );

    return {
      state,
      search,

      dataReq,
      onLoad,
      onRefresh,
      showMySurvey,
      signOut
    };
  }
};
</script>

<style scoped lang="scss">
@import './Home.scss';
</style>
