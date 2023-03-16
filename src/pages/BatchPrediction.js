import React, { useState, Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./FileUpload.scss";
import axios from "axios";
import MaterialTable from "material-table";
import MUIDataTable from "mui-datatables";

const FileUpload = () => {
  const [predictions, setPredictions] = useState([]);
  const [fileData, setFile] = useState([]);
  const [showResultsBtn, setShowResultsBtn] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const uploadHandler = (event) => {
    setShowResults(false);
    setShowResultsBtn(false);
    
    const file = event.target.files[0];

    if (!file) return;
    file.isUploading = true;
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("/csv_to_df", formData)
      .then((res) => {
        setFile(res.data);
        setShowResultsBtn(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .post("/file_upload", formData)
      .then((res) => {
        setPredictions(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const displayResults = (event) => {
    setShowResults(true);
  };
  const columns = [
    "Cancellation Probability",
    "Confirmation Probability",
    "Prediction",
  ];

  const col = [
    "lead_time",
    "arrival_date_month",
    "arrival_date_day_of_month",
    "total_stays",
    "market_segment",
    "previous_cancellations",
    "booking_changes",
    "deposit_type",
    "customer_type",
    "adr",
    "required_car_parking_spaces",
    "total_of_special_requests",
  ];
  const options = {
    search: true,
    download: true,
    print: true,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
  };
  return (
    <>
      <div className="file-card mx-auto">
        <div className="file-inputs">
          <input type="file" onChange={uploadHandler} />
          <button>
            <i>
              <FontAwesomeIcon icon={faPlus} />
            </i>
            Upload
          </button>
        </div>

        <p className="main">Supported files</p>
        <p className="info">CSV</p>
      </div>
      <div>
        <MUIDataTable
          data={fileData}
          columns={col}
          options={options}
          title="Uploaded Data"
        />
      </div>
      {showResultsBtn ? (
        <div className="mt-4 text-center">
          <div
            className="btn btn-primary"
            style={{ width: "100%", "background-color": "#0d0547" }}
            onClick={displayResults}
          >
            Show results
          </div>
        </div>
      ) : (
        ""
      )}
      {showResults ? (
        <MUIDataTable
          data={predictions}
          columns={columns}
          options={options}
          title="Results"
          className="mt-4"
        />
      ) : (
        ""
      )}

      {/* <Datatable options={options} /> */}
    </>
  );
};

export default FileUpload;
