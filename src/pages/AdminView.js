import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Button } from "@material-ui/core";

function AdminView() {
  const [data, setData] = useState([
    {
      lead_time: 23,
      arrival_date_month: "January",
      arrival_date_day_of_month: 7,
      total_stays: 4,
      market_segment: "Online TA",
      previous_cancellations: 0,
      booking_changes: 1,
      deposit_type: "No Deposit",
      customer_type: "Transient",
      adr: 120,
      required_car_parking_spaces: 1,
      total_of_special_requests: 2,
      prediction: null,
      probability: null,
    },
    {
      lead_time: 45,
      arrival_date_month: "February",
      arrival_date_day_of_month: 14,
      total_stays: 3,
      market_segment: "Offline TA/TO",
      previous_cancellations: 1,
      booking_changes: 0,
      deposit_type: "Refundable",
      customer_type: "Transient-Party",
      adr: 150,
      required_car_parking_spaces: 0,
      total_of_special_requests: 1,
      prediction: null,
      probability: null,
    },
    {
      lead_time: 60,
      arrival_date_month: "March",
      arrival_date_day_of_month: 28,
      total_stays: 5,
      market_segment: "Corporate",
      previous_cancellations: 0,
      booking_changes: 2,
      deposit_type: "Non Refundable",
      customer_type: "Group",
      adr: 200,
      required_car_parking_spaces: 2,
      total_of_special_requests: 0,
      prediction: null,
      probability: null,
    },
    {
      lead_time: 23,
      arrival_date_month: "January",
      arrival_date_day_of_month: 7,
      total_stays: 4,
      market_segment: "Online TA",
      previous_cancellations: 0,
      booking_changes: 1,
      deposit_type: "No Deposit",
      customer_type: "Transient",
      adr: 120,
      required_car_parking_spaces: 1,
      total_of_special_requests: 2,
      prediction: null,
      probability: null,
    },
    {
      lead_time: 45,
      arrival_date_month: "February",
      arrival_date_day_of_month: 14,
      total_stays: 3,
      market_segment: "Offline TA/TO",
      previous_cancellations: 1,
      booking_changes: 0,
      deposit_type: "Refundable",
      customer_type: "Transient-Party",
      adr: 150,
      required_car_parking_spaces: 0,
      total_of_special_requests: 1,
      prediction: null,
      probability: null,
    },
    {
      lead_time: 60,
      arrival_date_month: "March",
      arrival_date_day_of_month: 28,
      total_stays: 5,
      market_segment: "Corporate",
      previous_cancellations: 0,
      booking_changes: 2,
      deposit_type: "Non Refundable",
      customer_type: "Group",
      adr: 200,
      required_car_parking_spaces: 2,
      total_of_special_requests: 0,
      prediction: null,
      probability: null,
    },
    {
      lead_time: 10,
      arrival_date_month: "April",
      arrival_date_day_of_month: 15,
      total_stays: 2,
      market_segment: "Direct",
      previous_cancellations: 0,
      booking_changes: 1,
      deposit_type: "No Deposit",
      customer_type: "Transient-Party",
      adr: 80,
      required_car_parking_spaces: 0,
      total_of_special_requests: 2,
      prediction: null,
      probability: null,
    },
    {
      lead_time: 30,
      arrival_date_month: "May",
      arrival_date_day_of_month: 20,
      total_stays: 7,
      market_segment: "Corporate",
      previous_cancellations: 1,
      booking_changes: 0,
      deposit_type: "Non Refundable",
      customer_type: "Group",
      adr: 180,
      required_car_parking_spaces: 1,
      total_of_special_requests: 1,
      prediction: null,
      probability: null,
    },
    {
      lead_time: 90,
      arrival_date_month: "June",
      arrival_date_day_of_month: 5,
      total_stays: 3,
      market_segment: "Offline TA/TO",
      previous_cancellations: 0,
      booking_changes: 3,
      deposit_type: "Non Refundable",
      customer_type: "Transient",
      adr: 100,
      required_car_parking_spaces: 2,
      total_of_special_requests: 0,
      prediction: null,
      probability: null,
    },
  ]);

  useEffect(() => {
    // call checkPrediction for each row of data
    data.forEach((row, index) => {
      checkPrediction(row, index);
    });
  }, []);

  async function checkPrediction(row, index) {
    try {
      const response = await axios.post("/predict_cancellation", row);
      setData((prevData) => {
        // update the prediction field for the row
        return [
          ...prevData.slice(0, index),
          {
            ...prevData[index],

            prediction:
              response.data.prediction === 0 ? "Confirmed" : "Cancelled",

            probability:
              response.data.prediction === 0
                ? response.data.confirmation_probability
                : response.data.cancellation_probability,
          },
          ...prevData.slice(index + 1),
        ];
      });
    } catch (error) {
      console.error(error);
    }
  }

  const columns = [
    {
      name: "lead_time",
      label: "Lead Time",
    },
    {
      name: "arrival_date_month",
      label: "Arrival Date Month",
    },
    {
      name: "arrival_date_day_of_month",
      label: "Arrival Date Day of Month",
    },
    {
      name: "total_stays",
      label: "Total Stays",
    },
    {
      name: "market_segment",
      label: "Market Segment",
    },
    {
      name: "previous_cancellations",
      label: "Previous Cancellations",
    },
    {
      name: "booking_changes",
      label: "Booking Changes",
    },
    {
      name: "deposit_type",
      label: "Deposit Type",
    },
    {
      name: "customer_type",
      label: "Customer Type",
    },
    {
      name: "adr",
      label: "ADR",
    },
    {
      name: "required_car_parking_spaces",
      label: "Required Car Parking Spaces",
    },
    {
      name: "total_of_special_requests",
      label: "Total of Special Requests",
    },
    {
      name: "prediction",
      label: "Prediction",
      options: {
        customBodyRender: (value) => {
          if (value === "Cancelled") {
            return (
              <Button variant="contained" color="secondary">
                Cancelled
              </Button>
            );
          } else if (value === "Confirmed") {
            return (
              <Button
                variant="contained"
                style={{ backgroundColor: "green", color: "white" }}
              >
                Confirmed
              </Button>
            );
          } else {
            return value;
          }
        },
      },
    },

    {
      name: "probability",
      label: "Probability (%)",
    },
  ];

  // render the table with the cancellation probability and predcition column
  return (
    <div className="pt-4 mt-4 mb-4">
      <MUIDataTable
        title={"Booking Data"}
        data={data}
        columns={columns}
        options={{
          filter: true,
          selectableRows: false,
          responsive: "standard",
        }}
      />
    </div>
  );
}

export default AdminView;
