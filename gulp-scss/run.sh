#!/bin/bash
image_name='gulp-scss'
container_name="${image_name}_dev"
docker build -t $image_name .
docker container run -it -v $PWD/scss:/opt/assets/scss/ -v $PWD/css:/opt/assets/css/ --rm --name $container_name $image_name sh