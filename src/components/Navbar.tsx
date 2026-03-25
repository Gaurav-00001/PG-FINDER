import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Search, Phone, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { label: "Find PG", href: "#properties", icon: Search },
  { label: "How It Works", href: "#how-it-works", icon: Home },
  { label: "For Owners", href: "#owners", icon: User },
  { label: "Contact", href: "#contact", icon: Phone },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container flex items-center justify-between h-16 px-4 md:px-8">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
            <Home className="w-4 h-4 text-secondary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Nivas<span className="text-secondary">Hub</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => signOut()}>
                <LogOut className="w-4 h-4 mr-1" /> Logout
              </Button>
              <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={() => navigate("/list-pg")}>
                List Your PG
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
                Login
              </Button>
              <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={() => navigate("/list-pg")}>
                List Your PG
              </Button>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-card border-t border-border"
          >
            <div className="p-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <link.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{link.label}</span>
                </a>
              ))}
              <div className="pt-3 border-t border-border flex gap-2">
                {user ? (
                  <>
                    <Button variant="ghost" size="sm" className="flex-1" onClick={() => { signOut(); setMobileOpen(false); }}>
                      Logout
                    </Button>
                    <Button size="sm" className="flex-1 bg-secondary text-secondary-foreground" onClick={() => { navigate("/list-pg"); setMobileOpen(false); }}>
                      List Your PG
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" className="flex-1" onClick={() => { navigate("/auth"); setMobileOpen(false); }}>
                      Login
                    </Button>
                    <Button size="sm" className="flex-1 bg-secondary text-secondary-foreground" onClick={() => { navigate("/list-pg"); setMobileOpen(false); }}>
                      List Your PG
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
