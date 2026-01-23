output "alb_dns" { value = module.alb.alb_dns }
output "bastion_public_ip" { value = module.bastion.public_ip }
output "data_private_ip" { value = module.data.private_ip }
output "data_public_ip" { value = module.data.public_ip }
output "asg_name" { value = module.asg_app.asg_name }
