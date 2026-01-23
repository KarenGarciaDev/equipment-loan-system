🧰 Equipment Loan System (ELS)

A distributed backend platform based on microservices architecture, designed for equipment loan management, with an academic–professional focus on DevOps, Cloud Computing, and Software Architecture.

This project implements 10+ microservices, event-driven communication, CI/CD pipelines, Docker containers, Terraform, and QA / PROD environment separation, fulfilling real-world engineering requirements.

📌 Project Objectives

Design a scalable and decoupled architecture

Apply software engineering best practices (SOLID, DRY, KISS)

Implement real DevOps with CI/CD and Infrastructure as Code

Use multiple databases and a caching system

Integrate asynchronous messaging (Kafka)

Simulate a real production-ready AWS environment

🧱 General Architecture

Architecture Type: Microservices + Event-Driven

Patterns:

Microservices

Event-Driven Architecture

Layered / Hexagonal Architecture (NestJS)

CQRS (partial)

Communication:

REST (HTTP)

Kafka (Redpanda)

Redis (cache / tokens)

🗂️ Monorepo Structure (Turborepo)

The project is organized as a Monorepo using Turborepo, which allows:

Shared libraries

Parallel builds

Consistent tooling across services

equipment-loan-system/
│
├─ apps/                     # Microservices
│  ├─ api-auth
│  ├─ api-users
│  ├─ api-inventory
│  ├─ api-loans
│  ├─ api-reservations
│  ├─ api-audit
│  ├─ api-reports
│  ├─ api-notifications
│  ├─ api-automation
│  └─ api-integration
│
├─ packages/                 # Shared libraries
│  ├─ eslint-config
│  ├─ tsconfig
│  └─ shared-utils
│
├─ terraform/                # Infrastructure as Code
│  ├─ modules/
│  ├─ qa/
│  └─ prod/
│
├─ .github/workflows/        # CI/CD (GitHub Actions)
├─ docker-compose.yml        # Local environment
├─ turbo.json
├─ package.json
└─ README.md

⚙️ Technologies Used
Backend

Node.js + TypeScript

NestJS

Prisma ORM

DevOps & Infrastructure

Docker & Docker Compose

Docker Hub (microservice images)

GitHub Actions (CI/CD)

Terraform (AWS)

Cloud (AWS)

EC2

Application Load Balancer (ALB)

Auto Scaling Groups (ASG – in progress)

VPC, Subnets, Security Groups

Bastion Host

🗄️ Databases
Service	Database
Auth	PostgreSQL
Users	PostgreSQL
Inventory	PostgreSQL
Loans	PostgreSQL
Reservations	PostgreSQL
Audit	MongoDB
Cache	Redis

MongoDB is used by the Audit service to store immutable event logs and audit trails.
Reports service consumes audit data and other events but does not own a primary database.

🔁 Microservices Overview

Each microservice is independent, with its own responsibility and (where applicable) its own database.

Examples:

api-auth → Authentication, JWT, roles

api-users → User management

api-inventory → Equipment catalog

api-loans → Active loans

api-reservations → Reservations (Prisma + Studio)

api-audit → Audit logs (MongoDB)

api-reports → Read-only reporting and aggregation

api-notifications → Async notifications

api-automation → Workflow automation

api-integration → External integrations

🔐 Security

JWT authentication (Auth Service)

Role-based access control

Configured CORS policies

Redis for token storage and caching

Bastion EC2 instance for secure access

🔄 CI/CD (GitHub Actions)

The project includes separate pipelines for QA and PROD:

Build microservices

Publish Docker images to Docker Hub

Terraform execution:

terraform init

terraform plan

terraform apply

Sensitive values are managed using GitHub Secrets.

🌍 Terraform (Infrastructure as Code)

Infrastructure is fully defined using Terraform:

VPC and subnets

Security groups

Application Load Balancer (ALB)

Bastion host

EC2 instances per environment

Environment separation:

terraform/
├─ qa/
└─ prod/

🧪 Testing Status

Unit testing: ⚠️ partially implemented

Functional testing: Postman collections

Load testing: planned

🧭 Project Status
Area	Status
Backend	✅ Complete
Microservices	✅ 10+
CI/CD	✅
Docker	✅
Terraform	⚠️ Partial
High Availability	⚠️ In progress
Frontend	❌ Not implemented

The scope of this project focuses on backend, infrastructure, and DevOps.
Frontend development is intentionally out of scope.

🚀 Local Execution
docker compose up -d


Available services:

Auth: http://localhost:3000

Users: http://localhost:3001

Inventory: http://localhost:3002

Loans: http://localhost:3003

Reservations: http://localhost:3004

Prisma Studio (Reservations): http://localhost:5555

📖 Documentation & Standards

Swagger documentation per microservice

Conventional Commits

GitHub Pull Requests

README documentation

👨‍💻 Author

Developed for academic and professional purposes, focused on distributed systems, DevOps practices, and cloud-native architecture.

This project simulates a real production-grade backend system and demonstrates the practical application of modern microservices architecture.

If you want, next I can:

Reduce this to a short evaluation README

Align it exactly to your professor’s rubric

Prepare what to say in the defense (oral explanation)
Just tell me 🔥
