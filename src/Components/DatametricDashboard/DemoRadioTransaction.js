import { Col, Row } from "antd";
import React from "react";
import DemoDonutcharts from "./DemoDonutcharts";

const DemoRadioTransaction = () => {
  return (
    <div>
      <Row justify="space-between">
        <Col span={12}>daily transaction</Col>
        <Col span={12}>b transaction</Col>
      </Row>
    </div>
  );
};

export default DemoRadioTransaction;
