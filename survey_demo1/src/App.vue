<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="Router xBottom"
                   v-show="RouterState"></router-view>
    </transition>
  </div>
</template>

<script>
import { ref, computed } from 'vue-function-api';
import router from './router';
import { Toast } from 'vant';
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    };
  },
  setup(props, ctx) {
    const transitionName = ref('slide-right');
    const RouterState = ref(true);

    ctx.store.commit('getUserInfo');

    router.beforeEach((to, from, next) => {
      if (to.meta.index > from.meta.index) {
        transitionName.value = 'slide-left';
      } else {
        transitionName.value = 'slide-right';
      }
      if (to.meta.requireAuth && !localStorage.getItem('survey_userInfo')) {
        Toast.fail('请先登录');
        next('/login?type=1');
      }
      next();
    });
    // 本页跳转
    function reload(flag, func) {
      // flag=false 返回
      flag
        ? (transitionName.value = 'slide-left')
        : (transitionName.value = 'slide-right');
      RouterState.value = false;
      setTimeout(() => {
        // ctx.nextTick(() => {
        RouterState.value = true;
        func;
        // });
      }, 700);
    }
    return {
      transitionName,
      RouterState,
      reload
    };
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.xBottom {
  padding-bottom: $ios-bottom-constant !important;
  padding-bottom: $ios-bottom-env !important;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

// img[lazy='loading'] {
//   opacity: 0;
//   transition: opacity 1s;
// }
img[lazy='loaded'] {
  animation: fade 0.5s;
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
