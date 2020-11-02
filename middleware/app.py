import os
from flask import Flask, render_template, request, redirect, url_for
import numpy as np
from flask import request

# from flask_cors import CORS
import pickle

app = Flask(__name__)

app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "Secret")

# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

global yield_model_kharif, yield_model_summer, yield_model_rabi, kharif_le, summer_le, rabi_le

yield_model_kharif = pickle.load(open("models/GBRkharif.pkl", "rb"))
yield_model_summer = pickle.load(open("models/GBRsummer.pkl", "rb"))
yield_model_rabi = pickle.load(open("models/GBRrabi.pkl", "rb"))

kharif_le = pickle.load(open("encodings/encoding_kharif.pkl", "rb"))
summer_le = pickle.load(open("encodings/encoding_summer.pkl", "rb"))
rabi_le = pickle.load(open("encodings/encoding_rabi.pkl", "rb"))

soil_state = pickle.load(open("soil_state.pkl", "rb"))


def predict(X, crop, season):
    if season == "kharif":
        X = np.insert(X, 0, kharif_le[crop], axis=0).reshape(1, -1)
        return yield_model_kharif.predict(X)
    elif season == "summer":
        X = np.insert(X, 0, summer_le[crop], axis=0).reshape(1, -1)
        return yield_model_summer.predict(X)
    else:
        X = np.insert(X, 0, rabi_le[crop], axis=0).reshape(1, -1)
        return yield_model_rabi.predict(X)


@app.route("/predict_yield", methods=["POST"])
def predict_api():
    try:
        request_json = request.get_json()
        crops = request_json["crop"]
        output = []
        for crop in crops:
            try:
                X = np.array(
                    [
                        request_json["rainfall"],
                        request_json["n"],
                        request_json["p"],
                        request_json["oc"],
                        request_json["k"],
                    ]
                )
                output.append(predict(X, crop, request_json["season"])[0])
            except:
                output.append(0)
                pass
        max_yield = max(output)
        confidence = [(out / max_yield) * 100 for out in output]
        return {"yield": output, "confidence": confidence}
    except:
        return {"message": "bad request! yield"}, 400


@app.route("/predict_crop", methods=["POST"])
def predict_crop():
    try:
        request_json = request.get_json()
        vol = soil_state["vol"]
        n = request_json["n"]
        p = request_json["p"]
        k = request_json["k"]
        area = request_json["area"]
        i = 0
        short_listed_crops = []
        for nseed, pseed, kseed in zip(
            soil_state["n_seed"], soil_state["p_seed"], soil_state["k_seed"]
        ):
            if n * vol[i] > nseed and p * vol[i] > pseed and k * vol[i] > kseed:
                short_listed_crops.append(soil_state["crop_name"][i])
            i += 1
        return {"crops": short_listed_crops}
    except:
        return {"message": "bad request! Crop"}, 400


if __name__ == "__main__":
    app.run(debug=True)
