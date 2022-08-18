import { Row, Col, Select, Button, Form, DatePicker, Input } from "antd";
import moment from "moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useControlDetails } from "../../CustomHook/useControlDetails";
import { useFiscalYear } from "../../CustomHook/useFiscalYear";
import { getControlTestListApi } from "../../services/qcService";
import Filter from "./Filter";

const CarelabFilter = (props) => {
  const {
    returnFilterData,
    showTestControlList,
    showControlDetails,
    showFromToDate,
    showLevel,
    showSampleIdFrom,
    fiscalService,
  } = props;
  const { Option } = Select;
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const controlList = useControlDetails();
  const [testList, setTestList] = useState([]);
  const fiscalYear = useFiscalYear();
  console.log(fiscalYear);

  const initialValues = {
    SingleDate: moment(),
  };

  const onFilterReturn = (res) => {
    returnFilterData(res);
  };

  const callTestData = (res) => {
    testListData(res);
  };

  const testListData = (newData) => {
    let oData = {
      analyzerId: newData,
    };
    dispatch(
      getControlTestListApi(oData, (res) => {
        setTestList(res);
      })
    );
  };

  return (
    <FilterContainer>
      <Form
        form={form}
        autoComplete="off"
        onFinish={onFilterReturn}
        layout={"vertical"}
        initialValues={initialValues}
      >
        <Row justify="space-between" align="bottom">
          <Col lg={24} md={24} sm={24}>
            <Row className="filterRow" align="bottom">
              {showFromToDate && (
                <Col lg={6} md={12} sm={12} xs={24}>
                  <Form.Item name="FromTo" label="From - To">
                    <RangePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              )}
              {showTestControlList && (
                <Col lg={4} md={12} sm={12} xs={24}>
                  <Form.Item name="controlId" label="Test Control">
                    <Select
                      showSearch
                      optionFilterProp="children"
                      placeholder="Select Test Control"
                      filterOption={(input, option) => {
                        return (
                          option.key
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0 ||
                          option.title
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        );
                      }}
                      allowClear
                      onChange={callTestData}
                    >
                      {controlList?.map(
                        (cList) =>
                          cList?.IsActive === true && (
                            <Option
                              title={cList?.ControlName}
                              key={cList?.CId}
                              value={cList?.CId}
                            >
                              {cList?.ControlName}
                            </Option>
                          )
                      )}
                    </Select>
                  </Form.Item>
                </Col>
              )}
              {showControlDetails && (
                <Col lg={4} md={12} sm={12} xs={24}>
                  <Form.Item name="testId" label="Test">
                    <Select
                      showSearch
                      optionFilterProp="children"
                      placeholder="Select Test"
                      filterOption={(input, option) => {
                        return (
                          option.key
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0 ||
                          option.title
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        );
                      }}
                      allowClear
                    >
                      {testList?.map(
                        (cList) =>
                          cList?.IsActive === true && (
                            <Option
                              title={cList?.TestName}
                              key={cList?.TId}
                              value={cList?.TId}
                            >
                              {cList?.TestName}
                            </Option>
                          )
                      )}
                    </Select>
                  </Form.Item>
                </Col>
              )}
              {showLevel && (
                <Col lg={4} md={12} sm={12} xs={24}>
                  <Form.Item name="levelId" label="Level">
                    <Select
                      showSearch
                      optionFilterProp="children"
                      placeholder="Select Level"
                      filterOption={(input, option) => {
                        return (
                          option.key
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0 ||
                          option.title
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        );
                      }}
                      allowClear
                    >
                      <Option title={"All"} key={"All"} value={"All"}>
                        {"All"}
                      </Option>
                      <Option
                        title={"Level 1"}
                        key={"Level 1"}
                        value={"Level 1"}
                      >
                        {"Level 1"}
                      </Option>
                      <Option
                        title={"Level 2"}
                        key={"Level 2"}
                        value={"Level 2"}
                      >
                        {"Level 2"}
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
              )}
              {showSampleIdFrom && (
                <>
                  <Col lg={4} md={12} sm={12} xs={24}>
                    <Form.Item>
                      <Input placeholder="Sample Id From" />
                    </Form.Item>
                  </Col>
                  <Col lg={4} md={12} sm={12} xs={24}>
                    <Form.Item>
                      <Input placeholder="Sample Id to" />
                    </Form.Item>
                  </Col>
                </>
              )}
              {fiscalService && (
                <>
                  <Col lg={4} md={10} sm={12} xs={24}>
                    <span className="labelTop">Fiscal Year</span>
                    <Select style={{ width: "100%" }} size="default">
                      {fiscalYear.map((lis) => (
                        <Option title={lis?.Year} key={lis?.Id} value={lis?.Id}>
                          {lis?.Year}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </>
              )}

              <Col>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Load
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </FilterContainer>
  );
};

export default CarelabFilter;

const FilterContainer = styled.div`
  padding: 5px;

  .filterRow > div {
    padding: 4px;
  }

  .labelTop {
    display: block;
  }
`;
