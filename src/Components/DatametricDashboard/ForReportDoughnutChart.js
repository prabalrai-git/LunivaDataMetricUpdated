import React from "react";
import { ChartColor } from "../Common/ChartColor";
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
  Title,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import { Row, Col } from "antd";
import { useState, useEffect } from "react";

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
      position: "top",
    },
  },
};

const ForReportDoughnutChart = (props) => {
  const [newData, setnewData] = useState([]);
  const labels = props.labels;
  const data = props.data;

  function sort() {
    let dataObjArr = [];
    let temp;
    for (let i = 0; i < labels.length; i++) {
      temp = [labels[i], data[i]];
      dataObjArr.push(temp);
    }
    setnewData(dataObjArr);

    console.log("the nes datre", newData);
  }
  useEffect(() => {
    sort();
  }, []);

  const dataDo = {
    labels,
    datasets: [
      {
        label: "financeData",
        backgroundColor: ChartColor,
        data: props.data,
        borderColor: ["rgba(255, 255, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const total = props.data.reduce((partialsum, a) => partialsum + a, 0);
  return (
    <DoughnutContainer>
      <div className="financeCards">
        <h3>{props.title}</h3>
        <>
          <Row gutter={[10, 10]}>
            <Col lg={16}>
              <Doughnut options={options} data={dataDo} />
            </Col>
          </Row>
          <Row justify="space-between" gutter={[10, 10]}>
            <Col lg={16}>
              <div>
                <div className="refererename">
                  <h4>Referer Name</h4>
                </div>

                {labels.map((item) => (
                  <div>
                    <span className="item-span">{item}</span>
                  </div>
                ))}
              </div>
            </Col>
            <Col lg={3}>
              <div>
                <h4>Amount</h4>
                {data.map((item) => (
                  <div>
                    <span className="item-span">{item}</span>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </>
      </div>
    </DoughnutContainer>
  );
};

export default ForReportDoughnutChart;

const DoughnutContainer = styled.div`
  .dTable {
    padding: 10px 20px 0px 20px;
    border: 1px solid #b9b9df;
    border-radius: 6px;
    margin-top: 10px;
    li {
      list-style: none;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;

      span {
        color: var(--primary);
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 1px;
        text-align: right;
      }
      h6 {
        font-size: 14px;
        color: #232325;
        margin-bottom: 0px;
      }
    }
  }
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }

  .item-span {
    /* border-bottom: 1px solid grey; */
  }
`;
