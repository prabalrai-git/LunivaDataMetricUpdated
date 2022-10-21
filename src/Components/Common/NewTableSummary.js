import { Col, Row } from "antd";
import styled from "styled-components";

const NewTableSummary = (props) => {
  const { reqData } = props;
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
  }
  // requestorList
  return (
    <NewSummaryContainer>
      <h4>New Bill Summary</h4>
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
    </NewSummaryContainer>
  );
};

export default NewTableSummary;

const NewSummaryContainer = styled.div`
  li {
    list-style: none;
  }
`;