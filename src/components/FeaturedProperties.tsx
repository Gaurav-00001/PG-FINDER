import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";
import { supabase } from "@/integrations/supabase/client";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const DEMO_PROPERTIES = [
  { id: 'd1', image: property1, title: "Sunshine PG for Men", location: "Ghaziabad", price: 6500, rating: 4.6, occupancy: "Triple Sharing", amenities: ["WiFi", "AC"], gender: "male" as const },
  { id: 'd2', image: property2, title: "GreenView Ladies PG", location: "Rajnagar Extension", price: 10000, rating: 4.8, occupancy: "Double Sharing", amenities: ["WiFi", "AC"], gender: "female" as const },
  { id: 'd3', image: property3, title: "Urban Nest Co-Living", location: "Duhai", price: 12500, rating: 4.7, occupancy: "Single Room", amenities: ["WiFi", "Food"], gender: "unisex" as const },
];

const FeaturedProperties = ({ searchTerm }: { searchTerm: string }) => {
  const [dbProperties, setDbProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetchPGs = async () => {
      let query = supabase.from("pg_listings").select("*");
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,locality.ilike.%${searchTerm}%`);
      }
      const { data } = await query;
      if (data) setDbProperties(data);
    };
    fetchPGs();
  }, [searchTerm]);

  const filteredDemos = searchTerm 
    ? DEMO_PROPERTIES.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.location.toLowerCase().includes(searchTerm.toLowerCase()))
    : DEMO_PROPERTIES;

  const allProperties = [...filteredDemos, ...dbProperties];

  return (
    <section id="properties" className="py-20 bg-surface">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground">Top Rated PGs in Ghaziabad</h2>
          <p className="text-muted-foreground mt-2">Verified listings near HRIT, ABES, and KIET.</p>
        </div>

        {/* --- GRID FIX: items-start ensures cards don't jump rows --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {allProperties.map((p, i) => (
            <motion.div key={p.id || i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <PropertyCard 
                image={p.image_url || p.image} 
                title={p.title} 
                location={p.location || p.locality} 
                price={p.price || p.rent_per_month} 
                rating={p.rating || 4.5} 
                occupancy={p.occupancy || p.room_type} 
                amenities={p.amenities} 
                gender={p.gender || p.gender_type} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;