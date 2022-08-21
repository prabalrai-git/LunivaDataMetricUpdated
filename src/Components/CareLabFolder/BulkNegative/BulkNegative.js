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
        <div className="financeCards">
          <h3>Patient Details</h3>
          <Row justify="space-between" style={{ listStyleType: "none" }}>
            <Col>
              <li>Sample no: </li>
              <li>Name: </li>
              <li>Test Lists: </li>
            </Col>
            <Col style={{ marginRight: "50px" }}>
              <li>Gender: </li>
              <li>Age: </li>
              <li>Contact No: </li>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default BulkNegative;
