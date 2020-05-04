<template>
  <div>
    <input
      id="fileInput"
      type="file"
      style="display: none"
      @change="processFiles(ADD_MOVING_AVERAGE)"
    />
    <v-btn class="ma-2" depressed color="primary" @click="showFileInput()">
      Import
      <v-icon right dark>mdi-file-find</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { movingAverage } from "../utils";

export default {
  name: "ImportFileTxt",
  methods: {
    ...mapActions(["ADD_MOVING_AVERAGE"]),
    showFileInput() {
      let fileInput = document.getElementById("fileInput");
      fileInput.click();
    },
    processFiles(callback) {
      let file = document.getElementById("fileInput").files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        let text = reader.result;
        let initial = text.split("\n");
        let date = initial.map(el => el.split(":")[0]);
        let data = initial.map(el => el.split(":")[1]);
        callback({
          date: date,
          data: data,
          m3: movingAverage({ data: data, range: 3 }),
          m5: movingAverage({ data: data, range: 5 })
        });
      };

      reader.readAsText(file);
    }
  }
};
</script>