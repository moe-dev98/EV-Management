import random

# Constants
NUM_CHARGEPOINTS = 20
CHARGING_POWER_KW = 11
TOTAL_INTERVALS = 35040  
ENERGY_CONSUMPTION_PER_100KM = 18 


# Probability distributions for EV arrivals at each hour of the day
hourly_arrival_probabilities = {
    0:  0.0094,  1:  0.0094,  2:  0.0094,  3:  0.0094,  4:  0.0094,  5:  0.0094,  6:  0.0094,  7:  0.0094,
    8:  0.0283,  9:  0.0283, 10:  0.0566, 11:  0.0566, 12:  0.0566, 13:  0.0755, 14:  0.0755, 15:  0.0755,
   16:  0.1038, 17:  0.1038, 18:  0.1038, 19:  0.0472, 20:  0.0472, 21:  0.0472, 22:  0.0094, 23:  0.0094
}

# Probability distribution for charging needs in kilometers
charging_needs = [
    (0.3431, 0), (0.0490, 5), (0.0980, 10), (0.1176, 20), (0.0882, 30), 
    (0.1176, 50), (0.1078, 100), (0.0490, 200), (0.0294, 300)
]

# Simulation
total_energy_consumed_kwh = 0
actual_max_power_demand_kw = 0
chargepoints = [0] * NUM_CHARGEPOINTS

for interval in range(TOTAL_INTERVALS):
    current_hour = (interval // 4) % 24
    arrival_probability = hourly_arrival_probabilities[current_hour]
    
    for i in range(NUM_CHARGEPOINTS):
        if chargepoints[i] > 0:
            # Decrease the remaining charging time if the chargepoint is in use
            chargepoints[i] -= 1
        elif random.random() < arrival_probability:
            # If an EV arrives, determine its charging need
            charging_need_km = random.choices(
                [km for _, km in charging_needs], 
                [prob for prob, _ in charging_needs]
            )[0]
            charging_need_kwh = (charging_need_km / 100) * ENERGY_CONSUMPTION_PER_100KM
            chargepoints[i] = int(charging_need_kwh / (CHARGING_POWER_KW / 4))
            total_energy_consumed_kwh += charging_need_kwh

    current_power_demand_kw = sum(1 for cp in chargepoints if cp > 0) * CHARGING_POWER_KW
    actual_max_power_demand_kw = max(actual_max_power_demand_kw, current_power_demand_kw)

theoretical_max_power_demand_kw = NUM_CHARGEPOINTS * CHARGING_POWER_KW
concurrency_factor = actual_max_power_demand_kw / theoretical_max_power_demand_kw

# Results
print(f"Total energy consumed: {total_energy_consumed_kwh:.2f} kWh")
print(f"Theoretical maximum power demand: {theoretical_max_power_demand_kw} kW")
print(f"Actual maximum power demand: {actual_max_power_demand_kw} kW")
print(f"Concurrency factor: {concurrency_factor:.2%}")