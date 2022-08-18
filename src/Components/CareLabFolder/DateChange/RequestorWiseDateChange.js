import React from "react";
import Filter from "../../Common/Filter";
import PageHeader from "../../Common/pageHeader";

function RequestorWiseDateChange() {
  return (
    <>
      <div className="maiTopContainer">
        <PageHeader pageTitle={"Requestor Wise Date Change"} />
        <Filter dateRange serchButton forTestStatus />
      </div>
    </>
  );
}

export default RequestorWiseDateChange;
