import ContactSection from "@/components/StaticSiteComponents/ContactSection";
import HeroSection from "@/components/StaticSiteComponents/HeroSection";
import StaticNavbar from "@/components/StaticSiteComponents/StaticNavbar";
import { Button } from "@/components/ui/button";
import AboutUs from "@/components/StaticSiteComponents/AboutUs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" relative ">
      <StaticNavbar />
      <HeroSection />
      <AboutUs />
      <ContactSection/>
    </div>
  );
}
