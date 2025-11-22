import { create } from "zustand";
import toast from "react-hot-toast";
import apiClient from "../lib/apiClient";
import { translate } from "../lib/locale";

export const usePrizeStore = create((set) => ({
        prizes: [],
        selectedPrize: null,
        loading: false,

        setSelectedPrize: (prize) => set({ selectedPrize: prize }),
        clearSelectedPrize: () => set({ selectedPrize: null }),

        fetchPrizes: async () => {
                set({ loading: true });
                try {
                        const data = await apiClient.get(`/prizes`);
                        set({ prizes: data, loading: false });
                } catch (error) {
                        set({ loading: false });
                        toast.error(error.response?.data?.message || translate("toast.fetchPrizesError"));
                }
        },

        createPrize: async (payload) => {
                set({ loading: true });
                try {
                        const data = await apiClient.post(`/prizes`, payload);
                        set((previous) => ({ prizes: [data, ...previous.prizes], loading: false }));
                        toast.success(translate("common.messages.prizeCreated"));
                        return data;
                } catch (error) {
                        set({ loading: false });
                        toast.error(error.response?.data?.message || translate("toast.createPrizeError"));
                        throw error;
                }
        },

        updatePrize: async (id, payload) => {
                set({ loading: true });
                try {
                        const data = await apiClient.put(`/prizes/${id}`, payload);
                        set((previous) => ({
                                prizes: previous.prizes.map((prize) => (prize._id === id ? data : prize)),
                                selectedPrize: previous.selectedPrize?._id === id ? data : previous.selectedPrize,
                                loading: false,
                        }));
                        toast.success(translate("common.messages.prizeUpdated"));
                        return data;
                } catch (error) {
                        set({ loading: false });
                        toast.error(error.response?.data?.message || translate("toast.updatePrizeError"));
                        throw error;
                }
        },

        deletePrize: async (id) => {
                set({ loading: true });
                try {
                        await apiClient.delete(`/prizes/${id}`);
                        set((previous) => ({
                                prizes: previous.prizes.filter((prize) => prize._id !== id),
                                selectedPrize: previous.selectedPrize?._id === id ? null : previous.selectedPrize,
                                loading: false,
                        }));
                        toast.success(translate("common.messages.prizeDeleted"));
                } catch (error) {
                        set({ loading: false });
                        toast.error(error.response?.data?.message || translate("toast.deletePrizeError"));
                }
        },
}));
