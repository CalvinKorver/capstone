docker build  -t cjkorver/capstone_backend -f DOCKERFILE .
docker push cjkorver/capstone_backend
ssh -i /users/calvinkorver/.aws/gemini_vm.pem ec2-user@ec2-52-40-241-18.us-west-2.compute.amazonaws.com -tt << EOF
    cd backend
    docker pull cjkorver/capstone_backend:latest
    docker rm -f api
    docker run  --network=net --name api -p 8000:8000 cjkorver/capstone_backend bash -c "python3 /code/manage.py migrate && python3 manage.py runserver 0.0.0.0:8000"
EOF

