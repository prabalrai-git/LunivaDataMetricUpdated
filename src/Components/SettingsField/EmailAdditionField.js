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
  console.log(props, "props");
  const alllistedvalue = props.location.state.record;
  console.log("this is the prop", alllistedvalue);
  const CID = props?.match?.params?.id;

  console.log(CID, "i am props id");
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const [datainsert, setDatainsert] = useState([]);
  const [userselecteddata, setuseriddetails] = useState({});
  // const [hostname, setHostname] = useState(user.home);
  // const [portnum, setPOrtnum] = useState(a.Port);
  // const [username, setUsername] = useState(a.UserName);
  // const [Password, setPassword] = useState(a.Password);
  // const [From, setFrom] = useState(a.From);
  // const [IsActive, setIsActive] = useState(a.IsActive);
  // const [Bcc, setBcc] = useState(a.Bcc);
  // var arr = [{key:"11", value:"1100"},{key:"22", value:"2200"}];
  // var object = arr.reduce(
  //   (obj, item) => Object.assign(obj, { [item.key]: item.value }), {});

  // console.log(object)
  let prevVal = {
    ...userselecteddata,
  };
  useEffect(() => {
    if (forEdit && alllistedvalue === undefined) {
      dispatch(
        GetEmailServerDetails((val) => {
          console.log(val, "vals");
        }, CID)
      );
    }
  }, []);

  useEffect(() => {
    let data = {
      id: CID,
    };
    dispatch(
      GetEmailServerDetails(data, (val) => {
        console.log(data, "iam all data of server details");
        console.log(val[0], "iam vals iam all data of server details");
        setuseriddetails(val[0]);
        // let finalres = val[0];
        // setuseriddetails(finalres);
        const array = val;
        console.log(finalres, "finalres");

        // const newObject = Object.assign(
        //   {},
        //   ...array.map((item) => ({
        //     ["Id"]: item.Id,
        //     ["Port"]: item.Port,
        //     ["Host"]: item.Host,
        //     ["UserName"]: item.UserName,
        //     ["Password"]: item.Password,
        //     ["From"]: item.From,
        //     ["IsActive"]: item.IsActive,
        //     ["Bcc"]: item.Bcc,
        //   }))
        // );
        // console.log(newObject, "newobject");
        // setuseriddetails(newObject);
      })
    );
    // form.setFieldsValue({
    //   Port: userselecteddata.Port,
    //   UserName: UserName,
    // });
  }, []);
  useEffect(() => {
    console.log(userselecteddata, "userselecteddata");
  }, [userselecteddata]);

  const onFinish = (values) => {
    setButDis(true);
    let data = {
      Id: forEdit ? CID : 0,
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
        console.log(res, "responsedata");
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

  return (
    <div>
      <EmailAddField Field>
        <Row justify="center">
          <Col span={16}>
            <Form
              // name="add_items"
              form={form}
              {...formItemLayout}
              // initialValues={userselecteddata}
              initialValues={alllistedvalue}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="HostName"
                name="Host"
                rules={[
                  {
                    required: true,
                    message: "Please input hostname !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Port"
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
                name="UserName"
                rules={[
                  {
                    required: true,
                    message: "Please input username !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input the password !",
                  },
                ]}
              >
                <Input.Password placeholder="input password" />
              </Form.Item>
              <Form.Item
                label="From"
                name="From"
                rules={[
                  {
                    required: true,
                    message: "Please input from name !",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Bcc"
                name="Bcc"
                rules={[
                  {
                    required: true,
                    message: "Please input bcc !",
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
