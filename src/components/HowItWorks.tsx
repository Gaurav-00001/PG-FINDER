import { motion } from "framer-motion";
import { Search, CalendarCheck, Home, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search & Discover",
    description: "Browse verified PGs by location, budget, and amenities. Use our map to find the perfect spot.",
  },
  {
    icon: CalendarCheck,
    title: "Schedule a Visit",
    description: "Book a visit online or take a virtual tour from the comfort of your home.",
  },
  {
    icon: ShieldCheck,
    title: "Verify & Book",
    description: "Check verified reviews, compare options, and reserve your bed with a secure deposit.",
  },
  {
    icon: Home,
    title: "Move In",
    description: "Complete your KYC, sign the digital agreement, and move into your new home.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-background">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-secondary uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-3 mb-4">
            How NivasHub Works
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            From discovery to move-in, we make the entire PG experience seamless.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <step.icon className="w-7 h-7 text-secondary" />
              </div>

              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 text-7xl font-display font-bold text-muted/50 select-none">
                {i + 1}
              </span>

              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
