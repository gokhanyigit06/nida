import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Quote from "@/components/Quote";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      <Footer />
    </main>
  );
}
