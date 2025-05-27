#!/bin/bash
set -e

host="$DB_HOST"
user="$DB_USER"
password="$DB_PASSWORD"
db="$DB_NAME"

# Wait for MySQL to accept connections
until mysql -h "$host" -u "$user" -p"$password" -e "SELECT 1;" &> /dev/null; do
  echo "Waiting for MySQL to be available..."
  sleep 2
done

# Wait for the 'employee_manager' table to exist
until mysql -h "$host" -u "$user" -p"$password" -e "USE $db; SHOW TABLES LIKE 'employee';" | grep -q 'employee'; do
  echo "Waiting for 'employee_manager' table to be created..."
  sleep 2
done

echo "Database is ready. Starting backend..."
exec "$@"
