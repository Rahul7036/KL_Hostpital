import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { StructuredData } from "@/components/layout/StructuredData";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Specialities } from "@/components/sections/Specialities";
import { Doctors } from "@/components/sections/Doctors";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Appointment } from "@/components/sections/Appointment";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Specialities />
        <Doctors />
        <WhyChooseUs />
        <Gallery />
        <Testimonials />
        <Appointment />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <StructuredData />
    </>
  );
}
