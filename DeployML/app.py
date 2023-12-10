#Import Library
import uvicorn
from fastapi import FastAPI
from data import DataUKM, DataProfilInvestor
import pickle
from keras.models import load_model

#Create app object
app = FastAPI()

# Load model Fitur 1
model = load_model("model1.h5")

# Load model Fitur 1 pickle
# model_load = pickle.load('model1.pkl', 'rb')

#Load model Fitur 2
# model = load_model("model2.h5")

@app.get("/")
def index():
    return {"message": "OK"}


# Endpoint untuk prediksi ukm | fitur ml 1
@app.post("/predict_ukm")
def predict_ukm(data: DataUKM):
    
    data = data.dict()
    total_aset = data["total_aset"]
    rata_penjualan = data["rata_penjualan"]
    nilai_aset = data["nilai_aset"]
    
    prediction = model.predict([[total_aset, rata_penjualan, nilai_aset]])

    if(prediction > 0.5):
        label = "Layak"
    else:
        label = "Tidak Layak"

    return {
        "prediction": prediction.tolist(),
        "label" : label
    }
    
# Endpoint untuk profiling investor | fitur ml 2
@app.post("/predict_investor")
def predict_investor(data: DataProfilInvestor):
    data = data.dict()
    umur = data["umur"]
    jenis_kelamin = data["jenis_kelamin"]
    pendapatan = data["pendapatan"]
    edukasi = data["edukasi"]
    rumah = data["rumah"]

    prediction = model.predict([[umur, jenis_kelamin, pendapatan, edukasi, rumah]])

    return {
        "prediction": prediction.tolist()
    }

# run API with uvicorn
if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)






