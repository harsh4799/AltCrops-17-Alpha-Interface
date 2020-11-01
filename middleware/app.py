import flask
from flask import Flask
import numpy as np
from flask import request
# from flask_cors import CORS
import pickle
app = Flask(__name__)
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

global yield_model_kharif,yield_model_summer,yield_model_rabi,kharif_le,summer_le,rabi_le

yield_model_kharif = pickle.load(open('models/GBRkharif.pkl','rb'))
yield_model_summer = pickle.load(open('models/GBRsummer.pkl','rb'))
yield_model_rabi = pickle.load(open('models/GBRrabi.pkl','rb'))

kharif_le = pickle.load(open('encodings/encoding_kharif.pkl','rb'))
summer_le = pickle.load(open('encodings/encoding_summer.pkl','rb'))
rabi_le = pickle.load(open('encodings/encoding_rabi.pkl','rb'))


def predict(X,crop,season):
	if season == 'kharif':
		X = np.insert(X, 0, kharif_le[crop] , axis=0).reshape(1,-1)
		return yield_model_kharif.predict(X)
	elif season == "summer":
		X = np.insert(X, 0, summer_le[crop] , axis=0).reshape(1,-1)
		return yield_model_summer.predict(X)
	else:
		X = np.insert(X, 0, rabi_le[crop] , axis=0).reshape(1,-1)
		return yield_model_rabi.predict(X)


@app.route('/predict_yield', methods=['GET'])
	return "hello"

@app.route('/predict_yield', methods=['POST'])
def predict_api():
	try:
		request_json = request.get_json()
		crops = request_json['crop']
		output = []
		for crop in crops:
			X = np.array([request_json['rainfall'],request_json['n'],request_json['p'],request_json['oc'],request_json['k']])
			output.append(predict(X,crop,request_json['season'])[0])
		return {'yield':output}
	except:
		return {'message':'bad request!'}, 400


if __name__ == '__main__':
    app.run()