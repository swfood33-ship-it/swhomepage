'use client';

import Image from "next/image";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Numbers from "@/components/Numbers";
import Cases from "@/components/Cases";
import ProductGrid from "@/components/ProductGrid";
import DeliveryTimeline from '@/components/DeliveryTimeline';
import ContactForm from '@/components/ContactForm';
import BlogSection from '@/components/BlogSection';
import PricingPolicy from '@/components/PricingPolicy';
import PartnerMarquee from '@/components/PartnerMarquee';
import ClientGrid from '@/components/ClientGrid';
import Testimonials from '@/components/Testimonials';
import ManagerSection from '@/components/ManagerSection';
import TeamGallery from '@/components/TeamGallery';
import FAQ from '@/components/FAQ';
import PriceDisclosureHighlight from '@/components/PriceDisclosureHighlight';
import DiagnosisHighlight from '@/components/DiagnosisHighlight';
import useMotion from "@/components/motion/useMotion";

export default function Home() {
  useMotion(); // Register GSAP plugins

  return (
    <div className="flex flex-col w-full">
      <Hero />
      <PartnerMarquee />
      <ClientGrid />
      <Testimonials />
      <PricingPolicy />
      <DiagnosisHighlight />
      <Problem />
      <PriceDisclosureHighlight />
      <Solution />
      <Numbers />
      <ProductGrid />
      <Cases />
      <ManagerSection />
      <TeamGallery />
      <DeliveryTimeline />
      <ContactForm />
      <FAQ />
      <BlogSection />
    </div>
  );
}
