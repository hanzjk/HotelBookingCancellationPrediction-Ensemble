from email import header
from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import util
import pandas as pd
import os
from os.path import join, dirname, realpath

from flask import json

app = Flask(__name__)
CORS(app)



@app.route('/arrival_month', methods=['GET'])
def get_arrival_month():
    response = jsonify({
        'month': util.get_arrival_month()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

# @app.route('/reserved_room_types', methods=['GET'])
# def get_reserved_room_types():
#     response = jsonify({
#         'roomType': util.get_reserved_room_types()
#     })
#     response.headers.add('Access-Control-Allow-Origin', '*')

#     return response

@app.route('/customer_types', methods=['GET'])
def get_customer_type():
    response = jsonify({
        'customerType': util.get_customer_type()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/market_segments', methods=['GET'])
def get_market_segment():
    response = jsonify({
        'market_segments': util.get_market_segment()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/deposit_types', methods=['GET'])
def get_deposit_type():
    response = jsonify({
        'deposit_types': util.get_deposit_type()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

# @app.route('/distribution_channels', methods=['GET'])
# def get_distribution_channel():
#     response = jsonify({
#         'distribution_channels': util.get_distribution_channel()
#     })
#     response.headers.add('Access-Control-Allow-Origin', '*')

#     return response

@app.route('/predict_cancellation', methods=['GET', 'POST'])
def predict_cancellation():
    arrival_date_month = request.json['arrival_date_month']
    arrival_date_day_of_month = int(request.json['arrival_date_day_of_month'])
    total_stays = int(request.json['total_stays'])
    booking_changes = int(request.json['booking_changes'])
    required_car_parking_spaces = int(request.json['required_car_parking_spaces'])
    customer_type = request.json['customer_type']
    adr = float(request.json['adr'])
    previous_cancellations = int(request.json['previous_cancellations'])
    market_segment =request.json['market_segment']
    total_of_special_requests = int(request.json['total_of_special_requests'])
    lead_time = int(request.json['lead_time'])
    deposit_type = request.json['deposit_type']

    data =util.return_predict_cancellation( arrival_date_month,arrival_date_day_of_month,total_stays,booking_changes,required_car_parking_spaces,customer_type,adr,previous_cancellations,market_segment,total_of_special_requests,lead_time,deposit_type)
    
    response = jsonify({
        'prediction': int(data[0]),
        'target0': round((((data[1])[0])[0])*100,2), #confirmation prob
        'target1': round((((data[1])[0])[1])*100,2) #cancellation prob

    })
    response.headers.add('Access-Control-Allow-Origin', '*',)

    return response

# Upload folder
UPLOAD_FOLDER = '/Users/hansikarunarathna/Desktop/ML_Project/Server/static/files'
app.config['UPLOAD_FOLDER'] =  UPLOAD_FOLDER

# Get the uploaded files
@app.route("/file_upload", methods=['POST'])
def uploadFiles():
    uploaded_file = request.files.get('file')
    df =  pd.read_csv(uploaded_file.stream)
    result=util.batchPrediction(df)   
    response = app.response_class(
        response=json.dumps(result),
        status=200,
        mimetype='application/json'
    )
    return response 

# Get the uploaded files
@app.route("/csv_to_df", methods=['POST'])
def CSVtoDF():
    uploaded_file = request.files.get('file')
    df =  pd.read_csv(uploaded_file.stream)
    jsonfiles = json.loads(df.to_json(orient='records'))
    response = app.response_class(
        response=json.dumps(jsonfiles),
        status=200,
        mimetype='application/json'
    )
    return response 

if __name__ == "__main__":
    print("Starting Python Flask Server For Hotel Booking Cancellation Prediction...")
    util.load_saved_artifacts()
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
    app.run()