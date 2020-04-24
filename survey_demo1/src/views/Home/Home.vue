<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <van-nav-bar title="问卷调查" left-text="返回" left-arrow fixed placeholder>
      <template #right>
        <router-link to="search" class="search-link">
          <van-icon name="search" size="18" />
        </router-link>
      </template>
    </van-nav-bar>
    <van-pull-refresh v-model="state.isLoading" @refresh="onRefresh">
      <van-list
        v-model="state.loading"
        :finished="state.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="item in state.list" :key="item.id">
          <list-item :itemData="item"></list-item>
        </div>
        <!-- <van-cell v-for="item in list" :key="item" :title="item"/> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue-function-api';
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
      reqMax: 10
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

    onMounted(() => {
      //  dataReq(true)
    });

    return {
      state,

      dataReq,
      onLoad,
      onRefresh
    };
  }
};
</script>

<style scoped lang="scss">
.search-link {
  display: flex;
  align-items: center;
}
</style>
