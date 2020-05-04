const movingAverage = params => {
  let result = [];
  const data = params.data;
  const range = params.range;
  const shift = (range - 1) / 2;

  for (let i = 0; i < data.length - range + 1; i++) {
    const part = data.slice(i, range + i);
    const el = part.reduce((acc, _) => acc + Number(_), 0);
    result = [...result, (el / range).toFixed(3)];
  }
  let arr = new Array(shift).fill(NaN);
  return [...arr, ...result, ...arr];
};

const options = {
  responsive: true,
  title: {
    display: true,
    text: "Moving average"
  },
  tooltips: {
    mode: "index",
    intersect: false
  },
  hover: {
    mode: "nearest",
    intersect: true
  },
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "year"
        }
      }
    ],
    yAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Value"
        }
      }
    ]
  }
};

export { movingAverage, options };
