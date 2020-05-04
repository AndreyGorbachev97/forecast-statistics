const data = [
  [1, 2, 3],
  [true, false, null, "sheetjs"],
  ["foo", "bar", new Date("2014-02-19T14:30Z"), "0.3"],
  ["baz", null, "qux"]
];
const options = { "!cols": [{ wch: 6 }, { wch: 7 }, { wch: 10 }, { wch: 20 }] };

let buffer = xlsx.build([{ name: "mySheetName", data: data }], options); // Returns a buffer
console.log(buffer);
var workbook = xlsx.read(buffer);