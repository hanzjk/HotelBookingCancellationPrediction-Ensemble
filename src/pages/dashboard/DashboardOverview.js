import React from "react";


import customerType from "../../assets/images/Univariate/customerType.png"; 
import distributionChannel from "../../assets/images/Univariate/distributionChannel.png"; 
import marketSegment from "../../assets/images/Univariate/marketSegment.png"; 
import cancellations from "../../assets/images/Univariate/cancellations.png"; 
import countries from "../../assets/images/Univariate/countries.png"; 
import adr from "../../assets/images/Univariate/adr.png"; 

import adr_cancellation from "../../assets/images/Multivariate/adr_cancellation.png"; 
import customerType_cancellation from "../../assets/images/Multivariate/customerType_cancellation.png"; 
import deposit_cancellation from "../../assets/images/Multivariate/deposit_cancellation.png"; 
import leadTime_cancellation from "../../assets/images/Multivariate/leadTime_cancellation.png"; 
import marketSegment_cancellation from "../../assets/images/Multivariate/marketSegment_cancellation.png"; 
import parking_cancellation from "../../assets/images/Multivariate/parking_cancellation.png"; 
import prevCancel_cancellation from "../../assets/images/Multivariate/prevCancel_cancellation.png"; 


import repeatedGuests from "../../assets/images/CustomerLoyalty/repeatedGuests.png"; 
import repeated_cancellation from "../../assets/images/CustomerLoyalty/repeated_cancellation.png"; 
import rnights from "../../assets/images/CustomerLoyalty/rnights.png"; 
import rleadtime from "../../assets/images/CustomerLoyalty/rleadtime.png"; 
import rdistributionChannel from "../../assets/images/CustomerLoyalty/rdistributionChannel.png"; 
import rcustomerType from "../../assets/images/CustomerLoyalty/rcustomerType.png"; 

export default () => {
  return (
    <>
      <div className=" py-4">
        <h1>Univariate Analysis</h1>
        <div class="row">
          <div class="col-md-4">
            <div class="card shadow p-3 mb-5 bg-white rounded">
              <div class="card-body">
                <h5 class="card-title"></h5>
                <img src={cancellations} alt="Logo" />
              </div>
            </div>
          </div>
          <div class="col-md-5">
            <div class="card shadow p-3 mb-5 bg-white rounded">
              <div class="card-body">
                <img src={countries} alt="Logo" />
              </div>
            </div>
          </div>

          <div class="col-md-3">
            <div class="card shadow p-3 mb-5 bg-white rounded">
              <div class="card-body">
                <img src={customerType} alt="Logo" />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="card shadow p-3 mb-5 bg-white rounded">
              <div class="card-body">
                <div className="row">
                  <div className="col-md-6">
                    {" "}
                    <img src={distributionChannel} alt="Logo" />
                  </div>
                  <div className="col-md-6">
                    {" "}
                    <img src={marketSegment} alt="Logo" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card shadow p-3 mb-5 bg-white rounded">
              <div class="card-body">
                <img src={adr} alt="Logo" />
              </div>
            </div>
          </div>
        </div>

        <h1>Multivariate Analysis</h1>

        <div class="row">
          <div class="col-md-6">
            <div class="card shadow p-3 mb-5 bg-white rounded">
              <div class="card-body">
                <h5 class="card-title"></h5>
                <img src={adr_cancellation} alt="Logo" />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card shadow p-3 mb-5 bg-white rounded">
              <div class="card-body">
                <img src={leadTime_cancellation} alt="Logo" />
              </div>
            </div>
          </div>

          <div class="col-md-12">
            <div class="card shadow p-3 mb-5 bg-white rounded">
              <div class="card-body">
                <img src={prevCancel_cancellation} alt="Logo" />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="card shadow p-3 mb-5 bg-white rounded">
              <div class="card-body">
                <h5 class="card-title"></h5>
                <img src={parking_cancellation} alt="Logo" />
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card shadow p-3 mb-5 bg-white rounded">
              <div class="card-body">
                <h5 class="card-title"></h5>
                <img src={deposit_cancellation} alt="Logo" />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card shadow p-3 mb-5 bg-white rounded">
              <div class="card-body">
                <img src={customerType_cancellation} alt="Logo" />
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card shadow p-3 mb-5 bg-white rounded">
              <div class="card-body">
                <img src={marketSegment_cancellation} alt="Logo" />
              </div>
            </div>
          </div>
        </div>

        <h1>Customer Loyalty</h1>

        <div class="row">
          <div class="col-md-6">
            <div class="card shadow p-3 mb-5 bg-white rounded">
              <div class="card-body">
                <h5 class="card-title"></h5>
                <img src={repeatedGuests} alt="Logo" />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card shadow p-3 mb-5 bg-white rounded">
              <div class="card-body">
                <img src={rnights} alt="Logo" />
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="card shadow p-3 mb-5 bg-white rounded">
              <div class="card-body">
                <img src={repeated_cancellation} alt="Logo" />
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card shadow p-3 mb-5 bg-white rounded">
              <div class="card-body">
                <h5 class="card-title"></h5>
                <img src={rleadtime} alt="Logo" />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card shadow p-3 mb-5 bg-white rounded">
              <div class="card-body">
                <img src={rcustomerType} alt="Logo" />
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card shadow p-3 mb-5 bg-white rounded">
              <div class="card-body">
                <img src={rdistributionChannel} alt="Logo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
