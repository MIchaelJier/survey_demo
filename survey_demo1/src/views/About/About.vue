<template>
  <div>
    <img :src="questions.coverPic" alt="" class="headerPic" />
    <van-form>
      <div class="form-top">
        <p class="form-top-title">{{ questions.title }}</p>
        <p class="form-top-intro">
          {{ questions.description }}
        </p>
      </div>
      <div v-for="item in questions.list" :key="item.id">
        <question-box :boxValue="item" @addMap="addMap"></question-box>
      </div>
    </van-form>
    <div style="margin: 16px;">
      <van-button round block type="info" @click="onSubmit">
        提交
      </van-button>
    </div>
  </div>
</template>

<script>
import questionBox from '@/components/questionBox';
import './About.scss';
import { Notify } from 'vant';
import { onMounted, ref, reactive } from 'vue-function-api';
export default {
  components: {
    questionBox
  },
  setup(props, ctx) {
    // state
    const id = ref('');
    const questions = ref({});
    // map不能用ref?
    const questionMap = reactive(new Map());

    // methods
    // 子组件点击
    function addMap(key, value) {
      questionMap.set(key, value);
    }
    // 提交
    function onSubmit() {
      let allNeedFlag = true;
      questionMap.forEach( value => {
        if (
          Array.isArray(value.value)
            ? value.value.length == 0
            : value.value === '' && value.isNecessity
        ){
          allNeedFlag = false
        }
      });
      allNeedFlag
        ? Notify({ type:'success', message: '提交成功'})
        : Notify('请填写完全必填项')
      }
    // mouted
    onMounted(() => {
      id.value = ctx.route.query.id;
      ctx.api.detail_questions().then(res => {
        console.log(res);
        questions.value = res.data;
      });
      console.log(ctx);
    });

    return {
      questions,
      onSubmit,
      questionMap,
      addMap
    };
  }
};
</script>
