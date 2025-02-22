import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = "http://0.0.0.0:8001/stations/";

export const useStationStore = create((set) => ({
    stations: [],
    selectedStation: null, 
    loading: false,
    error: null,

    fetchStations: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(API_BASE_URL);
            set({ stations: response.data });
        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    // Create a new station
    createStation: async (newStation) => {
        try {
            const response = await axios.post(API_BASE_URL, newStation);
            set((state) => ({ stations: [...state.stations, response.data] }));
        } catch (err) {
            console.error("Error creating station:", err);
        }
    },

    updateStation: async (id, updatedStation) => {
        try {
            const response = await axios.put(`${API_BASE_URL}${id}`, updatedStation);
            set((state) => ({
                stations: state.stations.map((station) =>
                    station.id === id ? response.data : station
                ),
            }));
        } catch (err) {
            console.error("Error updating station:", err);
        }
    },

    deleteStation: async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}${id}`);
            set((state) => ({
                stations: state.stations.filter((station) => station.id !== id),
            }));
        } catch (err) {
            console.error("Error deleting station:", err);
        }
    },

    getStationById: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}${id}`);
            return response.data;
        } catch (err) {
            console.error("Error fetching station:", err);
            return null;
        }
    },

    setSelectedStation: (station) => set({ selectedStation: station }),

    clearSelectedStation: () => set({ selectedStation: null }),
}));
