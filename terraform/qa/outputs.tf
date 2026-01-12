output "alb_dns_name" {
  description = "Public DNS of QA ALB"
  value       = module.alb.dns_name
}
