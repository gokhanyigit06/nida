import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PortfolioSection from "@/components/PortfolioSection";
import Testimonials from "@/components/Testimonials";
import StickyFooterReveal from "@/components/StickyFooterReveal";

export default function Home() {
  return (
    <>
      {/* İçerik — z-10 ve bg-white ile footer'ın üzerinden kayar */}
      <main className="relative z-10 bg-white">
        <Header />
        <Hero />
        <PortfolioSection />
        <Testimonials />
      </main>

      {/* Footer her zaman altta fixed, scroll edilince ortaya çıkar */}
      <StickyFooterReveal />
    </>
  );
}
