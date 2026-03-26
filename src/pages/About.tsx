import { Card } from "@/components/ui/card";
import { Code, Database, Brain, Layers, Github, Linkedin, Camera, Bug, Mountain, Shield, Zap, TrendingUp, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const techStack = [
  { icon: Code, name: "React 18 + Vite + TypeScript", desc: "Modern frontend with fast HMR and type safety" },
  { icon: Database, name: "Recharts + Tailwind CSS", desc: "Interactive data visualization and responsive design system" },
  { icon: Brain, name: "Image Color Analysis Engine", desc: "Pixel-level RGB analysis for crop disease and soil detection" },
  { icon: Layers, name: "shadcn/ui Component Library", desc: "Accessible, production-ready UI components" },
];

const methodology = [
  {
    step: "Image Preprocessing",
    desc: "Uploaded images are resized to 150×150 for efficient processing. Canvas API extracts raw pixel data (RGB values) for analysis.",
  },
  {
    step: "Color Pattern Analysis",
    desc: "Each pixel is classified into 6 categories: Green (healthy vegetation), Brown (soil/disease), Yellow (disease/dryness), Dark (moist soil/shadow), White (highlights), Red (severe damage). Ratios are computed for classification.",
  },
  {
    step: "Classification Logic",
    desc: "Multi-threshold decision tree: Land (green < 20%, brown+dark > 20%), Healthy (green > 25%, minimal damage colors), Diseased (yellow > 12% or red > 8%), with severity grading based on damage intensity.",
  },
  {
    step: "Disease Matching",
    desc: "Detected crop type is matched against a curated database of 40+ diseases across 18 crops (PlantVillage dataset), providing scientific names, descriptions, and severity scores.",
  },
  {
    step: "Recommendation Engine",
    desc: "Cross-references disease data with a pesticide database featuring brand names, dosages, application methods, costs in ₹, and farmer ratings.",
  },
];

const futureScope = [
  "Integration with real ML models (TensorFlow.js / ONNX Runtime) for 99%+ accuracy",
  "Satellite imagery integration via ISRO/Bhuvan for large-scale farm monitoring",
  "Multi-language support (Hindi, Tamil, Telugu, Marathi, Punjabi) for rural accessibility",
  "Offline mode with Progressive Web App (PWA) for areas with poor connectivity",
  "Integration with government schemes (PM-KISAN, PMFBY) for subsidy recommendations",
  "IoT sensor integration for real-time soil moisture and temperature data",
  "Community forum for farmers to share disease photos and treatment experiences",
  "WhatsApp Bot integration for farmers who prefer messaging over web apps",
];

const team = [
  { name: "Team Lead", role: "Full-Stack Development & Architecture" },
  { name: "ML Engineer", role: "Image Analysis & Detection Algorithm" },
  { name: "Frontend Dev", role: "UI/UX Design & Component Development" },
  { name: "Backend Dev", role: "API Design & Database Management" },
  { name: "Data Analyst", role: "Agricultural Data & Crop Research" },
  { name: "Researcher", role: "Domain Expert & Testing" },
];

const usps = [
  { icon: Camera, title: "Photo-Based Detection", desc: "No forms or manual input — just upload a photo" },
  { icon: Bug, title: "40+ Diseases Covered", desc: "Comprehensive coverage of major Indian crop diseases" },
  { icon: Mountain, title: "Soil Analysis", desc: "Analyze farmland photos for soil quality and crop suitability" },
  { icon: Shield, title: "Healthy Crop Confirmation", desc: "Clearly tells you when your crop is disease-free" },
];

const About = () => {
  return (
    <div className="container py-10 md:py-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm text-accent-foreground mb-4">
            SIH 25044 — Smart India Hackathon 2025
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            About <span className="text-gradient-primary">CropYield AI</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            An AI-powered crop disease detection and yield prediction system built for the Smart India Hackathon 2025. Empowering Indian farmers with instant disease identification, soil analysis, and pesticide recommendations — all from a simple photo upload.
          </p>
        </div>

        {/* USPs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {usps.map((u, i) => (
            <Card key={i} className="p-5 text-center shadow-soft border-border animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="gradient-hero rounded-lg p-2.5 w-fit mx-auto mb-3">
                <u.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">{u.title}</h4>
              <p className="text-xs text-muted-foreground">{u.desc}</p>
            </Card>
          ))}
        </div>

        {/* Problem Statement */}
        <Card className="p-7 shadow-card border-border mb-8 animate-fade-up">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Problem Statement</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Indian agriculture, which employs over 50% of the workforce, faces critical challenges in crop disease management. Farmers often identify diseases too late, rely on incorrect treatments, and lack access to expert advice. This leads to:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "₹50,000+ crore annual crop losses due to pests and diseases in India",
              "Delayed disease identification leading to irreversible crop damage",
              "Overuse or misuse of pesticides causing environmental harm and health risks",
              "Limited access to agricultural experts in rural and remote areas",
              "No simple, free tool for farmers to get instant disease diagnosis",
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="gradient-hero rounded-full h-2 w-2 mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        {/* Our Solution */}
        <Card className="p-7 shadow-card border-border mb-8 animate-fade-up bg-primary/5">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Our Solution</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            CropYield AI provides a <strong>free, browser-based</strong> platform that transforms any smartphone into a crop diagnostic tool. Our solution:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Instant disease detection from phone camera photos",
              "Covers 18 crops with 40+ diseases from Kaggle PlantVillage dataset",
              "Pesticide recommendations with Indian brand names & costs in ₹",
              "Soil quality analysis from farmland photos",
              "Clearly confirms when crops are healthy (no unnecessary treatment)",
              "Expert care tips based on agricultural best practices",
              "Zero installation — works in any mobile browser",
              "Analytics dashboard for yield trends and disease monitoring",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/80">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Methodology */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-5 text-center">Detection Methodology</h2>
          <div className="space-y-4">
            {methodology.map((m, i) => (
              <Card key={i} className="p-5 shadow-soft border-border flex gap-4 items-start animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="gradient-hero rounded-lg h-10 w-10 flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{m.step}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Crops & Diseases Coverage */}
        <Card className="p-7 shadow-card border-border mb-8 animate-fade-up">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Crop & Disease Coverage</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { crop: "🌾 Rice", diseases: "Rice Blast, Brown Spot, BLB" },
              { crop: "🌿 Wheat", diseases: "Yellow Rust, Loose Smut, Powdery Mildew" },
              { crop: "🌽 Maize", diseases: "Fall Armyworm, Northern Leaf Blight" },
              { crop: "☁️ Cotton", diseases: "Pink Bollworm, Whitefly, Alternaria" },
              { crop: "🍅 Tomato", diseases: "Early Blight, Leaf Curl, Fusarium" },
              { crop: "🥔 Potato", diseases: "Late Blight, Black Scurf, Scab" },
              { crop: "🎋 Sugarcane", diseases: "Red Rot, Smut" },
              { crop: "🫘 Soybean", diseases: "Soybean Rust, Yellow Mosaic" },
              { crop: "🥜 Groundnut", diseases: "Tikka Disease, Stem Rot" },
              { crop: "🍌 Banana", diseases: "Panama Wilt, Sigatoka" },
              { crop: "🌶️ Chili", diseases: "Anthracnose, Leaf Curl" },
            ].map((c, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/30 border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">{c.crop}</p>
                <p className="text-[10px] text-muted-foreground leading-snug">{c.diseases}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Tech Stack */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-5 text-center">Technology Stack</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {techStack.map((t, i) => (
              <Card key={t.name} className="p-5 shadow-soft border-border flex items-start gap-4 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="gradient-hero rounded-lg p-2 shrink-0">
                  <t.icon className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.desc}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Future Scope */}
        <Card className="p-7 shadow-card border-border mb-8 animate-fade-up">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-chart-gold" />
            Future Scope & Roadmap
          </h2>
          <div className="space-y-3">
            {futureScope.map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <Badge variant="outline" className="text-[10px] px-2 py-0.5 shrink-0 mt-0.5">v{i + 2}.0</Badge>
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Team */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-5 text-center">Team <span className="text-gradient-gold">Tech Titans</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {team.map((m, i) => (
              <Card key={i} className="p-5 text-center shadow-soft border-border animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="w-12 h-12 rounded-full gradient-hero mx-auto mb-3 flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {m.name.charAt(0)}
                </div>
                <div className="font-medium text-foreground text-sm">{m.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{m.role}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Links */}
        <Card className="p-6 shadow-card border-border text-center">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-3">Project Links</h3>
          <div className="flex items-center justify-center gap-4">
            <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-4 w-4" /> GitHub Repository
            </a>
            <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="h-4 w-4" /> Team LinkedIn
            </a>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary">React 18</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Vite</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">Recharts</Badge>
            <Badge variant="secondary">Canvas API</Badge>
            <Badge variant="secondary">shadcn/ui</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
