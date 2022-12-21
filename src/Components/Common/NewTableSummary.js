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

  return (
    <NewSummaryContainer>
      <h4>Bill Summary</h4>
      {/* <div> */}
      <Row justify="space-between">
        {/* Col sm={24} md={24} xs={24} lg={12} xl={12} */}
        <Col sm={24} md={12} xs={24} lg={12} xl={12}>
          <ul>Id:{id}</ul>
          <ul>Name:{names} </ul>
          <ul>Code:{code} </ul>
        </Col>
        <Col sm={24} md={12} xs={24} lg={12} xl={12}>
          <ul>Phone No:{phone} </ul>
          <ul>Pan No:{pan} </ul>
          <ul>Address: {add}</ul>
        </Col>
      </Row>
      {/* </div> */}
    </NewSummaryContainer>
  );
};

export default NewTableSummary;

const NewSummaryContainer = styled.div`
  li {
    list-style: none;
  }
`;
