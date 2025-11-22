import { ShoppingCart } from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useTranslation from "../hooks/useTranslation";
import { useCartStore } from "../stores/useCartStore";
import { formatMRU } from "../lib/formatMRU";
import { getProductPricing } from "../lib/getProductPricing";

const ProductCard = ({ product }) => {
        const { addToCart } = useCartStore();
        const { t } = useTranslation();
        const { price, discountedPrice, isDiscounted, discountPercentage } = getProductPricing(product);
        const productForCart = {
                ...product,
                discountedPrice,
                isDiscounted,
                discountPercentage,
        };
        let coverImage = product.image;

        if (!coverImage && Array.isArray(product.images) && product.images.length > 0) {
                const [firstImage] = product.images;

                if (typeof firstImage === "string") {
                        coverImage = firstImage;
                } else {
                        coverImage = firstImage?.url || "";
                }
        }

        const handleAddToCart = () => {
                addToCart(productForCart);
        };

        return (
                <div className='group relative flex w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-bladi-green/40 via-bilady-navy/50 to-black/20 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-bilady-gold hover:shadow-2xl sm:aspect-[3/4] lg:aspect-square'>
                        <Link
                                to={`/products/${product._id}`}
                                className='relative aspect-[4/5] w-full overflow-hidden min-h-[14rem] sm:min-h-0 sm:aspect-square'
                                aria-label={t("product.viewDetails", { name: product.name })}
                        >
                                {isDiscounted && (
                                        <span className='absolute right-3 top-3 z-10 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-lg'>
                                                -{discountPercentage}%
                                        </span>
                                )}
                                {coverImage ? (
                                        <img
                                                className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110'
                                                src={coverImage}
                                                alt={product.name}
                                        />
                                ) : (
                                        <div className='flex h-full w-full items-center justify-center bg-bilady-navy/70 text-sm text-white/60'>
                                                {t("common.status.noImage")}
                                        </div>
                                )}
                                <div className='pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-bilady-navy/70 via-bilady-navy/20 to-transparent' />
                        </Link>

                        <div className='mt-4 flex flex-1 flex-col px-5 pb-5'>
                                <Link to={`/products/${product._id}`} className='block transition-colors duration-300 hover:text-bilady-gold'>
                                        <h5 className='text-lg font-semibold tracking-tight text-white'>{product.name}</h5>
                                </Link>
                                <div className='mt-3 flex flex-wrap items-baseline gap-2'>
                                        {isDiscounted ? (
                                                <>
                                                        <span className='max-w-full break-words text-sm text-white/60 line-through'>{formatMRU(price)}</span>
                                                        <span className='max-w-full break-words text-lg font-bold text-red-300'>{formatMRU(discountedPrice)}</span>
                                                </>
                                        ) : (
                                                <span className='max-w-full break-words text-lg font-semibold leading-tight text-bilady-gold'>
                                                        {formatMRU(price)}
                                                </span>
                                        )}
                                </div>
                                <button
                                        className='mt-auto flex items-center justify-center gap-2 rounded-lg bg-bilady-gold px-5 py-2 text-sm font-medium text-bilady-navy transition-colors duration-300 hover:bg-bladi-yellow focus:outline-none focus:ring-4 focus:ring-bilady-indigo/40'
                                        onClick={handleAddToCart}
                                >
                                        <ShoppingCart size={20} />
                                        {t("common.actions.addToCart")}
                                </button>
                        </div>
                </div>
        );
};
export default ProductCard;

ProductCard.propTypes = {
        product: PropTypes.shape({
                _id: PropTypes.string.isRequired,
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                name: PropTypes.string.isRequired,
                image: PropTypes.string,
                images: PropTypes.arrayOf(
                        PropTypes.oneOfType([
                                PropTypes.string,
                                PropTypes.shape({
                                        url: PropTypes.string,
                                }),
                        ])
                ),
                price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                discountedPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                isDiscounted: PropTypes.bool,
                discountPercentage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }).isRequired,
};
