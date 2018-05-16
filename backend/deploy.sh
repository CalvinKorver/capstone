docker build  -t cjkorver/capstone_backend -f DOCKERFILE .
docker push cjkorver/capstone_backend
ssh -i /users/calvinkorver/.aws/gemini_vm.pem ec2-user@ec2-52-40-241-18.us-west-2.compute.amazonaws.com -tt << EOF
    cd backend
    docker rm -f db
    docker rm -f backend_db_1
    docker rm -f backend_web_1
    docker-compose build
    docker-compose up
EOF
