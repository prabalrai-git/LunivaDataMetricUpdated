import React from "react";
import { Col, Row, Divider } from "antd";
import styled from "styled-components";
const PrintLayout = () => {
  const data = [
    {
      municiplaitynm: "Abc Rural Municipality",
      municiplaityex: "Office of Municipality Executive",
      carename: "Allied Community HealthCare & Diagnostic Center",
      location: "Dallu Kathmandu",
      phone: "01166234",
      name: "ABC",
      panno: "0912821",
      age: "21 y/Male",
      address: "Kirtipur Municipality",
      mobilenum: "9878787867",
      depart: "All",
      paymenttype: "General",
      Invoicedate: "2022-10-16 A.D",
      transDate: "2022-10-16 A.D",
      billno: "21",
      patientid: "12",
      paymenttype: "Cash",
      RefDr: "SELF",
      testname: "40% - 59% BURN DRESSING ",
      rate: "1000",
      qty: "1",
      price: "1000",
      total: "1000",
      return: "1000",
      paidamt: "1000",
      remaining: "0",
      billby: "admin",
      printedby: "admin",
      amtword: "1000",
      printedon: "2022-10-16 A.D",
    },
  ];
  return (
    <div>
      {data.map((user) => (
        <PrintLayoutPage>
          <div className="topic-section">
            <p>{user.municiplaitynm}</p>
            <p>{user.municiplaityex}</p>
            <h3>{user.carename}</h3>
            <p>{user.location}</p>
            <p>
              Phone no.<span>{user.phone}</span>
            </p>
            <div className="invoice">
              <span className="invoice-details">Invoice</span>
            </div>
            <p>
              Customer Copy No.:<span>6</span>
            </p>
            <p>(Customer Copy)</p>
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
                          Name:<span>{user.name}</span>
                        </strong>
                      </div>
                      <div>
                        PAN NO:<span>{user.panno}</span>
                      </div>
                      <div>
                        Age/Sex:<span>{user.age}</span>
                      </div>
                      <div>
                        Address:<span>{user.address}</span>
                      </div>
                      <div>
                        Mobile No:<span>{user.mobilenum}</span>
                      </div>
                      <div>
                        Department:<span>{user.depart}</span>
                      </div>
                      <div>
                        <strong>Payment:{user.paymenttype}</strong>
                      </div>
                    </td>
                    <td>
                      <div className="right-details">
                        <div>
                          <strong>Invoice Date:</strong>
                          <span>{user.Invoicedate}</span>
                        </div>
                        <div>
                          <strong>Transaction Date:</strong>
                          <span>{user.transDate}</span>
                        </div>
                        <div>
                          <strong>Bill No:</strong>
                          <span>{user.billno}</span>
                        </div>
                        <div>
                          <strong>Patient Id:</strong>
                          <span>{user.patientid}</span>
                        </div>
                        <div>
                          <strong>Payment Type:</strong>
                          <span>{user.paymenttype}</span>
                        </div>
                        <div>
                          <strong>Ref Doctor:</strong>
                          <span>{user.RefDr}</span>
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
                      <th>Price (Rs)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <div>{user.testname} </div>
                      </td>
                      <td className="money">{user.rate}</td>
                      <td className="money qmoney">{user.qty}</td>
                      <td className="money">{user.price}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        <div>{user.testname}</div>
                      </td>
                      <td className="money">{user.rate}</td>
                      <td className="money qmoney">{user.qty}</td>
                      <td className="money">{user.price}</td>
                    </tr>
                    <tr>
                      <th>Total</th>
                      <th></th>
                      <th class="money grandTotalAmount" colspan="3">
                        {user.amtword}
                      </th>
                    </tr>
                    <tr>
                      <th></th>
                      <th className="total-below">
                        <span>Grand Total</span>
                        <br></br>
                        <span>Return</span> <br></br>
                        <span>Paid Amount</span> <br></br>
                        <span>Remaining</span> <br></br>
                      </th>
                      <td className="money" colspan="3">
                        <span>{user.total}</span> <br></br>
                        <span>{user.return}</span> <br></br>
                        <span>{user.paidamt}</span> <br></br>
                        <span>{user.remaining}</span> <br></br>
                      </td>
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
