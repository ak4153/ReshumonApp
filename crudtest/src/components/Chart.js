import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart({ allVisitors }) {
  var options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Visitors by location',
      },
    },
  };
  //Hash map for creating a chart with unique visitors
  const locationHash = new Map();
  allVisitors.map((visitor) => {
    if (locationHash.get(visitor.location)) {
      var count = parseInt(locationHash.get(visitor.location)) + 1;
      locationHash.set(visitor.location, count);
      return visitor;
    } else {
      locationHash.set(visitor.location, 1);
      return visitor;
    }
  });
  var labels = [];
  for (let [key] of locationHash) {
    labels.push(key);
  }
  var locationCount = [];
  for (let [key, value] of locationHash) {
    locationCount.push(value);
    console.log(key, value);
  }
  var data = {
    labels,
    datasets: [
      {
        label: 'Visitors',
        data: locationCount,
        backgroundColor: 'violet',
      },
    ],
  };
  return <Bar options={options} data={data} labels={labels} />;
}
