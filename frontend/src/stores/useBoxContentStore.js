import { create } from "zustand";
import toast from "react-hot-toast";
import apiClient from "../lib/apiClient";
import { translate } from "../lib/locale";

export const useBoxContentStore = create((set) => ({
        boxContents: [],
        selectedBoxContent: null,
        loading: false,

        setSelectedBoxContent: (boxContent) => set({ selectedBoxContent: boxContent }),
        clearSelectedBoxContent: () => set({ selectedBoxContent: null }),

        fetchBoxContents: async () => {
                set({ loading: true });
                try {
                        const data = await apiClient.get(`/box-contents`);
                        set({ boxContents: data, loading: false });
                } catch (error) {
                        set({ loading: false });
                        toast.error(error.response?.data?.message || translate("toast.fetchBoxContentsError"));
                }
        },

        createBoxContent: async (payload) => {
                set({ loading: true });
                try {
                        const data = await apiClient.post(`/box-contents`, payload);
                        set((previous) => ({ boxContents: [data, ...previous.boxContents], loading: false }));
                        toast.success(translate("common.messages.boxContentCreated"));
                        return data;
                } catch (error) {
                        set({ loading: false });
                        toast.error(error.response?.data?.message || translate("toast.createBoxContentError"));
                        throw error;
                }
        },

        updateBoxContent: async (id, payload) => {
                set({ loading: true });
                try {
                        const data = await apiClient.put(`/box-contents/${id}`, payload);
                        set((previous) => ({
                                boxContents: previous.boxContents.map((content) =>
                                        content._id === id ? data : content
                                ),
                                selectedBoxContent:
                                        previous.selectedBoxContent?._id === id ? data : previous.selectedBoxContent,
                                loading: false,
                        }));
                        toast.success(translate("common.messages.boxContentUpdated"));
                        return data;
                } catch (error) {
                        set({ loading: false });
                        toast.error(error.response?.data?.message || translate("toast.updateBoxContentError"));
                        throw error;
                }
        },

        deleteBoxContent: async (id) => {
                set({ loading: true });
                try {
                        await apiClient.delete(`/box-contents/${id}`);
                        set((previous) => ({
                                boxContents: previous.boxContents.filter((content) => content._id !== id),
                                selectedBoxContent:
                                        previous.selectedBoxContent?._id === id ? null : previous.selectedBoxContent,
                                loading: false,
                        }));
                        toast.success(translate("common.messages.boxContentDeleted"));
                } catch (error) {
                        set({ loading: false });
                        toast.error(error.response?.data?.message || translate("toast.deleteBoxContentError"));
                }
        },
}));
