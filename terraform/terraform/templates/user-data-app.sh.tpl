#!/bin/bash
set -e

apt-get update -y
apt-get install -y ca-certificates curl gnupg lsb-release

mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

systemctl enable docker
systemctl start docker

mkdir -p /opt/els
cd /opt/els

# Write nginx config
cat > nginx.conf << 'EOF_NGX'
${nginx_conf}
EOF_NGX

# Write app compose
cat > docker-compose.yml << 'EOF_COMPOSE'
${app_compose}
EOF_COMPOSE

# Bring up
docker compose pull || true
docker compose up -d

# Helpful debug
docker ps
