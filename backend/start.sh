#!/bin/bash
export PGPASSWORD="postgres"
export DATABASE_URL="postgresql://postgres:postgres@localhost/ev-management"

# Install dependencies
pip install -r requirements.txt

# Create the database if it doesn't exist
psql -h localhost -p 5432 -U postgres -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'ev-management'" | grep -q 1 || psql -h localhost -p 5432 -U postgres -d postgres -c "CREATE DATABASE \"ev-management\""

# Start the server
uvicorn main:app --host 0.0.0.0 --port 8000