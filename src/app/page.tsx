import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WorksGrid from "@/components/WorksGrid";

import Quote from "@/components/Quote";


import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <WorksGrid />
      <Testimonials />
      <Footer />
    </main>
  );
}
