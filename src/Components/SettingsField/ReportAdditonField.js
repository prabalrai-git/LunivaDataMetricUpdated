import { Button, Col, DatePicker, Form, Input, Row, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  GetEmailServerDetails,
  InsertUpdateEmailserverDetails,
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
  const [butDis, setButDis] = useState(false);
  const unitReducer = useSelector((state) => state.units);
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

  useEffect(() => {
    setPreviousValues(unitReducer?.units[Id]);
  }, [unitReducer?.units[Id]]);

  useEffect(() => {
    if (previousValues !== undefined) {
      form.resetFields();
    }
  }, [previousValues]);

  const onFinish = (values) => {
    setButDis(true);
    let data = {
      Id: forEdit ? Id : 0,
      Host: values?.Host,
      Port: values?.Port,
      UserName: values?.UserName,
      Password: values?.Password,
      From: values?.From,
      Bcc: values?.Bcc,

      // Units: values?.unit_name,
      IsActive:
        values?.IsActive === undefined || values?.IsActive === true
          ? true
          : false,
    };
    dispatch(
      InsertUpdateEmailserverDetails(data, (res) => {
        if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
          message.success(res?.Message);
          setTimeout(() => {
            history.push({
              pathname: "/settingsemail",
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
                name="Host"
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
                name="Port"
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
