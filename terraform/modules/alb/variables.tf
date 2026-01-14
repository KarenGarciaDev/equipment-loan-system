variable "env" {
  description = "Environment name (qa or prod)"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "subnets" {
  description = "Public subnets for ALB"
  type        = list(string)
}
