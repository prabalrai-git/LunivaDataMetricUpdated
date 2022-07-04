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
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { chData } from '../../../Data/chartStData';
// import { ChartColor } from '../../Common/ChartColor';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Tooltip,
  Title,
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    y: {
      min: 0
    }
  }
};

const LC = () => {
  const [sdMin1, setSdMin1] = useState([])
  const [sdMin2, setSdMin2] = useState([])
  const [sdMax1, setSdMax1] = useState([])
  const [sdMax2, setSdMax2] = useState([])

  const newCh = chData
  const plottedSd = newCh.map((res) => {
    return res['plottedSd']
  })

  const plottedAverage = newCh.map((res) => {
    return res['averageValue']
  })

  const labels = newCh.map((res) => {
    return res['date']
  })

  useEffect(() => {
    var avg = 0; /*average value*/
    var sd1s = 0;
    var sd2s = 0;
    var sd1min = 0;
    var sd2min = 0;

    var sdmin1 = 0;
    var sdmax1 = 0;
    var sdmin2 = 0;
    var sdmax2 = 0;

    sdmin2 = parseFloat(newCh[0].plottedSd);
    sdmax2 = sdmin2;

    newCh.forEach(val => {
      if (sdmax2 < parseFloat(val.plottedSd)) {
        sdmax2 = parseFloat(val.plottedSd);
      }

      /*   to find minimum deviation */
      if (sdmin2 > parseFloat(val.plottedSd)) {
        sdmin2 = parseFloat(val.plottedSd);
      }

      avg = val.averageValue;

      sd1s = val.c1sd;
      sd2s = parseFloat(val.c2sd);
      //sd2s = (sd2s<0) ? sd2s-2 : sd2s + 2;

      sd1min = val.c1sdmin;
      sd2min = parseFloat(val.c2sdmin);
    });

    sdmax2 = (sdmax2 <= 0) ? sdmax2 - 4.0 : sdmax2 + 4.0;
    sdmax1 = sdmax2 - 5.0;
    sdmin2 = (sdmin2 <= 0) ? sdmin2 - 4.0 : sdmin2 + 4.0;
    sdmin1 = sdmin2 + 5.0;

    let newSdMin1 = [],
      newSdMin2 = [],
      newSdMax1 = [],
      newSdMax2 = []
    for (let index = 0; index < newCh.length; index++) {
      newSdMin1.push(sdmin1)
      newSdMin2.push(sdmin2)

      newSdMax1.push(sdmax1)
      newSdMax2.push(sdmax2)
    }
    setSdMin1(newSdMin1)
    setSdMin2(newSdMin2)

    setSdMax1(newSdMax1)
    setSdMax2(newSdMax2)
  }, [])

  const dataBar = {
    labels,
    datasets: [
      {
        label: 'Deviation',
        data: plottedSd,
        borderColor: [
          '#0361a1',
        ],
        borderWidth: 3,
      },
      {
        label: 'Average',
        data: plottedAverage,
        borderColor: [
          '#7992a2',
        ],
        borderWidth: 3,
      },
      {
        label: 'SD Max 1',
        data: sdMax1,
        borderColor: [
          '#FFFF66',
        ],
        borderWidth: 3,
      },
      {
        label: 'SD Max 2',
        data: sdMax2,
        borderColor: [
          '#f00',
        ],
        borderWidth: 3,
      },
      {
        label: 'SD Min 1',
        data: sdMin1,
        borderColor: [
          '#FFFF66',
        ],
        borderWidth: 3,
      },
      {
        label: 'SD Min 2',
        data: sdMin2,
        borderColor: [
          '#f00',
        ],
        borderWidth: 3,
      },
    ],
  };

  const div2PDF = (e) => {
    let input = window.document.getElementsByClassName("div2PDF")[0];
    html2canvas(input).then(canvas => {
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      pdf.addImage(img, 'png', 1, 2)
      pdf.save('lcchart.pdf')
    });
  }

  return (
    <>
      <h1>LC Charts</h1>
      <div>
        <button onClick={(e) => div2PDF(e)}>Export</button>
      </div>
      <div className='div2PDF'>
        <Line options={options} data={dataBar} />
      </div>
    </>
  )
}

export default LC