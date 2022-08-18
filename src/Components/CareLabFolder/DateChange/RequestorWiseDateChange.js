import { Table } from "antd";
import React from "react";
import Filter from "../../Common/Filter";
import PageHeader from "../../Common/pageHeader";

function RequestorWiseDateChange() {
  const columns = [
    {
      title: "SN",
    },
    {
      title: "Name",
    },
    {
      title: "Contact No",
    },
    {
      title: "Collection Date",
    },
    {
      title: "Nep. Collection Date",
    },
    {
      title: "Collection Action",
    },
    {
      title: "Result Date",
    },
    {
      title: "Nep.Result Date",
    },
    {
      title: "Result Action",
    },
  ];

  return (
    <>
      <div className="maiTopContainer">
        <PageHeader pageTitle={"Requestor Wise Date Change"} />
        <Filter
          dateChangeSampleIdFromTo
          getFiscalYear
          getRequestor
          serchButton
        />
      </div>
      <div className="financeCards">
        <h3>Patient Details</h3>
        <Filter onSearch />

        <div className="tableisRes">
          <Table className="tableWidth" columns={columns} />
        </div>
      </div>
    </>
  );
}

export default RequestorWiseDateChange;
