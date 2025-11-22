import { useEffect, useMemo, useState } from "react";
import { Crown, MapPin, Pencil, Plus, Trash2, Trophy } from "lucide-react";
import { useWinnerStore } from "../stores/useWinnerStore";
import useTranslation from "../hooks/useTranslation";

const WinnersManager = () => {
        const {
                winners,
                fetchWinners,
                createWinner,
                updateWinner,
                deleteWinner,
                selectedWinner,
                setSelectedWinner,
                clearSelectedWinner,
                loading,
        } = useWinnerStore();
        const { t } = useTranslation();

        const [name, setName] = useState("");
        const [city, setCity] = useState("");
        const [prizeName, setPrizeName] = useState("");
        const [prizeImage, setPrizeImage] = useState("");

        useEffect(() => {
                fetchWinners();
        }, [fetchWinners]);

        useEffect(() => {
                if (selectedWinner) {
                        setName(selectedWinner.name || "");
                        setCity(selectedWinner.city || "");
                        setPrizeName(selectedWinner.prizeName || "");
                        setPrizeImage(selectedWinner.prizeImage || "");
                } else {
                        setName("");
                        setCity("");
                        setPrizeName("");
                        setPrizeImage("");
                }
        }, [selectedWinner]);

        const isEditing = useMemo(() => Boolean(selectedWinner?._id), [selectedWinner]);

        const handleSubmit = async (e) => {
                e.preventDefault();
                const payload = { name, city, prizeName, prizeImage };
                if (isEditing) {
                        await updateWinner(selectedWinner._id, payload);
                } else {
                        await createWinner(payload);
                }
                clearSelectedWinner();
        };

        return (
                <div className='space-y-8'>
                        <div className='rounded-xl border border-bilady-indigo/40 bg-white/5 p-6 shadow-lg backdrop-blur-sm'>
                                <div className='mb-6 flex items-center gap-3 text-bilady-gold'>
                                        <Trophy size={28} />
                                        <div>
                                                <h2 className='text-2xl font-semibold'>{t("winners.manager.title")}</h2>
                                                <p className='text-sm text-white/70'>{t("winners.manager.description")}</p>
                                        </div>
                                </div>
                                <form onSubmit={handleSubmit} className='grid gap-4 md:grid-cols-2'>
                                        <label className='space-y-2'>
                                                <span className='text-sm font-medium text-bilady-white'>
                                                        {t("winners.manager.form.name")}
                                                </span>
                                                <input
                                                        type='text'
                                                        required
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className='w-full rounded-lg border border-bilady-indigo/40 bg-bilady-navy/60 px-3 py-2 text-white placeholder-white/40 focus:border-bilady-gold focus:outline-none focus:ring-2 focus:ring-bilady-indigo'
                                                />
                                        </label>
                                        <label className='space-y-2'>
                                                <span className='text-sm font-medium text-bilady-white'>
                                                        {t("winners.manager.form.city")}
                                                </span>
                                                <input
                                                        type='text'
                                                        required
                                                        value={city}
                                                        onChange={(e) => setCity(e.target.value)}
                                                        className='w-full rounded-lg border border-bilady-indigo/40 bg-bilady-navy/60 px-3 py-2 text-white placeholder-white/40 focus:border-bilady-gold focus:outline-none focus:ring-2 focus:ring-bilady-indigo'
                                                />
                                        </label>
                                        <label className='space-y-2'>
                                                <span className='text-sm font-medium text-bilady-white'>
                                                        {t("winners.manager.form.prizeName")}
                                                </span>
                                                <input
                                                        type='text'
                                                        required
                                                        value={prizeName}
                                                        onChange={(e) => setPrizeName(e.target.value)}
                                                        className='w-full rounded-lg border border-bilady-indigo/40 bg-bilady-navy/60 px-3 py-2 text-white placeholder-white/40 focus:border-bilady-gold focus:outline-none focus:ring-2 focus:ring-bilady-indigo'
                                                />
                                        </label>
                                        <label className='space-y-2'>
                                                <span className='text-sm font-medium text-bilady-white'>
                                                        {t("winners.manager.form.prizeImage")}
                                                </span>
                                                <input
                                                        type='url'
                                                        value={prizeImage}
                                                        onChange={(e) => setPrizeImage(e.target.value)}
                                                        placeholder={t("winners.manager.form.prizeImageHint")}
                                                        className='w-full rounded-lg border border-bilady-indigo/40 bg-bilady-navy/60 px-3 py-2 text-white placeholder-white/40 focus:border-bilady-gold focus:outline-none focus:ring-2 focus:ring-bilady-indigo'
                                                />
                                        </label>

                                        <div className='md:col-span-2 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm text-white/80'>
                                                <div className='flex items-center gap-2'>
                                                        {isEditing ? (
                                                                <>
                                                                        <span className='rounded-full bg-bilady-gold/20 px-3 py-1 text-bilady-gold'>
                                                                                {t("common.actions.edit")}
                                                                        </span>
                                                                        <span>{selectedWinner?.name}</span>
                                                                </>
                                                        ) : (
                                                                <>
                                                                        <Plus size={16} />
                                                                        <span>{t("winners.manager.form.addLabel")}</span>
                                                                </>
                                                        )}
                                                </div>
                                                {isEditing && (
                                                        <button
                                                                type='button'
                                                                onClick={clearSelectedWinner}
                                                                className='rounded-full bg-white/10 px-3 py-2 text-bilady-white transition hover:bg-white/20'
                                                        >
                                                                {t("prizes.manager.form.cancelEdit")}
                                                        </button>
                                                )}
                                        </div>

                                        <div className='md:col-span-2'>
                                                <button
                                                        type='submit'
                                                        disabled={loading}
                                                        className='inline-flex w-full items-center justify-center gap-2 rounded-lg bg-bilady-gold px-4 py-3 text-base font-bold text-bilady-navy shadow-lg shadow-bilady-gold/30 transition hover:bg-bladi-yellow disabled:cursor-not-allowed disabled:opacity-70'
                                                >
                                                        {loading
                                                                ? t("common.loading")
                                                                : isEditing
                                                                        ? t("winners.manager.form.update")
                                                                        : t("winners.manager.form.submit")}
                                                </button>
                                        </div>
                                </form>
                        </div>

                        <div className='rounded-xl border border-bilady-indigo/40 bg-white/5 p-6 shadow-lg backdrop-blur-sm'>
                                <div className='mb-4 flex items-center justify-between'>
                                        <div>
                                                <h3 className='text-xl font-semibold text-bilady-gold'>{t("winners.manager.list.title")}</h3>
                                                <p className='text-sm text-white/70'>{t("winners.manager.list.subtitle")}</p>
                                        </div>
                                </div>
                                {loading && winners.length === 0 ? (
                                        <p className='text-white/70'>{t("winners.manager.list.loading")}</p>
                                ) : winners.length === 0 ? (
                                        <p className='text-white/70'>{t("winners.manager.list.empty")}</p>
                                ) : (
                                        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                                                {winners.map((winner) => (
                                                        <div
                                                                key={winner._id}
                                                                className='flex flex-col gap-3 rounded-2xl bg-white/80 p-4 text-bilady-navy shadow-lg shadow-black/10'
                                                        >
                                                                <div className='flex items-center justify-between'>
                                                                        <div className='flex items-center gap-3'>
                                                                                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-bilady-gold to-bilady-indigo text-lg font-bold text-bilady-navy shadow-inner shadow-black/10'>
                                                                                        {winner.name?.charAt(0) || <Crown size={18} />}
                                                                                </div>
                                                                                <div>
                                                                                        <p className='text-base font-semibold'>{winner.name}</p>
                                                                                        <div className='flex items-center gap-1 text-xs text-bilady-navy/70'>
                                                                                                <MapPin size={14} />
                                                                                                <span>{winner.city}</span>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                        <div className='flex gap-2'>
                                                                                <button
                                                                                        type='button'
                                                                                        onClick={() => setSelectedWinner(winner)}
                                                                                        className='rounded-full bg-white/80 p-2 text-bilady-indigo shadow hover:bg-white'
                                                                                >
                                                                                        <Pencil size={16} />
                                                                                </button>
                                                                                <button
                                                                                        type='button'
                                                                                        onClick={() => deleteWinner(winner._id)}
                                                                                        className='rounded-full bg-white/80 p-2 text-bilady-indigo shadow hover:bg-white'
                                                                                >
                                                                                        <Trash2 size={16} />
                                                                                </button>
                                                                        </div>
                                                                </div>
                                                                <div className='rounded-xl bg-bilady-gold/15 px-3 py-2 text-sm font-semibold text-bilady-navy'>
                                                                        {winner.prizeName}
                                                                </div>
                                                                {winner.prizeImage && (
                                                                        <div className='overflow-hidden rounded-xl border border-white/40 bg-white'>
                                                                                <img
                                                                                        src={winner.prizeImage}
                                                                                        alt={winner.prizeName}
                                                                                        className='h-32 w-full object-cover'
                                                                                />
                                                                        </div>
                                                                )}
                                                        </div>
                                                ))}
                                        </div>
                                )}
                        </div>
                </div>
        );
};

export default WinnersManager;
