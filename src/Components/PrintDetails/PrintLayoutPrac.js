import { Divider } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
import styled from "styled-components";
import { inWords } from "../../constants/numberToWords";
import {
  getPatientBillByBillId,
  getPatientBillItemByBillId,
} from "../../services/datametricService";
import { todaydate } from "../Common/TodayDate";

const PrintLayout = (props) => {
  const dispatch = useDispatch();
  // const { id } = useParams()
  const paramVal =
    props !== undefined ? props?.location?.pathname.split("/") : "";
  const BILLID = paramVal != "" ? paramVal[2] : "";
  const FISCALYEAR = paramVal != "" ? paramVal[3] : "";

  const [billDetails, setBillDetails] = useState([]);
  const [billItemDetails, setBillItemDetails] = useState([]);
  const [shouldPrint, setShouldPrint] = useState(false);

  const loadPrintDataFun = (billId, fiscalYear) => {
    const ALLDATA = {
      sampleId: billId,
      fiscalYear: fiscalYear,
    };
    dispatch(
      getPatientBillByBillId(ALLDATA, (val) => {
        if (val.length > 0) {
          setBillDetails(val);
        }
      })
    );
    dispatch(
      getPatientBillItemByBillId(ALLDATA, (val) => {
        if (val.length > 0) {
          setBillItemDetails(val);
          setShouldPrint(true);
        }
      })
    );
  };

  useEffect(() => {
    if (shouldPrint) {
      setTimeout(() => {
        // window.print()
        // window.close()
      }, [1000]);
    }
  }, [shouldPrint]);

  useEffect(() => {
    loadPrintDataFun(BILLID, FISCALYEAR);
  }, []);

  return (
    <div>
      {billDetails.map((user) => (
        <PrintLayoutPage>
          {console.log(billDetails)}
          <div className="topic-section">
            <h3>Luniva Bill</h3>
            <p>Lalitpur</p>
            <p>
              Phone no.<span>0000000</span>
            </p>
            <div className="invoice">
              <span className="invoice-details">Invoice</span>
            </div>
          </div>

          <div className="details-section">
            <Divider orientation="left"></Divider>

            <div className="details-new">
              <table className="table-design">
                <tbody>
                  <tr>
                    <td>
                      <div>
                        <strong>
                          Requestor: <span>{user.Requestor}</span>
                        </strong>
                      </div>
                      <div>
                        Bill No:<span>{user.BillNo}</span>
                      </div>
                      <div>
                        <strong>Payment Mode:{user.PaymentMode}</strong>
                      </div>
                      <div>
                        <strong>Payment Type:</strong>
                        <span>{user.BillPaymentType}</span>
                      </div>
                    </td>
                    <td>
                      <div className="right-details">
                        <div>
                          <strong>Bill Date:</strong>
                          <span>{user.BillDate.split("T")[0]}</span>
                        </div>
                        <div>
                          <strong>Bill Nepali Date:</strong>
                          <span>{user.BillNepaliDate}</span>
                        </div>
                        <div>
                          <strong>Patient Id:</strong>
                          <span>{user.patId}</span>
                        </div>
                        <div>
                          <strong>Credit Party Code:</strong>
                          <span>{user.BillCreditPartyCode}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                <table className="table_bill">
                  <thead>
                    <tr>
                      <th>S.N</th>
                      <th>Test Name</th>
                      <th>Rate</th>
                      <th>Quantity</th>
                      <th>Discount</th>
                      <th>Price (Rs)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billItemDetails.map((billItemVal, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <div>{billItemVal.billTestName} </div>
                        </td>
                        <td className="money">{billItemVal.billPrice}</td>
                        <td className="money qmoney">1</td>
                        <td className="money">
                          {billItemVal.BillDiscountAmount}
                        </td>
                        <td className="money">{billItemVal.BillPriceFinal}</td>
                      </tr>
                    ))}
                    <tr>
                      <th>Total</th>
                      <th></th>
                      <th className="money">{user.Price}</th>
                      <th></th>
                      <th className="money"></th>
                      {/* {user.BillDiscountPrice} */}
                      <th className="money grandTotalAmount">
                        {user.TotalPrice}
                      </th>
                    </tr>
                    <tr>
                      <th></th>
                      <th className="total-below">
                        <span>Net Total</span> <br></br>
                        <span>Discount Total</span> <br></br>
                        <span>Grand Total</span> <br></br>
                        <span>Paid Amount</span> <br></br>
                      </th>
                      <td className="money" colspan="4">
                        <span>{user.Price}</span> <br></br>
                        <span>{user.BillDiscountPrice}</span> <br></br>
                        <span>{user.TotalPrice}</span> <br></br>
                        <span>{user.BillAmtPaid}</span> <br></br>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="printed-section">
                  <span>
                    <strong>Printed on:</strong> {todaydate}
                  </span>
                </div>
                <span className="total-amt">
                  Amount in Words: {inWords(user.TotalPrice)}
                </span>
              </div>
            </div>
          </div>
        </PrintLayoutPage>
      ))}
    </div>
  );
};

export default PrintLayout;
const PrintLayoutPage = styled.div`
  .topic-section {
    display: grid;
    justify-content: center;
    margin-top: 10px;
    align-items: center;
    text-align: center;
  }
  p {
    margin: 0;
  }
  h3 {
    color: black;
    margin: 0;
  }
  .invoice-details {
    font-size: 18px;
  }
  .row-section {
    margin-left: 10px;
  }

  /* new table */
  .details-new {
    margin-left: 10px;
  }
  tr td:last-child {
    text-align: right;
  }
  .table-design {
    width: 100%;
  }
  .right-details {
    margin-right: 10px;
  }
  .table_bill {
    border: 1px solid #ccc;
    border-collapse: collapse;
    width: 100%;
  }
  .table_bill thead tr th,
  .table_bill tfoot tr th {
    padding: 5px 9px !important;
  }
  .table_bill th {
    border: 1px solid #ccc;
  }
  .table_bill td,
  .table_bill th {
    border: 1px solid #ccc;
  }
  .money {
    text-align: right;
  }
  .table_bill tbody tr td {
    padding: 0px 9px !important;
  }
  .total-below {
    text-align: left;
  }
  th {
    text-align: left;
  }

  .printed-section span:last-child {
    float: right;
    text-align: right;
  }
  .qmoney {
    text-align: left;
  }
  p,
  span {
    font-size: 12px;
  }
  .total-amt {
    text-transform: capitalize;
  }
`;
