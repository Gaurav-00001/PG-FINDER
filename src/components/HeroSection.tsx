import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-room.jpg";

// 1. Define props to allow the parent (Index.tsx) to listen for searches
interface HeroSectionProps {
  onSearch: (term: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  // 2. Local state to track input
  const [searchValue, setSearchValue] = useState("");

  const handleSearchClick = () => {
    onSearch(searchValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Modern co-living space" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/30" />
      </div>

      <div className="container relative z-10 px-4 md:px-8 py-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-6">
              <Shield className="w-3.5 h-3.5" />
              Verified PGs in Ghaziabad
            </span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-[1.1] mb-6">
              Find Your
              <br />
              <span className="text-secondary">Perfect PG</span>
              <br />
              Near Your College
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-lg font-body">
              Discover verified accommodations near ABES, AKGEC, and KIET. Safe, affordable, and hassle-free living for students.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-card rounded-2xl p-2 max-w-xl"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-background/80">
                <MapPin className="w-5 h-5 text-secondary shrink-0" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Search area (e.g. Duhai, Lal Kuan)..."
                  className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none font-body"
                />
              </div>
              <Button 
                onClick={handleSearchClick}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-6 rounded-xl font-display font-semibold"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap gap-8 mt-12"
          >
            {[
              { value: "100+", label: "Verified PGs" },
              { value: "2K+", label: "Happy Students" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-display font-bold text-secondary">
                  {stat.value}
                </p>
                <p className="text-sm text-primary-foreground/60">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;