#!/bin/bash
image_name='webpack-ts'
container_name="${image_name}_dev"
docker build -t $image_name .
docker container run -it -v $PWD/src:/opt/webpack/src/ -v $PWD/dist:/opt/webpack/dist/ --rm --name $container_name $image_name sh