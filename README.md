<h1> Repository Cloud Computing Bevest Apps</h1>

## Bevest Information
Bevest, an equity crowdfunding application integrated with machine learning capabilities. Bevest aims to address the financing gap faced by SMEs using a novel crowdfunding platform, along with a dedicated team to guide and scale businesses. By implementing a screening process, business value estimator, and investor risk profiler powered by machine learning algorithms, Bevest will provide investors the necessary tools to make educated investment decisions. Additionally, the application will facilitate a secondary market for trading stocks, enhancing liquidity and investment flexibility.


## Cloud Architecture
![Cloud Architecture Design](https://raw.githubusercontent.com/Bevest-Technology/bevest-cloudcomputing/main/components/Cloud%20Architecture%20Bevest-Bevest%20Cloud%20Architecture.png)

## Cloud Deployment

>initiate variable
export PROJECT_ID=bevest
export APP=bevest-ml
export PORT=2345
export REGION="asia-southeast2"
export TAG="gcr.io/$PROJECT_ID/$APP"

<!-- cloud build activate -->
gcloud services enable cloudbuild.googleapis.com \
    containerregistry.googleapis.com \
    run.googleapis.com

<!-- launch locally main.py -->
pip install -r requirements.txt
uvicorn main:app --reload

<!-- test local url -->
curl http://127.0.0.1:$PORT

<!-- docker config -->
FROM python:3.9-slim@sha256:980b778550c0d938574f1b556362b27601ea5c620130a572feb63ac1df03eda5 

ENV PYTHONUNBUFFERED True

ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

ENV PORT 1234

RUN pip install --no-cache-dir -r requirements.txt

CMD exec uvicorn main:app --host 0.0.0.0 --port ${PORT} --workers 1

<!-- build docker on local -->
docker build -t $TAG .
docker run -dp $PORT:$PORT -e PORT=$PORT $TAG

<!-- test local docker -->
 curl http://127.0.0.1:$PORT

 <!-- deployment to gcloud run -->
 gcloud builds submit --tag $TAG

 <!-- running gcloud run -->
 gcloud run deploy $APP --image $TAG --platform managed --region $REGION --allow-unauthenticated


 <!-- see all info about the app -->
 # See all info about the app
gcloud run services describe $APP --region $REGION

## Features for ML Prediction


