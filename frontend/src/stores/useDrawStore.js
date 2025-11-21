import { create } from "zustand";
import toast from "react-hot-toast";
import apiClient from "../lib/apiClient";

export const useDrawStore = create((set) => ({
        nextDrawAt: null,
        loading: false,
        updating: false,
        fetchNextDraw: async () => {
                set({ loading: true });
                try {
                        const data = await apiClient.get(`/draw-schedule`);
                        set({ nextDrawAt: data?.nextDrawAt || null, loading: false });
                } catch (error) {
                        console.log("Failed to load draw schedule", error);
                        set({ loading: false });
                }
        },
        updateNextDraw: async ({ nextDrawDate, nextDrawTime }) => {
                set({ updating: true });
                try {
                        const data = await apiClient.put(`/draw-schedule`, { nextDrawDate, nextDrawTime });
                        set({ nextDrawAt: data?.nextDrawAt || null, updating: false });
                        toast.success("تم تحديث موعد السحب القادم");
                } catch (error) {
                        set({ updating: false });
                        toast.error(error.response?.data?.message || "تعذر حفظ موعد السحب");
                        throw error;
                }
        },
}));

export default useDrawStore;
