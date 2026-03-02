import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, CloudSun, Leaf, Sprout, TrendingUp, Zap } from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";
import smartFarmer from "@/assets/smart-farmer.jpg";

const stats = [
  { label: "Crops Supported", value: "15+", icon: Sprout },
  { label: "Prediction Accuracy", value: "94%", icon: TrendingUp },
  { label: "Farmers Reached", value: "10K+", icon: Leaf },
  { label: "Data Points Analyzed", value: "1M+", icon: BarChart3 },
];

const features = [
  {
    icon: TrendingUp,
    title: "Yield Prediction",
    desc: "AI-powered models analyze soil, weather, and historical data to forecast crop yields with high accuracy.",
  },
  {
    icon: Zap,
    title: "Smart Optimization",
    desc: "Receive actionable recommendations to maximize output — from irrigation schedules to fertilizer dosing.",
  },
  {
    icon: CloudSun,
    title: "Weather Intelligence",
    desc: "Real-time weather integration provides context-aware forecasts and risk assessments for your region.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Visualize trends, compare crop performance, and track regional yield patterns with interactive charts.",
  },
];

const crops = [
  { name: "Rice", emoji: "🌾" },
  { name: "Wheat", emoji: "🌿" },
  { name: "Maize", emoji: "🌽" },
  { name: "Sugarcane", emoji: "🎋" },
  { name: "Cotton", emoji: "☁️" },
  { name: "Soybean", emoji: "🫘" },
];

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Agricultural landscape" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative container py-24 md:py-36 flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground backdrop-blur-sm animate-fade-up">
            <Sprout className="h-4 w-4" />
            SIH 25044 — Smart India Hackathon
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground max-w-4xl leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
            AI-Powered Crop Yield Prediction
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Empowering farmers with data-driven insights to predict yields, optimize resources, and maximize agricultural output.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/predict">
              <Button size="lg" className="gradient-gold text-secondary-foreground border-0 shadow-elevated hover:opacity-90 transition-opacity text-base px-8">
                Start Predicting <ArrowRight className="ml-2 h-4 w-4" />
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

      {/* Features */}
      <section className="container py-20 md:py-28">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Intelligent Agriculture, <span className="text-gradient-primary">Simplified</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our platform combines cutting-edge machine learning with agricultural expertise to deliver accurate, actionable insights.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border bg-card p-7 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="gradient-hero rounded-lg p-2.5 w-fit mb-4">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
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
                Data-Driven Farming for a <span className="text-gradient-gold">Better Tomorrow</span>
              </h2>
              <div className="space-y-5">
                {[
                  { step: "01", title: "Input Parameters", desc: "Enter soil type, crop, area, season, and irrigation details." },
                  { step: "02", title: "AI Analysis", desc: "Our ML model processes data against historical patterns and weather forecasts." },
                  { step: "03", title: "Get Results", desc: "Receive yield predictions with confidence scores and optimization tips." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="gradient-hero rounded-lg h-10 w-10 flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-serif font-semibold text-foreground text-lg">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/predict" className="inline-block mt-8">
                <Button className="gradient-hero text-primary-foreground border-0 shadow-soft hover:opacity-90 transition-opacity">
                  Try Prediction Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src={smartFarmer}
                alt="Smart farming with technology"
                className="rounded-2xl shadow-elevated w-full object-cover aspect-square"
              />
              <div className="absolute -bottom-4 -left-4 gradient-gold rounded-xl p-4 shadow-card">
                <div className="text-secondary-foreground font-serif font-bold text-2xl">94%</div>
                <div className="text-secondary-foreground/80 text-sm">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Crops */}
      <section className="container py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Supported Crops
          </h2>
          <p className="text-muted-foreground text-lg">
            Predictions available for major Indian crops
          </p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {crops.map((c, i) => (
            <div
              key={c.name}
              className="rounded-xl border border-border bg-card p-5 text-center shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="text-3xl mb-2">{c.emoji}</div>
              <div className="text-sm font-medium text-foreground">{c.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero">
        <div className="container py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">
            Ready to Optimize Your Yield?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
            Join thousands of farmers using AI to make smarter agricultural decisions.
          </p>
          <Link to="/predict">
            <Button size="lg" className="gradient-gold text-secondary-foreground border-0 shadow-elevated hover:opacity-90 transition-opacity text-base px-8">
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
