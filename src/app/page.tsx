import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyUs } from "@/components/sections/WhyUs";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Realisations } from "@/components/sections/Realisations";
import { Testimonials } from "@/components/sections/Testimonials";
import { Zones } from "@/components/sections/Zones";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhyUs />
      <Services />
      <Process />
      <Realisations />
      <Testimonials />
      <Zones />
      <Faq />
      <Contact />
    </>
  );
}
