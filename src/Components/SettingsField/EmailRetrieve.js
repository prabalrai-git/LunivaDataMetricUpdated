import React, { useEffect, useState } from "react";
import { Table, Space, Tag } from "antd";
import PageHeader from "../Common/pageHeader";
import { carelabStat, inventoryStat } from "../Common/StateList";
import { GetEmailServerDetails } from "../../services/datametricService";
import { useDispatch } from "react-redux";
import Edit from "../Common/Edit";
import { useHistory } from "react-router-dom";
const EmailRetrieve = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [emailId, setemailId] = useState([]);
  const [emailsettingsdetails, setEmailSettingsDetails] = useState([]);
  useEffect(() => {
    getEmailData();
  }, []);

  const getEmailData = () => {
    let data = {
      id: "1",
    };
    dispatch(
      GetEmailServerDetails(data, (val) => {
        console.log(val);
        setEmailSettingsDetails(val);
        // setunitList(val)
        setemailId(val);
      })
    );
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "Id",
      key: "Id",
    },
    {
      title: "Host Name",
      dataIndex: "Host",
      key: "Host",
    },
    {
      title: "Port",
      dataIndex: "Port",
      key: "Port",
    },
    {
      title: "UserName",
      dataIndex: "UserName",
      key: "UserName",
    },
    {
      title: "Password",
      dataIndex: "Password",
      key: "Password",
    },

    {
      title: "From",
      dataIndex: "From",
      key: "From",
    },
    {
      title: "Is Active",
      dataIndex: "IsActive",
      key: "IsActive",
      render: (text) => {
        let retText = "Inactive";
        let retColor = "red";
        if (text === true) {
          retText = "Active";
          retColor = "green";
        }
        return <Tag color={retColor}>{retText}</Tag>;
      },
    },
    {
      title: "Bcc",
      dataIndex: "Bcc",
      key: "Bcc",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Edit
            onClick={() =>
              history.push({
                pathname: "./settingsemail/edit/${record.eId}",
                // pathname: `./units/edit/${record.eId}`,
                state: inventoryStat,
              })
            }
          >
            Edit
          </Edit>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle={"Email"}
          buttonTitle="Add Email Details"
          buttonOnClick={() =>
            history.push({
              pathname: "./settingsemail/addemail",
              state: carelabStat,
            })
          }
        />
      </div>
      <div className="tableisRes">
        <Table className="tableWidth" columns={columns} dataSource={emailId} />
      </div>
    </>
  );
};

export default EmailRetrieve;
