import React from "react";
import { useHistory } from "react-router-dom";
import Filter from "../../Common/Filter";
import PageHeader from "../../Common/pageHeader";
import { carelabStat, inventoryStat } from "../../Common/StateList";
import { Table } from "antd";
import CarelabFilter from "../../Common/CarelabFilter";

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
  const returnFilterData = (res) => {
    console.log(res);
  };
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
        <CarelabFilter showFromToDate returnFilterData={returnFilterData} />
        <Filter onSearch />
      </div>
      <div className="tableisRes">
        <Table className="tableWidth" columns={columns} />
      </div>
    </>
  );
}

export default Sms;
