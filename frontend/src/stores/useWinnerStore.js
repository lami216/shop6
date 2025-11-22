import { create } from "zustand";
import toast from "react-hot-toast";
import apiClient from "../lib/apiClient";
import { translate } from "../lib/locale";

export const useWinnerStore = create((set) => ({
        winners: [],
        selectedWinner: null,
        loading: false,

        setSelectedWinner: (winner) => set({ selectedWinner: winner }),
        clearSelectedWinner: () => set({ selectedWinner: null }),

        fetchWinners: async () => {
                        set({ loading: true });
                        try {
                                const data = await apiClient.get(`/winners`);
                                set({ winners: data || [], loading: false });
                        } catch (error) {
                                console.log("Failed to load winners", error);
                                set({ loading: false });
                                toast.error(error.response?.data?.message || translate("toast.fetchWinnersError", "تعذر تحميل قائمة الفائزين"));
                        }
        },

        createWinner: async (payload) => {
                set({ loading: true });
                try {
                        const data = await apiClient.post(`/winners`, payload);
                        set((previous) => ({ winners: [data, ...previous.winners], loading: false }));
                        toast.success(translate("common.messages.winnerCreated", "تم إضافة الفائز بنجاح"));
                        return data;
                } catch (error) {
                        set({ loading: false });
                        toast.error(error.response?.data?.message || translate("toast.createWinnerError", "تعذر إضافة الفائز"));
                        throw error;
                }
        },

        updateWinner: async (id, payload) => {
                set({ loading: true });
                try {
                        const data = await apiClient.put(`/winners/${id}`, payload);
                        set((previous) => ({
                                winners: previous.winners.map((winner) => (winner._id === id ? data : winner)),
                                selectedWinner: previous.selectedWinner?._id === id ? data : previous.selectedWinner,
                                loading: false,
                        }));
                        toast.success(translate("common.messages.winnerUpdated", "تم تحديث بيانات الفائز"));
                        return data;
                } catch (error) {
                        set({ loading: false });
                        toast.error(error.response?.data?.message || translate("toast.updateWinnerError", "تعذر تحديث بيانات الفائز"));
                        throw error;
                }
        },

        deleteWinner: async (id) => {
                set({ loading: true });
                try {
                        await apiClient.delete(`/winners/${id}`);
                        set((previous) => ({
                                winners: previous.winners.filter((winner) => winner._id !== id),
                                selectedWinner: previous.selectedWinner?._id === id ? null : previous.selectedWinner,
                                loading: false,
                        }));
                        toast.success(translate("common.messages.winnerDeleted", "تم حذف الفائز"));
                } catch (error) {
                        set({ loading: false });
                        toast.error(error.response?.data?.message || translate("toast.deleteWinnerError", "تعذر حذف الفائز"));
                        throw error;
                }
        },
}));

export default useWinnerStore;
