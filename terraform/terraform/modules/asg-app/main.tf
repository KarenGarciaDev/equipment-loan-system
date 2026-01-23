terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

resource "aws_security_group" "app" {
  name   = "${var.name}-app-sg"
  vpc_id = var.vpc_id

  # HTTP from ALB to nginx(8080)
  ingress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [var.alb_sg_id]
  }

  # SSH from bastion only
  ingress {
    from_port       = 22
    to_port         = 22
    protocol        = "tcp"
    security_groups = [var.bastion_sg_id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

locals {
  user_data = var.user_data
}

resource "aws_launch_template" "lt" {
  name_prefix   = "${var.name}-lt-"
  image_id      = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  key_name      = var.key_name

  vpc_security_group_ids = [aws_security_group.app.id]

  user_data = base64encode(local.user_data)

  tag_specifications {
    resource_type = "instance"

    tags = {
      Name = "${var.name}-app"
    }
  }
}

resource "aws_autoscaling_group" "asg" {
  name                = "${var.name}-asg"
  desired_capacity    = var.desired
  min_size            = var.min
  max_size            = var.max
  vpc_zone_identifier = var.subnet_ids

  health_check_type         = "ELB"
  health_check_grace_period = 180

  launch_template {
    id      = aws_launch_template.lt.id
    version = "$Latest"
  }

  target_group_arns = [var.target_group_arn]

  tag {
    key                 = "Name"
    value               = "${var.name}-app"
    propagate_at_launch = true
  }
}
