# Be careful with this because it will overrite the database on the instance.

ssh -i /users/calvinkorver/.aws/gemini_vm.pem ec2-user@ec2-52-40-241-18.us-west-2.compute.amazonaws.com -tt << EOF
    docker rm -f /db
    docker run --network=net --name db postgres -i
EOF
