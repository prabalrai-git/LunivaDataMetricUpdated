import {
  Col,
  // Input,
  Row,
  // Select,
  Form,
  // Button,
  // InputNumber,
  Descriptions,
  Button,
  // Table,
} from "antd";
import PageHeader from "../Common/pageHeader";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import {
  getPatientBillByBillId,
  getPatientBillItemByBillId,
  getRequestorBillListAll,
} from "../../services/datametricService";
import { useEffect, useState } from "react";
// import Print from "../Common/Print";
import { homePageName } from "../Common/StateList";
// const columns = [
//   {
//     title: "bill id",
//     dataIndex: "name",
//   },
//   {
//     title: "Bill no",
//     dataIndex: "age",
//   },
//   {
//     title: "Bill TestName",
//     dataIndex: "address",
//   },
// ];
const ViewUpdateBill = (props) => {
  console.log(props);
  const dispatch = useDispatch();

  // const { Option } = Select;
  const paramVal =
    props !== undefined ? props?.location?.pathname.split("/") : "";
  // console.log(props?.match?.params.id);
  // console.log(props?.match?.params.fiscalyear);
  const BILLID = props?.match?.params.id;
  // const BILLID = paramVal != "" ? paramVal[2] : "";
  const FISCALYEAR = props?.match?.params.fiscalyear;
  const [IsLoading, setIsLoading] = useState(false);
  const [billDetails, setBillDetails] = useState([]);
  const [billItemDetails, setBillItemDetails] = useState([]);
  const [partylistdata, setPartyListData] = useState([]);
  const [patientinfo, setPatientInfo] = useState([]);
  const [finaldata, setFinaldata] = useState([]);

  const loadPrintDataFun = (billId, fiscalYear) => {
    const ALLDATA = {
      sampleId: billId,
      fiscalYear: fiscalYear,
    };

    dispatch(
      getPatientBillByBillId(ALLDATA, (val) => {
        if (val.length > 0) {
          setBillDetails(val);
          setPatientInfo(val);
        }
      })
    );

    dispatch(
      getRequestorBillListAll((val) => {
        if (val.length > 0) {
          setPartyListData(val);
        }
      })
    );

    setIsLoading(true);
    dispatch(
      getPatientBillItemByBillId(ALLDATA, (val) => {
        if (val.length > 0) {
          setBillItemDetails(val);
          setTableData(val);
        } else {
          setTableData([]);
        }
      })
    );
    setIsLoading(false);
  };
  useEffect(() => {
    loadPrintDataFun(BILLID, FISCALYEAR);
  }, []);

  function filterdata(partylist = {}, code = "") {
    let newO = partylist.filter((res) =>
      res.BillCreditPartyCode.includes(code)
    );
  }
  const mydata = () => {};
  useEffect(() => {
    // const itemme = patientinfo.filter((res) =>
    //   filterdata(partylistdata, res.BillCreditPartyCode)
    // );
    if (patientinfo !== {} && patientinfo !== undefined) {
      const itemme2 = partylistdata.filter(
        (res) => patientinfo[0].BillCreditPartyCode === res.crdPartyCode
      );
      setFinaldata(itemme2);
    }
    // const itemData = partylistdata.filter((res) => res.crdPartyCode);
    // console.log(itemData[0], "second code");
    // const finalfiltrate = itemme === itemData;
    // console.log("given value is", finalfiltrate);
  }, [partylistdata]);

  const onFinish = (res) => {};
  const onFinishFailed = (res) => {};

  return (
    <>
      {billDetails.map(() => (
        <ViewUpdateBillSection>
          <div className="maiTopContainer">
            <PageHeader pageTitle={"View Bill"} />
          </div>
          <div className="financeCards">
            <h4>Bill Summary</h4>
            <Row justify="space-between">
              <Col>
                <ul>Patient Id:{billDetails[0].patId}</ul>
                <ul>Bill Id:{billDetails[0].patId}</ul>
              </Col>
              <Col>
                <ul>Bill No :{billDetails[0].BillNo} </ul>
                <ul>Name :{billDetails[0].BillCreditPartyCode} </ul>
              </Col>
            </Row>
            {finaldata.map(() => (
              <Row justify="space-between">
                <Col>
                  <ul>Bill Name :{finaldata[0].CrdPartyName} </ul>
                  <ul>Phone No :{finaldata[0].crdPartyPhoneNo} </ul>
                </Col>
                <Col>
                  <ul className="add">
                    Address :{finaldata[0].CrdPartyAddress}{" "}
                  </ul>
                  <ul className="add">Pan No :{finaldata[0].CrdPartyPan} </ul>
                </Col>
              </Row>
            ))}
            {/* {finaldata.map(() => (
              <Row justify="space-between">
                <Col>
                  <ul>Bill Name :{finaldata[0].CrdPartyName} </ul>
                  <ul>Bill No :{finaldata[0].crdPartyPhoneNo} </ul>
                </Col>
                <Col>
                  <ul>Address :{finaldata[0].CrdPartyAddress} </ul>
                </Col>
              </Row>
            ))} */}
            {/* <div>
              {partylistdata.map((abc) => {
                return <ul>Bill No :{abc.crdId} </ul>;
              })}
            </div> */}
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
                    <table className="table" id="customers">
                      <thead>
                        <tr>
                          <th>SN</th>
                          <th>Test Name</th>
                          <th>Rate</th>
                          <th>Discount</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {billItemDetails.map((data, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{data.billTestName}</td>
                              <td>{data.billPrice}</td>
                              <td>{data.BillDiscountAmount}</td>
                              <td>{data.BillPriceFinal}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <Row>
                      <Col span={6}>
                        <Descriptions
                          bordered
                          layout="horizontal"
                          column={1}
                          size="small"
                        >
                          <Descriptions.Item label="SubTotal">
                            {billDetails[0].Price}
                          </Descriptions.Item>
                          <Descriptions.Item label="Discount">
                            {billDetails[0].BillDiscountPrice}
                          </Descriptions.Item>
                          <br></br>
                          <Descriptions.Item label="GrandTotal">
                            {billDetails[0].TotalPrice}
                          </Descriptions.Item>
                        </Descriptions>
                      </Col>
                      <Col span={18}>
                        <PrintContainer>
                          <Button
                            onClick={() => {
                              window.open(
                                `/${homePageName}/printlayout/${BILLID}/${FISCALYEAR}`,
                                "_blank"
                              );
                            }}
                          >
                            Print
                          </Button>
                        </PrintContainer>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        </ViewUpdateBillSection>
      ))}
    </>
  );
};

export default ViewUpdateBill;
const ViewUpdateBillSection = styled.div`
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
  .table {
    border: 1px solid;
  }
  #customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    margin: 10px 0px 10px 0px;
  }

  #customers td,
  #customers th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  #customers tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  #customers tr:hover {
    background-color: #ddd;
  }

  #customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #fafafa;
    color: rgba(0, 0, 0, 0.85);
  }
  .add {
    margin-right: 10px;
  }
`;

const PrintContainer = styled.div`
  float: right;
`;
