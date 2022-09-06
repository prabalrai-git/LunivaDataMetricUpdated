import React, { useEffect, useState } from "react";
import { Button } from "antd";
// import CarelabFilter from "../../Common/CarelabFilter";
import { printMembership } from "./MembershipPrint";
import { getMemberShipDetailsByMemberId } from "../../../services/careLabService";

import PageHeader from "../../Common/pageHeader";
import cry from "../../../assets/images/cry.png";
import logosmall from "../../../assets/images/logosmall.png";
import { useDispatch } from "react-redux";

function MembershipCard() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const d = new Date();
  const e = d.toISOString().split("T")[0];

  useEffect(() => {
    let a = {
      mId: 1,
    };
    dispatch(
      getMemberShipDetailsByMemberId(a, (val) => {
        setData(val);
      })
    );
  }, []);

  const onFinish = (values) => {
    {
      const urlhref = window.location.href,
        newpath = urlhref.split("luniva360lims");
      const imagePath = `${newpath[0]}${cry}`;
      const small = `${newpath[0]}${logosmall}`;

      console.log(data);
      printMembership(imagePath, small, data[0], e);
    }
  };
  return (
    <>
      <div className="maiTopContainer">
        <PageHeader pageTitle={"Membership Card"} />
        <Button onClick={onFinish}> Print</Button>
      </div>
    </>
  );
}

export default MembershipCard;
