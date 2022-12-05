import React from "react";
import styled from "styled-components";
import { Col, Divider, Row } from "antd";
import DashBoardReferalView from "./DashBoardReferalView";
import DonutChartFemale from "../CareLabFolder/newReports/DonutChartFemale";
import DemoDonutcharts from "./DemoDonutcharts";
const Dashboardorg = () => {
  return (
    <>
      <Dashboardsection>
        <div>
          <h4>Top Organization</h4>
        </div>
        <div className="financeCards">
          <Row justify="space-around">
            <Col span={6}>
              <table>
                <tr>
                  <th>Referal </th>
                  <th>Amount</th>
                </tr>
                <tr>
                  <td>Alfreds </td>
                  <td>10000 </td>
                </tr>
                <tr>
                  <td>Centro </td>
                  <td>10000 </td>
                </tr>
                <tr>
                  <td>Ernst </td>
                  <td>10000 </td>
                </tr>
                <tr>
                  <td>Island </td>
                  <td>100002 </td>
                </tr>
                <tr>
                  <td> Winecellars</td>
                  <td> 100002</td>
                </tr>
                <tr>
                  <td> Riuniti</td>
                  <td> 100001</td>
                </tr>
              </table>
            </Col>
            <Col span={6}>
              <p>charts details</p>
              <DemoDonutcharts />
            </Col>
          </Row>
        </div>
      </Dashboardsection>
    </>
  );
};

export default Dashboardorg;
const Dashboardsection = styled.div`
  .topic-referal {
    display: flex;
    justify-content: space-between;
  }
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    /* border: 1px solid #dddddd; */
    text-align: left;
    padding: 8px;
    border-bottom: 0.5px solid grey;
  }

  td,
  th:nth-child(even) {
    /* background-color: #dddddd; */
    /* border-bottom: 1px solid grey; */
  }
`;
