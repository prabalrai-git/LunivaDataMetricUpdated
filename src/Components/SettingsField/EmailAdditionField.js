import { Button, Col, Form, Input, message, Row, Switch } from "antd";
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
const EmailAdditionField = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { forEdit } = props;
  // const Id = props;
  const Id = props?.match?.params?.Id;
  console.log(Id, "i am iddsada");
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const unitReducer = useSelector((state) => state.units);
  const [datainsert, setDatainsert] = useState([]);
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
      console.log(previousValues, "i am prev values");
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
      IsActive:
        values?.IsActive === undefined || values?.IsActive === true
          ? true
          : false,
    };

    dispatch(
      InsertUpdateEmailserverDetails(data, (res) => {
        console.log(data, "dataofinsert");
        setDatainsert(data);
        message.success("inserted");
        console.log(res, "responsedata");
        if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
          message.success(res?.Message);
          setTimeout(() => {
            // /editcontroltesttest/${record.TId}
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
      Host: previousValues?.Host,
      Port: previousValues?.Port,
      UserName: previousValues?.UserName,
      Password: previousValues?.Password,
      From: previousValues?.From,
      Bcc: previousValues?.Bcc,
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
                label="HostName"
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
                label="Port"
                // name="unit_name"
                name="Port"
                rules={[
                  {
                    required: true,
                    message: "Please input port num !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="UserName"
                // name="unit_name"
                name="UserName"
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
                label="Password"
                // name="unit_name"
                name="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input password !",
                  },
                ]}
              >
                <Input.Password placeholder="input password" />
              </Form.Item>
              <Form.Item
                label="From"
                // name="unit_name"
                name="From"
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
                label="Bcc"
                // name="unit_name"
                name="Bcc"
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

export default EmailAdditionField;
const EmailAddField = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`;
