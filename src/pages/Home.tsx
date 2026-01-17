import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HomePage/Hero";
import WhatWeDo from "@/components/HomePage/whatWeDo";
import Features from "@/components/HomePage/Features";
import HowitWorks from "@/components/HomePage/HowitWorks";
import Whychooseus from "@/components/HomePage/WhyChooseUs";
import ContactUs from "@/components/HomePage/contactUs";
import Footer from "@/components/Footer";



const Index = () => {
  return (
    <>
    <div className="md:px-12">
    <Navbar/>
    <HeroSection/>
    <WhatWeDo 
      title="What We Do" 
      description="We guide Ethiopian entrepreneurs through the complex journey of starting and managing a business. From understanding legal requirements to navigating government offices, licensing, compliance, and ongoing administrative tasks, we simplify the bureaucracy so you can focus on building and growing your company. Our platform provides expert guidance, reliable resources, and step-by-step support—making entrepreneurship in Ethiopia clearer, faster, and stress-free." 
    />
    <Features/>
    <HowitWorks/>
    <Whychooseus/>
    <ContactUs/>
    </div>
    <Footer/>
    </>
  );
};

export default Index;
