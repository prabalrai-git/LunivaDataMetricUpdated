import { Col, Row } from "antd";
import styled from "styled-components";

const NewTableSummary = (props) => {
  const { reqData } = props;
  let id = "";
  let requestor = "";
  if (reqData.length > 0) {
    id = reqData[0].Id;
    requestor = reqData[0].Requestor;
  }

  return (
    <NewSummaryContainer>
      <h4>New Bill Summary</h4>
      <Row justify="space-between">
        <Col>
          <li>Id:{id}</li>
          <li>Name:{requestor} </li>
        </Col>
        <Col>
          <li>Pan No: </li>
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
