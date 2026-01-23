variable "name" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "subnet_ids" {
  type = list(string)
}

variable "key_name" {
  type = string
}

variable "alb_sg_id" {
  type = string
}

variable "bastion_sg_id" {
  type = string
}

variable "target_group_arn" {
  type = string
}

variable "instance_type" {
  type    = string
  default = "t3.small"
}

variable "min" {
  type    = number
  default = 2
}

variable "desired" {
  type    = number
  default = 2
}

variable "max" {
  type    = number
  default = 4
}

variable "user_data" {
  type = string
}
