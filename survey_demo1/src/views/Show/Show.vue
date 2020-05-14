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
    <echarts
      ref="chart1"
      :options="overViewOption"
      :auto-resize="true"
      class="chart"
    >
    
    </echarts>
  </div>
</template>

<script>
import { ref } from 'vue-function-api';
export default {
  setup(props, ctx) {
    const echartsData = [
        { value: 335, name: '运动时间大于一些' },
        { value: 310, name: '学习时间大于一些' },
        { value: 234, name: '看报时间大于一些' },
        { value: 135, name: '选项4' },
        { value: 1548, name: '选项5' }
    ]
      
    const overViewOption = ref({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
       legend: {
        orient: 'vertical',
        left: 8,
        data: echartsData.map(item => item.name)
    },
      series: [
        {
          name: '问卷总计',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '12',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: echartsData
        }
      ]
    });
    // 返回
    function onClickLeft() {
      ctx.router.push('/');
    }
    return {
      overViewOption,
      onClickLeft
    };
  }
};
</script>

<style lang="scss" scoped>
@import './Show.scss';
</style>
