import { Col, Row } from "antd";
import Item from "antd/lib/list/Item";
import React, { useEffect } from "react";
import styled from "styled-components";

const NewTableSummary = (props) => {
  const { reqData } = props;
  console.log(reqData, "reqData");
  let id = "";
  let names = "";
  let code = "";
  let pan = "";
  let phone = "";
  let add = "";
  if (reqData.length > 0) {
    id = reqData[0].crdId;
    names = reqData[0].CrdPartyName;
    code = reqData[0].crdPartyCode;
    pan = reqData[0].CrdPartyPan;
    phone = reqData[0].crdPartyPhoneNo;
    add = reqData[0].CrdPartyAddress;

    // console.log(reqData[0].Requestor, "idnamsdsnmbfwjerfb");
  }
  // requestorList
  return (
    <NewSummeryContainer>
      <h4>New Bill Summery</h4>
      <Row justify="space-between">
        <Col>
          <li>Id:{id}</li>
          <li>Name:{names} </li>
          <li>Code:{code} </li>
        </Col>
        <Col>
          <li>Phone No:{phone} </li>
          <li>Pan No:{pan} </li>
          <li>Address: {add}</li>
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
