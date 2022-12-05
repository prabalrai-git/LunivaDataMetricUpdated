import React, { useState } from "react";
import styled from "styled-components";
import { Select, Row, Col, Form } from "antd";
import ProvienceLinechart from "./ProvienceLineChart";
import ProviencePiechart from "./ProviencePiechart";
import ProvienceCharts from "./ProvienceCharts";
import DonutChart from "./DonutChart";
const MainPageChart = () => {
  const [newdata, setNewData] = useState([]);
  const { Option, OptGroup } = Select;
  const OnLoad = (e) => {
    console.log(e, "e");
    const selecteditem = e;
    setNewData(selecteditem);
    console.log(selecteditem, "aaa");
  };
  const datas = [
    {
      id: 1,
      name: "Pie charts",
    },
    {
      id: 2,
      name: "Line Charts",
    },
    {
      id: 3,
      name: "Bar Charts",
    },
    {
      id: 4,
      name: "Doughnut Charts",
    },
  ];

  return (
    <>
      <MainPageChartComp>
        <div className="financeCards">
          <span className="pageTtitle">Chart Status of Patient</span>
          <Row>
            <Col
              sm={24}
              md={12}
              xs={12}
              lg={12}
              xl={8}
              className="dropmenu"
              span={6}
            >
              <Select
                id="storeItemName"
                style={{
                  width: "100%",
                }}
                onSelect={OnLoad}
                placeholder="Please select the chart menu"
              >
                {datas.map((item) => {
                  return (
                    <Option value={item.id} key={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Col>
            <div className="btn-section">
              <Col sm={24} md={12} xs={12} lg={12} xl={8} span={8}>
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                ></Form.Item>
              </Col>
            </div>
          </Row>
          {newdata === 1 ? <ProviencePiechart /> : ""}
          {newdata === 2 ? <ProvienceLinechart /> : ""}
          {/* Bar chart */}
          {newdata === 3 ? <ProvienceCharts /> : ""}
          {newdata === 4 ? <DonutChart /> : ""}
          {/* DonutChart */}
        </div>
      </MainPageChartComp>
    </>
  );
};

export default MainPageChart;
const MainPageChartComp = styled.div``;
