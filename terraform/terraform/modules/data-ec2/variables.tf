variable "name" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "subnet_id" {
  type = string
}

variable "key_name" {
  type = string
}

variable "bastion_sg_id" {
  type = string
}

variable "app_sg_id" {
  type = string
}

variable "instance_type" {
  type    = string
  default = "t3.small"
}

variable "associate_public_ip" {
  type    = bool
  default = true
}

variable "user_data" {
  type = string
}
