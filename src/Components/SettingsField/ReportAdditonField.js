import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { todaydate } from "../Common/TodayDate";
import { tokenString } from "../Common/HandleUser";
import styled from "styled-components";
import {
  GetEmailServerDetails,
  InsertUpdateEmailserverDetails,
  InsertUpdateLabReportFormats,
} from "../../services/datametricService";
import { formItemLayout } from "../Common/FormItemLayout";
import { carelabStat } from "../Common/StateList";
const ReportAdditonField = (props) => {
  const dateFormat = "YYYY-MM-DD";
  const [form] = Form.useForm();
  const history = useHistory();
  const { forEdit } = props;
  const Id = props?.match?.params?.Id;
  const dispatch = useDispatch();
  const [Datainsert, setDatainsert] = useState([]);
  const [butDis, setButDis] = useState(false);
  const unitReducer = useSelector((state) => state.units);
  console.log(unitReducer, "i am unitreducer");
  const [previousValues, setPreviousValues] = useState(
    forEdit ? unitReducer?.units[Id] : {}
  );

  useEffect(() => {
    if (forEdit && previousValues === undefined) {
      dispatch(
        GetEmailServerDetails((val) => {
          console.log(val, "vals");
        }, Id)
      );
    }
  }, []);
  const onFinish = (values) => {
    setButDis(true);
    let data = {
      Id: forEdit ? Id : 0,
      Description: values?.Description,
      ReportType: values?.ReportType,
      GroupId: values?.GroupId,
      IndividualId: values?.IndividualId,
      ReportFormat: values?.ReportFormat,
      ReportGroup: values?.ReportGroup,
      HideInOtherReport: values?.HideInOtherReport,
      SeparateYellowPage: values?.SeparateYellowPage,

      CreatedBy: tokenString.UId,
      CreatedOn: todaydate,
      IsActive:
        values?.IsActive === undefined || values?.IsActive === true
          ? true
          : false,
    };
    dispatch(
      InsertUpdateLabReportFormats(data, (res) => {
        console.log(data, "insertdata");
        console.log(res, "ia ma response");
        setDatainsert(data);
        if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
          message.success(res?.Message);
          setTimeout(() => {
            history.push({
              pathname: "/reportdata",
              state: carelabStat,
            });
          }, 1000);
        } else {
          setButDis(false);
          message.error("Something went wrong please try again");
        }
      })
    );
  };
  useEffect(() => {
    setPreviousValues(unitReducer?.units[Id]);
  }, [unitReducer?.units[Id]]);

  useEffect(() => {
    if (previousValues !== undefined) {
      form.resetFields();
    }
  }, [previousValues]);

  const onFinishFailed = (errorInfo) => {
    setButDis(false);
  };

  let prevVal = {};
  if (previousValues !== undefined) {
    prevVal = {
      ...previousValues,
      // unit_name: previousValues?.Units,
    };
  }

  return (
    <div>
      <EmailAddField Field>
        <Row justify="center">
          <Col span={16}>
            <Form
              name="add_items"
              form={form}
              {...formItemLayout}
              initialValues={prevVal}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Description"
                // name="unit_name"
                name="Description"
                rules={[
                  {
                    required: true,
                    message: "Please input email !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="ReportType"
                // name="unit_name"
                name="ReportType"
                rules={[
                  {
                    required: true,
                    message: "Please input email !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="GroupId"
                // name="unit_name"
                name="GroupId"
                rules={[
                  {
                    required: true,
                    message: "Please input email !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="IndividualId"
                // name="unit_name"
                name="IndividualId"
                rules={[
                  {
                    required: true,
                    message: "Please input email !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="ReportFormat"
                // name="unit_name"
                name="ReportFormat"
                rules={[
                  {
                    required: true,
                    message: "Please input email !",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="ReportGroup"
                // name="unit_name"
                name="ReportGroup"
                rules={[
                  {
                    required: true,
                    message: "Please input email !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Created By"
                name="CreatedBy"
                rules={[
                  {
                    required: true,
                    message: "Please input Created Date!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Created Date"
                name="CreatedOn"
                rules={[
                  {
                    required: true,
                    message: "Please input Created Date!",
                  },
                ]}
              >
                <DatePicker format={dateFormat} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label="HideInOtherReport"
                name="HideInOtherReport"
                rules={[
                  {
                    required: true,
                    message: "Please input Created Date!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="SeparateYellowPage"
                name="SeparateYellowPage"
                rules={[
                  {
                    required: true,
                    message: "Please input Created Date!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Is Active"
                name="IsActive"
                valuePropName="checked"
              >
                <Switch defaultChecked />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  htmlType="submit"
                  disabled={butDis}
                  className="btnPrimary"
                >
                  {forEdit ? "Edit" : "Submit"}
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </EmailAddField>
    </div>
  );
};

export default ReportAdditonField;
const EmailAddField = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`;
