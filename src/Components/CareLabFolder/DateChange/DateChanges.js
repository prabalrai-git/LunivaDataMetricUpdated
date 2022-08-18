import { Button, Col, DatePicker, Form, Input, Row, TimePicker } from "antd";
import React from "react";
import styled from "styled-components";
import Filter from "../../Common/Filter";
import PageHeader from "../../Common/pageHeader";
import moment from "moment";

function DateChange() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="maiTopContainer">
        <PageHeader pageTitle={"Date Change"} />
        <Filter getFiscalYear serchButton dateChangeSampleId />
      </div>

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
      <TwoDiv>
        <div
          className="financeCards"
          style={{ width: "50%", marginRight: "10px" }}
        >
          <h3>
            Collection details{" "}
            <small style={{ color: "black", fontSize: "12px", margin: "30px" }}>
              2079/04/01
            </small>
          </h3>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Collection Date"
              name="collection date"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your username!",
              //   },
              // ]}
              wrapperCol={{
                offset: 4,
                span: 12,
              }}
            >
              <DatePicker style={{ width: "100%", marginLeft: "12px" }} />
            </Form.Item>

            <Form.Item
              label="Collection Time"
              name="collection time"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your password!",
              //   },
              // ]}
              wrapperCol={{
                offset: 4,
                span: 12,
              }}
            >
              <TimePicker
                defaultValue={moment("12:08:23", "HH:mm:ss")}
                style={{ width: "100%", marginLeft: "12px" }}
              />
            </Form.Item>
            <Form.Item
              label="Nep. Collection Time"
              name="nep. collection time"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your password!",
              //   },
              // ]}
              wrapperCol={{
                offset: 3,
                span: 12,
              }}
            >
              <DatePicker disabled style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" className="btnPrimary">
                Update Collection Date
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="financeCards" style={{ width: "50%" }}>
          <h3>
            Reporting details{" "}
            <small style={{ color: "black", fontSize: "12px", margin: "30px" }}>
              2079/04/01
            </small>
          </h3>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Result Date"
              name="result date"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your username!",
              //   },
              // ]}
              wrapperCol={{
                offset: 4,
                span: 12,
              }}
            >
              <DatePicker style={{ width: "100%", marginLeft: "38px" }} />
            </Form.Item>

            <Form.Item
              label="Result Time"
              name="result time"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your password!",
              //   },
              // ]}
              wrapperCol={{
                offset: 4,
                span: 12,
              }}
            >
              <TimePicker
                defaultValue={moment("12:08:23", "HH:mm:ss")}
                style={{ width: "100%", marginLeft: "38px" }}
              />
            </Form.Item>
            <Form.Item
              label="Nep. Collection Date"
              name="nep. collection Date"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your password!",
              //   },
              // ]}
              wrapperCol={{
                offset: 3,
                span: 12,
              }}
            >
              <DatePicker disabled style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" className="btnPrimary">
                Update Result Date
              </Button>
            </Form.Item>
          </Form>
        </div>
      </TwoDiv>
    </>
  );
}

export default DateChange;

const TwoDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;
