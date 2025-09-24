"use client";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { LocationHours } from "@/components/LocationHours";
import { QuoteForm } from "@/components/QuoteForm";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Testimonials />
        <LocationHours />
        <QuoteForm />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
