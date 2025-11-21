import SocialLinks from "./SocialLinks";

const Footer = () => {
        const buildTime = new Date(import.meta.env.VITE_BUILD_TIME).toLocaleString();
        return (
                <footer className='mt-16 border-t border-white/10 bg-payzone-navy/95 text-payzone-white'>
                        <div className='container mx-auto px-4 py-10'>
                                <div className='grid gap-8 md:grid-cols-3 md:text-right'>
                                        <div className='space-y-3'>
                                                <h4 className='text-xl font-bold text-payzone-gold'>بلادي | Biladi</h4>
                                                <p className='text-sm text-white/70'>
                                                        سحوبات وطنية بألوان العلم الموريتاني مع تجربة شراء سلسة وفرص حقيقية للفوز.
                                                </p>
                                        </div>
                                        <div className='space-y-2'>
                                                <h5 className='text-lg font-semibold'>روابط سريعة</h5>
                                                <ul className='space-y-1 text-sm text-white/75'>
                                                        <li>
                                                                <a className='hover:text-payzone-gold' href='#hero'>الرئيسية</a>
                                                        </li>
                                                        <li>
                                                                <a className='hover:text-payzone-gold' href='#prizes'>الجوائز</a>
                                                        </li>
                                                        <li>
                                                                <a className='hover:text-payzone-gold' href='#how'>طريقة المشاركة</a>
                                                        </li>
                                                        <li>
                                                                <a className='hover:text-payzone-gold' href='#contact'>تواصل معنا</a>
                                                        </li>
                                                </ul>
                                        </div>
                                        <div className='space-y-2'>
                                                <h5 className='text-lg font-semibold'>سياسات</h5>
                                                <ul className='space-y-1 text-sm text-white/75'>
                                                        <li>
                                                                <a className='hover:text-payzone-gold' href='#'>سياسة الخصوصية</a>
                                                        </li>
                                                        <li>
                                                                <a className='hover:text-payzone-gold' href='#'>الشروط والأحكام</a>
                                                        </li>
                                                        <li>
                                                                <a className='hover:text-payzone-gold' href='mailto:contact@biladi.mr'>contact@biladi.mr</a>
                                                        </li>
                                                </ul>
                                        </div>
                                </div>

                                <div className='mt-8 flex flex-col items-center gap-4 text-center'>
                                        <SocialLinks />
                                        <small className='text-xs text-white/60'>آخر تحديث للموقع: {buildTime}</small>
                                </div>
                        </div>
                </footer>
        );
};

export default Footer;
