#!/bin/bash
export PGPASSWORD="postgres"
export DATABASE_URL="postgresql://postgres:postgres@localhost/ev-management"

# Insert sample data
psql -h localhost -p 5432 -U postgres -d ev-management -c "
INSERT INTO stations (station_name, car_arrival_probability, consumption_of_cars) VALUES
('Parkplatz area 1', 100, 20),
('Parkplatz area 2', 100, 25),
('Parkplatz area 3', 100, 30);

INSERT INTO charge_points (power, count, station_id) VALUES
(50, 2, 1),
(100, 3, 1),
(50, 1, 2),
(100, 2, 2),
(50, 3, 3),
(100, 1, 3);
"
