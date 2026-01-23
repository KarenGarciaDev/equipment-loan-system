terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = { source = "hashicorp/aws", version = ">= 5.0" }
  }
}

provider "aws" {
  region = var.aws_region
}

module "network" {
  source     = "../modules/network"
  name       = var.name
  enable_nat = var.enable_nat
}

module "bastion" {
  source     = "../modules/bastion"
  name       = var.name
  vpc_id     = module.network.vpc_id
  subnet_id  = module.network.public_subnet_a_id
  key_name   = var.key_name
  my_ip_cidr = var.my_ip_cidr
}

module "alb" {
  source            = "../modules/alb"
  name              = var.name
  vpc_id            = module.network.vpc_id
  public_subnet_ids = module.network.public_subnet_ids
  target_port       = 8080
  health_path       = "/health"
}

# Choose where APP/DATA live:
# - enable_nat=false (default): deploy into public subnets so instances can pull docker images without NAT cost.
# - enable_nat=true: deploy into private subnets (requires NAT gateway).
locals {
  app_subnets  = var.enable_nat ? module.network.private_subnet_ids : module.network.public_subnet_ids
  data_subnet  = var.enable_nat ? module.network.private_subnet_a_id  : module.network.public_subnet_a_id
  data_public  = var.enable_nat ? false : true
}

# DATA user-data: install docker + start data compose
locals {
  data_user_data = templatefile("${path.module}/../templates/user-data-data.sh.tpl", {
    compose_yaml = file("${path.module}/../templates/data-compose.yml")
  })
}

# APP user-data: install docker + write nginx.conf + app compose (templated) + .env
locals {
  app_compose = templatefile("${path.module}/../templates/app-compose.yml.tpl", {
    DOCKERHUB_USER = var.dockerhub_user
    IMAGE_TAG      = var.image_tag
    JWT_SECRET     = var.jwt_secret
    INTERNAL_TOKEN = var.internal_token
    # DB URLs point to DATA instance private IP (filled after DATA is created)
    USERS_DB_URL        = "postgresql://postgres:postgres@${module.data.private_ip}:5432/users_db?schema=public"
    AUTH_DB_URL         = "postgresql://postgres:postgres@${module.data.private_ip}:5432/auth_db?schema=public"
    INVENTORY_DB_URL    = "postgresql://postgres:postgres@${module.data.private_ip}:5432/inventory_db?schema=public"
    LOANS_DB_URL        = "postgresql://postgres:postgres@${module.data.private_ip}:5432/loans_db?schema=public"
    RESERVATIONS_DB_URL = "postgresql://postgres:postgres@${module.data.private_ip}:5432/reservations_db?schema=public"
    REDIS_URL           = "redis://${module.data.private_ip}:6379"
    KAFKA_BROKERS       = "${module.data.private_ip}:9092"
  })

  app_user_data = templatefile("${path.module}/../templates/user-data-app.sh.tpl", {
    nginx_conf   = file("${path.module}/../templates/nginx.conf")
    app_compose  = local.app_compose
  })
}

module "asg_app" {
  source           = "../modules/asg-app"
  name             = var.name
  vpc_id           = module.network.vpc_id
  subnet_ids       = local.app_subnets
  key_name         = var.key_name
  alb_sg_id        = module.alb.alb_sg_id
  bastion_sg_id    = module.bastion.sg_id
  target_group_arn = module.alb.target_group_arn
  instance_type    = var.app_instance_type
  min              = var.app_min
  desired          = var.app_desired
  max              = var.app_max
  user_data        = local.app_user_data
}

module "data" {
  source              = "../modules/data-ec2"
  name                = var.name
  vpc_id              = module.network.vpc_id
  subnet_id           = local.data_subnet
  key_name            = var.key_name
  bastion_sg_id       = module.bastion.sg_id
  app_sg_id           = module.asg_app.sg_id
  instance_type       = var.data_instance_type
  associate_public_ip = local.data_public
  user_data           = local.data_user_data
}
