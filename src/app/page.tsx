import { Hero } from "@/components/Hero";
import { HomeD2CFocus } from "@/components/HomeD2CFocus";
import { HomeProjects } from "@/components/HomeProjects";
import { HomeServices } from "@/components/HomeServices";
import { HomeProcess } from "@/components/HomeProcess";
import { HomeTrust } from "@/components/HomeTrust";
import { HomeTestimonials } from "@/components/HomeTestimonials";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center">
      <Hero />
      <HomeD2CFocus />
      <HomeProjects />
      <HomeServices />
      <HomeProcess />
      <HomeTrust />
      <HomeTestimonials />
      <FinalCTA />
    </div>
  );
}
