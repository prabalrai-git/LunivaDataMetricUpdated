import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
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
import { Bar, Pie } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { getGeographyWiseMISReports } from "../../../services/careLabService";
import { Button, Col, Row } from "antd";
import ProviencePieFemale from "./ProviencePieFemale";

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

const options = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },

    title: {
      display: true,
      text: "Male Patient Ratio According to Provience",
      font: { size: 25 },
    },
  },
};

const labels = ["sun ", "mon", "tues", "wed", "thurs"];

const ProviencePiechart = () => {
  const [stateId, setStateId] = useState(0);
  const [districtId, setDistrictId] = useState(0);
  const [municipalityId, setMunicipalityId] = useState(0);
  const [reportTypeId, setReportTypeId] = useState();
  const ref = useRef(null);
  const downloadImage = useCallback(() => {
    const link = document.createElement("a");
    link.download = "chart.png";
    link.href = ref.current.toBase64Image();
    link.click();
  }, []);
  const [datas, setData] = useState({
    labels,
    datasets: [
      {
        label: "Male",
        data: [],
        borderColor: ["#0361a1"],
        borderWidth: 3,
      },
      {
        label: "Female",
        data: [],
        borderColor: ["#3efe82"],
        borderWidth: 3,
      },
    ],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    let datadate = {
      fromdates: "2022-01-01", //val[0].format("YYYY-MM-DD"),
      todate: "2022-12-30",
    };
    let data = {
      provinceid: stateId ? stateId : 0,
      districtid: districtId ? districtId : 0,
      municipalityId: municipalityId ? municipalityId : 0,
      fromdate: datadate.fromdates,
      todate: datadate.todate,
      reportTypeId: reportTypeId ? reportTypeId : 2,
    };
    dispatch(
      getGeographyWiseMISReports(data, (val) => {
        console.log("data", data, val, "val");
        var maleCount = [];
        var femaleCount = [];
        var Provincename = [];
        var districtname = [];

        for (const vars of val) {
          var storMale = 0;
          var storeFemale = 0;

          districtname.forEach((element) => {
            if (element == vars.DistrictName) storMale = 111;
          });
          if (storMale == 111) continue;

          districtname.forEach((element) => {
            if (element == vars.DistrictName) storeFemale = 111;
          });
          if (storeFemale == 111) continue;

          districtname.push(vars.DistrictName);

          femaleCount.push(vars.Female);
          Provincename.push(vars.ProvinceName);

          val.forEach((element) => {
            if (element.DistrictName == vars.DistrictName) {
              console.log(element.DistrictName);
              storMale += element.Male;
              storeFemale += element.Female;
            }
          });
          maleCount.push(storMale);
          femaleCount.push(storeFemale);
        }
        console.log(maleCount, "before");

        setData({
          labels: districtname,
          datasets: [
            {
              label: "Male Patient",
              data: maleCount,
              borderColor: "rgb(85,123,132)",
              backgroundColor: [
                "rgb(255, 0, 0)",
                "rgb(0, 0, 255)",
                "rgb(60, 179, 113)",
                "rgb(238, 130, 238)",
                "rgb(255, 165, 0)",
                "rgb(106, 90, 205)",
                "rgba(125,5,90,82)",
                "rgb(190, 0, 05)",
                "rgba(125,5,90,82)",
                "rgb(255, 65, 0)",
              ],
            },
          ],
        });
        console.log("ARRDATA", maleCount, femaleCount);
      })
    );
  }, []);

  return (
    <>
      <PieChartsProvience>
        <div id="canvas-container">
          <Button
            onClick={downloadImage}
            className="export-btn-charts"
            type="primary"
          >
            Export charts
          </Button>
          <Row justify="space-between" gutter={16}>
            <Col
              span={8}
              sm={24}
              md={12}
              xs={12}
              lg={12}
              xl={8}
              className="first-pie"
            >
              <Pie
                className="piecharts-pie"
                ref={ref}
                data={datas}
                options={options}
              />
            </Col>
            <Col sm={24} md={12} xs={12} lg={12} xl={8} span={8}>
              <ProviencePieFemale />
            </Col>
          </Row>
        </div>
      </PieChartsProvience>
    </>
  );
};

export default ProviencePiechart;
const PieChartsProvience = styled.div`
  .export-btn-charts {
    float: right;
  }
  #canvas-container {
    height: 60vh;
    width: 60vw;
    position: relative;
  }

  @media (min-width: 768px) {
    #canvas-container {
      height: auto;
      width: auto;
    }
  }
  @media (max-width: 480px) {
    .piecharts-pie {
      /* width: auto; */
      width: 100%;
      height: 300px;
      object-fit: cover;
      object-position: bottom;
    }
  }
`;
