import { useEffect, useMemo, useState } from "react";
import { CalendarClock, RefreshCcw } from "lucide-react";
import useDrawStore from "../stores/useDrawStore";

const toInputDate = (dateValue) => {
        if (!dateValue) return "";
        const date = new Date(dateValue);
        if (Number.isNaN(date.getTime())) return "";
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, "0");
        const day = `${date.getDate()}`.padStart(2, "0");
        return `${year}-${month}-${day}`;
};

const toInputTime = (dateValue) => {
        if (!dateValue) return "";
        const date = new Date(dateValue);
        if (Number.isNaN(date.getTime())) return "";
        const hours = `${date.getHours()}`.padStart(2, "0");
        const minutes = `${date.getMinutes()}`.padStart(2, "0");
        return `${hours}:${minutes}`;
};

const DrawScheduleForm = () => {
        const { fetchNextDraw, nextDrawAt, updateNextDraw, loading, updating } = useDrawStore();
        const [date, setDate] = useState("");
        const [time, setTime] = useState("");

        useEffect(() => {
                fetchNextDraw();
        }, [fetchNextDraw]);

        useEffect(() => {
                setDate(toInputDate(nextDrawAt));
                setTime(toInputTime(nextDrawAt));
        }, [nextDrawAt]);

        const nextDrawLabel = useMemo(() => {
                if (!nextDrawAt) return "لم يتم تحديد الموعد بعد";
                const dateObj = new Date(nextDrawAt);
                if (Number.isNaN(dateObj.getTime())) return "لم يتم تحديد الموعد بعد";
                return dateObj.toLocaleString("ar-MR", {
                        dateStyle: "full",
                        timeStyle: "short",
                });
        }, [nextDrawAt]);

        const handleSubmit = async (e) => {
                e.preventDefault();
                await updateNextDraw({ nextDrawDate: date, nextDrawTime: time });
        };

        return (
                <div className='rounded-2xl bg-white/10 p-6 shadow-xl shadow-black/30 ring-1 ring-white/15'>
                        <div className='mb-4 flex items-center gap-3 text-payzone-gold'>
                                <CalendarClock size={28} />
                                <div>
                                        <h2 className='text-xl font-bold text-payzone-white'>جدولة موعد السحب</h2>
                                        <p className='text-sm text-white/75'>تحكم في تاريخ ووقت السحب القادم لتحديث العد التنازلي في الصفحة الرئيسية.</p>
                                </div>
                        </div>
                        <form onSubmit={handleSubmit} className='grid gap-4 md:grid-cols-2'>
                                <label className='space-y-2'>
                                        <span className='block text-sm font-semibold text-payzone-white'>تاريخ السحب</span>
                                        <input
                                                type='date'
                                                required
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                className='w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-payzone-white outline-none transition focus:border-payzone-gold focus:bg-white/15'
                                        />
                                </label>
                                <label className='space-y-2'>
                                        <span className='block text-sm font-semibold text-payzone-white'>وقت السحب</span>
                                        <input
                                                type='time'
                                                required
                                                value={time}
                                                onChange={(e) => setTime(e.target.value)}
                                                className='w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-payzone-white outline-none transition focus:border-payzone-gold focus:bg-white/15'
                                        />
                                </label>
                                <div className='md:col-span-2 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm text-white/80'>
                                        <div className='flex items-center gap-2'>
                                                <span className='rounded-full bg-payzone-gold/20 px-3 py-1 text-payzone-gold'>الموعد الحالي</span>
                                                <span>{loading ? "جاري التحميل..." : nextDrawLabel}</span>
                                        </div>
                                        <button
                                                type='button'
                                                onClick={fetchNextDraw}
                                                className='flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-payzone-white transition hover:bg-white/20'
                                        >
                                                <RefreshCcw size={18} />
                                                تحديث
                                        </button>
                                </div>
                                <div className='md:col-span-2'>
                                        <button
                                                type='submit'
                                                disabled={updating}
                                                className='w-full rounded-lg bg-payzone-gold px-4 py-3 text-base font-bold text-payzone-navy shadow-lg shadow-payzone-gold/30 transition hover:bg-bladi-yellow disabled:cursor-not-allowed disabled:opacity-70'
                                        >
                                                {updating ? "يتم الحفظ..." : "حفظ موعد السحب"}
                                        </button>
                                </div>
                        </form>
                </div>
        );
};

export default DrawScheduleForm;
