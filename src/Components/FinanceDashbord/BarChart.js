
import React from 'react'
import { ChartColor } from '../Common/ChartColor'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  ArcElement,
  Title
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Tooltip,
  Title
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const BarChart = (props) => {
  const labels= props.labels
  const dataBar = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: 'paid',
        backgroundColor: ChartColor,
        data: props.data1,
        borderColor: [
          'rgba(255, 255, 132, 1)',

        ],
        borderWidth: 1,
      },
      {
        type: 'bar',
        label: 'unpid',
        backgroundColor: ChartColor,
        data: props.data2,
        borderColor: [
          'rgba(255, 255, 132, 1)',

        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Bar options={options} data={dataBar}/>
    </div>
  )
}

export default BarChart
