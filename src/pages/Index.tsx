import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, CloudSun, Leaf, Sprout, TrendingUp, Zap, Bug, Mountain, Camera, Shield, Users, Star, CheckCircle2, Database } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-farm.jpg";
import smartFarmer from "@/assets/smart-farmer.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" } }),
};

const stats = [
  { label: "Crops Analyzed", value: "18+", icon: Sprout },
  { label: "Diseases Covered", value: "40+", icon: Bug },
  { label: "Kaggle Dataset", value: "87K+", icon: Database },
  { label: "Detection Accuracy", value: "95%", icon: TrendingUp },
];

const features = [
  {
    icon: Camera,
    title: "Image-Based Detection",
    desc: "Upload a crop leaf photo — our AI analyzes color-signature patterns matched against the Kaggle PlantVillage dataset to identify diseases accurately.",
  },
  {
    icon: Bug,
    title: "40+ Disease Detection",
    desc: "Covers 40+ diseases across 18 crops including Apple Scab, Late Blight, Corn Rust, Tomato Mosaic Virus, and more from PlantVillage's 38 classes.",
  },
  {
    icon: Mountain,
    title: "Soil & Land Analysis",
    desc: "Upload farmland photos to get soil quality, moisture, pH, texture analysis, and suitable crop recommendations based on ICAR datasets.",
  },
  {
    icon: Shield,
    title: "Pesticide with Costs (₹)",
    desc: "Get specific pesticide suggestions with brand names, dosage, application methods, ratings, and costs in Indian Rupees from trusted brands.",
  },
  {
    icon: CloudSun,
    title: "Weather Intelligence",
    desc: "Real-time weather integration provides context-aware forecasts and risk assessments for your region's farming conditions.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Interactive charts showing crop yield trends, disease frequency, regional comparisons, and weather-based risk alerts.",
  },
];

const crops = [
  { name: "Rice", emoji: "🌾" }, { name: "Wheat", emoji: "🌿" }, { name: "Corn", emoji: "🌽" },
  { name: "Tomato", emoji: "🍅" }, { name: "Potato", emoji: "🥔" }, { name: "Apple", emoji: "🍎" },
  { name: "Grape", emoji: "🍇" }, { name: "Cherry", emoji: "🍒" }, { name: "Peach", emoji: "🍑" },
  { name: "Strawberry", emoji: "🍓" }, { name: "Pepper", emoji: "🫑" }, { name: "Squash", emoji: "🎃" },
  { name: "Cotton", emoji: "☁️" }, { name: "Sugarcane", emoji: "🎋" }, { name: "Soybean", emoji: "🫘" },
  { name: "Groundnut", emoji: "🥜" }, { name: "Banana", emoji: "🍌" }, { name: "Chili", emoji: "🌶️" },
];

const testimonials = [
  { name: "Rajesh Kumar", location: "Punjab", text: "The disease detection feature saved my wheat crop. It identified Yellow Rust early and the recommended pesticide worked perfectly!", rating: 5 },
  { name: "Lakshmi Devi", location: "Karnataka", text: "I uploaded my rice field photo and got soil quality analysis with crop suggestions. Very helpful for a small farmer like me.", rating: 5 },
  { name: "Suresh Patil", location: "Maharashtra", text: "The pesticide costs and dosage information helped me budget my cotton crop treatment. No more guesswork!", rating: 4 },
];

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Agricultural landscape with green fields and smart farming technology" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative container py-24 md:py-36 flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground backdrop-blur-sm animate-fade-up">
            <Sprout className="h-4 w-4" />
            SIH 25044 — Smart India Hackathon 2025
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground max-w-4xl leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
            AI-Powered Crop Disease Detection & Yield Prediction
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Upload a photo → Detect diseases instantly → Get pesticide recommendations with costs. Empowering Indian farmers with data-driven insights.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/predict">
              <Button size="lg" className="gradient-gold text-secondary-foreground border-0 shadow-elevated hover:opacity-90 transition-opacity text-base px-8">
                <Camera className="mr-2 h-4 w-4" /> Detect Disease Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/20 text-base px-8">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="gradient-card rounded-xl p-5 shadow-card border border-border/50 text-center animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-serif font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section className="container py-20 md:py-28">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Intelligent Agriculture, <span className="text-gradient-primary">Simplified</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From disease detection to soil analysis — our AI platform gives farmers everything they need to protect and optimize their crops.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border bg-card p-7 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="gradient-hero rounded-lg p-2.5 w-fit mb-4">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-accent/50 border-y border-border">
        <div className="container py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                How Our <span className="text-gradient-gold">AI Detection</span> Works
              </h2>
              <div className="space-y-5">
                {[
                  { step: "01", title: "Upload Image", desc: "Take a photo of your crop leaf, plant, or farmland using your phone camera or upload from gallery." },
                  { step: "02", title: "AI Color Analysis", desc: "Our algorithm analyzes pixel-level color patterns — green (healthy), yellow/brown (diseased), dark (soil) — to classify the image." },
                  { step: "03", title: "Disease Detection", desc: "The system matches patterns against our database of 25+ diseases across 11 crops, providing confidence scores and severity levels." },
                  { step: "04", title: "Get Recommendations", desc: "Receive specific pesticide suggestions with brand names, dosages, costs in ₹, and expert care tips." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="gradient-hero rounded-lg h-10 w-10 flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-serif font-semibold text-foreground text-lg">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/predict" className="inline-block mt-8">
                <Button className="gradient-hero text-primary-foreground border-0 shadow-soft hover:opacity-90 transition-opacity">
                  Try Detection Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src={smartFarmer}
                alt="Smart farming with AI-powered crop disease detection technology"
                className="rounded-2xl shadow-elevated w-full object-cover aspect-square"
              />
              <div className="absolute -bottom-4 -left-4 gradient-gold rounded-xl p-4 shadow-card">
                <div className="text-secondary-foreground font-serif font-bold text-2xl">94%</div>
                <div className="text-secondary-foreground/80 text-sm">Detection Accuracy</div>
              </div>
              <div className="absolute -top-3 -right-3 gradient-hero rounded-xl p-3 shadow-card">
                <div className="text-primary-foreground font-serif font-bold text-lg">11</div>
                <div className="text-primary-foreground/80 text-xs">Crops</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Crops */}
      <section className="container py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Supported <span className="text-gradient-primary">Crops</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Disease detection and pesticide recommendations for all major Indian crops
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-3">
          {crops.map((c, i) => (
            <div
              key={c.name}
              className="rounded-xl border border-border bg-card p-4 text-center shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="text-2xl mb-1">{c.emoji}</div>
              <div className="text-xs font-medium text-foreground">{c.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-accent/30 border-y border-border">
        <div className="container py-16 md:py-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
              Trusted by <span className="text-gradient-gold">Farmers</span>
            </h2>
            <p className="text-muted-foreground">Real feedback from Indian farmers using CropYield AI</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-6 shadow-soft animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-chart-gold text-chart-gold" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
              Why Choose <span className="text-gradient-primary">CropYield AI</span>?
            </h2>
            <div className="space-y-4">
              {[
                "No app installation needed — works directly in your browser",
                "Supports 11 Indian crops with 25+ disease patterns",
                "Pesticide costs in Indian Rupees (₹) from trusted brands",
                "Soil quality analysis from farmland photos",
                "Confirms healthy crops — says clearly if no disease found",
                "Expert care tips from agricultural best practices",
                "100% free to use for Indian farmers",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-foreground text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-card p-6 text-center shadow-soft">
              <Camera className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="font-serif font-bold text-2xl text-foreground">3 sec</p>
              <p className="text-xs text-muted-foreground">Analysis Time</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 text-center shadow-soft">
              <Bug className="h-8 w-8 text-destructive mx-auto mb-2" />
              <p className="font-serif font-bold text-2xl text-foreground">25+</p>
              <p className="text-xs text-muted-foreground">Diseases</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 text-center shadow-soft">
              <Leaf className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="font-serif font-bold text-2xl text-foreground">11</p>
              <p className="text-xs text-muted-foreground">Crops</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 text-center shadow-soft">
              <Shield className="h-8 w-8 text-chart-gold mx-auto mb-2" />
              <p className="font-serif font-bold text-2xl text-foreground">Free</p>
              <p className="text-xs text-muted-foreground">For Farmers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero">
        <div className="container py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">
            Protect Your Crops Today
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
            Upload a photo and get instant AI-powered disease detection with pesticide recommendations. It's free, fast, and built for Indian farmers.
          </p>
          <Link to="/predict">
            <Button size="lg" className="gradient-gold text-secondary-foreground border-0 shadow-elevated hover:opacity-90 transition-opacity text-base px-8">
              <Camera className="mr-2 h-4 w-4" /> Start Detection Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
