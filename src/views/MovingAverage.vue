<template>
  <v-container class="main">
    <div style="width: 30vw">
      <v-slider v-model="slider" thumb-label="always"></v-slider>
      <v-container class="container-data">
        <div class="row header-row">
          <div class="text-field">Date</div>
          <div class="text-field">Initial</div>
          <div class="text-field">m = 3</div>
          <div class="text-field right-column">m = 5</div>
        </div>
        <v-divider></v-divider>
        <div v-for="(item, i) in slider" :key="i">
          <div class="row">
            <input class="text-field" placeholder="date" v-model="MOVING_AVERAGE.date[i]" />
            <input class="text-field" placeholder="value" v-model="MOVING_AVERAGE.data[i]" />
            <div
              class="text-field"
              v-if="MOVING_AVERAGE.m3"
            >{{MOVING_AVERAGE.m3[i] ? MOVING_AVERAGE.m3[i] : '-' }}</div>
            <div
              class="text-field right-column"
              v-if="MOVING_AVERAGE.m5"
            >{{MOVING_AVERAGE.m5[i] ? MOVING_AVERAGE.m5[i] : '-' }}</div>
          </div>
          <v-divider></v-divider>
        </div>
      </v-container>
      <div style="display: flex">
        <import-file-txt />
        <v-btn class="ma-2" depressed color="primary" @click="generateChart">Generate Chart</v-btn>
        <xlsx-download class="ma-2" :data="MOVING_AVERAGE" />
      </div>
    </div>
    <div style="width: 55vw; margin-left: 3%">
      <line-charts v-if="showChart" :chart-data="chartData" :options="options" />
      <div v-else class="info-block">click on chart generation button</div>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LineCharts from "../components/Charts/LineCharts.vue";
import { movingAverage, options } from "../utils";
import XlsxDownload from "../components/XlsxDownload.vue";
import ImportFileTxt from "../components/ImportFileTxt.vue";

export default {
  name: "MovingAverage",
  data() {
    return {
      showChart: false,
      chartData: null,
      slider: 10,
      options: options,
      input: "",
      statData: [],
      statDate: []
    };
  },
  components: { LineCharts, XlsxDownload, ImportFileTxt },
  computed: mapGetters(["MOVING_AVERAGE"]),
  methods: {
    ...mapActions(["ADD_MOVING_AVERAGE"]),
    generateChart() {
      const m3 = movingAverage({ data: this.MOVING_AVERAGE.data, range: 3 });
      const m5 = movingAverage({ data: this.MOVING_AVERAGE.data, range: 5 });
      this.ADD_MOVING_AVERAGE({
        date: this.MOVING_AVERAGE.date,
        data: this.MOVING_AVERAGE.data,
        m3,
        m5
      });
      this.chartData = {
        labels: this.MOVING_AVERAGE.date,
        datasets: [
          {
            label: "Initial",
            backgroundColor: "#F44336",
            borderColor: "#F44336",
            data: this.MOVING_AVERAGE.data,
            fill: false
          },
          {
            label: "m = 3",
            fill: false,
            backgroundColor: "#2196F3",
            borderColor: "#2196F3",
            data: this.MOVING_AVERAGE.m3
          },
          {
            label: "m = 5",
            fill: false,
            backgroundColor: "#FFC107",
            borderColor: "#FFC107",
            data: this.MOVING_AVERAGE.m5
          }
        ]
      };
      this.showChart = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.container-data {
  max-height: 62vh;
  overflow-y: auto;
}
.main {
  display: flex;
}
.header-row {
  font-size: 18px;
}
.text-field {
  width: 5vw;
  padding: 2px 0;
  margin-left: 10px;
  outline: none;
  color: #757575;
  border-right: 1px solid #cfcfcf;
}
.right-column {
  border: none;
}
.info-block {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #bdbdbd;
  font-size: 22px;
}
input::-moz-placeholder {
  color: #bdbdbd;
}
input::-webkit-input-placeholder {
  color: #bdbdbd;
}
</style>
