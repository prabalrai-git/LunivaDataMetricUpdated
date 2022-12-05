import React from "react";
import DashboardReferal from "./DashboardReferal";
import { Badge, Descriptions } from "antd";
const DashBoardReferalView = () => {
  return (
    <div>
      <Descriptions title="User Info" layout="vertical" bordered>
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
        <Descriptions.Item label="Order time">
          2018-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="Usage Time" span={2}>
          2019-04-24 18:00:00
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default DashBoardReferalView;
