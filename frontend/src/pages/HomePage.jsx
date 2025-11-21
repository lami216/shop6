import { useEffect, useMemo } from "react";
import { ShoppingBag, CreditCard, Gift, Trophy, CalendarClock } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useCartStore } from "../stores/useCartStore";
import { getProductPricing } from "../lib/getProductPricing";
import { formatMRU } from "../lib/formatMRU";

const HomePage = () => {
        const { fetchAllProducts, products, loading: productsLoading } = useProductStore();
        const { addToCart } = useCartStore();

        const pastWinners = useMemo(
                () => [
                        { name: "م. أحمد", city: "نواكشوط", prize: "ساعة ذكية" },
                        { name: "س. مريم", city: "نواذيبو", prize: "بوكس بلادي" },
                        { name: "م. يوسف", city: "كيفه", prize: "إصدار محدود" },
                        { name: "ل. يحيى", city: "الزويرات", prize: "بطاقة هدايا" },
                ],
                []
        );

        useEffect(() => {
                fetchAllProducts();
        }, [fetchAllProducts]);

        const handleAddToCart = (product) => {
                const { price, discountedPrice, isDiscounted, discountPercentage } = getProductPricing(product);
                addToCart({ ...product, price, discountedPrice, isDiscounted, discountPercentage });
        };

        const getCoverImage = (product) => {
                if (product.image) return product.image;
                if (Array.isArray(product.images) && product.images.length > 0) {
                        const [firstImage] = product.images;
                        if (typeof firstImage === "string") return firstImage;
                        return firstImage?.url || "";
                }
                return "";
        };

        return (
                <div className='relative min-h-screen overflow-hidden text-payzone-white'>
                        <div className='pointer-events-none absolute inset-0 opacity-40'>
                                <div className='absolute -left-10 top-10 h-40 w-40 rounded-full bg-payzone-gold blur-3xl'></div>
                                <div className='absolute bottom-0 right-0 h-64 w-64 rounded-full bg-payzone-indigo/60 blur-3xl'></div>
                        </div>

                        <section id='hero' className='relative overflow-hidden bg-gradient-to-l from-bladi-green via-payzone-navy to-bladi-green-soft px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14'>
                                <div className='relative mx-auto max-w-6xl'>
                                        <div className='grid items-center gap-10 lg:grid-cols-2'>
                                                <div className='space-y-6'>
                                                        <div className='inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-payzone-gold shadow-inner shadow-black/20'>
                                                                سحوبات بلادي • هوية موريتانية بلمسة عصرية
                                                        </div>
                                                        <h1 className='text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl'>
                                                                شارك في سحوبات بلادي واربح منتجات مميزة
                                                        </h1>
                                                        <p className='max-w-2xl text-lg text-white/85'>
                                                                شراء أي منتج أو الحصول على بوكس بلادي يمنحك فرصة فورية للدخول في السحب القادم والفوز بجوائز مستوحاة من روح موريتانيا.
                                                        </p>
                                                        <div className='flex flex-wrap items-center gap-4'>
                                                                <a
                                                                        href='#prizes'
                                                                        className='rounded-full bg-payzone-gold px-6 py-3 text-lg font-bold text-payzone-navy shadow-lg shadow-payzone-gold/40 transition hover:scale-105 hover:bg-bladi-yellow'
                                                                >
                                                                        اشترك الآن
                                                                </a>
                                                                <a
                                                                        href='#box'
                                                                        className='rounded-full border border-white/30 px-6 py-3 text-lg font-semibold text-payzone-white transition hover:border-payzone-gold hover:text-payzone-gold'
                                                                >
                                                                        اشترِ منتجًا للمشاركة
                                                                </a>
                                                        </div>
                                                        <div className='flex flex-wrap items-center gap-4 text-sm text-white/80'>
                                                                <span className='flex items-center gap-2 rounded-full bg-white/10 px-3 py-2'>
                                                                        <Gift size={18} />
                                                                        كل طلب = فرصة في السحب
                                                                </span>
                                                                <span className='flex items-center gap-2 rounded-full bg-white/10 px-3 py-2'>
                                                                        <Trophy size={18} />
                                                                        هدايا وطنية حصرية
                                                                </span>
                                                        </div>
                                                </div>

                                                <div className='relative'>
                                                        <div className='absolute inset-0 -z-10 bg-gradient-to-br from-payzone-gold/10 via-transparent to-payzone-indigo/20 blur-3xl'></div>
                                                        <div className='relative mx-auto flex h-[380px] w-[380px] items-center justify-center rounded-full bg-gradient-to-br from-bladi-green via-payzone-navy to-bladi-green-soft p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] sm:h-[420px] sm:w-[420px]'>
                                                                <div className='absolute inset-6 rounded-[40px] bg-gradient-to-br from-payzone-gold via-bladi-yellow to-payzone-indigo opacity-80 blur-2xl'></div>
                                                                <div className='relative h-full w-full rounded-[32px] bg-gradient-to-br from-bladi-cream via-payzone-white to-bladi-yellow/70 p-6 shadow-2xl shadow-black/40'>
                                                                        <div className='absolute -left-4 top-8 h-6 w-1/2 rounded-r-full bg-payzone-gold/70 blur-sm' />
                                                                        <div className='absolute -right-4 bottom-8 h-6 w-1/2 rounded-l-full bg-payzone-indigo/60 blur-sm' />
                                                                        <div className='flex h-full w-full flex-col items-center justify-center rounded-[24px] bg-gradient-to-br from-bladi-green-soft via-bladi-green to-payzone-navy text-center shadow-inner shadow-black/30'>
                                                                                <span className='rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-payzone-gold'>بوكس بلادي</span>
                                                                                <h3 className='mt-4 text-2xl font-extrabold text-payzone-white'>هديتك الذهبية</h3>
                                                                                <p className='mt-2 max-w-xs text-sm text-white/80'>
                                                                                        صندوق بتصميم ثلاثي الأبعاد يحوي منتجات موريتانية مختارة مع فرصة دخول السحب الكبير.
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
                                        <span className='mx-auto w-fit rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-payzone-gold shadow-inner shadow-black/20'>جوائز السحب</span>
                                        <h2 className='text-3xl font-bold sm:text-4xl'>المنتجات التي تنتظرك</h2>
                                        <p className='text-white/75'>
                                                كل منتج تقتنيه يمنحك فرصة للفوز في السحب القادم. اختر ما يناسبك واستعد لمفاجآت بلادي.
                                        </p>
                                </div>

                                <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                                        {productsLoading && (
                                                <div className='col-span-full text-center text-white/70'>يتم تحميل الجوائز...</div>
                                        )}
                                        {!productsLoading && products.length === 0 && (
                                                <div className='col-span-full text-center text-white/70'>لا توجد جوائز حالية، عُد لاحقًا لاكتشاف الإضافات الجديدة.</div>
                                        )}
                                        {products.map((product) => {
                                                const { price, discountedPrice, isDiscounted, discountPercentage } = getProductPricing(product);
                                                const coverImage = getCoverImage(product);
                                                return (
                                                        <div
                                                                key={product._id}
                                                                className='group relative flex flex-col overflow-hidden rounded-2xl bg-white/5 shadow-xl shadow-black/25 ring-1 ring-white/10 transition hover:-translate-y-1 hover:ring-payzone-gold'
                                                        >
                                                                <div className='relative h-56 w-full overflow-hidden bg-gradient-to-br from-bladi-green to-payzone-navy'>
                                                                        {isDiscounted && (
                                                                                <span className='absolute right-3 top-3 z-10 rounded-full bg-payzone-indigo px-3 py-1 text-xs font-bold text-payzone-white shadow-lg'>
                                                                                        -{discountPercentage}%
                                                                                </span>
                                                                        )}
                                                                        {coverImage ? (
                                                                                <img
                                                                                        src={coverImage}
                                                                                        alt={product.name}
                                                                                        className='h-full w-full object-cover transition duration-500 group-hover:scale-110'
                                                                                />
                                                                        ) : (
                                                                                <div className='flex h-full w-full items-center justify-center text-sm text-white/70'>صورة الجائزة</div>
                                                                        )}
                                                                        <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent' />
                                                                </div>
                                                                <div className='flex flex-1 flex-col gap-3 p-5'>
                                                                        <h3 className='text-xl font-bold text-payzone-white'>{product.name}</h3>
                                                                        <p className='text-sm text-white/70 line-clamp-2'>{product.description}</p>
                                                                        <div className='flex flex-wrap items-baseline gap-2 text-lg font-bold text-payzone-gold'>
                                                                                {isDiscounted ? (
                                                                                        <>
                                                                                                <span className='text-sm text-white/60 line-through'>{formatMRU(price)}</span>
                                                                                                <span>{formatMRU(discountedPrice)}</span>
                                                                                        </>
                                                                                ) : (
                                                                                        <span>{formatMRU(price)}</span>
                                                                                )}
                                                                        </div>
                                                                        <div className='mt-auto flex items-center justify-between gap-3'>
                                                                                <a
                                                                                        href={`/products/${product._id}`}
                                                                                        className='rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-payzone-white transition hover:bg-white/20'
                                                                                >
                                                                                        تفاصيل الجائزة
                                                                                </a>
                                                                                <button
                                                                                        onClick={() => handleAddToCart(product)}
                                                                                        className='flex items-center gap-2 rounded-full bg-payzone-gold px-4 py-2 text-sm font-bold text-payzone-navy transition hover:bg-bladi-yellow'
                                                                                >
                                                                                        <ShoppingBag size={18} />
                                                                                        أضف للسلة
                                                                                </button>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                );
                                        })}
                                </div>
                        </section>

                        <section id='box' className='relative overflow-hidden bg-gradient-to-l from-payzone-indigo/10 via-payzone-navy/30 to-bladi-green/40 py-16'>
                                <div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(242,199,69,0.25),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(216,30,47,0.18),transparent_35%)]'></div>
                                <div className='relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8'>
                                        <div className='relative mx-auto flex h-72 w-72 items-center justify-center rounded-[32px] bg-gradient-to-br from-payzone-gold via-bladi-yellow to-payzone-indigo p-6 shadow-2xl shadow-black/30 lg:h-80 lg:w-80'>
                                                <div className='absolute -inset-4 rounded-[36px] border border-white/15'></div>
                                                <div className='relative h-full w-full rounded-[24px] bg-bladi-cream text-payzone-navy shadow-inner shadow-black/20'>
                                                        <div className='absolute left-4 right-4 top-6 h-10 rounded-2xl bg-gradient-to-r from-bladi-green to-payzone-navy shadow-lg shadow-black/20'></div>
                                                        <div className='absolute inset-0 rounded-[24px] border border-payzone-gold/40'></div>
                                                        <div className='absolute inset-x-8 bottom-8 rounded-2xl bg-gradient-to-br from-payzone-gold to-bladi-yellow px-4 py-3 text-center text-lg font-black text-payzone-navy shadow-lg shadow-black/30'>
                                                                بوكس بلادي
                                                        </div>
                                                </div>
                                        </div>

                                        <div className='flex-1 space-y-4 text-center lg:text-right'>
                                                <h3 className='text-3xl font-bold text-payzone-white'>ما هو بوكس بلادي؟</h3>
                                                <p className='text-white/80'>
                                                        صندوق فاخر يضم مختارات من منتجات وهدايا موريتانية الصنع مع إدخال مباشر في السحب القادم. تصميمه مستوحى من ألوان العلم ليصل إليك كهدية تحمل روح الوطن.
                                                </p>
                                                <div className='grid gap-3 sm:grid-cols-2'>
                                                        <div className='rounded-2xl bg-white/10 p-4 text-sm text-white/85 shadow-inner shadow-black/20'>
                                                                منتجات وطنية مختارة بعناية.
                                                        </div>
                                                        <div className='rounded-2xl bg-white/10 p-4 text-sm text-white/85 shadow-inner shadow-black/20'>
                                                                دخول تلقائي في السحب دون متاعب إضافية.
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </section>

                        <section id='how' className='relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8'>
                                <div className='mb-8 text-center'>
                                        <span className='rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-payzone-gold shadow-inner shadow-black/20'>كيف تشارك في السحب؟</span>
                                        <h3 className='mt-4 text-3xl font-bold'>خطوات بسيطة لتكون ضمن الفائزين</h3>
                                        <p className='mt-2 text-white/75'>
                                                ثلاث أو أربع خطوات سريعة تقودك إلى المشاركة في سحوبات بلادي دون أي تعقيد.
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
                                                        className='flex flex-col gap-3 rounded-2xl bg-white/5 p-5 text-center shadow-lg shadow-black/20 ring-1 ring-white/10'
                                                >
                                                        <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-payzone-gold to-payzone-indigo text-payzone-navy shadow-lg shadow-black/30'>
                                                                {step.icon}
                                                        </div>
                                                        <h4 className='text-lg font-bold'>
                                                                <span className='text-payzone-gold'>0{index + 1}.</span> {step.title}
                                                        </h4>
                                                        <p className='text-sm text-white/75'>{step.desc}</p>
                                                </div>
                                        ))}
                                </div>
                        </section>

                        <section className='mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8'>
                                <div className='flex flex-col items-center gap-6 rounded-3xl bg-gradient-to-r from-bladi-green-soft via-payzone-navy to-payzone-indigo/60 p-8 text-center shadow-2xl shadow-black/30 lg:flex-row lg:text-right'>
                                        <div className='flex-1 space-y-3'>
                                                <span className='inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-payzone-gold shadow-inner shadow-black/20'>
                                                        <CalendarClock size={18} /> موعد السحب القادم
                                                </span>
                                                <h3 className='text-3xl font-bold'>15 أكتوبر 2024 — الساعة 19:00 بتوقيت نواكشوط</h3>
                                                <p className='text-white/80'>
                                                        استعد لمشاهدة السحب مباشرة، وتأكد من متابعة بريدك ورسائلك لمعرفة إذا كنت أحد الفائزين.
                                                </p>
                                        </div>
                                        <a
                                                href='https://calendar.google.com/calendar/render?action=TEMPLATE&text=سحوبات%20بلادي&details=موعد%20السحب%20القادم%20من%20بلادي&dates=20241015T190000Z/20241015T200000Z'
                                                target='_blank'
                                                rel='noreferrer'
                                                className='rounded-full bg-payzone-gold px-6 py-3 text-lg font-bold text-payzone-navy shadow-lg shadow-payzone-gold/40 transition hover:scale-105 hover:bg-bladi-yellow'
                                        >
                                                أضف التذكير إلى التقويم
                                        </a>
                                </div>
                        </section>

                        <section id='winners' className='relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8'>
                                <div className='mb-8 text-center'>
                                        <span className='rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-payzone-gold shadow-inner shadow-black/20'>الفائزون السابقون</span>
                                        <h3 className='mt-4 text-3xl font-bold'>أسماء حصدت جوائز بلادي</h3>
                                        <p className='mt-2 text-white/75'>عينات من الفائزين الذين احتفلوا معنا مؤخرًا.</p>
                                </div>
                                <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                                        {pastWinners.map((winner) => (
                                                <div key={winner.name} className='flex flex-col gap-2 rounded-2xl bg-white/5 p-4 shadow-lg shadow-black/20 ring-1 ring-white/10'>
                                                        <div className='flex items-center justify-between'>
                                                                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-payzone-gold to-payzone-indigo text-lg font-bold text-payzone-navy shadow-inner shadow-black/30'>
                                                                        {winner.name.charAt(0)}
                                                                </div>
                                                                <span className='text-xs text-white/70'>{winner.city}</span>
                                                        </div>
                                                        <div>
                                                                <p className='text-sm text-white/60'>الجائزة</p>
                                                                <p className='text-lg font-bold text-payzone-gold'>{winner.prize}</p>
                                                        </div>
                                                </div>
                                        ))}
                                </div>
                        </section>

                        <section id='contact' className='mx-auto max-w-6xl rounded-3xl bg-white/5 px-6 py-12 text-center shadow-2xl shadow-black/25 ring-1 ring-white/10'>
                                <h3 className='text-3xl font-bold text-payzone-white'>شفافية السحب</h3>
                                <p className='mt-4 text-white/80'>
                                        تتم السحوبات بطريقة عشوائية وواضحة أمام الجمهور، مع إمكانية متابعة البث المباشر عند الإعلان. نحرص على إبلاغك بنتيجة مشاركتك فورًا لضمان ثقتك الكاملة.
                                </p>
                                <a
                                        className='mt-6 inline-flex items-center justify-center rounded-full bg-payzone-indigo px-6 py-3 text-lg font-semibold text-payzone-white shadow-lg shadow-black/30 transition hover:bg-bladi-red'
                                        href='https://www.youtube.com/'
                                        target='_blank'
                                        rel='noreferrer'
                                >
                                        رابط البث المباشر
                                </a>
                        </section>
                </div>
        );
};
export default HomePage;
