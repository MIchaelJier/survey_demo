<template>
  <div>
    <van-nav-bar title="答卷统计"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft"
                 placeholder
                 fixed />
    <!-- 问卷区 -->
    <div class="form-top"
         v-if="Object.keys(questionAllInfo).length !== 0">
      <p class="form-top-title">{{ questionAllInfo.questions.title }}</p>
      <p class="form-top-intro">
        {{ questionAllInfo.questions.description }}
      </p>
    </div>
    <!-- 答卷区 -->
    <div v-if="echartsData.length === 0"
         class="question-none">暂无充足问卷</div>
    <van-collapse v-model="activeName"
                  accordion>
      <div v-for="(item, index) in echartsData"
           :key="index">
        <van-collapse-item :title="questionData[index].question"
                           :name="index + 1">
          <Echarts-pie :echartsData="item"
                       v-if="isObject(item[0])"></Echarts-pie>
          <Echarts-line :echartsData="item"
                        v-else></Echarts-line>
        </van-collapse-item>
      </div>
    </van-collapse>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue-function-api';
const EchartsPie = () => import('@/components/EchartsModel/pie');
const EchartsLine = () => import('@/components/EchartsModel/line');
export default {
  components: {
    EchartsPie,
    EchartsLine
  },
  setup(props, ctx) {
    // state
    const id = ref('');
    const activeName = ref('1');
    const echartsData = ref([]);
    const questionData = ref([]);
    const questionAllInfo = ref({});
    // computer
    const isObject = computed(() => obj =>
      Reflect.toString.call(obj) === '[object Object]'
    );
    // mouted
    onMounted(() => {
      id.value = ctx.route.query.id;
      ctx.api.get_answer_sum({ id: id.value }).then(res => {
        console.log(res);
        echartsData.value = res.data.answer;
        questionData.value = res.data.question.questions.list;
        questionAllInfo.value = res.data.question;
      });
    });
    // 返回
    function onClickLeft() {
      ctx.router.push('/');
    }
    return {
      isObject,
      activeName,
      echartsData,
      questionData,
      questionAllInfo,
      onClickLeft
    };
  }
};
</script>

<style lang="scss" scoped>
@import './Show.scss';
</style>
