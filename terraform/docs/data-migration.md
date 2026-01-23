# Data migration (Backup/Restore) — Postgres + Mongo

## PostgreSQL dumps (run on your PC)
```bash
docker exec -t postgres-users pg_dump -U postgres -d users_db > users_db.sql
docker exec -t postgres-auth pg_dump -U postgres -d auth_db > auth_db.sql
docker exec -t postgres-inventory pg_dump -U postgres -d inventory_db > inventory_db.sql
docker exec -t postgres-loans pg_dump -U postgres -d loans_db > loans_db.sql
docker exec -t postgres-reservations pg_dump -U postgres -d reservations_db > reservations_db.sql
```

## Mongo dump (audit_db)
```bash
docker exec -t mongo-audit mongodump --db audit_db --archive > audit_db.archive
```

## Copy to DATA EC2 (from your PC)
```bash
scp -i YOUR_KEY.pem users_db.sql auth_db.sql inventory_db.sql loans_db.sql reservations_db.sql audit_db.archive ubuntu@DATA_EC2_IP:/home/ubuntu/
```

## Restore in DATA EC2
### Postgres restores
```bash
cat /home/ubuntu/users_db.sql | docker exec -i postgres-users psql -U postgres -d users_db
cat /home/ubuntu/auth_db.sql | docker exec -i postgres-auth psql -U postgres -d auth_db
cat /home/ubuntu/inventory_db.sql | docker exec -i postgres-inventory psql -U postgres -d inventory_db
cat /home/ubuntu/loans_db.sql | docker exec -i postgres-loans psql -U postgres -d loans_db
cat /home/ubuntu/reservations_db.sql | docker exec -i postgres-reservations psql -U postgres -d reservations_db
```

### Mongo restore
```bash
docker cp /home/ubuntu/audit_db.archive mongo-audit:/audit_db.archive
docker exec -i mongo-audit mongorestore --archive=/audit_db.archive --drop
```
