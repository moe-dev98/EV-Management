#!/bin/bash
export PGPASSWORD="postgres"
export PGUSER="postgres"
export PGPASSWORD="postgres"
export DATABASE_URL="postgresql://$PGUSER:$PGPASSWORD@localhost/ev-management"

# Create the database if it doesn't exist
psql -h localhost -p 5432 -U postgres -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'ev-management'" | grep -q 1 || psql -h localhost -p 5432 -U postgres -d postgres -c "CREATE DATABASE \"ev-management\""

# Start the server
uvicorn main:app --host 0.0.0.0 --port 8000
