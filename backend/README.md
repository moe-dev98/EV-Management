# EV Management

## Overview

This simulation models the energy consumption and power demand of electric vehicle (EV) chargepoints over a period of time (15minutes intervals).

## Running the Simulation

To run the simulation, you can simply execute the `simulation.py` script. The script uses default values for various constants, but you can override these values by setting environment variables.

### Environment Variables

The following environment variables can be set to customize the simulation:

- `NUM_CHARGEPOINTS`: Number of chargepoints (default: 20)
- `CHARGING_POWER_KW`: Charging power in kW (default: 11)
- `TOTAL_INTERVALS`: Total number of intervals in the simulation (default: 35040)
- `ENERGY_CONSUMPTION_PER_100KM`: Energy consumption per 100 km in kWh (default: 18)

### Example

To run the simulation with custom values, and update for example the number of charge points to see the behavior of the concurrency factor you can set this environment variable in your terminal before running the script

```sh
export NUM_CHARGEPOINTS=25

python3 simulation.py

