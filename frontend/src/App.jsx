import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SearchPage from "./pages/SearchPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
        const user = useUserStore((state) => state.user);
        const checkAuth = useUserStore((state) => state.checkAuth);
        const checkingAuth = useUserStore((state) => state.checkingAuth);
        const initializeCart = useCartStore((state) => state.initializeCart);
        const getCartItems = useCartStore((state) => state.getCartItems);

        useEffect(() => {
                checkAuth();
        }, [checkAuth]);

        useEffect(() => {
                initializeCart();
        }, [initializeCart]);

        useEffect(() => {
                if (user) {
                        getCartItems();
                }
        }, [getCartItems, user]);

        if (checkingAuth) {
                return <LoadingSpinner />;
        }

        return (
                <div className='relative min-h-screen overflow-hidden text-bilady-white'>
                        <div className='pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-[#0b3f2f] via-[#0f5f45] to-[#0b3f2f]' />
                        <div className='pointer-events-none absolute inset-0 -z-10 bilady-flag-overlay opacity-70' />
                        <div className='pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#0b3f2f]/60 via-[#0f5f45]/55 to-[#0b3f2f]/65' />
                        <div className='relative z-50 pt-24'>
                                <Navbar />
                                <Routes>
                                        <Route path='/' element={<HomePage />} />
                                        <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
                                        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
                                        <Route
                                                path='/secret-dashboard'
                                                element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
                                        />
                                        <Route path='/category/:category' element={<CategoryPage />} />
                                        <Route path='/products/:id' element={<ProductDetailPage />} />
                                        <Route path='/search' element={<SearchPage />} />
                                        <Route path='/cart' element={<CartPage />} />
                                        <Route path='/checkout' element={<CheckoutPage />} />
                                        <Route path='/purchase-success' element={<PurchaseSuccessPage />} />
                                        <Route path='/purchase-cancel' element={<PurchaseCancelPage />} />
                                </Routes>
                        </div>
                        <Toaster />
                        <Footer />
                        <a
                                href='https://wa.me/22244455666'
                                target='_blank'
                                rel='noreferrer'
                                className='fixed bottom-6 left-6 z-50 flex items-center gap-3 rounded-full bg-gradient-to-l from-bilady-gold to-bladi-yellow px-5 py-3 text-bilady-navy shadow-xl shadow-black/40 transition hover:scale-105 hover:shadow-2xl'
                                aria-label='تواصل عبر واتساب'
                        >
                                <span className='text-lg font-semibold'>تواصل عبر واتساب</span>
                        </a>
                </div>
        );
}

export default App;
