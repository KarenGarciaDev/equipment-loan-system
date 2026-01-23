# QA variables
aws_region = "us-east-1"
name       = "els-qa"

# Set to true if you want private subnets + NAT gateway (more realistic, higher cost)
enable_nat = false

# REQUIRED: set these
key_name   = "els-key-qa"
my_ip_cidr = "179.49.201.186/32"

# Docker images
dockerhub_user = "karen123g"
image_tag      = "qa"
