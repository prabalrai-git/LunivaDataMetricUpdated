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
  InsertUpdateCreditPartyInPatientForPartyBill,
} from "../../services/datametricService";
import { useDispatch } from "react-redux";
import { adToBs } from "@sbmdkl/nepali-date-converter";
import { paymentType } from "../../constants/paymentType";
import { todaydate } from "../Common/TodayDate";
import { useHistory } from "react-router-dom";
import { tokenString } from "../Common/HandleUser";
import { carelabStat, homePageName, inventoryStat } from "../Common/StateList";
import { useFiscalYear } from "../../CustomHook/useFiscalYear";

const AddBill = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const [rate, setRate] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [discountamount, setDiscountAmount] = useState(0);
  const [discountpercentage, setDiscountPercentage] = useState(0);
  const [total, setTotal] = useState(0);
  const [grandtotals, setGrandTotals] = useState(0);
  const [roundamt, setRoundAmt] = useState(0);
  const [partydata, setPartydata] = useState();
  const [data, setData] = useState([]);
  const [chData, setChData] = useState({});
  const [requestorList, setrequestorList] = useState([]);
  const [butDis, setButDis] = useState(false);
  const [fiscalYearId, setFiscalYearId] = useState(1);
  const [dTracker, setDTracker] = useState(false);
  const fiscalYear = useFiscalYear();
  const { Option } = Select;

  const handleChange = (value) => {
    setChData(value);
  };

  useEffect(() => {
    dispatch(
      getRequestorBillListAll((val) => {
        // console.log(val, "billvalue");
        setrequestorList(val);
        setPartydata(val);
      })
    );
  }, []);

  const onFinish = (values) => {
    let billdata = {
      id: 1,
      creditparty: "Astha Kidney Hospital",
      partycode: "C100",
      userId: 1,
      email: "a",
      contactno: 1,
      pan: 1,
      remarks: "a",
    };

    dispatch(
      InsertUpdateCreditPartyInPatientForPartyBill(billdata, (val) => {
        // console.log(val, "ssdflksjdsdfsdfsdf");
        if (val[0].SampleId > 0) {
          if (data.length > 0) {
            setButDis(true);
            ///creditparty save

            const allDataSend = {
              _lstBillItems: [
                {
                  ID: 0,
                  BillID: 0,
                  BillNo: "N/A",
                  TestID: 0,
                  billDGid: 0,
                  billTestName:
                    values?.item !== undefined && values?.item !== null
                      ? values?.item
                      : 0,
                  billPrice: total !== undefined && total !== null ? total : 0,
                  billOutGoing: true,
                  //needs percent
                  billDiscount:
                    values?.dis !== undefined && values?.dis !== null
                      ? values?.dis
                      : 0,
                  //needs percent
                  billDiscountAmt:
                    values?.dis !== undefined && values?.dis !== null
                      ? values?.dis
                      : 0,
                  billPriceFinal:
                    grandtotals !== undefined && grandtotals !== null
                      ? grandtotals
                      : 0,
                  IsSync: true,
                  RoundAmt: 0, //roundamt,
                  Remarks: "N/A",
                  OutgoingLabId: 1,
                },
              ],
              Id: 0,
              PatId: 2,
              Nrl_Reg_No: "N/A",
              TestId: 0,
              Price: total,
              TotalPrice: grandtotals,
              DiscountPrice:
                values?.dis !== undefined && values?.dis !== null
                  ? values?.dis
                  : 0,
              HSTPrice: 0,
              IsPaid: true,
              IsDone: true,
              BillDate: todaydate,
              BillLastModifiedDate: todaydate,
              BillNo: "N/A",
              //needs percent
              BillDiscount:
                values?.dis !== undefined && values?.dis !== null
                  ? values?.dis
                  : 0,
              //needs percent
              BillDiscountAmt:
                values?.dis !== undefined && values?.dis !== null
                  ? values?.dis
                  : 0,
              BillHst: 0,
              BillHstAmt: 0,
              BillAmtPaid: grandtotals,
              BillRemainingAmt: 0,
              BillPaymentType:
                values?.pmt !== undefined && values?.pmt !== null
                  ? values?.pmt
                  : "",
              BillOutGngAmt: grandtotals,
              BillOutGngDiscountAmt:
                values?.dis !== undefined && values?.dis !== null
                  ? values?.dis
                  : 0,
              BillOutGngAmtPc: 1,
              UserId: tokenString.UId,
              BillIsVoid: false,
              BillLastModifiedUser: tokenString.UId,
              BillAdvanceAmt: 0,
              BillCollectionAmt: grandtotals,
              BillNepaliDate: nepaliDateConverter(todaydate),
              BillLastModifiedNepaliDate: nepaliDateConverter(todaydate),
              BillRoundedAmt: "",
              BillWithoutRound: grandtotals,
              BillCreditPartyCode: data[0].crdPartyCode,
              BillPassword: "",
              IsSync: true,
              PaymentMode: "Cash",
              Remarks: "N/A",
              PaymentCode: "",
              SampleId: val[0].SampleId,
              FiscalYearId: fiscalYearId,
            };

            // console.log(allDataSend, "alldatasend");
            dispatch(
              addCreateCreditPartyBill(allDataSend, (res) => {
                if (res?.SuccessMsg === true) {
                  message.success(res?.Message);
                  setTimeout(() => {
                    history.push({
                      pathname: `/viewupdatebill/${res.CreatedId}/${fiscalYearId}`,
                      state: carelabStat,
                    });
                    window.open(
                      `/${homePageName}/printlayout/${res?.CreatedId}/${fiscalYearId}`,
                      "_blank"
                    );
                  }, 1000);
                } else {
                  setButDis(false);
                  message.error(res?.Message);
                }
              })
            );
          } else {
            setButDis(false);
            message.warning("Requestor is not selected");
          }
        }
      })
    );
  };
  const onFinishFailed = (errorInfo) => {
    setButDis(false);
  };

  const nepaliDateConverter = (englishDateString) => {
    const nDate = adToBs(englishDateString);
    return nDate;
  };

  useEffect(() => {
    multiply();
    grandtotal();
    roundsfunc();
  }, [rate, quantity, discountamount, grandtotals, total]);

  const multiply = () => {
    let totalcal = rate * quantity;
    setTotal(totalcal);
  };

  const grandtotal = () => {
    let totalss = total - discountamount;
    let totalD = Math.round(totalss);

    setGrandTotals(totalD);
  };
  const roundsfunc = () => {
    let rv = Math.round(discountamount);
    setRoundAmt(rv);
  };

  const onChangeHandler = () => {
    const itemData = requestorList.filter((res) => res.crdId === chData);
    setData(itemData);
    setPartydata(itemData);
    // console.log(itemData, "itemdata");
  };

  const calculateDiscountPercentage = (e) => {
    if (rate !== 0 && quantity !== 0) {
      let originalAmount = rate * quantity;
      if (e !== null || 0) {
        let discountPercentages = (e / originalAmount) * 100;
        setDiscountPercentage(discountPercentages);
        if (discountPercentages) {
          // console.log(discountPercentages, "discount percentage");
          form.setFieldsValue({
            discountPercentage: discountPercentages?.toFixed(2) + "%",
          });
        }
      } else {
        form.setFieldsValue({
          discountPercentage: 0 + "%",
        });
      }
    }
  };

  const calculateDiscountAmount = (e) => {
    if (rate !== 0 && quantity !== 0) {
      let originalAmount = rate * quantity;

      if (e !== null || 0) {
        let discountamounts = (e / 100) * originalAmount;
        setDiscountAmount(discountamounts);
        if (discountamounts) {
          // console.log(discountamounts, "discount amounts");

          form.setFieldsValue({
            discountAmount: discountamounts?.toFixed(2),
          });
        }
      } else {
        form.setFieldsValue({
          discountAmount: 0,
        });
      }
    }
  };

  return (
    <>
      <AddBillSection>
        <div className="maiTopContainer">
          <PageHeader pageTitle={"Create New Bill"} />
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
          <NewTableSummary
            reqData={data}
            // sampData={sendSampledata}
          ></NewTableSummary>
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
                  form={form}
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
                            setRate(e);
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
                          onChange={(e) => setQuantity(e)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Discount Amount"
                        name="discountAmount"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please input item discount!",
                        //   },
                        // ]}
                      >
                        <InputNumber
                          style={{
                            width: "100%",
                          }}
                          min={0}
                          onChange={(e) => {
                            setDiscountAmount(e);
                            calculateDiscountPercentage(e);
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Discount Percentage"
                        name="discountPercentage"
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
                          onChange={(e) => {
                            setDiscountPercentage(e);
                            // setDTracker(!dTracker)

                            calculateDiscountAmount(e);
                            // console.log(e, "log from onchange");

                            // autodisountamtcalculate(e);
                            // autocalcDisAmount(e);
                          }}
                          // defaultValue={discountpercentage}
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
                      <Form.Item name="fiscalYear" label="Fiscal Year">
                        <Select
                          style={{ width: "100%" }}
                          size="default"
                          onChange={(res) => {
                            setFiscalYearId(res);
                          }}
                        >
                          {fiscalYear.map((lis) => (
                            <Option
                              title={lis?.Year}
                              key={lis?.Id}
                              value={lis?.Id}
                            >
                              {lis?.Year}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Remarks"
                        name="Remarks"
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
                    <Col span={24}>
                      <div className="s-btn">
                        {/* <Button type="primary" htmlType="submit"> */}
                        <Button
                          htmlType="submit"
                          disabled={butDis}
                          type="primary"
                          className=""
                        >
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
                        <Descriptions.Item label="Discount (%)">
                          {discountpercentage?.toFixed(1)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Discount Amt">
                          {discountamount?.toFixed(1)}
                        </Descriptions.Item>
                        {/* <Descriptions.Item label="Rounded Amount">
                          {roundamt}
                        </Descriptions.Item> */}
                        <Descriptions.Item label="GrandTotal">
                          {grandtotals}
                        </Descriptions.Item>
                        <br></br>
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
