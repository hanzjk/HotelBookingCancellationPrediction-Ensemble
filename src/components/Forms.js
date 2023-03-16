import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "@themesberg/react-bootstrap";

import axios from "axios";

export const GeneralInfoForm = () => {
  const [months, setMonths] = useState([]);
  const [customerTypes, setCustomerTypes] = useState([]);
  const [marketSegments, setMarketSegments] = useState([]);
  const [depositTypes, setDepositTypes] = useState([]);

  const [month, setMonth] = useState([]);
  const [customerType, setCustomerType] = useState([]);
  const [marketSegment, setMarketSegment] = useState([]);
  const [depositType, setDepositType] = useState([]);
  const [distributionChannel, setDistributionChannel] = useState([]);
  const [day, setDay] = useState([]);
  const [stays, setStays] = useState([]);
  const [bookingChanges, setBookingChanges] = useState([]);
  const [carParkingSpaces, setCarParkingSpaces] = useState([]);
  const [adr, setAdr] = useState([]);
  const [previousCancellations, setPreviousCancellations] = useState([]);
  const [totRequests, setTotRequests] = useState([]);
  const [leadTime, setLeadTime] = useState([]);

  const [prediction, setPrediction] = useState(null);
  const [probability, setProbability] = useState(null);

  const [isPredicted, setIsPredicted] = useState(false);
  const [arrivalDate, setArrivalDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("customer_types")
        .then((res) => {
          setCustomerTypes(res.data.customerType);
          console.log(res.data.customerType);
        })
        .catch((err) => {
          alert(err);
        });

      axios
        .get("market_segments")
        .then((res) => {
          setMarketSegments(res.data.market_segments);
          console.log(res.data.market_segments);
        })
        .catch((err) => {
          alert(err);
        });

      axios
        .get("deposit_types")
        .then((res) => {
          setDepositTypes(res.data.deposit_types);
          console.log(res.data.deposit_types);
        })
        .catch((err) => {
          alert(err);
        });
    };
    fetchData();
  }, []);

  function handleDateChange(event) {
    // Extract the month and day from the date field value
    const dateValue = event.target.value;
    setArrivalDate(event.target.value);

    const [year, month, day] = dateValue.split("-");
    setMonth(getMonthName(parseInt(month)));
    setDay(day);

    const leadTimeInDays = calculateLeadTimeInDays(event.target.value);
    setLeadTime(leadTimeInDays);
  }

  const calculateLeadTimeInDays = (arrivalDate) => {
    // Get the current date and time
    const currentDate = new Date();

    // Convert the arrival date to a Date object
    const arrivalDateObj = new Date(arrivalDate);

    // Calculate the difference between the arrival date and the current date
    const diffInMs = arrivalDateObj.getTime() - currentDate.getTime();

    // Convert the difference to days
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays;
  };

  function getMonthName(monthNumber) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthNumber - 1];
  }

  function getPrediction(e) {
    e.preventDefault();
    var newBooking = {
      arrival_date_month: month,
      arrival_date_day_of_month: day,
      total_stays: stays,
      booking_changes: bookingChanges,
      required_car_parking_spaces: carParkingSpaces,
      customer_type: customerType,
      adr: adr,
      previous_cancellations: previousCancellations,
      market_segment: marketSegment,
      total_of_special_requests: totRequests,
      lead_time: leadTime,
      deposit_type: depositType,
    };
    axios
      .post("predict_cancellation", newBooking)
      .then((res) => {
        console.log(res.data.prediction);
        if (res.data.prediction === 0) {
          setPrediction("Confirmed");
          setProbability(res.data.confirmation_probability);
        } else if (res.data.prediction === 1) {
          setPrediction("Cancelled");
          setProbability(res.data.cancellation_probability);
        }
        setIsPredicted(true);
      })
      .catch((err) => {
        alert(err);
        if (err.response) console.log(err.response);

        if (err.request) console.log(err.request);
      });
  }
  const predictionResult = isPredicted ? (
    <Card border="light" className="text-center p-0 mb-4">
      <Card.Body className="pb-5" style={{ fontWeight: "800" }}>
        Booking Status : {prediction} , {probability}%
      </Card.Body>
    </Card>
  ) : null;

  return (
    <div>
      {predictionResult}
      <div></div>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <Form onSubmit={getPrediction}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Customer Type</Form.Label>
                  <Form.Select
                    aria-label="Customer Type select"
                    id="custometType"
                    onChange={(e) => {
                      setCustomerType(e.target.value);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      --Select Customer Type--
                    </option>

                    {customerTypes.map((custtype, index) => (
                      <option key={index} value={custtype}>
                        {custtype}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Total Stays</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter the Total number of stays"
                    id="stays"
                    onChange={(e) => {
                      setStays(parseInt(e.target.value));
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row></Row>

            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Market Segement Type</Form.Label>
                  <Form.Select
                    aria-label="Market Segement select"
                    id="marketSegment"
                    onChange={(e) => {
                      setMarketSegment(e.target.value);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      --Select Market Segment--
                    </option>

                    {marketSegments.map((ms, index) => (
                      <option key={index} value={ms}>
                        {ms}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Booking Changes</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Booking Changes"
                    id="bookingChanges"
                    onChange={(e) => {
                      setBookingChanges(parseInt(e.target.value));
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Car Parking Spaces</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Car Parking Spaces"
                    id="carparking"
                    onChange={(e) => {
                      setCarParkingSpaces(parseInt(e.target.value));
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Total Special Requests</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder=" Special Requests"
                    id=" specialRequests"
                    onChange={(e) => {
                      setTotRequests(parseInt(e.target.value));
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Arrival Day</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Arrival Day"
                    id="day"
                    onChange={handleDateChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>ADR ($)</Form.Label>
                  <Form.Control
                    type="float"
                    placeholder="ADR"
                    id="adr"
                    onChange={(e) => {
                      setAdr(parseFloat(e.target.value));
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Is Previously Cancelled? </Form.Label>
                  <Form.Select
                    type="number"
                    placeholder="Previous Cancellations"
                    id="previousCancellations"
                    onChange={(e) => {
                      setPreviousCancellations(parseInt(e.target.value));
                      console.log(parseInt(e.target.value));
                    }}
                  >
                    <option value="" selected disabled hidden>
                      --Select Previous Cancellations--
                    </option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Deposit Type</Form.Label>
                  <Form.Select
                    aria-label="Deposit Type select"
                    id="depositType"
                    onChange={(e) => {
                      setDepositType(e.target.value);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      --Select Deposit Type--
                    </option>

                    {depositTypes.map((dt, index) => (
                      <option key={index} value={dt}>
                        {dt}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Lead Time (in Days)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Lead Time"
                    id="leadTime"
                    value={leadTime}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid mt-3">
              <Button type="submit" size="lg" variant="info">
                View Prediction
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <br></br>
    </div>
  );
};
