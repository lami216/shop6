import { useEffect, useState } from "react";
import { ImagePlus, Trash2, Edit3, X, Save, Upload } from "lucide-react";
import toast from "react-hot-toast";
import useTranslation from "../hooks/useTranslation";
import { usePrizeStore } from "../stores/usePrizeStore";

const createEmptyForm = () => ({
        name: "",
        image: "",
        preview: "",
        imageChanged: false,
});

const PrizeManager = () => {
        const {
                prizes,
                selectedPrize,
                setSelectedPrize,
                clearSelectedPrize,
                fetchPrizes,
                createPrize,
                updatePrize,
                deletePrize,
                loading,
        } = usePrizeStore();
        const { t } = useTranslation();

        const [formState, setFormState] = useState(() => createEmptyForm());

        useEffect(() => {
                fetchPrizes();
        }, [fetchPrizes]);

        useEffect(() => {
                if (!selectedPrize) {
                        setFormState(createEmptyForm());
                        return;
                }

                setFormState({
                        name: selectedPrize.name ?? "",
                        image: "",
                        preview: selectedPrize.imageUrl ?? "",
                        imageChanged: false,
                });
        }, [selectedPrize]);

        const handleImageChange = (event) => {
                const file = event.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = () => {
                        const result = typeof reader.result === "string" ? reader.result : "";
                        setFormState((previous) => ({
                                ...previous,
                                image: result,
                                preview: result,
                                imageChanged: true,
                        }));
                };
                reader.readAsDataURL(file);
                event.target.value = "";
        };

        const handleSubmit = async (event) => {
                event.preventDefault();
                const trimmedName = formState.name.trim();

                if (!trimmedName) {
                        toast.error(t("prizes.manager.form.nameRequired"));
                        return;
                }

                if (!selectedPrize && !formState.image) {
                        toast.error(t("prizes.manager.form.imageRequired"));
                        return;
                }

                const payload = { name: trimmedName };

                if (formState.image && (formState.imageChanged || !selectedPrize)) {
                        payload.image = formState.image;
                }

                try {
                        if (selectedPrize) {
                                await updatePrize(selectedPrize._id, payload);
                        } else {
                                await createPrize(payload);
                        }
                        clearSelectedPrize();
                        setFormState(createEmptyForm());
                } catch (error) {
                        console.error("Failed to save prize", error);
                }
        };

        const handleEdit = (prize) => {
                setSelectedPrize(prize);
        };

        const handleDelete = (prize) => {
                if (globalThis.window?.confirm(t("prizes.manager.confirmDelete"))) {
                        deletePrize(prize._id);
                }
        };

        const handleCancelEdit = () => {
                clearSelectedPrize();
                setFormState(createEmptyForm());
        };

        return (
                <div className='mx-auto mb-12 max-w-5xl space-y-8'>
                        <div className='rounded-xl border border-payzone-indigo/40 bg-white/5 p-6 shadow-lg backdrop-blur-sm'>
                                <div className='mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                                        <div>
                                                <h2 className='text-2xl font-semibold text-payzone-gold'>{t("prizes.manager.title")}</h2>
                                                <p className='text-sm text-white/70'>{t("prizes.manager.description")}</p>
                                        </div>
                                        {selectedPrize && (
                                                <button
                                                        type='button'
                                                        className='inline-flex items-center gap-2 rounded-md border border-payzone-indigo/40 px-3 py-1 text-sm text-white transition hover:border-payzone-gold'
                                                        onClick={handleCancelEdit}
                                                >
                                                        <X className='h-4 w-4' />
                                                        {t("prizes.manager.form.cancelEdit")}
                                                </button>
                                        )}
                                </div>

                                <form onSubmit={handleSubmit} className='space-y-6'>
                                        <div className='grid gap-4 sm:grid-cols-[1.5fr_1fr] sm:items-center'>
                                                <div>
                                                        <label className='block text-sm font-medium text-white/80' htmlFor='prize-name'>
                                                                {t("prizes.manager.form.name")}
                                                        </label>
                                                        <input
                                                                id='prize-name'
                                                                type='text'
                                                                className='mt-1 block w-full rounded-md border border-payzone-indigo/40 bg-payzone-navy/60 px-3 py-2 text-white focus:border-payzone-gold focus:outline-none focus:ring-2 focus:ring-payzone-indigo'
                                                                value={formState.name}
                                                                onChange={(event) =>
                                                                        setFormState((previous) => ({
                                                                                ...previous,
                                                                                name: event.target.value,
                                                                        }))
                                                                }
                                                                required
                                                        />
                                                </div>
                                                <div>
                                                        <label className='block text-sm font-medium text-white/80'>
                                                                {t("prizes.manager.form.image")}
                                                        </label>
                                                        <div className='mt-1 flex items-center gap-3'>
                                                                <input
                                                                        type='file'
                                                                        id='prize-image'
                                                                        accept='image/*'
                                                                        className='sr-only'
                                                                        onChange={handleImageChange}
                                                                />
                                                                <label
                                                                        htmlFor='prize-image'
                                                                        className='inline-flex cursor-pointer items-center gap-2 rounded-md border border-payzone-indigo/40 bg-payzone-navy/60 px-3 py-2 text-sm text-white transition hover:border-payzone-gold hover:bg-payzone-navy/80'
                                                                >
                                                                        <ImagePlus className='h-4 w-4' />
                                                                        {formState.preview
                                                                                ? t("prizes.manager.form.changeImage")
                                                                                : t("prizes.manager.form.chooseImage")}
                                                                </label>
                                                                {formState.preview && (
                                                                        <img
                                                                                src={formState.preview}
                                                                                alt='معاينة الجائزة'
                                                                                className='h-14 w-14 rounded-lg object-cover'
                                                                        />
                                                                )}
                                                        </div>
                                                        <p className='mt-2 text-xs text-white/60'>{t("prizes.manager.form.imageHint")}</p>
                                                </div>
                                        </div>

                                        <button
                                                type='submit'
                                                className='inline-flex items-center justify-center gap-2 rounded-md bg-payzone-gold px-4 py-2 font-semibold text-payzone-navy transition hover:bg-[#b8873d] focus:outline-none focus:ring-2 focus:ring-payzone-indigo disabled:opacity-50'
                                                disabled={loading}
                                        >
                                                {selectedPrize ? <Save className='h-4 w-4' /> : <Upload className='h-4 w-4' />}
                                                {selectedPrize
                                                        ? t("prizes.manager.form.submitUpdate")
                                                        : t("prizes.manager.form.submitCreate")}
                                        </button>
                                </form>
                        </div>

                        <div className='rounded-xl border border-payzone-indigo/40 bg-white/5 p-6 shadow-lg backdrop-blur-sm'>
                                <h3 className='mb-4 text-xl font-semibold text-payzone-gold'>{t("prizes.manager.list.title")}</h3>
                                {prizes.length === 0 ? (
                                        <p className='text-sm text-white/70'>{t("prizes.manager.list.empty")}</p>
                                ) : (
                                        <ul className='grid gap-4 sm:grid-cols-2'>
                                                {prizes.map((prize) => (
                                                        <li
                                                                key={prize._id}
                                                                className='flex flex-col gap-3 rounded-lg border border-white/10 bg-payzone-navy/40 p-4 shadow-inner'
                                                        >
                                                                <div className='flex items-center gap-4'>
                                                                        <img
                                                                                src={prize.imageUrl}
                                                                                alt={prize.name}
                                                                                className='h-16 w-16 rounded-lg object-cover'
                                                                        />
                                                                        <div>
                                                                                <p className='text-lg font-semibold text-white'>{prize.name}</p>
                                                                                <p className='text-xs text-white/60'>
                                                                                        {t("prizes.manager.list.updatedAt", {
                                                                                                date: new Date(prize.updatedAt).toLocaleDateString("ar-MR"),
                                                                                        })}
                                                                                </p>
                                                                        </div>
                                                                </div>
                                                                <div className='flex items-center gap-2'>
                                                                        <button
                                                                                type='button'
                                                                                className='inline-flex items-center gap-1 rounded-md bg-white/10 px-3 py-1 text-sm text-white transition hover:bg-white/20'
                                                                                onClick={() => handleEdit(prize)}
                                                                        >
                                                                                <Edit3 className='h-4 w-4' />
                                                                                {t("prizes.manager.list.actions.edit")}
                                                                        </button>
                                                                        <button
                                                                                type='button'
                                                                                className='inline-flex items-center gap-1 rounded-md bg-red-500/20 px-3 py-1 text-sm text-red-200 transition hover:bg-red-500/30'
                                                                                onClick={() => handleDelete(prize)}
                                                                        >
                                                                                <Trash2 className='h-4 w-4' />
                                                                                {t("prizes.manager.list.actions.delete")}
                                                                        </button>
                                                                </div>
                                                        </li>
                                                ))}
                                        </ul>
                                )}
                        </div>
                </div>
        );
};

export default PrizeManager;
