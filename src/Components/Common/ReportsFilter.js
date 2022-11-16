import { Col, Row, Select } from "antd";
import React from "react";
import styled from "styled-components";
import AppButton from "./AppButton";
import Datepicker from "./Datepicker";
import FilterTable from "./FilterTable";

function ReportsFilter({ ...props }) {
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
  } = props;

  const { Option } = Select;

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
                    // console.log(val, "valval");
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
            {dateRange && (
              <Col lg={8} md={10} sm={12} xs={24}>
                <span className="labelTop">Date Range</span>
                <Datepicker
                  //   defaultValuer={fromDate}
                  onChanger={(value) => {
                    console.log("value", value);
                    setFromDate(value[0].format("YYYY-MM-DD"));
                    setToDate(value[1].format("YYYY-MM-DD"));
                  }}
                />
              </Col>
            )}
            {serchButton && (
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
            )}
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
  .labelTop {
    display: block;
  }
`;
