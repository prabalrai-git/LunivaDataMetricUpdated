
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
import {  Doughnut } from 'react-chartjs-2';

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

const DoughnutChart = (props) => {
  const labels= props.labels
  
  const dataDo = {
    labels,
    datasets: [
      {
        label: 'financeData',
        backgroundColor: ChartColor,
        data: props.data,
        borderColor: [
          'rgba(255, 255, 132, 1)',

        ],
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <div className='financeCards' >
      <h3>{props.title}</h3>
      <Doughnut options={options} data={dataDo}/>
    </div>
  )
}

export default DoughnutChart
