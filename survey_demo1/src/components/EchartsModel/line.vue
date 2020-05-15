<template>
  <echarts
      ref="chartLine"
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
    const timerData = []
    for(let i = 0 ; i < 24 ; i ++){
      timerData.push(`${i.toString().padStart(2,'0')}:00`)
    }
    const overViewOption = ref({
      title : {
            show:true,
            text: props.title,
            left:'center'
      },
      xAxis: {
          name: '时间',  
          type: 'category',
          axisLabel: {
              show: true,
              interval:4
          },
          data: timerData
      },
      yAxis: {
          name: '数量',  
          type: 'value',
          minInterval: 1
      },
      series: [{
          data: props.echartsData,
          type: 'line',
          smooth: true,
            itemStyle:{
              normal:{
				      	color: '#D53A35',
                // label : {
                // show: true
                // },
              }
            }
      }]
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