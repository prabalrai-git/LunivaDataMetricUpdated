import React, { useEffect, useState } from "react";
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
import { Bar } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { getGeographyWiseMISReports } from "../../../services/careLabService";
import { Col, Row } from "antd";
import ProviencePiechart from "./ProviencePiechart";
import ProvienceLineCharts from "./ProvienceLineChart";

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
  plugins: {
    title: {
      display: true,
      text: "Patient Ratio According to District",
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
        display: true,
      },
    },
  },
};

const labels = ["sun ", "mon", "tues", "wed", "thurs"];

const ProvienceCharts = () => {
  const [stateId, setStateId] = useState(0);
  const [districtId, setDistrictId] = useState(0);
  const [municipalityId, setMunicipalityId] = useState(0);
  const [reportTypeId, setReportTypeId] = useState();

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

        console.log(
          maleCount,
          femaleCount,
          Provincename,
          districtname,
          "after"
        );
        setData({
          labels: districtname,
          datasets: [
            {
              label: "Male Patient",
              borderColor: "rgb(55,123,132)",
              backgroundColor: "rgb(106, 90, 205)",
            },
            {
              label: "Female Patient",
              data: femaleCount,
              borderColor: "rgb(255,123,132)",
              backgroundColor: "rgb(60, 179, 113)",
            },
          ],
        });
        console.log("ARRDATA", maleCount, femaleCount);
      })
    );
  }, []);

  return (
    <>
      <ChartsProvience>
        <Row gutter={16}>
          <Col span={20}>
            <Bar data={datas} options={options} />
          </Col>
        </Row>
      </ChartsProvience>
    </>
  );
};

export default ProvienceCharts;
const ChartsProvience = styled.div`
  /* align-items: center; */
`;
