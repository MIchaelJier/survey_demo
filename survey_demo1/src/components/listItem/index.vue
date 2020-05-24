<template>
  <div class="listItem"
       @click="jump">
    <img v-lazy="itemData.coverPic"
         alt=""
         class="listItem-image" />
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
    },
    goPage: {
      type: String,
      default: '/about'
    }
  },
  setup(props, ctx) {
    function jump() {
      console.log(ctx);
      ctx.router.push(`${props.goPage}?id=${props.itemData.id}`);
    }
    return {
      jump
    };
  }
};
</script>
