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
  const BILLID = paramVal != "" ? paramVal[2] : "";
  const FISCALYEAR = paramVal != "" ? paramVal[3] : "";
  const [billDetails, setBillDetails] = useState([]);
  const [billItemDetails, setBillItemDetails] = useState([]);
  const [partylistdata, setPartyListData] = useState([]);
  const [requestme, setRequestMe] = useState([]);
  const [patientinfo, setPatientInfo] = useState([]);

  const itemme = patientinfo.filter((res) => res.BillCreditPartyCode[0]);
  console.log(itemme, "firstcode");
  const itemData = partylistdata.filter((res) => res?.crdPartyPhoneNo);
  console.log(itemData, "second code");

  const filtarate = itemme === itemData;

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
          // console.log(val);
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
  const [IsLoading, setIsLoading] = useState(false);
  const onFinish = (res) => { };

  const onFinishFailed = (res) => { };

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
              {/* {partylistdata.map(() => (
                <Col>
                  <ul>Bill No :{partylistdata[0].CrdPartyName} </ul>
                  <ul>Bill No :{billDetails[0].BillNo} </ul>
                </Col>
              ))} */}
            </Row>

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
                          <th>Price </th>
                        </tr>
                      </thead>
                      <tbody>
                        {billItemDetails.map((data, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{data.billTestName}</td>
                              <td>{data.billPrice}</td>
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
                            {billDetails[0].TotalPrice}
                          </Descriptions.Item>
                          <br></br>
                          <Descriptions.Item label="GrandTotal">
                            {billDetails[0].Price}
                          </Descriptions.Item>
                        </Descriptions>
                      </Col>
                      <Col span={18}>
                        <PrintContainer>
                          <Button
                            onClick={() => {
                              window.open(`/${homePageName}/printlayout/${BILLID}/${FISCALYEAR}`, "_blank");
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
`;

const PrintContainer = styled.div`
float: right;
`