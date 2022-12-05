import React from "react";
import { Table, Divider, Tag } from "antd";
import styled from "styled-components";
const DayWiseCollection = () => {
  const columns = [
    {
      title: "Day",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Total Patient",
      dataIndex: "totalpat",
      key: "totalpat",
    },
    {
      title: "Total Amount",
      dataIndex: "totalamt",
      key: "totalamt",
    },
    {
      title: "Dues",
      dataIndex: "due",
      key: "due",
    },
    {
      title: "Paid",
      dataIndex: "paid",
      key: "paid",
    },
  ];

  const data = [
    {
      key: "1",
      name: "Fri Sep,2020",
      totalpat: 300,
      totalamt: "12990",
      due: "3000",
      paid: "2000",
    },
    {
      key: "2",
      name: "Fri Sep,2020",
      totalpat: 392,
      totalamt: "12990",
      due: "3000",
      paid: "2000",
    },
    {
      key: "3",
      name: "Fri Sep,2020",
      totalpat: 892,
      totalamt: "12990",
      due: "3000",
      paid: "2000",
    },
    {
      key: "4",
      name: "Fri Sep,2020",
      totalpat: 892,
      due: "3000",
      paid: "2000",
      totalamt: "12990",
    },
    {
      key: "5",
      name: "Fri Sep,2020",
      totalpat: 892,
      totalamt: "12990",
      due: "3000",
      paid: "2000",
    },
  ];
  return (
    <DayWise>
      <h3>Total Collection Day Wise</h3>
      <div className="financeCards">
        <Table columns={columns} dataSource={data} />
      </div>
    </DayWise>
  );
};

export default DayWiseCollection;
const DayWise = styled.div`
  .table-width {
    width: 100%;
  }
`;
