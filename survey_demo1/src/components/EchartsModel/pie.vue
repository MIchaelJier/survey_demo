<template>
  <echarts
      ref="chartPie"
      :options="overViewOption"
      :auto-resize="true"
      class="chart"
    >
    </echarts>
</template>

<script>
import { ref } from 'vue-function-api';
export default {
  props: {
    // [
    //     { value: 335, name: '运动时间大于一些' },
    //     { value: 310, name: '学习时间大于一些' },
    //     { value: 234, name: '看报时间大于一些' },
    //     { value: 135, name: '选项4' },
    //     { value: 1548, name: '选项5' }
    // ]
    echartsData: {
      type: [Object, Array],
      default: () => {}
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    const overViewOption = ref({
      title : {
            show:true,
            text: props.title,
            left:'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
       legend: {
        orient: 'vertical',
        left: 8,
        data: props.echartsData.map(item => item.name)
      },
      series: [
        {
          name: props.title,
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
          data: props.echartsData
        }
      ]
    });
    return {
      overViewOption
    };
  }
};
</script>

<style>
.chart {
    height: 300px;
    width: 100%;
}
</style>