import React from "react";

import { Col, Row } from "@themesberg/react-bootstrap";
import { GeneralInfoForm } from "../components/Forms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faTimes,
  faBrain,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

export default () => {
  return (
    <>
      <Row className=" pt-5" style={{ fontSize: "20px" }}>
        <h4>
          <FontAwesomeIcon icon={faCheckCircle} />
          &nbsp;&nbsp; Single Prediction
        </h4>

        <Col xs={1} xl={1}></Col>
        <Col xs={10} xl={10} className="pt-3">
          <GeneralInfoForm />
        </Col>
        <Col xs={1} xl={1}></Col>
      </Row>
    </>
  );
};
