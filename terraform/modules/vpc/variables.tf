variable "cidr_block" {
  description = "CIDR principal de la VPC"
  type        = string
}

variable "public_subnets" {
  description = "Subnets públicas"
  type        = list(string)
}

variable "private_subnets" {
  description = "Subnets privadas"
  type        = list(string)
}

variable "availability_zones" {
  description = "Zonas de disponibilidad"
  type        = list(string)
}

variable "env" {
  description = "Entorno (qa | prod)"
  type        = string
}
