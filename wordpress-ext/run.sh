#!/bin/bash
image_name='wordpress-ext'
container_name="${image_name}_dev"
docker build -t $image_name .
docker container run -it --rm --name $container_name $image_name bash