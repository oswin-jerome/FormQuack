#!/bin/bash
docker build --platform linux/amd64 -t formquack .
docker tag formquack registry.oswinjerome.in/formquack
docker push registry.oswinjerome.in/formquack