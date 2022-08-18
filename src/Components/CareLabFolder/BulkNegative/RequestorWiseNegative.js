import React from "react";
import Filter from "../../Common/Filter";
import PageHeader from "../../Common/pageHeader";

function RequestorWiseNegative() {
  return (
    <>
      <div className="maiTopContainer">
        <PageHeader pageTitle={"Requestor Wise Negative"} />

        <Filter dateRange serchButton />
      </div>
    </>
  );
}

export default RequestorWiseNegative;
