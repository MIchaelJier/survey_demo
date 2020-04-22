<template>
  <div class="listItem" @click="jump">
    <img
      src="https://img.yzcdn.cn/vant/cat.jpeg"
      alt=""
      class="listItem-image"
    />
    <div class="right">
      <p class="right-title">{{ itemData.title }}</p>
      <div>
        <span class="right-small">共{{ itemData.questionNum }}题</span>
        <span class="right-small">被引用{{ itemData.quoteNum }}次</span>
      </div>
    </div>
  </div>
</template>

<script>
import './index.scss';
export default {
  name: 'listItem',
  data() {
    return {};
  },
  props: {
    itemData: {
      type: [Object, Array],
      default: () => {}
    }
  },
  methods: {
    jump() {
      this.$router.push(`/about?id=${this.itemData.id}`);
    }
  }
};
</script>
