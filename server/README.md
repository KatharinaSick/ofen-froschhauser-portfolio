# Ofen Froschhauser Server

This directory contains a very simple (and ugly) backend for the Ofen Froschhauser Website that allows to upload new
pictures. This happens via git commits to the image directory. 

## How to deploy

(I was too lazy to build an automation :P)

1. Build the Docker image: `docker build -t europe-west3-docker.pkg.dev/personal-371721/ofen-froschhauser-upload/server .`
2. Authenticate to gcloud: `gcloud auth configure-docker europe-west3-docker.pkg.dev`
3. Push the Docker image: `docker push europe-west3-docker.pkg.dev/personal-371721/ofen-froschhauser-upload/server`
4. Navigate to Cloud Run & deploy a new revision with the latest image