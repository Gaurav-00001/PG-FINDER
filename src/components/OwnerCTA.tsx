import { motion } from "framer-motion";
import { TrendingUp, Users, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  { icon: TrendingUp, label: "Higher Occupancy", desc: "Fill vacancies 3x faster" },
  { icon: Users, label: "Verified Tenants", desc: "Pre-screened with KYC" },
  { icon: BarChart3, label: "Smart Dashboard", desc: "Track rent & analytics" },
];

const OwnerCTA = () => {
  return (
    <section id="owners" className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium text-secondary uppercase tracking-wider">
              For Property Owners
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-6">
              Grow Your PG Business with{" "}
              <span className="text-secondary">NivasHub</span>
            </h2>
            <p className="text-primary-foreground/70 mb-10 text-lg leading-relaxed max-w-lg">
              Join 100+ property owners who manage their PGs effortlessly. Get verified leads, automate rent collection, and maximize occupancy.
            </p>

            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-display font-semibold px-8 rounded-xl"
            >
              List Your Property
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {benefits.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-5 p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0">
                  <b.icon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1">{b.label}</h3>
                  <p className="text-sm text-primary-foreground/60">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OwnerCTA;
