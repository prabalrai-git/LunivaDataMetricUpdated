import React from "react";
import styled from "styled-components";
import { Col, Divider, Row } from "antd";
import DashBoardReferalView from "./DashBoardReferalView";
import DonutChartFemale from "../CareLabFolder/newReports/DonutChartFemale";
const DashboardReferal = () => {
  return (
    <>
      <Dashboardsection>
        <div className="financeCards">
          <Row justify="end">
            <Col span={6}>
              <p>Referal name</p>
              <p>abc</p>
            </Col>
            <Col span={6}>
              <p>Amount </p>
            </Col>
          </Row>
          <Divider plain></Divider>
          <Row>
            <Col span={8}>{/* <Democharts /> */}</Col>
          </Row>
        </div>
      </Dashboardsection>
    </>
  );
};

export default DashboardReferal;
const Dashboardsection = styled.div`
  .topic-referal {
    display: flex;
    justify-content: space-between;
  }
`;
