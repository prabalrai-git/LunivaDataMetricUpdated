import { Button, Col, Row } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ProviencePieMale from "./ProviencePieMale";

import ProviencePieFemale from "./ProviencePieFemale";
const ProviencePiechart = () => {
  const downloadImage = useCallback(() => {
    const link = document.createElement("a");
    link.download = "chart.png";
    link.href = ref.current.toBase64Image();
    link.click();
  }, []);
  return (
    <>
      <PieChartsProvience>
        <Row justify="end" gutter={[16, 16]}>
          <Button
            onClick={downloadImage}
            className="export-btn-charts"
            type="primary"
          >
            {/* Export charts */}
          </Button>
        </Row>
        <Row gutter={[16, 16]}>
          <Col sm={24} md={24} xs={24} lg={12} xl={12}>
            <ProviencePieMale />
          </Col>
          <Col sm={24} md={24} xs={24} lg={12} xl={12}>
            <ProviencePieFemale />
          </Col>
        </Row>
      </PieChartsProvience>
    </>
  );
};

export default ProviencePiechart;
const PieChartsProvience = styled.div`
  .export-btn-charts {
    float: right;
  }
  #canvas-container {
    height: 60vh;
    width: 60vw;
    position: relative;
  }

  @media (min-width: 768px) {
    #canvas-container {
      height: auto;
      width: auto;
    }
  }
  @media (max-width: 480px) {
    .piecharts-pie {
      /* width: auto; */
      width: 100%;
      height: 300px;
      object-fit: cover;
      object-position: bottom;
    }
  }
`;
