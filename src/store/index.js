import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movingAverageData: {
      date: [],
      data: [],
      m3: [],
      m5: []
    },
    test: ""
  },
  getters: {
    MOVING_AVERAGE(state) {
      return state.movingAverageData;
    },
    TEST(state) {
      return state.test;
    }
  },
  mutations: {
    SET_MOVING_AVERAGE: (state, movingAverage) => {
      state.movingAverageData = movingAverage;
      state.test = movingAverage.data;
    }
  },
  actions: {
    ADD_MOVING_AVERAGE: (context, payload) => {
      context.commit("SET_MOVING_AVERAGE", payload);
    }
  }
});
