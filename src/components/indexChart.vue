<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <div class="flex justify-between">
          <span class="text-sm">订单统计</span>
          <div>
            <el-check-tag
              :checked="current == item.value"
              v-for="(item, index) in options"
              :key="index"
              @click="handleChoose(item.value)"
              >{{ item.text }}</el-check-tag
            >
          </div>
        </div>
      </template>
      <div id="chart" style="width: 100%; height: 300px"></div>
    </el-card>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { getStatistics3 } from "~/api/index.js";
import { useResizeObserver } from "@vueuse/core";
const current = ref("week");
const options = [
  {
    text: "近一个月",
    value: "month",
  },
  {
    text: "近一周",
    value: "week",
  },
  {
    text: "近24小时",
    value: "hour",
  },
];
const handleChoose = (type) => {
  current.value = type;
  getData();
};

var myChart = null;
onMounted(() => {
  var chartDom = document.getElementById("chart");
  myChart = echarts.init(chartDom);
  getData();
});
const el = ref(null);
useResizeObserver(el, (entries) => {
  myChart.resize();
});

function getData() {
  let option = {
    xAxis: {
      type: "category",
      data: [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [],
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };
  myChart.showLoading();
  getStatistics3(current.value)
    .then((res) => {
      option.xAxis.data = res.x;
      option.series[0].data = res.y;
      myChart.setOption(option);
    })
    .finally(() => {
      myChart.hideLoading();
    });
}
onBeforeUnmount(() => {
  if (myChart) {
    echarts.dispose(myChart);
  }
});
</script>
<style scoped></style>
