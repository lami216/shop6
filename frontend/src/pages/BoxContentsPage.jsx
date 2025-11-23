import { useEffect } from "react";
import { PackageOpen, VideoIcon, Image as ImageIcon } from "lucide-react";
import { useBoxContentStore } from "../stores/useBoxContentStore";

const WHATSAPP_NUMBER = "22244455666";
const WHATSAPP_MESSAGE = encodeURIComponent("السلام عليكم أود شراء بوكس بلادي");

const renderCardMedia = (content) => {
        if (content.mediaType === "video") {
                return (
                        <div className='relative aspect-[4/3] overflow-hidden rounded-xl bg-black/30'>
                                <video
                                        src={content.mediaUrl}
                                        className='h-full w-full object-cover'
                                        controls
                                        playsInline
                                />
                                <div className='pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white'>
                                        <VideoIcon className='h-4 w-4' />
                                        <span>فيديو</span>
                                </div>
                        </div>
                );
        }

        return (
                <div className='relative aspect-[4/3] overflow-hidden rounded-xl bg-black/30'>
                        <img src={content.mediaUrl} alt={content.name} className='h-full w-full object-cover' />
                        <div className='pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white'>
                                <ImageIcon className='h-4 w-4' />
                                <span>صورة</span>
                        </div>
                </div>
        );
};

const BoxContentsPage = () => {
        const { boxContents, fetchBoxContents, loading } = useBoxContentStore();

        useEffect(() => {
                        fetchBoxContents();
        }, [fetchBoxContents]);

        return (
                <div className='relative min-h-screen overflow-hidden pb-16 text-bilady-white'>
                        <div className='pointer-events-none absolute inset-0 opacity-50'>
                                <div className='absolute -left-20 top-10 h-64 w-64 rounded-full bg-bilady-gold/40 blur-3xl'></div>
                                <div className='absolute bottom-0 right-0 h-80 w-80 rounded-full bg-bilady-indigo/40 blur-3xl'></div>
                        </div>
                        <div className='relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pt-10 sm:px-6 lg:px-8'>
                                <div className='rounded-3xl border border-bilady-indigo/30 bg-gradient-to-l from-[#0f5f45]/85 via-[#0b3f2f]/85 to-[#0f5f45]/90 p-8 shadow-2xl shadow-black/30'>
                                        <div className='flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-right'>
                                                <div className='space-y-3'>
                                                        <div className='inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-bilady-gold shadow-inner shadow-black/20'>
                                                                <PackageOpen className='h-5 w-5' />
                                                                محتويات بوكس بلادي
                                                        </div>
                                                        <h1 className='text-3xl font-extrabold sm:text-4xl'>اكتشف ما ينتظرك داخل البوكس</h1>
                                                        <p className='max-w-3xl text-white/80'>
                                                                جميع العناصر المعروضة هنا يتم إضافتها من لوحة التحكم وتأتيك مع بوكس بلادي كما هي، مع صور أو فيديوهات حقيقية لكل محتوى.
                                                        </p>
                                                </div>
                                        </div>
                                </div>

                                <div className='rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-sm'>
                                        {loading && boxContents.length === 0 && (
                                                <p className='text-center text-white/80'>يتم تحميل محتويات البوكس...</p>
                                        )}
                                        {!loading && boxContents.length === 0 && (
                                                <p className='text-center text-white/80'>لا توجد محتويات لعرضها حالياً.</p>
                                        )}
                                        {boxContents.length > 0 && (
                                                <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                                                        {boxContents.map((content) => (
                                                                <div
                                                                        key={content._id}
                                                                        className='flex flex-col gap-3 rounded-2xl border border-white/10 bg-bilady-navy/50 p-4 shadow-lg shadow-black/25'
                                                                >
                                                                        {renderCardMedia(content)}
                                                                        <h3 className='text-lg font-bold text-white'>{content.name}</h3>
                                                                </div>
                                                        ))}
                                                </div>
                                        )}
                                </div>

                                <div className='flex justify-center'>
                                        <a
                                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                                                target='_blank'
                                                rel='noreferrer'
                                                className='inline-flex items-center justify-center rounded-full bg-bilady-gold px-10 py-3 text-lg font-bold text-bilady-navy shadow-xl shadow-bilady-gold/40 transition hover:scale-105 hover:bg-bladi-yellow'
                                        >
                                                اشتري البوكس الآن
                                        </a>
                                </div>
                        </div>
                </div>
        );
};

export default BoxContentsPage;
