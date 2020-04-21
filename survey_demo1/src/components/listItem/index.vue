<template>
  <div class="listItem" @click="jump">
      <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" class="listItem-image">
      <div class="right">
        <p class="right-title">问卷</p>
        <div>
          <span class="right-small">共9题</span>
          <span class="right-small">被引用123456</span>
        </div>
      </div>
  </div>
</template>

<script>
import './index.scss'
export default {
  name: 'listItem',
  data() {
    return {
      
    }
  },
  methods: {
    jump(){
      this.$router.push('/about')
    }
  },
};
</script>