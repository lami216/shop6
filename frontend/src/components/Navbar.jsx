import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import useTranslation from "../hooks/useTranslation";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
        const { user, logout } = useUserStore();
        const isAdmin = user?.role === "admin";
        const { cart } = useCartStore();
        const cartItemCount = cart.reduce((total, item) => total + (item.quantity ?? 0), 0);
        const { t } = useTranslation();

        return (
                <header className='fixed top-0 right-0 z-50 w-full bg-gradient-to-l from-bladi-green via-payzone-navy to-bladi-green-soft/80 shadow-lg shadow-black/30 backdrop-blur-xl'>
                        <div className='container mx-auto px-4 py-3'>
                                <div className='flex flex-wrap items-center justify-between gap-4'>
                                        <Link to='/' className='flex items-center gap-3 text-payzone-white'>
                                                <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-payzone-gold via-bladi-yellow to-payzone-indigo text-payzone-navy font-extrabold shadow-lg shadow-black/30'>
                                                        ب
                                                </div>
                                                <div className='flex flex-col text-right leading-tight'>
                                                        <span className='text-lg font-bold tracking-wide'>Bilady</span>
                                                        <span className='text-sm font-semibold text-payzone-gold'>بلادي</span>
                                                </div>
                                        </Link>

                                        <div className='flex flex-wrap items-center gap-3 text-sm font-medium'>
                                                <nav className='flex flex-wrap items-center gap-3 rounded-full bg-white/10 px-4 py-2 shadow-inner shadow-black/20'>
                                                        <a href='#hero' className='rounded-full px-3 py-1 text-white/90 transition hover:bg-white/10'>
                                                                الرئيسية
                                                        </a>
                                                        <a href='#prizes' className='rounded-full px-3 py-1 text-white/90 transition hover:bg-white/10'>
                                                                الجوائز
                                                        </a>
                                                        <a href='#how' className='rounded-full px-3 py-1 text-white/90 transition hover:bg-white/10'>
                                                                طريقة المشاركة
                                                        </a>
                                                        <a href='#winners' className='rounded-full px-3 py-1 text-white/90 transition hover:bg-white/10'>
                                                                الفائزون
                                                        </a>
                                                        <a href='#contact' className='rounded-full px-3 py-1 text-white/90 transition hover:bg-white/10'>
                                                                تواصل معنا
                                                        </a>
                                                        {isAdmin && (
                                                                <Link
                                                                        className='flex items-center gap-2 rounded-full bg-payzone-gold px-3 py-1 text-payzone-navy transition hover:shadow-lg hover:shadow-payzone-gold/40'
                                                                        to={'/secret-dashboard'}
                                                                >
                                                                        <Lock className='inline-block' size={18} />
                                                                        <span className='hidden sm:inline'>{t("nav.dashboard")}</span>
                                                                </Link>
                                                        )}
                                                </nav>

                                                <div className='flex items-center gap-2'>
                                                        <Link
                                                                to={'/cart'}
                                                                className='relative flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-payzone-white transition duration-300 ease-in-out hover:bg-white/20'
                                                        >
                                                                <ShoppingCart size={18} />
                                                                <span className='hidden sm:inline'>{t("nav.cart")}</span>
                                                                {cartItemCount > 0 && (
                                                                        <span className='absolute -top-2 -right-2 rounded-full bg-payzone-gold px-2 py-0.5 text-xs font-semibold text-payzone-navy shadow-sm'>
                                                                                {cartItemCount}
                                                                        </span>
                                                                )}
                                                        </Link>
                                                        {user ? (
                                                                <button
                                                                        className='flex items-center gap-2 rounded-full bg-payzone-indigo px-4 py-2 text-payzone-white transition duration-300 ease-in-out hover:bg-bladi-red'
                                                                        onClick={logout}
                                                                >
                                                                        <LogOut size={18} />
                                                                        <span className='hidden sm:inline'>{t("nav.logout")}</span>
                                                                </button>
                                                        ) : (
                                                                <>
                                                                        <Link
                                                                                to={'/signup'}
                                                                                className='flex items-center gap-2 rounded-full bg-payzone-gold px-4 py-2 font-semibold text-payzone-navy transition duration-300 ease-in-out hover:bg-bladi-yellow'
                                                                        >
                                                                                <UserPlus size={18} />
                                                                                {t("nav.signup")}
                                                                        </Link>
                                                                        <Link
                                                                                to={'/login'}
                                                                                className='flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-payzone-white transition duration-300 ease-in-out hover:bg-white/25'
                                                                        >
                                                                                <LogIn size={18} />
                                                                                {t("nav.login")}
                                                                        </Link>
                                                                </>
                                                        )}
                                                </div>
                                        </div>
                                </div>
                        </div>
                </header>
        );
};
export default Navbar;
