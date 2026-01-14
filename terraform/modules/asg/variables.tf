variable "ami" {
  type = string
}

variable "instance_type" {
  type = string
}

variable "subnets" {
  type = list(string)
}

variable "target_group_arn" {
  type = string
}

variable "env" {
  type = string
}
