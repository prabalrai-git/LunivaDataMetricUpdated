import { Col, Row } from "antd";
import Item from "antd/lib/list/Item";
import React, { useEffect } from "react";
import styled from "styled-components";

const NewTableSummary = (props) => {
  const { reqData } = props;
  console.log(reqData, "reqData");
  let id = "";
  let requestor = "";
  if (reqData.length > 0) {
    id = reqData[0].Id;
    requestor = reqData[0].Requestor;
    // console.log(reqData[0].Requestor, "idnamsdsnmbfwjerfb");
  }
  // requestorList
  return (
    <NewSummeryContainer>
      <h4>New Bill Summery</h4>
      <Row justify="space-between">
        <Col>
          <li>Id:{id}</li>
          <li>Name:{requestor} </li>
        </Col>
        <Col>
          <li>Pan No: </li>
        </Col>
      </Row>
    </NewSummeryContainer>
  );
};

export default NewTableSummary;

const NewSummeryContainer = styled.div`
  li {
    list-style: none;
  }
`;
