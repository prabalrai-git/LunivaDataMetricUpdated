import { Table, Row, Col } from "antd";
import React from "react";
import CarelabFilter from "../../Common/CarelabFilter";

import PageHeader from "../../Common/pageHeader";

function BulkNegative() {
  return (
    <>
      <div className="maiTopContainer">
        <PageHeader pageTitle={"Bulk Negative"} />

        <CarelabFilter showSampleIdFrom fiscalService />
      </div>

      <div className="tableisRes">
        <Table className="tableWidth" />
      </div>
    </>
  );
}

export default BulkNegative;
