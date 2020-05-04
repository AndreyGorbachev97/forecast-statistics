<template>
  <div>
    <v-btn depressed color="primary" @click="buildingXlsx">
      Download
      <v-icon right dark>mdi-file-excel</v-icon>
    </v-btn>
  </div>
</template>

<script>
import xlsx from "node-xlsx";

export default {
  name: "XlsxDownload",
  props: {
    data: Object
  },
  methods: {
    buildingXlsx() {
      let data = [Object.keys(this.data)];
      for (let i = 0; i < this.data.data.length; i++) {
        let tempArr = [];
        for (let j = 0; j < Object.keys(this.data).length; j++) {
          const el = this.data[Object.keys(this.data)[j]][i];
          tempArr.push(isNaN(el) ? "-" : el);
        }
        data.push(tempArr);
      }
      const options = {
        "!cols": [{ wch: 6 }, { wch: 10 }, { wch: 10 }, { wch: 20 }]
      };

      let buffer = xlsx.build([{ name: "mySheetName", data: data }], options); // Returns a buffer
      let link = document.createElement("a");
      let blob = new Blob([buffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;"
      });

      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    }
  }
};
</script>
