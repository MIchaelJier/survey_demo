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
  props: {
    itemData: {
      type: [Object, Array],
      default: () => {}
    }
  },
  setup(props, ctx) {
    function jump() {
      console.log(ctx);
      ctx.router.push(`/about?id=${props.itemData.id}`);
    }
    return {
      jump
    };
  }
};
</script>
