import { Sprout } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card/50">
    <div className="container py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="gradient-hero rounded-lg p-1.5">
            <Sprout className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-serif text-lg font-bold text-foreground">
            CropYield AI
          </span>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          SIH 25044 — Smart India Hackathon 2025 • Team Tech Titans
        </p>
        <p className="text-xs text-muted-foreground">
          © 2025 CropYield AI. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
