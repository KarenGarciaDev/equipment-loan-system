terraform {
  required_providers {
    aws = { source = "hashicorp/aws" }
  }
}

data "aws_availability_zones" "azs" {}

resource "aws_vpc" "this" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = { Name = "${var.name}-vpc" }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.this.id
  tags = { Name = "${var.name}-igw" }
}

# Public subnets
resource "aws_subnet" "public_a" {
  vpc_id                  = aws_vpc.this.id
  cidr_block              = var.public_subnet_a_cidr
  availability_zone       = data.aws_availability_zones.azs.names[0]
  map_public_ip_on_launch = true
  tags = { Name = "${var.name}-public-a" }
}

resource "aws_subnet" "public_b" {
  vpc_id                  = aws_vpc.this.id
  cidr_block              = var.public_subnet_b_cidr
  availability_zone       = data.aws_availability_zones.azs.names[1]
  map_public_ip_on_launch = true
  tags = { Name = "${var.name}-public-b" }
}

# Private subnets (used only when enable_nat=true)
resource "aws_subnet" "private_a" {
  vpc_id            = aws_vpc.this.id
  cidr_block        = var.private_subnet_a_cidr
  availability_zone = data.aws_availability_zones.azs.names[0]
  tags = { Name = "${var.name}-private-a" }
}

resource "aws_subnet" "private_b" {
  vpc_id            = aws_vpc.this.id
  cidr_block        = var.private_subnet_b_cidr
  availability_zone = data.aws_availability_zones.azs.names[1]
  tags = { Name = "${var.name}-private-b" }
}

# Public route table
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.this.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
  tags = { Name = "${var.name}-public-rt" }
}

resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_b" {
  subnet_id      = aws_subnet.public_b.id
  route_table_id = aws_route_table.public.id
}

# NAT (optional)
resource "aws_eip" "nat" {
  count = var.enable_nat ? 1 : 0
  domain = "vpc"
  tags = { Name = "${var.name}-nat-eip" }
}

resource "aws_nat_gateway" "nat" {
  count         = var.enable_nat ? 1 : 0
  allocation_id = aws_eip.nat[0].id
  subnet_id     = aws_subnet.public_a.id
  tags = { Name = "${var.name}-nat" }
  depends_on = [aws_internet_gateway.igw]
}

resource "aws_route_table" "private" {
  count  = var.enable_nat ? 1 : 0
  vpc_id = aws_vpc.this.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat[0].id
  }

  tags = { Name = "${var.name}-private-rt" }
}

resource "aws_route_table_association" "private_a" {
  count          = var.enable_nat ? 1 : 0
  subnet_id      = aws_subnet.private_a.id
  route_table_id = aws_route_table.private[0].id
}

resource "aws_route_table_association" "private_b" {
  count          = var.enable_nat ? 1 : 0
  subnet_id      = aws_subnet.private_b.id
  route_table_id = aws_route_table.private[0].id
}
