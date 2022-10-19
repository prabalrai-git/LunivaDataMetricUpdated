import React from "react";
import {
  Col,
  Input,
  Row,
  Select,
  Table,
  Form,
  Button,
  Space,
  InputNumber,
  Menu,
  Descriptions,
} from "antd";
import { useState, useEffect } from "react";
import PageHeader from "../Common/pageHeader";
import { formItemLayout } from "../Common/FormItemLayout";
import Summery from "../Common/Summery";
import AppButton from "../Common/AppButton";
import Filter from "../Common/Filter";
import NewTableSummary from "../Common/NewTableSummary";
import styled from "styled-components";
import { getGetRequestorList } from "../../services/datametricService";
import { useDispatch } from "react-redux";
const { Option, OptGroup } = Select;

const columns = [
  {
    title: "Item",
    dataIndex: "Id",
    key: "Id",
  },
  {
    title: "Rate",
    dataIndex: "IsGointOut",
    key: "IsGointOut",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const selectedUser = (e) => {
  setUser(e.target.value);
};
const AddBill = () => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [number3, setNumber3] = useState(0);
  const [total, setTotal] = useState(0);
  const [totaldis, setDis] = useState(0);
  const [data, setData] = useState([]);
  const [chData, setChData] = useState({});
  const [requestorList, setrequestorList] = useState([]);
  //   data = {
  //     itemname: "",
  //     rate: "",
  //     requtorid: "",
  //     requestorName: "",
  //   };
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    setChData(value);
    // set(vale);
  };

  const droplist = [];

  useEffect(() => {
    dispatch(
      getGetRequestorList((val) => {
        setrequestorList(val);
      })
    );
  }, []);
  function select() {
    onChangeHandler();
    onchange();
  }
  const submitHandler = (event) => {
    event.preventDefault();
    const item = event.target.item.value;
    const rate = event.target.rate.value;
    const qty = event.target.qty.value;
    const dis = event.target.dis.value;
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        item,
        qty,
        rate,
        dis,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinish = (values) => {
    // data.id,
    let finaldata = {
      itemName: values?.item,
      subtotal: total,
      grandtotal: totaldis,
    };
    console.log("Success:", finaldata);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    console.log(number1, number2, number3, totaldis, total);
    multiply();
    grandtotal();
  }, [number1, number2, number3, totaldis, total]);

  const multiply = () => {
    let totalcal = number1 * number2;
    setTotal(totalcal);
  };

  const grandtotal = () => {
    let totalD = total - number3;
    setDis(totalD);
  };
  const onChangeHandler = () => {
    // var item = droplist.find((item) => item);
    // .filter(item => selectedUser.id )
    // setData
    const itemData = requestorList.filter((res) => res.Id === chData);
    console.log(chData, droplist);
    setData(itemData);
  };
  // useEffect(() => {
  //   console.log(data, "fromuseeffect");
  // }, [data]);
  return (
    <>
      <AddBillSection>
        <div className="maiTopContainer">
          <PageHeader pageTitle={"Edit Billing Reports"} />
          {/* <Filter serchButton getrequestorlist /> */}
          {
            <div className="dropdown-section">
              <Row>
                <Col span={12} className="requestor-section">
                  <Select
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    size="default"
                  >
                    {/* <Option value="0">All</Option> */}
                    {requestorList?.map((iTy) => (
                      <Option
                        title={iTy?.Requestor}
                        key={iTy?.Id}
                        value={iTy?.Id}
                      >
                        {iTy?.Requestor}
                      </Option>
                    ))}
                  </Select>
                  <Button
                    onClick={onChangeHandler}
                    htmlType="submit"
                    className="load-btn"
                    type="primary"
                  >
                    Load
                  </Button>
                </Col>
                <Col span={12}></Col>
              </Row>
            </div>
          }
        </div>
        <div className="financeCards">
          {/*  */}
          <NewTableSummary reqData={data}></NewTableSummary>
        </div>
        <div className="mainContainer">
          <Row gutter={16}>
            <Col span={24}>
              <div className="financeCards">
                <h4>Bill Details</h4>
                <hr />

                <Form
                  // onSubmit={submitHandler}
                  name="basic"
                  labelCol={{
                    span: 12,
                  }}
                  wrapperCol={{
                    span: 12,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Row>
                    <Col span={6}>
                      <Form.Item label="Item Name" name="item">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item label="Rate" name="rate">
                        <InputNumber
                          min={1}
                          max={10000}
                          onChange={(e) => {
                            setNumber1(e);
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item label="Quantity" name="qty">
                        <InputNumber
                          min={1}
                          max={10000}
                          onChange={(e) => setNumber2(e)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item label="DiscountAmt" name="dis">
                        <InputNumber
                          min={1}
                          max={10000}
                          onChange={(e) => setNumber3(e)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <div className="s-btn">
                        <Button type="primary" htmlType="submit">
                          Save
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <Descriptions
                        bordered
                        layout="horizontal"
                        column={1}
                        size="small"
                      >
                        <Descriptions.Item label="SubTotal">
                          {total}
                        </Descriptions.Item>
                        <br></br>
                        <Descriptions.Item label="GrandTotal">
                          {totaldis}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </AddBillSection>
    </>
  );
};

export default AddBill;
const AddBillSection = styled.div`
  .data-item-display {
    display: flex;
  }
  .qty-field {
    margin-left: 10px;
  }
  .s-btn {
    margin-left: 20px;
  }
  .load-btn {
    margin-left: 20px;
  }
  .dropdown-section {
    margin: 20px;
  }
  .requestor-section {
    display: flex;
  }
`;
