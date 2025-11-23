import { useEffect, useState } from "react";
import { ImagePlus, Save, Trash2, Upload, Video, X, Edit3 } from "lucide-react";
import toast from "react-hot-toast";
import useTranslation from "../hooks/useTranslation";
import { useBoxContentStore } from "../stores/useBoxContentStore";

const createEmptyForm = () => ({
        name: "",
        media: "",
        preview: "",
        mediaChanged: false,
});

const renderMediaPreview = (url, type) => {
        if (!url) return null;

        if (type === "video") {
                return (
                        <video
                                src={url}
                                className='h-24 w-24 rounded-lg object-cover'
                                controls
                                playsInline
                                muted
                        />
                );
        }

        return <img src={url} alt='معاينة المحتوى' className='h-24 w-24 rounded-lg object-cover' />;
};

const BoxContentsManager = () => {
        const {
                boxContents,
                selectedBoxContent,
                setSelectedBoxContent,
                clearSelectedBoxContent,
                fetchBoxContents,
                createBoxContent,
                updateBoxContent,
                deleteBoxContent,
                loading,
        } = useBoxContentStore();
        const { t } = useTranslation();

        const [formState, setFormState] = useState(() => createEmptyForm());

        useEffect(() => {
                fetchBoxContents();
        }, [fetchBoxContents]);

        useEffect(() => {
                if (!selectedBoxContent) {
                        setFormState(createEmptyForm());
                        return;
                }

                setFormState({
                        name: selectedBoxContent.name ?? "",
                        media: "",
                        preview: selectedBoxContent.mediaUrl ?? "",
                        mediaChanged: false,
                });
        }, [selectedBoxContent]);

        const handleMediaChange = (event) => {
                const file = event.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = () => {
                        const result = typeof reader.result === "string" ? reader.result : "";
                        setFormState((previous) => ({
                                ...previous,
                                media: result,
                                preview: result,
                                mediaChanged: true,
                        }));
                };
                reader.readAsDataURL(file);
                event.target.value = "";
        };

        const handleSubmit = async (event) => {
                event.preventDefault();
                const trimmedName = formState.name.trim();

                if (!trimmedName) {
                        toast.error(t("boxContents.manager.form.nameRequired"));
                        return;
                }

                if (!selectedBoxContent && !formState.media) {
                        toast.error(t("boxContents.manager.form.mediaRequired"));
                        return;
                }

                const payload = { name: trimmedName };

                if (formState.media && (formState.mediaChanged || !selectedBoxContent)) {
                        payload.media = formState.media;
                }

                try {
                        if (selectedBoxContent) {
                                await updateBoxContent(selectedBoxContent._id, payload);
                        } else {
                                await createBoxContent(payload);
                        }
                        clearSelectedBoxContent();
                        setFormState(createEmptyForm());
                } catch (error) {
                        console.error("Failed to save box content", error);
                }
        };

        const handleEdit = (content) => setSelectedBoxContent(content);

        const handleDelete = (content) => {
                if (globalThis.window?.confirm(t("boxContents.manager.confirmDelete"))) {
                        deleteBoxContent(content._id);
                }
        };

        const handleCancelEdit = () => {
                clearSelectedBoxContent();
                setFormState(createEmptyForm());
        };

        return (
                <div className='mx-auto mb-12 max-w-5xl space-y-8'>
                        <div className='rounded-xl border border-bilady-indigo/40 bg-white/5 p-6 shadow-lg backdrop-blur-sm'>
                                <div className='mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                                        <div>
                                                <h2 className='text-2xl font-semibold text-bilady-gold'>
                                                        {t("boxContents.manager.title")}
                                                </h2>
                                                <p className='text-sm text-white/70'>
                                                        {t("boxContents.manager.description")}
                                                </p>
                                        </div>
                                        {selectedBoxContent && (
                                                <button
                                                        type='button'
                                                        className='inline-flex items-center gap-2 rounded-md border border-bilady-indigo/40 px-3 py-1 text-sm text-white transition hover:border-bilady-gold'
                                                        onClick={handleCancelEdit}
                                                >
                                                        <X className='h-4 w-4' />
                                                        {t("boxContents.manager.form.cancelEdit")}
                                                </button>
                                        )}
                                </div>

                                <form onSubmit={handleSubmit} className='space-y-6'>
                                        <div className='grid gap-4 sm:grid-cols-[1.5fr_1fr] sm:items-center'>
                                                <div>
                                                        <label className='block text-sm font-medium text-white/80' htmlFor='box-content-name'>
                                                                {t("boxContents.manager.form.name")}
                                                        </label>
                                                        <input
                                                                id='box-content-name'
                                                                type='text'
                                                                className='mt-1 block w-full rounded-md border border-bilady-indigo/40 bg-bilady-navy/60 px-3 py-2 text-white focus:border-bilady-gold focus:outline-none focus:ring-2 focus:ring-bilady-indigo'
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
                                                                {t("boxContents.manager.form.media")}
                                                        </label>
                                                        <div className='mt-1 flex items-center gap-3'>
                                                                <input
                                                                        type='file'
                                                                        id='box-content-media'
                                                                        accept='image/*,video/*'
                                                                        className='sr-only'
                                                                        onChange={handleMediaChange}
                                                                />
                                                                <label
                                                                        htmlFor='box-content-media'
                                                                        className='inline-flex cursor-pointer items-center gap-2 rounded-md border border-bilady-indigo/40 bg-bilady-navy/60 px-3 py-2 text-sm text-white transition hover:border-bilady-gold hover:bg-bilady-navy/80'
                                                                >
                                                                        <ImagePlus className='h-4 w-4' />
                                                                        {formState.preview
                                                                                ? t("boxContents.manager.form.changeMedia")
                                                                                : t("boxContents.manager.form.chooseMedia")}
                                                                </label>
                                                                {renderMediaPreview(formState.preview, selectedBoxContent?.mediaType ?? "image")}
                                                        </div>
                                                        <p className='mt-2 text-xs text-white/60'>
                                                                {t("boxContents.manager.form.mediaHint")}
                                                        </p>
                                                </div>
                                        </div>

                                        <button
                                                type='submit'
                                                className='inline-flex items-center justify-center gap-2 rounded-md bg-bilady-gold px-4 py-2 font-semibold text-bilady-navy transition hover:bg-[#b8873d] focus:outline-none focus:ring-2 focus:ring-bilady-indigo disabled:opacity-50'
                                                disabled={loading}
                                        >
                                                {selectedBoxContent ? <Save className='h-4 w-4' /> : <Upload className='h-4 w-4' />}
                                                {selectedBoxContent
                                                        ? t("boxContents.manager.form.submitUpdate")
                                                        : t("boxContents.manager.form.submitCreate")}
                                        </button>
                                </form>
                        </div>

                        <div className='rounded-xl border border-bilady-indigo/40 bg-white/5 p-6 shadow-lg backdrop-blur-sm'>
                                <h3 className='mb-4 text-xl font-semibold text-bilady-gold'>
                                        {t("boxContents.manager.list.title")}
                                </h3>
                                {boxContents.length === 0 ? (
                                        <p className='text-sm text-white/70'>
                                                {t("boxContents.manager.list.empty")}
                                        </p>
                                ) : (
                                        <ul className='grid gap-4 sm:grid-cols-2'>
                                                {boxContents.map((content) => (
                                                        <li
                                                                key={content._id}
                                                                className='flex flex-col gap-3 rounded-lg border border-white/10 bg-bilady-navy/40 p-4 shadow-inner'
                                                        >
                                                                <div className='flex items-center gap-4'>
                                                                        {renderMediaPreview(content.mediaUrl, content.mediaType)}
                                                                        <div>
                                                                                <p className='text-lg font-semibold text-white'>
                                                                                        {content.name}
                                                                                </p>
                                                                                <div className='mt-1 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/70'>
                                                                                        {content.mediaType === "video" ? <Video className='h-3 w-3' /> : <ImagePlus className='h-3 w-3' />}
                                                                                        <span>
                                                                                                {content.mediaType === "video"
                                                                                                        ? t("boxContents.manager.list.labels.video")
                                                                                                        : t("boxContents.manager.list.labels.image")}
                                                                                        </span>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                                <div className='flex items-center gap-2'>
                                                                        <button
                                                                                type='button'
                                                                                className='inline-flex items-center gap-1 rounded-md bg-white/10 px-3 py-1 text-sm text-white transition hover:bg-white/20'
                                                                                onClick={() => handleEdit(content)}
                                                                        >
                                                                                <Edit3 className='h-4 w-4' />
                                                                                {t("boxContents.manager.list.actions.edit")}
                                                                        </button>
                                                                        <button
                                                                                type='button'
                                                                                className='inline-flex items-center gap-1 rounded-md bg-red-500/20 px-3 py-1 text-sm text-red-200 transition hover:bg-red-500/30'
                                                                                onClick={() => handleDelete(content)}
                                                                        >
                                                                                <Trash2 className='h-4 w-4' />
                                                                                {t("boxContents.manager.list.actions.delete")}
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

export default BoxContentsManager;
