import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import NurseryCafe from "@/components/NurseryCafe";
import Food from "@/components/Food";
import CoffeeMoment from "@/components/CoffeeMoment";
import GreenEscape from "@/components/GreenEscape";
import WhySwaada from "@/components/WhySwaada";
import Reviews from "@/components/Reviews";
import Highway from "@/components/Highway";
import Gallery from "@/components/Gallery";
import LocationSection from "@/components/LocationSection";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";

export default function Home() {
  return (
    <SmoothScroll>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <NurseryCafe />
        <Food />
        <CoffeeMoment />
        <GreenEscape />
        <WhySwaada />
        <Reviews />
        <Highway />
        <Gallery />
        <LocationSection />
        <InstagramSection />
      </main>
      <Footer />
      <StickyCTA />
    </SmoothScroll>
  );
}
