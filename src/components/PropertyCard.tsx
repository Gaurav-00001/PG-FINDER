import { motion } from "framer-motion";
import { MapPin, Users, Star, Wifi, Wind, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  occupancy: string;
  amenities: string[];
  verified?: boolean;
  gender: "male" | "female" | "unisex";
}

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="w-3.5 h-3.5" />,
  AC: <Wind className="w-3.5 h-3.5" />,
  Food: <Utensils className="w-3.5 h-3.5" />,
};

const PropertyCard = ({
  image, title, location, price, rating, occupancy, amenities, verified, gender,
}: PropertyCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group rounded-2xl overflow-hidden bg-card shadow-card hover:shadow-elevated transition-shadow"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {verified && (
            <Badge className="bg-success text-success-foreground text-xs">Verified</Badge>
          )}
          <Badge variant="secondary" className="text-xs capitalize">{gender}</Badge>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-foreground/80 text-primary-foreground text-xs font-medium">
          <Star className="w-3 h-3 fill-secondary text-secondary" />
          {rating}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display font-semibold text-card-foreground mb-1 truncate">
          {title}
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
          <MapPin className="w-3.5 h-3.5" />
          {location}
        </p>

        <div className="flex items-center gap-2 mb-4">
          {amenities.slice(0, 3).map((a) => (
            <span
              key={a}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs"
            >
              {amenityIcons[a] || null}
              {a}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-xl font-display font-bold text-card-foreground">
              ₹{price.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">/mo</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            {occupancy}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
