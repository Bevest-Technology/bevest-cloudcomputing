<h1> Repository Cloud Computing Bevest Apps</h1>

## Bevest Information
Bevest, an equity crowdfunding application integrated with machine learning capabilities. Bevest aims to address the financing gap faced by SMEs using a novel crowdfunding platform, along with a dedicated team to guide and scale businesses. By implementing a screening process, business value estimator, and investor risk profiler powered by machine learning algorithms, Bevest will provide investors the necessary tools to make educated investment decisions. Additionally, the application will facilitate a secondary market for trading stocks, enhancing liquidity and investment flexibility.


## Cloud Architecture
![Cloud Architecture Design](https://raw.githubusercontent.com/Bevest-Technology/bevest-cloudcomputing/main/components/Cloud%20Architecture%20Bevest-Bevest%20Cloud%20Architecture.png)

## Cloud Deployment

```bash
export PROJECT_ID=bevest
export APP=bevest-ml
export PORT=2345
export REGION="asia-southeast2"
export TAG="gcr.io/$PROJECT_ID/$APP"


Enable the services you need.
```bash
gcloud services enable cloudbuild.googleapis.com \
    containerregistry.googleapis.com \
    run.googleapis.com
```

## Use your main.app

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

You can check the output in your browser by opening http://127.0.0.1:1234 or "curling" the app in another terminal tab via:
```bash
curl http://127.0.0.1:$PORT
```
As a response you'll see `{"message":"Welcome to Bevest Machine Learning API"}`.

## App into Docker

You need to put your app into an image before deploying it. Here you see an example docker file. Note that you should use a PORT as environment variable. If you don't you'll get an error like `Cloud Run error: The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable.`

```docker
FROM python:3.9-slim@sha256:980b778550c0d938574f1b556362b27601ea5c620130a572feb63ac1df03eda5 

ENV PYTHONUNBUFFERED True

ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

ENV PORT 1234

RUN pip install --no-cache-dir -r requirements.txt

# As an example here we're running the web service with one worker on uvicorn.
CMD exec uvicorn main:app --host 0.0.0.0 --port ${PORT} --workers 1
```

To try your app locally with docker simply run inside `src`:
```bash
docker build -t $TAG .
docker run -dp $PORT:$PORT -e PORT=$PORT $TAG
```

Again you can check it in your browser our curl it:
```bash
 curl http://127.0.0.1:$PORT
```

## Deployment
If everything worked out so far, we're ready to deploy our app. First we create a Google Cloud Build. Maybe it's similar to pushing a docker image to a docker registry.

```bash
gcloud builds submit --tag $TAG
```

After this is done, well it's finally time to deploy your cloud run app :).
```bash
gcloud run deploy $APP --image $TAG --platform managed --region $REGION --allow-unauthenticated
```
## Test it
Note, this may take some minutes. The URL of your app will show up in the terminal. But you can also check your app via:
```bash
# See all info about the app
gcloud run services describe $APP --region $REGION
```

Note, even though we've chosen a random port like `1234`, the deployed service will use `8080` by default. This is why we need `--port ${PORT}` in the last line of our Dockerfile.

## Features for ML Prediction


