variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "name" {
  type    = string
  default = "els-qa"
}

variable "enable_nat" {
  type    = bool
  default = false
}

variable "key_name" {
  type = string
}

variable "my_ip_cidr" {
  type = string
}

variable "dockerhub_user" {
  type    = string
  default = "karen123g"
}

variable "image_tag" {
  type    = string
  default = "qa"
}

variable "jwt_secret" {
  type    = string
  default = "qa_secret_change_me"
}

variable "internal_token" {
  type    = string
  default = "super-internal-123"
}

variable "app_instance_type" {
  type    = string
  default = "t3.small"
}

variable "app_min" {
  type    = number
  default = 2
}

variable "app_desired" {
  type    = number
  default = 2
}

variable "app_max" {
  type    = number
  default = 4
}

variable "data_instance_type" {
  type    = string
  default = "t3.small"
}
