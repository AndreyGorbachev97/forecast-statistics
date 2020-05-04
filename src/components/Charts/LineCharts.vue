<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  name: "LineCharts",
  mixins: [reactiveProp],
  props: ["options"],
  extends: Line,
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
</style>
