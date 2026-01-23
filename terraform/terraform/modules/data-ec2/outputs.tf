output "private_ip" { value = aws_instance.data.private_ip }
output "public_ip" { value = aws_instance.data.public_ip }
output "sg_id" { value = aws_security_group.data.id }
