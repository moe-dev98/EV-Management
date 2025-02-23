#!/bin/bash
export PGPASSWORD="postgres"
export DATABASE_URL="postgresql://postgres:postgres@localhost/ev-management"

# Insert sample data
psql -h localhost -p 5432 -U postgres -d ev-management -c "
INSERT INTO stations (name, car_arrival_probability, consumption_of_cars) VALUES
('Parkplatz area 1', 100, 20),
('Parkplatz area 2', 100, 25),
('Parkplatz area 3', 100, 30);

INSERT INTO charge_points (power, count, station_id) VALUES
(11, 2, 1),
(11, 3, 1),
(11, 1, 2),
(11, 2, 2),
(11, 3, 3),
(11, 1, 3);
"
