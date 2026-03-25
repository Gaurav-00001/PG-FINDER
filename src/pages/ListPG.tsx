import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, MapPin, IndianRupee, Bed, Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AMENITIES = ["WiFi", "AC", "Laundry", "Meals", "Parking", "Gym", "Power Backup", "Hot Water", "CCTV", "Housekeeping"];

const ListPG = () => {
  const { user, isReady } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // 1. Added 'image' to state to hold the selected file
  const [form, setForm] = useState({
    title: "",
    description: "",
    address: "",
    locality: "",
    rent_per_month: "",
    gender_type: "any",
    room_type: "sharing",
    total_beds: "1",
    amenities: [] as string[],
    image: null as File | null, 
  });

  if (isReady && !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-4">
            <Home className="w-6 h-6 text-secondary-foreground" />
          </div>
          <h2 className="font-display text-xl font-bold text-foreground mb-2">Login Required</h2>
          <Button onClick={() => navigate("/auth")} className="bg-secondary text-secondary-foreground">
            Sign In / Sign Up
          </Button>
        </div>
      </div>
    );
  }

  // 2. Helper function to upload to Supabase Storage
  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('pg-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('pg-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const toggleAmenity = (amenity: string) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const rent = parseInt(form.rent_per_month);
    const beds = parseInt(form.total_beds);
    
    if (isNaN(rent) || rent <= 0) {
      toast({ title: "Invalid rent", variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      // 3. Handle Image Upload first
      let imageUrl = null;
      if (form.image) {
        imageUrl = await uploadImage(form.image);
      }

      // 4. Insert data + the new image_url
      const { error } = await supabase.from("pg_listings").insert({
        owner_id: user.id,
        title: form.title.trim(),
        description: form.description.trim() || null,
        address: form.address.trim(),
        locality: form.locality.trim() || null,
        rent_per_month: rent,
        gender_type: form.gender_type,
        room_type: form.room_type,
        total_beds: isNaN(beds) ? 1 : beds,
        available_beds: isNaN(beds) ? 1 : beds,
        amenities: form.amenities,
        image_url: imageUrl, // Pointers to the uploaded file
      });

      if (error) throw error;

      toast({ title: "PG Listed!", description: "Your property is now live on NivasHub." });
      navigate("/");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <button onClick={() => navigate("/")} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> <span className="text-sm">Back to home</span>
        </button>

        <h1 className="font-display text-2xl font-bold text-foreground mb-1">List Your PG</h1>
        <p className="text-muted-foreground text-sm mb-8">Let's get your Ghaziabad property verified.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 5. New Image Upload UI */}
          <div className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
              <Camera className="w-4 h-4 text-secondary" /> Property Photo
            </h2>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 bg-muted/5">
              <Input 
                id="image" 
                type="file" 
                accept="image/*" 
                className="cursor-pointer" 
                onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })}
              />
              <p className="text-[10px] text-muted-foreground mt-2">Upload a clear photo to attract more students.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-foreground">Property Details</h2>
            <div className="space-y-2">
              <Label htmlFor="title">Property Name *</Label>
              <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary" /> Location
            </h2>
            <div className="space-y-2">
              <Label htmlFor="address">Full Address *</Label>
              <Input id="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="locality">Locality / Area</Label>
              <Input id="locality" value={form.locality} onChange={(e) => setForm({ ...form, locality: e.target.value })} />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-secondary" /> Room & Pricing
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rent">Rent / Month (₹) *</Label>
                <Input id="rent" type="number" value={form.rent_per_month} onChange={(e) => setForm({ ...form, rent_per_month: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="beds">Total Beds</Label>
                <Input id="beds" type="number" value={form.total_beds} onChange={(e) => setForm({ ...form, total_beds: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Gender Type</Label>
                <Select value={form.gender_type} onValueChange={(v) => setForm({ ...form, gender_type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="any">Co-ed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Room Type</Label>
                <Select value={form.room_type} onValueChange={(v) => setForm({ ...form, room_type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="double">Double</SelectItem>
                    <SelectItem value="sharing">Sharing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
              <Bed className="w-4 h-4 text-secondary" /> Amenities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AMENITIES.map((amenity) => (
                <label key={amenity} className="flex items-center gap-2 cursor-pointer text-sm">
                  <Checkbox checked={form.amenities.includes(amenity)} onCheckedChange={() => toggleAmenity(amenity)} />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 text-base">
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Submit Listing"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ListPG;
