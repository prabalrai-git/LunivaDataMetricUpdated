import React from "react";
import { useHistory } from "react-router-dom";
import Filter from "../../Common/Filter";
import PageHeader from "../../Common/pageHeader";
import { carelabStat, inventoryStat } from "../../Common/StateList";
import { Table } from "antd";

function Sms() {
  const history = useHistory();
  const columns = [
    {
      title: "PId",
    },
    {
      title: "SMSAddedCount",
    },
    {
      title: "PerSMSCharge",
    },
    {
      title: "DiscountAmt",
    },
    {
      title: "TotalCharge",
    },
    {
      title: "AddedDate",
    },
    {
      title: "UserId",
    },
  ];
  return (
    <>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle={"SMS"}
          buttonTitle="Add Sms Details"
          buttonOnClick={() =>
            history.push({
              pathname: "./sms/add",
              state: carelabStat,
            })
          }
        />
        <Filter dateRange serchButton onSearch></Filter>
      </div>
      <div className="tableisRes">
        <Table className="tableWidth" columns={columns} />
      </div>
    </>
  );
}

export default Sms;
