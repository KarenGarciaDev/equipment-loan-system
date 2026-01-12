resource "aws_launch_template" "this" {
  name_prefix   = "lt-${var.env}"
  image_id      = var.ami
  instance_type = var.instance_type
}

resource "aws_autoscaling_group" "this" {
  desired_capacity     = 2
  max_size             = 3
  min_size             = 1
  vpc_zone_identifier  = var.subnets
  target_group_arns    = [var.target_group_arn]

  launch_template {
    id      = aws_launch_template.this.id
    version = "$Latest"
  }
}
