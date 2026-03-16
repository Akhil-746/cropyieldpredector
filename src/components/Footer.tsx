import { Link } from "react-router-dom";
import { Sprout, Camera, BarChart3, Info, ExternalLink } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card/50">
    <div className="container py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="gradient-hero rounded-lg p-1.5">
              <Sprout className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-serif text-lg font-bold text-foreground">
              CropYield AI
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            AI-powered crop disease detection and yield prediction system for Indian farmers. Built for SIH 2025.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-foreground text-sm mb-3">Quick Links</h4>
          <div className="space-y-2">
            <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="/predict" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Camera className="h-3 w-3" /> Disease Detection
            </Link>
            <Link to="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <BarChart3 className="h-3 w-3" /> Dashboard
            </Link>
            <Link to="/about" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Info className="h-3 w-3" /> About
            </Link>
          </div>
        </div>

        {/* Crops Supported */}
        <div>
          <h4 className="font-semibold text-foreground text-sm mb-3">Crops Supported</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Rice, Wheat, Maize, Cotton, Tomato, Potato, Sugarcane, Soybean, Groundnut, Banana, Chili
          </p>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold text-foreground text-sm mb-3">Resources</h4>
          <div className="space-y-2">
            <a href="https://farmer.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ExternalLink className="h-3 w-3" /> Farmer Portal (GoI)
            </a>
            <a href="https://icar.org.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ExternalLink className="h-3 w-3" /> ICAR
            </a>
            <a href="https://www.sih.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ExternalLink className="h-3 w-3" /> Smart India Hackathon
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground text-center">
          SIH 25044 — Smart India Hackathon 2025 • <span className="font-medium">Team Tech Titans</span>
        </p>
        <p className="text-xs text-muted-foreground">
          © 2025 CropYield AI. Built with ❤️ for Indian Farmers.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
