<template>
  <div>
    <van-nav-bar
      title="答卷统计"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      placeholder
      fixed
    />
    <div class="question-title">
      你的课余时间会安排在
    </div>
    <Echarts-pie :echartsData="echartsData"></Echarts-pie>
    <Echarts-line :echartsData="echartsData2"></Echarts-line>
  </div>
</template>

<script>
import { ref } from 'vue-function-api';
import EchartsPie from '@/components/EchartsModel/pie'
import EchartsLine from '@/components/EchartsModel/line'
export default {
  components: {
    EchartsPie,
    EchartsLine
  },
  setup(props, ctx) {
    // ctx.api.get_answer_sum()
    const echartsData = [
        { value: 335, name: '运动时间大于一些' },
        { value: 310, name: '学习时间大于一些' },
        { value: 234, name: '看报时间大于一些' },
        { value: 135, name: '选项4' },
    ]
    const echartsData2 = [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
    // 返回
    function onClickLeft() {
      ctx.router.push('/');
    }
    return {
      echartsData,
      echartsData2,
      onClickLeft
    };
  }
};
</script>

<style lang="scss" scoped>
@import './Show.scss';
</style>
