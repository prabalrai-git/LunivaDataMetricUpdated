import React, { useState } from "react";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { Radio, Row, Tabs } from "antd";
import ProviencePiechart from "../CareLabFolder/newReports/ProviencePiechart";
import DemoDonutcharts from "./DemoDonutcharts";
import DemoRadioTransaction from "./DemoRadioTransaction";

const DesciptionTab = () => {
  const [size, setSize] = useState("daily");
  const onChange = (e) => {
    setSize(e.target.value);
    const valueclicked = e.target.value;
    console.log(e.target.value, "value clicked");
  };
  return (
    <div>
      <div>
        <Radio.Group
          value={size}
          onChange={onChange}
          style={{
            marginBottom: 16,
          }}
        >
          <Radio.Button value="daily">Daily Transaction</Radio.Button>
          <Radio.Button value="item">ItemQty</Radio.Button>
          <Radio.Button value="control">Control Value</Radio.Button>
          <Radio.Button value="org">Organization Wise</Radio.Button>
          <Radio.Button value="company">Company Wise</Radio.Button>
        </Radio.Group>
        <Tabs
          defaultActiveKey="1"
          size={size}
          style={{
            marginBottom: 32,
          }}
          items={new Array(3).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: `Tab ${id}`,
              key: id,
              children: `Content of tab ${id}`,
            };
          })}
        />
        <Tabs
          defaultActiveKey="1"
          type="card"
          size={size}
          items={new Array(3).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: `Card Tab ${id}`,
              key: id,
              children: `Content of card tab ${id}`,
            };
          })}
        />
      </div>
      <Row>
        {size === "daily" ? <DemoRadioTransaction /> : ""}
        {size === "company" ? <h4>clicked company value</h4> : ""}
        {size === "org" ? <h4>clicked org value</h4> : ""}
        {size === "control" ? <h4>clicked control value</h4> : ""}
        {size === "item" ? <h4>clicked item value</h4> : ""}
      </Row>
    </div>
  );
};

export default DesciptionTab;
