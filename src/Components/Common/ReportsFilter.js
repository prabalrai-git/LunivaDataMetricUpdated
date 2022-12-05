import { Col, message, Row, Select } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { getDatametricReportType } from "../../services/careLabService";
import AppButton from "./AppButton";
import Datepicker from "./Datepicker";
import FilterTable from "./FilterTable";
import { newTableStyles } from "./TableStyles";
import { carelabStat } from "../Common/StateList";

function ReportsFilter({ ...props }) {
  const dispatch = useDispatch();
  const [dateRanges, setDateRanges] = useState();
  const {
    states,
    district,
    setStateId,
    setDistrictId,
    setMunicipalityId,
    municipality,
    dateRange,
    serchButton,
    setFromDate,
    setToDate,
    OnLoad,
    csvDataName,
    csvData,
    reportName,
    printFileName,
    fromDate,
    toDate,
    tableHead,
    reportType,
    setReportId,
    stateId,
    districtId,
    municipalityId,
    diagnosisId,
    testId,
  } = props;

  const { Option } = Select;

  const getLocationDetails = (stateId, districtId, municipalityId) => {
    const sProvince = states.map((index) => {
      if (index.Id === stateId) {
        return index.Name;
      }
    });
    const sDistrict = district.map((index) => {
      if (index.Id === districtId) {
        return index.Name;
      }
    });
    const sMunicipality = municipality.map((index) => {
      if (index.Id === municipalityId) {
        return index.Name;
      }
    });
  };

  useEffect(() => {
    getLocationDetails();
  }, []);

  const printHandle = () => {
    if (csvData.length !== 0) {
      let newWindow = window.open();

      var adbs = require("ad-bs-converter");
      var nepaliFromDate = dateRanges[0].format("YYYY/MM/DD");
      var nepaliToDate = dateRanges[1].format("YYYY/MM/DD");
      var neaplaiFromToDateString = [];
      if (nepaliFromDate !== undefined) {
        // var nNepaliFromDate = nepaliFromDate.replaceAll("-", "/");
        // var nNepaliToDate = nepaliToDate.replaceAll("-", "/");
        var converterNepaliFromDate = adbs.ad2bs(nepaliFromDate);
        var converterNepalitoDate = adbs.ad2bs(nepaliToDate);
        var converteNpFromDate = `${converterNepaliFromDate.en.year}-${converterNepaliFromDate.en.month}-${converterNepaliFromDate.en.day} `;
        var converteNpToDate = `${converterNepalitoDate.en.year}-${converterNepalitoDate.en.month}-${converterNepalitoDate.en.day} `;
        neaplaiFromToDateString.push(converteNpFromDate, converteNpToDate);
      }

      let newStyle = ``;
      // if (removetwo)
      newStyle = `<style>thead > tr> th:first-child, thead > tr> th:nth-child(2), tbody > tr > td:first-child,tbody > tr > td:nth-child(2){
        
       }tbody > tr:last-child{
    background-color: #f0f0f2;
    }
    tbody > tr:last-child > td{
        font-size: 12px;
        font-weight: 500;
    }</style>`;

      let refName = `
      <div class="gocenter">
          
          <h2> Crystal Diagonistic Lab </h2>
          <p> Kathmandu, Sankhamul </p>
          <p>Contact no:9009090 </p>
          <h2>${reportName} Report</h2>
          
          </div>
          <div >
          
          <div style='float:right;margin-bottom:10px;'>
          <strong >From</strong> ${neaplaiFromToDateString[0]} - <strong>To</strong> ${neaplaiFromToDateString[1]}
          </div>
        
      </div>
      `;

      let locationDetail = `
        <div style='float:right;margin-bottom:10px;'>
          <strong >Province</strong> ${states} <strong>To</strong> ${neaplaiFromToDateString[1]}
          </div>
      `;

      let tableBody = "";
      let tableHeadHtml = "<thead>";
      let columns = [];

      tableHead.forEach((ele) => {
        tableHeadHtml += `<th>${ele?.dataIndex}</th>`;
        columns.push(ele.dataIndex);
      });
      tableHeadHtml += "</thead>";

      csvData.forEach((ele) => {
        tableBody = tableBody + "<tr>";
        columns.forEach((cell) => {
          tableBody = tableBody + "<td>" + ele[cell] + "</td>";
        });
        tableBody = tableBody + "</tr>";
      });

      let allTable = `<table>${tableHeadHtml}${tableBody}</table>`;

      newWindow.document.body.innerHTML =
        newTableStyles + newStyle + refName + allTable;

      setTimeout(function () {
        newWindow.print();
        newWindow.close();
      }, 300);
    } else {
      message.info("select some data");
    }
  };

  return (
    <FilterContainer>
      <Row justify="start" align="bottom">
        <Col lg={20} md={24} sm={24}>
          <Row className="filterRow" align="bottom">
            {states !== undefined && (
              <Col lg={8} md={12} sm={11} xs={24}>
                <span className="labelTop">State</span>
                <Select
                  style={{ width: "100%" }}
                  // defaultValue="0"
                  onChange={(val) => {
                    setStateId(val);
                  }}
                >
                  <Option value={0}>All</Option>

                  {states?.map((iTy) => {
                    return <Option value={iTy?.Id}>{iTy?.Name}</Option>;
                  })}
                </Select>
              </Col>
            )}
            {district !== undefined && (
              <Col lg={8} md={12} sm={11} xs={24}>
                <span className="labelTop">District</span>
                <Select
                  style={{ width: "100%" }}
                  // defaultValue="0"
                  onChange={(val) => {
                    setDistrictId(val);
                  }}
                >
                  <Option value={0}>All</Option>

                  {district?.map((iTy) => {
                    return <Option value={iTy?.Id}>{iTy?.Name}</Option>;
                  })}
                </Select>
              </Col>
            )}
            {municipality !== undefined && (
              <Col lg={8} md={12} sm={11} xs={24}>
                <span className="labelTop">Municipality</span>
                <Select
                  style={{ width: "100%" }}
                  // defaultValue="0"
                  onChange={(val) => {
                    setMunicipalityId(val);
                  }}
                >
                  <Option value={0}>All</Option>
                  {municipality?.map((iTy) => {
                    return <Option value={iTy?.Id}>{iTy?.Name}</Option>;
                  })}
                </Select>
              </Col>
            )}

            <Col lg={8} md={12} sm={11} xs={24}>
              <span className="labelTop">Report Type</span>
              <Select
                style={{ width: "100%" }}
                // defaultValue="0"
                onChange={(val) => {
                  setReportId(val);
                }}
              >
                {reportType?.map((iTy) => {
                  return <Option value={iTy?.RId}>{iTy?.ReportName}</Option>;
                })}
              </Select>
            </Col>

            {dateRange && (
              <Col lg={8} md={12} sm={11} xs={24}>
                <span className="labelTop">Date Range</span>
                <Datepicker
                  className
                  //   defaultValuer={fromDate}
                  onChanger={(value) => {
                    setDateRanges(value);
                    setFromDate(value[0].format("YYYY-MM-DD"));
                    setToDate(value[1].format("YYYY-MM-DD"));
                  }}
                />
              </Col>
            )}
            {serchButton && (
              <div className="load-btnreport">
                <Col>
                  <AppButton
                    className="primary-btn"
                    buttonTitle="Load"
                    buttonOnClick={() => {
                      OnLoad();
                    }}
                    priamryOutlineBtn
                  />
                </Col>
                <Col>
                  <NavLink
                    to={{
                      pathname: `MainPage`,
                      state: carelabStat,
                    }}
                  >
                    <div className="graphbtnsection">
                      <AppButton
                        className="primary-btn graphbtn"
                        buttonTitle="View Graph"
                        priamryOutlineBtn
                      />
                    </div>
                  </NavLink>
                </Col>
              </div>
            )}
            <div
              style={{
                position: "absolute",
                right: "-210px",

                top: "-60px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {csvDataName && (
                <div
                  className="link"
                  style={{ display: "inline", float: "right" }}
                >
                  <CSVLink
                    filename={csvDataName}
                    className="btn ant-btn btn-primary btn-primary--outline"
                    data={csvData}
                  >
                    Export CSV
                  </CSVLink>
                </div>
              )}
              {printFileName && (
                <button
                  onClick={printHandle}
                  className="btn ant-btn btn-primary btn-primary--outline"
                  style={{
                    marginLeft: "8px",
                    marginBottom: "4px",
                  }}
                >
                  Print
                </button>
              )}
            </div>
          </Row>
        </Col>

        {/* <Col lg={4} md={24} sm={24}>
          {onSearch && (
            <FilterTable
              // ble
              className="costomeInput"
              onInput={(e) => handleSerch(e.target.value)}
              dataReturn
            />
          )}
        </Col> */}
      </Row>
    </FilterContainer>
  );
}

export default ReportsFilter;

const FilterContainer = styled.div`
  /* background-color: #fefefe; */
  padding: 5px;
  .filterRow > div {
    padding: 4px;
  }
  .primary-btn {
    float: right !important;
  }
  .load-btnreport {
    margin-left: auto;
    display: flex;
    justify-content: space-around;
    /* justify-content: space-between; */
  }
  .graphbtnsection {
    margin-left: 10px;
  }
`;
