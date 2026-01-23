services:
  gateway:
    image: nginx:stable-alpine
    ports:
      - "8080:8080"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - api-auth
      - api-users
      - api-inventory
      - api-loans
      - api-reservations
      - api-reports
    restart: unless-stopped

  api-auth:
    image: ${DOCKERHUB_USER}/equipment-loan-system-api-auth:${IMAGE_TAG}
    environment:
      PORT: "3000"
      GLOBAL_PREFIX: "api/v1"
      JWT_SECRET: ${JWT_SECRET}
      DATABASE_URL: ${AUTH_DB_URL}
      USERS_SERVICE_URL: "http://api-users:3001/api/v1"
      INTERNAL_TOKEN: ${INTERNAL_TOKEN}
      REDIS_URL: ${REDIS_URL}
      KAFKA_BROKERS: ${KAFKA_BROKERS}
    restart: unless-stopped

  api-users:
    image: ${DOCKERHUB_USER}/equipment-loan-system-api-users:${IMAGE_TAG}
    environment:
      PORT: "3001"
      GLOBAL_PREFIX: "api/v1"
      DATABASE_URL: ${USERS_DB_URL}
      INTERNAL_TOKEN: ${INTERNAL_TOKEN}
    restart: unless-stopped

  api-inventory:
    image: ${DOCKERHUB_USER}/equipment-loan-system-api-inventory:${IMAGE_TAG}
    environment:
      PORT: "3002"
      GLOBAL_PREFIX: "api/v1"
      DATABASE_URL: ${INVENTORY_DB_URL}
      KAFKA_BROKERS: ${KAFKA_BROKERS}
      KAFKA_CLIENT_ID: "api-inventory"
      KAFKA_TOPIC_EQUIPMENT: "equipment.events"
      INTERNAL_TOKEN: ${INTERNAL_TOKEN}
    restart: unless-stopped

  api-loans:
    image: ${DOCKERHUB_USER}/equipment-loan-system-api-loans:${IMAGE_TAG}
    environment:
      PORT: "3003"
      GLOBAL_PREFIX: "api/v1"
      DATABASE_URL: ${LOANS_DB_URL}
      JWT_SECRET: ${JWT_SECRET}
      USERS_SERVICE_URL: "http://api-users:3001/api/v1"
      INVENTORY_SERVICE_URL: "http://api-inventory:3002/api/v1"
      INTERNAL_TOKEN: ${INTERNAL_TOKEN}
      REDIS_URL: ${REDIS_URL}
      KAFKA_BROKERS: ${KAFKA_BROKERS}
      KAFKA_GROUP_ID: "api-loans"
      KAFKA_TOPIC_EQUIPMENT: "equipment.events"
    restart: unless-stopped

  api-reservations:
    image: ${DOCKERHUB_USER}/equipment-loan-system-api-reservations:${IMAGE_TAG}
    environment:
      PORT: "3004"
      GLOBAL_PREFIX: "api/v1"
      DATABASE_URL: ${RESERVATIONS_DB_URL}
      JWT_SECRET: ${JWT_SECRET}
      USERS_SERVICE_URL: "http://api-users:3001/api/v1"
      INVENTORY_SERVICE_URL: "http://api-inventory:3002/api/v1"
      INTERNAL_TOKEN: ${INTERNAL_TOKEN}
      KAFKA_BROKERS: ${KAFKA_BROKERS}
      KAFKA_CLIENT_ID: "api-reservations"
      KAFKA_GROUP_ID: "api-reservations"
      KAFKA_TOPIC_EQUIPMENT: "equipment.events"
      KAFKA_TOPIC_RESERVATION: "reservation.events"
    restart: unless-stopped

  api-reports:
    image: ${DOCKERHUB_USER}/equipment-loan-system-api-reports:${IMAGE_TAG}
    environment:
      PORT: "3007"
      GLOBAL_PREFIX: "api/v1"
      KAFKA_BROKERS: ${KAFKA_BROKERS}
    restart: unless-stopped
