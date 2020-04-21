<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <van-nav-bar title="问卷调查" left-text="返回" left-arrow fixed placeholder >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
         <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
              <div v-for="item in list" :key="item">
                  <list-item></list-item>
              </div>
             <!-- <van-cell v-for="item in list" :key="item" :title="item"/> -->
            
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import listItem from '@/components/listItem/index'
export default {
  name: 'Home',
  data() {
    return {
       list: [],
       loading: false,
       finished: false,
       isLoading: false
    }
  },
  components:{
    listItem
  },
  methods: {
     onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
