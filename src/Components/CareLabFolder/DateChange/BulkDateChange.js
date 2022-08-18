import React from "react";
import Filter from "../../Common/Filter";
import PageHeader from "../../Common/pageHeader";

function BulkDateChange() {
  return (
    <>
      <div className="maiTopContainer">
        <PageHeader pageTitle={"Bulk Date Change"} />
        <Filter dateRange serchButton forTestStatus />
      </div>
    </>
  );
}

export default BulkDateChange;
