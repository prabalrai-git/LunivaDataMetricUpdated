import { Divider } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getPatientBillByBillId, getPatientBillItemByBillId } from "../../services/datametricService";

const PrintLayout = () => {
  const dispatch = useDispatch();
  // const { id } = useParams()
  // const BILLID = props?.match?.params?.id;
  // const FISCALYEAR = props?.match?.params?.fiscalyear;

  // console.log(id, BILLID, FISCALYEAR);
  const [billDetails, setBillDetails] = useState([]);
  const [billItemDetails, setBillItemDetails] = useState([]);

  const loadPrintDataFun = (billId, fiscalYear) => {
    const ALLDATA = {
      sampleId: billId,
      fiscalYear: fiscalYear,
    }
    dispatch(
      getPatientBillByBillId(ALLDATA, (val) => {
        if (val.length > 0) {
          setBillDetails(val)
        }
      })
    );
    dispatch(
      getPatientBillItemByBillId(ALLDATA, (val) => {
        if (val.length > 0) {
          setBillItemDetails(val)
        }
      })
    )
  }

  useEffect(() => {
    loadPrintDataFun(12, 1)
  }, [])

  // const data = [
  //   {
  //     municiplaitynm: "Abc Rural Municipality",
  //     municiplaityex: "Office of Municipality Executive",
  //     carename: "Allied Community HealthCare & Diagnostic Center",
  //     location: "Dallu Kathmandu",
  //     phone: "01166234",
  //     name: "ABC",
  //     panno: "0912821",
  //     age: "21 y/Male",
  //     address: "Kirtipur Municipality",
  //     mobilenum: "9878787867",
  //     depart: "All",
  //     paymenttype: "General",
  //     Invoicedate: "2022-10-16 A.D",
  //     transDate: "2022-10-16 A.D",
  //     billno: "21",
  //     patientid: "12",
  //     paymenttype: "Cash",
  //     RefDr: "SELF",
  //     testname: "40% - 59% BURN DRESSING ",
  //     rate: "1000",
  //     qty: "1",
  //     price: "1000",
  //     total: "1000",
  //     return: "1000",
  //     paidamt: "1000",
  //     remaining: "0",
  //     billby: "admin",
  //     printedby: "admin",
  //     amtword: "1000",
  //     printedon: "2022-10-16 A.D",
  //   },
  // ];
  return (
    <div>
      {billDetails.map((user) => (
        <PrintLayoutPage>
          <div className="topic-section">
            <h3>Lu Bill</h3>
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
                          <span>{user.BillDate}</span>
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
                    {
                      billItemDetails.map((billItemVal, index) => (
                        <tr>
                          <td>{index+1}</td>
                          <td>
                            <div>{billItemVal.billTestName} </div>
                          </td>
                          <td className="money">{billItemVal.billPrice}</td>
                          <td className="money qmoney">1</td>
                          <td className="money">{billItemVal.BillDiscountAmount}</td>
                          <td className="money">{billItemVal.BillPriceFinal}</td>
                        </tr>
                      ))
                    }
                    <tr>
                      <th>Total</th>
                      <th></th>
                      <th></th>
                      <th className="money grandTotalAmount" colSpan="3">
                        {user.amtword}
                      </th>
                    </tr>
                    <tr>
                    </tr>
                  </tbody>
                </table>
                <div className="printed-section">
                  <span>
                    <strong>Bill By:</strong>
                    {user.billby}
                  </span>
                  <br></br>
                  <span>
                    <strong>Printed on:</strong>
                    {user.printedon}
                  </span>
                  <span>
                    <strong>Printed By:</strong>
                    {user.printedby}
                  </span>
                </div>
                <span className="total-amt">
                  Amount in Words: three thousand
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
