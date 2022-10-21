import React from "react";
import {
  Col,
  Input,
  Row,
  Select,
  Form,
  Button,
  Space,
  InputNumber,
  Descriptions,
} from "antd";
import { useState, useEffect } from "react";
import PageHeader from "../Common/pageHeader";
import NewTableSummary from "../Common/NewTableSummary";
import styled from "styled-components";
import {
  addCreateCreditPartyBill,
  getRequestorBillListAll,
} from "../../services/datametricService";
import { useDispatch } from "react-redux";
import { dum } from "./dum";
const { Option } = Select;

;
const AddBill = () => {
  const dispatch = useDispatch();
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [number3, setNumber3] = useState(0);
  const [total, setTotal] = useState(0);
  const [totaldis, setDis] = useState(0);
  const [data, setData] = useState([]);
  const [chData, setChData] = useState({});
  const [requestorList, setrequestorList] = useState([]);

  const handleChange = (value) => {
    setChData(value);
  };

  const paymentType = [
    {
      id: 1,
      paymentmethod: "credit",
    },
    {
      id: 2,
      paymentmethod: "credit collection",
    },
  ];

  useEffect(() => {
    dispatch(
      getRequestorBillListAll((val) => {
        setrequestorList(val);
      })
    );
  }, []);

  const onFinish = (values) => {
    dispatch(addCreateCreditPartyBill(dum, (res) => {
      console.log(res);
    }))
  };
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    multiply();
    grandtotal();
  }, [number1, number2, number3, totaldis, total]);

  const multiply = () => {
    let totalcal = number1 * number2;
    setTotal(totalcal);
  };

  const grandtotal = () => {
    let totalD = total - number3;
    setDis(totalD);
  };
  const onChangeHandler = () => {
    const itemData = requestorList.filter((res) => res.crdId === chData);
    setData(itemData);
  };

  return (
    <>
      <AddBillSection>
        <div className="maiTopContainer">
          <PageHeader pageTitle={"Edit Billing Reports"} />
          {
            <div className="dropdown-section">
              <Row>
                <Col span={12} className="requestor-section">
                  <Select onChange={handleChange} style={{ width: "50%" }}>
                    {requestorList?.map((iTy) => (
                      <Option
                        title={iTy?.CrdPartyName}
                        key={iTy?.crdId}
                        value={iTy?.crdId}
                      >
                        {iTy?.CrdPartyName}
                      </Option>
                    ))}
                  </Select>
                  <Button
                    onClick={onChangeHandler}
                    htmlType="submit"
                    className="load-btn"
                    type="primary"
                  >
                    Load
                  </Button>
                </Col>
                <Col span={12}></Col>
              </Row>
            </div>
          }
        </div>
        <div className="financeCards">
          {/*  */}
          <NewTableSummary reqData={data}></NewTableSummary>
        </div>
        <div className="mainContainer">
          <Row gutter={16}>
            <Col span={24}>
              <div className="financeCards">
                <h4>Bill Details</h4>
                <hr />

                <Form
                  name="basic"
                  labelCol={{
                    span: 12,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Row>
                    <Col span={8}>
                      <Form.Item label="Item Name" name="item">
                        <Input
                          style={{
                            width: "100%",
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Rate" name="rate">
                        <InputNumber
                          min={1}
                          max={100000}
                          onChange={(e) => {
                            setNumber1(e);
                          }}
                          style={{
                            width: "100%",
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Quantity" name="qty">
                        <InputNumber
                          style={{
                            width: "100%",
                          }}
                          min={1}
                          max={100000}
                          onChange={(e) => setNumber2(e)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="DiscountAmt" name="dis">
                        <InputNumber
                          style={{
                            width: "100%",
                          }}
                          min={1}
                          max={100000}
                          onChange={(e) => setNumber3(e)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Payment Type" name="pmt">
                        <Select defaultValue="" onChange={handleChange}>
                          {paymentType.map((item) => {
                            return (
                              <Option value={item.id} key={item.id}>
                                {item.paymentmethod}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <div className="s-btn">
                        <Button type="primary" htmlType="submit">
                          Save
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <Descriptions
                        bordered
                        layout="horizontal"
                        column={1}
                        size="small"
                      >
                        <Descriptions.Item label="SubTotal">
                          {total}
                        </Descriptions.Item>
                        <br></br>
                        <Descriptions.Item label="GrandTotal">
                          {totaldis}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </AddBillSection>
    </>
  );
};

export default AddBill;
const AddBillSection = styled.div`
  .data-item-display {
    display: flex;
  }
  .qty-field {
    margin-left: 10px;
  }
  .s-btn {
    margin-left: 20px;
    float: right;
  }
  .load-btn {
    margin-left: 20px;
  }
  .dropdown-section {
    margin: 20px;
  }
  .requestor-section {
    display: flex;
  }
  .pmt-section {
    margin-left: 40px;
  }
`;
