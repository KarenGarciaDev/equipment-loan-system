variable "name" {
  type = string
}

variable "vpc_cidr" {
  type    = string
  default = "10.10.0.0/16"
}

variable "public_subnet_a_cidr" {
  type    = string
  default = "10.10.1.0/24"
}

variable "public_subnet_b_cidr" {
  type    = string
  default = "10.10.2.0/24"
}

variable "private_subnet_a_cidr" {
  type    = string
  default = "10.10.11.0/24"
}

variable "private_subnet_b_cidr" {
  type    = string
  default = "10.10.12.0/24"
}

variable "enable_nat" {
  type    = bool
  default = false
}
