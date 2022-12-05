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
import { Bar, Line, Pie } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { getGeographyWiseMISReports } from "../../services/careLabService";
import { Button, Col, Row } from "antd";
import ProviencePieFemale from "../CareLabFolder/newReports/ProviencePieFemale";
import DesciptionTab from "./DesciptionTab";
import DashboardReferal from "./DashboardReferal";
import ProvienceCharts from "../CareLabFolder/newReports/ProvienceCharts";
import DashBoardReferalView from "./DashBoardReferalView";
import Democharts from "./Democharts";
import DonutChartFemale from "../CareLabFolder/newReports/DonutChartFemale";

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
  //   maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Patient Dashboard",
      font: { size: 25 },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};

const labels = ["sun ", "mon", "tues", "wed", "thurs"];

const DashboardMetric = () => {
  const ref = useRef(null);
  const [stateId, setStateId] = useState(0);
  const [districtId, setDistrictId] = useState(0);
  const [municipalityId, setMunicipalityId] = useState(0);
  const [reportTypeId, setReportTypeId] = useState();

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
              backgroundColor: "rgb(0, 51, 102)",
            },

            {
              label: "FeMale Patient",
              data: femaleCount,
              backgroundColor: "rgb(0, 204, 102)",
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
        <Row justify="space-around" gutter={16}>
          <Col
            className="line-charts-col"
            sm={24}
            md={24}
            xs={12}
            lg={16}
            xl={16}
          >
            <div className="financeCards">
              <Democharts />
            </div>
          </Col>

          <Col
            className="line-charts-col"
            sm={12}
            md={12}
            xs={12}
            lg={12}
            xl={8}
          >
            <div className="financeCards">
              <ProviencePieFemale />
            </div>
          </Col>
        </Row>
        {/* next row  */}
        <Row>
          <Col
            className="line-charts-col"
            sm={12}
            md={12}
            xs={12}
            lg={12}
            xl={12}
          >
            <DashboardReferal />
          </Col>
        </Row>
        <div className="financeCards">
          <DesciptionTab />
        </div>
      </PieChartsProvience>
    </>
  );
};

export default DashboardMetric;
const PieChartsProvience = styled.div`
  .export-btn-charts {
    float: right;
  }
  .piechartsdes {
    width: 50%;
  }
  @media (min-width: 500px) {
    /* .line-charts-col {
      height: 70% !important;
    } */
  }
`;
