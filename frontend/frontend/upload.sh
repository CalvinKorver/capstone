#!/bin/bash
yarn build
aws s3 cp ./build s3://shield-site.tk/ --recursive
