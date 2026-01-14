resource "aws_lb" "this" {
  name               = "alb-${var.env}"
  internal           = false
  load_balancer_type = "application"
  subnets            = var.subnets

  tags = {
    Environment = var.env
  }
}

resource "aws_lb_target_group" "this" {
  name     = "tg-${var.env}"
  port     = 80
  protocol = "HTTP"
  vpc_id   = var.vpc_id
}

resource "aws_lb_listener" "this" {
  load_balancer_arn = aws_lb.this.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.this.arn
  }
}
