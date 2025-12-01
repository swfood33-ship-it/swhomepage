import Header from '@/components/v2/Header';
import Hero from '@/components/v2/Hero';
import USPCards from '@/components/v2/USPCards';
import CategoryGrid from '@/components/v2/CategoryGrid';
import PricingLink from '@/components/v2/PricingLink';
import Footer from '@/components/v2/Footer';

export default function NewHome() {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <Header />
            <main>
                <Hero />
                <USPCards />
                <CategoryGrid />
                <PricingLink />
                {/* Additional sections will be added here */}
            </main>
            <Footer />
        </div>
    );
}
