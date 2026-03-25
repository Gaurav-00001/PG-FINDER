import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import HowItWorks from "@/components/HowItWorks";
import OwnerCTA from "@/components/OwnerCTA";
import Footer from "@/components/Footer";
import AdComponent from "@/components/Adcomponent";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // 1. Reference point for the scrolling
  const propertiesRef = useRef<HTMLDivElement>(null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    // 2. Small delay ensures the component is ready before scrolling
    setTimeout(() => {
      propertiesRef.current?.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Passing handleSearch to trigger the state and scroll */}
      <HeroSection onSearch={handleSearch} />
      
      <div className="container py-4">
        <AdComponent />
      </div>

      {/* The scroll-mt-20 ensures the Navbar doesn't cover the heading */}
      <div ref={propertiesRef} className="scroll-mt-20">
        <FeaturedProperties searchTerm={searchTerm} />
      </div>
      
      <HowItWorks />
      <OwnerCTA />
      <Footer />
    </div>
  );
};

// EXPORT THE COMPONENT NAME ONLY
export default Index;