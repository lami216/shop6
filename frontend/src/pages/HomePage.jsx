import { useEffect, useMemo, useState } from "react";
import { ShoppingBag, CreditCard, Gift, Trophy, CalendarClock } from "lucide-react";
import useDrawStore from "../stores/useDrawStore";
import { usePrizeStore } from "../stores/usePrizeStore";
import { useWinnerStore } from "../stores/useWinnerStore";

const HomePage = () => {
        const { prizes, fetchPrizes, loading: prizesLoading } = usePrizeStore();
        const { fetchNextDraw, nextDrawAt, liveStreamUrl, loading: drawLoading } = useDrawStore();
        const { winners, fetchWinners, loading: winnersLoading } = useWinnerStore();
        const [timeLeft, setTimeLeft] = useState(null);

        const formattedNextDraw = useMemo(() => {
                if (!nextDrawAt) return null;
                const dateObj = new Date(nextDrawAt);
                if (Number.isNaN(dateObj.getTime())) return null;
                return dateObj.toLocaleString("ar-MR", {
                        dateStyle: "full",
                        timeStyle: "short",
                });
        }, [nextDrawAt]);

        useEffect(() => {
                fetchPrizes();
                fetchNextDraw();
                fetchWinners();
        }, [fetchPrizes, fetchNextDraw, fetchWinners]);

        useEffect(() => {
                if (!nextDrawAt) {
                        setTimeLeft(null);
                        return;
                }

                const targetDate = new Date(nextDrawAt);
                if (Number.isNaN(targetDate.getTime())) {
                        setTimeLeft(null);
                        return;
                }

                const updateCountdown = () => {
                        const diff = targetDate.getTime() - Date.now();

                        if (diff <= 0) {
                                setTimeLeft({ expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 });
                                return;
                        }

                        const totalSeconds = Math.floor(diff / 1000);
                        const days = Math.floor(totalSeconds / 86400);
                        const hours = Math.floor((totalSeconds % 86400) / 3600);
                        const minutes = Math.floor((totalSeconds % 3600) / 60);
                        const seconds = totalSeconds % 60;

                        setTimeLeft({ expired: false, days, hours, minutes, seconds });
                };

                updateCountdown();
                const interval = setInterval(updateCountdown, 1000);
                return () => clearInterval(interval);
        }, [nextDrawAt]);

        const getCoverImage = (prize) => {
                if (prize.imageUrl) return prize.imageUrl;
                if (prize.image) return prize.image;
                if (Array.isArray(prize.images) && prize.images.length > 0) {
                        const [firstImage] = prize.images;
                        if (typeof firstImage === "string") return firstImage;
                        return firstImage?.url || "";
                }
                return "";
        };

        const countdownValues = timeLeft && !timeLeft.expired
                ? timeLeft
                : { days: 0, hours: 0, minutes: 0, seconds: 0 };

        const hasLiveStream = Boolean(liveStreamUrl);

        return (
                <div className='relative min-h-screen overflow-hidden text-bilady-white'>
                        <div className='pointer-events-none absolute inset-0 opacity-40'>
                                <div className='absolute -left-10 top-10 h-40 w-40 rounded-full bg-bilady-gold blur-3xl'></div>
                                <div className='absolute bottom-0 right-0 h-64 w-64 rounded-full bg-bilady-indigo/60 blur-3xl'></div>
                        </div>

                        <section
                                id='hero'
                                className='relative overflow-hidden bg-gradient-to-l from-[#0f5f45]/85 via-[#134e3b]/70 to-[#0b3f2f]/90 px-4 pb-16 pt-28 shadow-inner shadow-black/30 sm:px-6 sm:pt-12 lg:px-8 lg:pt-14'
                        >
                                <div className='absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,rgba(242,199,69,0.28),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(216,30,47,0.22),transparent_32%)]' />
                                <div className='relative mx-auto max-w-6xl'>
                                        <div className='grid items-center gap-10 lg:grid-cols-2'>
                                                <div className='space-y-6'>
                                                        <div className='inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-bilady-gold shadow-inner shadow-black/20'>
                                                                بلادي • هدايا وطنية مع دخول مجاني للسحب
                                                        </div>
                                                        <h1 className='text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl'>
                                                                شارك مع بلادي واحصل على بطاقة سحب مجانية عند شراء بوكس بلادي
                                                        </h1>
                                                        <p className='max-w-2xl text-lg text-white/85'>
                                                                بوكس بلادي مليء بالهدايا والمنتجات الوطنية، ومع كل بوكس تحصل على بطاقة دخول السحب بدون أي تكلفة إضافية لتكون ضمن الفائزين بالقائمة التالية من الجوائز.
                                                        </p>
                                                        <div className='flex flex-wrap items-center gap-4'>
                                                                <a
                                                                        href='#box'
                                                                        className='rounded-full bg-bilady-gold px-6 py-3 text-lg font-bold text-bilady-navy shadow-lg shadow-bilady-gold/40 transition hover:scale-105 hover:bg-bladi-yellow'
                                                                >
                                                                        اشتر بوكس بلادي الآن
                                                                </a>
                                                                <a
                                                                        href='#prizes'
                                                                        className='rounded-full border border-white/30 px-6 py-3 text-lg font-semibold text-bilady-white transition hover:border-bilady-gold hover:text-bilady-gold'
                                                                >
                                                                        تصفح جوائز السحب
                                                                </a>
                                                        </div>
                                                        <div className='flex flex-wrap items-center gap-4 text-sm text-white/80'>
                                                                <span className='flex items-center gap-2 rounded-full bg-white/10 px-3 py-2'>
                                                                        <Gift size={18} />
                                                                        بطاقة السحب تأتي مع البوكس مجاناً
                                                                </span>
                                                                <span className='flex items-center gap-2 rounded-full bg-white/10 px-3 py-2'>
                                                                        <Trophy size={18} />
                                                                        هدايا موريتانية في كل طلب
                                                                </span>
                                                        </div>
                                                </div>

                                                <div className='relative'>
                                                        <div className='absolute inset-0 -z-10 bg-gradient-to-br from-bilady-gold/15 via-transparent to-bilady-indigo/20 blur-3xl'></div>
                                                        <div className='relative mx-auto flex h-[380px] w-[380px] items-center justify-center rounded-full bg-gradient-to-br from-[#0f5f45] via-[#0c3f30] to-[#0d4a35] p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] sm:h-[420px] sm:w-[420px]'>
                                                                <div className='absolute inset-6 rounded-[40px] bg-gradient-to-br from-bilady-gold via-bladi-yellow to-bilady-indigo opacity-70 blur-2xl'></div>
                                                                <div className='relative h-full w-full rounded-[32px] bg-gradient-to-br from-bladi-cream via-bilady-white to-bladi-yellow/60 p-6 shadow-2xl shadow-black/40'>
                                                                        <div className='absolute -left-4 top-8 h-6 w-1/2 rounded-r-full bg-bilady-gold/60 blur-sm' />
                                                                        <div className='absolute -right-4 bottom-8 h-6 w-1/2 rounded-l-full bg-bilady-indigo/50 blur-sm' />
                                                                        <div className='flex h-full w-full flex-col items-center justify-center rounded-[24px] bg-gradient-to-br from-[#0f5f45]/85 via-[#0c382b] to-[#0f5f45]/90 text-center shadow-inner shadow-black/30'>
                                                                                <span className='rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-bilady-gold'>بوكس بلادي</span>
                                                                                <h3 className='mt-4 text-2xl font-extrabold text-bilady-white'>هديتك الذهبية</h3>
                                                                                <p className='mt-2 max-w-xs text-sm text-white/80'>
                                                                                        هدية وطنية متكاملة تحمل منتجات بلادي وتمنحك بطاقة سحب مجانية ضمن الجوائز المعروضة أدناه.
                                                                                </p>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        <section id='prizes' className='relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8'>
                                <div className='mb-10 flex flex-col gap-4 text-center'>
                                        <span className='mx-auto w-fit rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-bilady-gold shadow-inner shadow-black/20'>جوائز السحب</span>
                                        <h2 className='text-3xl font-bold sm:text-4xl'>الجوائز التي يمكن الفوز بها مع بطاقة بلادي</h2>
                                        <p className='text-white/80'>
                                                البوكس الذي تشتريه هو هدية وطنية بحد ذاته، وكل بطاقة سحب مجانية مرافقة له تخولك لربح إحدى الجوائز المعروضة هنا دون أي خطوات إضافية.
                                        </p>
                                </div>

                                <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                                        {prizesLoading && (
                                                <div className='col-span-full text-center text-white/70'>يتم تحميل الجوائز...</div>
                                        )}
                                        {!prizesLoading && prizes.length === 0 && (
                                                <div className='col-span-full text-center text-white/70'>لا توجد جوائز حالية، عُد لاحقًا لاكتشاف الإضافات الجديدة.</div>
                                        )}
                                        {prizes.map((prize) => {
                                                const coverImage = getCoverImage(prize);
                                                return (
                                                        <div
                                                                key={prize._id}
                                                                className='group relative h-64 overflow-hidden rounded-2xl shadow-xl shadow-black/15 ring-1 ring-bladi-green/15 transition duration-300 hover:-translate-y-1 hover:shadow-2xl'
                                                        >
                                                                <div className='absolute inset-0 bg-gradient-to-br from-[#0f5f45]/35 via-[#0b3f2f]/45 to-[#0f5f45]/35'>
                                                                        {coverImage ? (
                                                                                <img
                                                                                        src={coverImage}
                                                                                        alt={prize.name}
                                                                                        className='h-full w-full object-cover opacity-95 transition duration-500 group-hover:scale-105'
                                                                                />
                                                                        ) : (
                                                                                <div className='flex h-full w-full items-center justify-center text-sm font-semibold text-white/80'>صورة الجائزة</div>
                                                                        )}
                                                                </div>
                                                                <div className='absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent' />
                                                                <div className='absolute inset-x-0 bottom-0'>
                                                                        <div className='bg-gradient-to-t from-black/75 via-black/45 to-transparent px-5 py-4 backdrop-blur-[2px]'>
                                                                                <h3 className='text-xl font-bold text-white drop-shadow-md'>{prize.name}</h3>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                );
                                        })}
                                </div>
                        </section>

                        <section id='box' className='relative overflow-hidden bg-gradient-to-l from-bilady-indigo/8 via-bilady-navy/18 to-bladi-green/30 py-16'>
                                <div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(242,199,69,0.2),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(216,30,47,0.14),transparent_35%)]'></div>
                                <div className='relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8'>
                                        <div className='flex-1 space-y-4 text-center lg:text-right'>
                                                <h3 className='text-3xl font-bold text-bilady-white'>ما هو بوكس بلادي؟</h3>
                                                <p className='text-white/85'>
                                                        هدية متكاملة تحمل منتجات وهدايا موريتانية مختارة بعناية، وتأتي معها بطاقة سحب مجانية فور الشراء. الجوائز المعروضة في القسم التالي هي ما يمكنك الفوز به مع البطاقة المرافقة للبوكس.
                                                </p>
                                                <div className='overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-inner shadow-black/20'>
                                                        <img
                                                                src='/uploads/box-bladi-info.jpg'
                                                                alt='صورة توضيحية لبوكس بلادي'
                                                                className='h-full w-full object-cover'
                                                        />
                                                </div>
                                        </div>
                                </div>
                        </section>

                        <section id='how' className='relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8'>
                                <div className='mb-8 text-center'>
                                        <span className='rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-bilady-gold shadow-inner shadow-black/20'>كيف تشارك في السحب؟</span>
                                        <h3 className='mt-4 text-3xl font-bold'>خطوات بسيطة لتكون ضمن الفائزين</h3>
                                        <p className='mt-2 text-white/75'>
                                                ثلاث أو أربع خطوات سريعة تقودك إلى المشاركة مع بلادي دون أي تعقيد.
                                        </p>
                                </div>
                                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                                        {[
                                                { title: "اختر منتجًا أو بوكس بلادي", icon: <ShoppingBag size={24} />, desc: "تصفح الجوائز واختر ما يعجبك." },
                                                { title: "أكمل بياناتك", icon: <Gift size={24} />, desc: "أدخل معلومات التوصيل والدفع بسهولة." },
                                                { title: "ادفع واستلم منتجك", icon: <CreditCard size={24} />, desc: "عملية دفع آمنة وسريعة مع شحن فوري." },
                                                { title: "تابع نتائج السحب", icon: <Trophy size={24} />, desc: "راقب إعلان الفائزين واستعد للاحتفال." },
                                        ].map((step, index) => (
                                                <div
                                                        key={step.title}
                                                        className='flex flex-col gap-3 rounded-2xl bg-white/75 p-5 text-center text-bilady-navy shadow-lg shadow-black/15 ring-1 ring-bladi-green/15'
                                                >
                                                        <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-bilady-gold to-bilady-indigo text-bilady-navy shadow-lg shadow-black/30'>
                                                                {step.icon}
                                                        </div>
                                                        <h4 className='text-lg font-bold'>
                                                                <span className='text-bilady-gold'>0{index + 1}.</span> {step.title}
                                                        </h4>
                                                        <p className='text-sm text-bilady-navy/75'>{step.desc}</p>
                                                </div>
                                        ))}
                                </div>
                        </section>

                        <section className='mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8'>
                                <div className='relative overflow-hidden rounded-3xl bg-white/85 text-bilady-navy shadow-2xl shadow-black/20 ring-1 ring-bladi-green/15'>
                                        <div className='absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_15%_30%,rgba(242,199,69,0.2),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(216,30,47,0.12),transparent_35%)]' />
                                        <div className='relative grid gap-8 p-8 lg:grid-cols-[1.2fr_1fr] lg:items-center'>
                                                <div className='space-y-3'>
                                                        <span className='inline-flex items-center gap-2 rounded-full bg-bilady-gold/15 px-4 py-2 text-sm font-semibold text-bilady-navy'>
                                                                <CalendarClock size={18} /> موعد السحب القادم
                                                        </span>
                                                        <h3 className='text-3xl font-bold text-bilady-navy'>عد تنازلي حتى السحب القادم</h3>
                                                        <p className='text-bilady-navy/80'>
                                                                العد التنازلي يعتمد على التاريخ والوقت المحددين من لوحة التحكم. عند شراء بوكس بلادي تحصل على بطاقة سحب مجانية صالحة لهذا الموعد.
                                                        </p>
                                                        <div className='rounded-2xl border border-bladi-green/20 bg-white/70 px-4 py-3 text-sm font-semibold text-bilady-navy'>
                                                                {drawLoading ? "يتم تحميل موعد السحب..." : formattedNextDraw || "سيتم الإعلان عن موعد السحب القادم قريباً"}
                                                        </div>
                                                </div>
                                                <div className='grid grid-cols-2 gap-3 text-center sm:grid-cols-4'>
                                                        {[
                                                                { label: "الأيام", value: countdownValues.days },
                                                                { label: "الساعات", value: countdownValues.hours },
                                                                { label: "الدقائق", value: countdownValues.minutes },
                                                                { label: "الثواني", value: countdownValues.seconds },
                                                        ].map((item) => (
                                                                <div
                                                                        key={item.label}
                                                                        className='rounded-2xl border border-bladi-green/25 bg-white/80 px-4 py-5 shadow-inner shadow-black/5'
                                                                >
                                                                        <div className='text-3xl font-black text-bilady-navy'>{String(item.value || 0).padStart(2, "0")}</div>
                                                                        <div className='mt-2 text-xs font-semibold text-bilady-navy/70'>{item.label}</div>
                                                                </div>
                                                        ))}
                                                </div>
                                        </div>
                                        <div className='relative border-t border-bladi-green/15 bg-bilady-gold/10 px-8 py-4 text-sm font-semibold text-bilady-navy'>
                                                {timeLeft?.expired
                                                        ? "تم الوصول إلى وقت السحب الحالي. سيتم الإعلان عن سحب جديد قريباً."
                                                        : nextDrawAt
                                                                ? "تذكير: بطاقة السحب مجانية مع بوكس بلادي، والعد التنازلي يتحدث تلقائياً."
                                                                : "ترقب الإعلان عن موعد السحب لتفعيل العد التنازلي."}
                                        </div>
                                </div>
                        </section>

                        <section id='winners' className='relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8'>
                                <div className='mb-8 text-center'>
                                        <span className='rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-bilady-gold shadow-inner shadow-black/20'>الفائزون السابقون</span>
                                        <h3 className='mt-4 text-3xl font-bold'>أسماء حصدت جوائز بلادي</h3>
                                        <p className='mt-2 text-white/75'>عينات من الفائزين الذين احتفلوا معنا مؤخرًا.</p>
                                </div>
                                {winnersLoading && winners.length === 0 && (
                                        <p className='text-center text-white/70'>يتم تحميل قائمة الفائزين...</p>
                                )}
                                {!winnersLoading && winners.length === 0 && (
                                        <p className='text-center text-white/70'>سيتم الإعلان عن الفائزين هنا فور إدخالهم من لوحة التحكم.</p>
                                )}
                                {winners.length > 0 && (
                                        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                                                {winners.map((winner) => (
                                                        <div
                                                                key={winner._id}
                                                                className='flex flex-col gap-3 rounded-2xl bg-white/80 p-4 text-bilady-navy shadow-lg shadow-black/15 ring-1 ring-bladi-green/15'
                                                        >
                                                                <div className='space-y-1'>
                                                                        <p className='text-lg font-extrabold text-bilady-navy'>{winner.name}</p>
                                                                        <p className='text-sm font-medium text-bilady-navy/70'>{winner.city}</p>
                                                                </div>
                                                                <div className='flex items-center justify-start'>
                                                                        <span className='inline-flex items-center gap-2 rounded-full bg-bilady-gold/20 px-3 py-1 text-sm font-semibold text-bilady-navy shadow-inner shadow-bilady-gold/20'>
                                                                                {winner.prizeName}
                                                                        </span>
                                                                </div>
                                                        </div>
                                                ))}
                                        </div>
                                )}
                        </section>

                        <section id='contact' className='mx-auto max-w-6xl rounded-3xl bg-white/85 px-6 py-12 text-center text-bilady-navy shadow-2xl shadow-black/20 ring-1 ring-bladi-green/15'>
                                <h3 className='text-3xl font-bold text-bilady-navy'>شفافية السحب</h3>
                                <p className='mt-4 text-bilady-navy/80'>
                                        تتم السحوبات بطريقة عشوائية وواضحة أمام الجمهور، مع إمكانية متابعة البث المباشر عند الإعلان. نحرص على إبلاغك بنتيجة مشاركتك فورًا لضمان ثقتك الكاملة.
                                </p>
                                <a
                                        className='mt-6 inline-flex items-center justify-center rounded-full bg-bilady-gold px-6 py-3 text-lg font-semibold text-bilady-navy shadow-lg shadow-bilady-gold/40 transition hover:bg-bladi-yellow'
                                        href={hasLiveStream ? liveStreamUrl : "#"}
                                        target={hasLiveStream ? "_blank" : undefined}
                                        rel={hasLiveStream ? "noreferrer" : undefined}
                                        aria-disabled={!hasLiveStream}
                                        onClick={(e) => {
                                                if (!hasLiveStream) e.preventDefault();
                                        }}
                                        style={!hasLiveStream ? { opacity: 0.6, cursor: "not-allowed" } : undefined}
                                >
                                        {hasLiveStream ? "رابط البث المباشر" : "سيتم إضافة رابط البث قريباً"}
                                </a>
                        </section>
                </div>
        );
};
export default HomePage;
