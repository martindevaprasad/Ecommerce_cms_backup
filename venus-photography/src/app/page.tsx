import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Header from "@/components/Header";
import FrameCounter from "@/components/FrameCounter";
import Hero from "@/components/Hero";
import RitualTicker from "@/components/RitualTicker";
import Ethos from "@/components/Ethos";
import Services from "@/components/Services";
import ApertureReveal from "@/components/ApertureReveal";
import HeirloomAlbum from "@/components/HeirloomAlbum";
import Stats from "@/components/Stats";
import CoupleStories from "@/components/CoupleStories";
import Archive from "@/components/Archive";
import Films from "@/components/Films";
import Journey from "@/components/Journey";
import Testimonials from "@/components/Testimonials";
import Journal from "@/components/Journal";
import Faq from "@/components/Faq";
import Inquiry from "@/components/Inquiry";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <Header />
      <FrameCounter />
      <main>
        <Hero />
        <RitualTicker />
        <Ethos />
        <Services />
        <ApertureReveal />
        <HeirloomAlbum />
        <Stats />
        <CoupleStories />
        <Archive />
        <Films />
        <Journey />
        <Testimonials />
        <Journal />
        <Faq />
        <Inquiry />
      </main>
      <Footer />
    </>
  );
}
