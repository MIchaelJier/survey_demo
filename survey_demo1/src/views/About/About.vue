<template>
  <div class="whiteBG">
    <van-nav-bar :title="questions.title"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft"
                 placeholder
                 fixed />
    <img v-lazy="questions.coverPic"
         alt=""
         class="headerPic" />
    <van-form>
      <div class="form-top">
        <p class="form-top-title">{{ questions.title }}</p>
        <p class="form-top-intro">
          {{ questions.description }}
        </p>
      </div>
      <div v-for="item in questions.list"
           :key="item._id">
        <question-box :boxValue="item"
                      @addMap="addMap"></question-box>
      </div>
    </van-form>
    <div style="padding: 16px;">
      <van-button round
                  block
                  type="info"
                  @click="onSubmit">
        提交
      </van-button>
    </div>
  </div>
</template>

<script>
import './About.scss';
import { Notify } from 'vant';
import { onMounted, ref, reactive } from 'vue-function-api';
const questionBox = () => import('@/components/questionBox');
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
      questionMap.forEach(value => {
        if (
          Array.isArray(value.value)
            ? value.value.length === 0
            : value.value === '' && value.isNecessity
        ) {
          allNeedFlag = false;
        }
      });
      if (allNeedFlag) {
        const answer = [...questionMap].map(item => {
          item[1]._id = item[0];
          return item[1];
        });
        ctx.api
          .submit_answer(
            JSON.stringify({
              _id: id.value,
              answerList: answer
            })
          )
          .then(res => {
            if (res.status) {
              Notify({ type: 'success', message: '提交成功' });
              ctx.router.push('/');
            } else {
              Notify(res.code);
            }
          });
      } else {
        Notify('请填写完全必填项');
      }
    }
    // 返回
    function onClickLeft() {
      ctx.router.push('/');
    }
    // mouted
    onMounted(() => {
      id.value = ctx.route.query.id;
      ctx.api.detail_questions({ id: id.value }).then(res => {
        console.log(res);
        questions.value = res.data;
      });
      console.log(ctx);
    });

    return {
      questions,
      onSubmit,
      questionMap,
      addMap,
      onClickLeft
    };
  }
};
</script>
