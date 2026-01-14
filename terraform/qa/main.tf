provider "aws" {
  region = "us-east-1"
}

module "vpc" {
  source             = "../modules/vpc"
  env                = "qa"
  cidr_block         = "10.0.0.0/16"
  public_subnets     = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets    = ["10.0.3.0/24", "10.0.4.0/24"]
  availability_zones = ["us-east-1a", "us-east-1b"]
}

module "alb" {
  source  = "../modules/alb"
  env     = "qa"
  vpc_id  = module.vpc.vpc_id
  subnets = module.vpc.public_subnets
}

module "asg" {
  source            = "../modules/asg"
  env               = "qa"
  ami               = "ami-0c02fb55956c7d316"
  instance_type     = "t3.micro"
  subnets           = module.vpc.private_subnets
  target_group_arn = module.alb.target_group_arn
}
