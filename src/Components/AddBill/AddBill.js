import {
  Col,
  Input,
  Row,
  Select,
  Form,
  Button,
  InputNumber,
  Descriptions,
  message,
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
import { adToBs } from "@sbmdkl/nepali-date-converter";
import { paymentType } from "../../constants/paymentType";
import { todaydate } from "../Common/TodayDate";
import { tokenString } from "../Common/HandleUser";

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
  const { Option } = Select;

  const handleChange = (value) => {
    setChData(value);
  };

  useEffect(() => {
    dispatch(
      getRequestorBillListAll((val) => {
        setrequestorList(val);
      })
    );
  }, []);

  const onFinish = (values) => {
    // console.log(values, data);
    // const a =
    //   BillCreditPartyCode.length < 0
    //     ? message.warning("Request data is not selected")
    //     : "";
    if (data.length > 0) {
      const allDataSend = {
        _lstBillItems: [
          {
            ID: 0,
            BillID: 0,
            BillNo: "",
            TestID: 0,
            billDGid: 0,
            billTestName: values?.item !== "undefined" ? values?.item : 0,
            billPrice: values?.total,
            billOutGoing: true,
            billDiscount: values?.dis !== "undefined" ? values?.dis : 0,
            billDiscountAmt: values?.dis !== "undefined" ? values?.dis : 0,
            billPriceFinal:
              values?.totaldis !== "undefined" ? values?.totaldis : 0,
            IsSync: true,
            RoundAmt: 0,
            Remarks: "",
            OutgoingLabId: 1,
          },
        ],
        Id: 0,
        PatId: 2,
        Nrl_Reg_No: "",
        TestId: 0,
        Price: total,
        TotalPrice: totaldis,
        DiscountPrice: values?.dis !== "undefined" ? values?.dis : 0,
        HSTPrice: 0,
        IsPaid: true,
        IsDone: true,
        BillDate: todaydate,
        BillLastModifiedDate: todaydate,
        BillNo: "",
        BillDiscount: values?.dis,
        BillDiscountAmt: values?.dis,
        BillHst: 0,
        BillHstAmt: 0,
        BillAmtPaid: totaldis,
        BillRemainingAmt: 0,
        BillPaymentType: values?.pmt !== "undefined" ? values?.pmt : 0,
        BillOutGngAmt: totaldis,
        BillOutGngDiscountAmt: values?.dis !== "undefined" ? values?.dis : 0,
        BillOutGngAmtPc: 1,
        UserId: tokenString.UId,
        BillIsVoid: false,
        BillLastModifiedUser: tokenString.UId,
        BillAdvanceAmt: 0,
        BillCollectionAmt: totaldis,
        BillNepaliDate: nepaliDateConverter(todaydate),
        BillLastModifiedNepaliDate: nepaliDateConverter(todaydate),
        BillRoundedAmt: "",
        BillWithoutRound: totaldis,
        BillCreditPartyCode: data[0].crdPartyCode,
        BillPassword: "",
        IsSync: true,
        PaymentMode: "Cash",
        Remarks: "",
        PaymentCode: "",
        SampleId: 0,
        FiscalYearId: 1,
      };
      console.log(allDataSend);
      return;
      dispatch(
        addCreateCreditPartyBill(allDataSend, (res) => {
          console.log(res);
        })
      );
    } else {
      message.warning("RequestOR is not selected");
    }
  };
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  const nepaliDateConverter = (englishDateString) => {
    const nDate = adToBs(englishDateString);
    return nDate
  }

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
                    id="submitBtn"
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
                      <Form.Item
                        label="Item Name"
                        name="item"
                        rules={[
                          {
                            required: true,
                            message: "Please input item name!",
                          },
                        ]}
                      >
                        <Input
                          style={{
                            width: "100%",
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Rate"
                        name="rate"
                        rules={[
                          {
                            required: true,
                            message: "Please input item rate!",
                          },
                        ]}
                      >
                        <InputNumber
                          min={0}
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
                      <Form.Item
                        label="Quantity"
                        name="qty"
                        rules={[
                          {
                            required: true,
                            message: "Please input item quantity!",
                          },
                        ]}
                      >
                        <InputNumber
                          style={{
                            width: "100%",
                          }}
                          min={0}
                          onChange={(e) => setNumber2(e)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="DiscountAmt"
                        name="dis"
                        rules={[
                          {
                            required: true,
                            message: "Please input item discount!",
                          },
                        ]}
                      >
                        <InputNumber
                          style={{
                            width: "100%",
                          }}
                          min={0}
                          onChange={(e) => setNumber3(e)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Payment Type"
                        name="pmt"
                        rules={[
                          {
                            required: true,
                            message: "Please select payment type!",
                          },
                        ]}
                      >
                        <Select onChange={handleChange}>
                          {paymentType.map((item) => {
                            return (
                              <Option value={item.paymentmethod} key={item.id}>
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
