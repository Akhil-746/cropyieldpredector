import { Card } from "@/components/ui/card";
import { Code, Database, Brain, Layers, Github, Linkedin } from "lucide-react";

const techStack = [
  { icon: Code, name: "React 18 + Vite", desc: "Modern frontend with fast HMR" },
  { icon: Database, name: "Node.js + Express", desc: "RESTful API backend" },
  { icon: Brain, name: "ML Model", desc: "Custom regression for yield prediction" },
  { icon: Layers, name: "Responsive Design", desc: "Mobile-first, accessible UI" },
];

const team = [
  { name: "Team Lead", role: "Full-Stack Developer" },
  { name: "ML Engineer", role: "Model Development" },
  { name: "Frontend Dev", role: "UI/UX Design" },
  { name: "Backend Dev", role: "API & Database" },
  { name: "Data Analyst", role: "Data Processing" },
  { name: "Researcher", role: "Domain Expert" },
];

const About = () => {
  return (
    <div className="container py-10 md:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm text-accent-foreground mb-4">
            SIH 25044
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            About <span className="text-gradient-primary">CropYield AI</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Built for the Smart India Hackathon 2025, CropYield AI addresses the critical challenge of crop yield prediction and optimization using artificial intelligence and machine learning.
          </p>
        </div>

        {/* Problem Statement */}
        <Card className="p-7 shadow-card border-border mb-8 animate-fade-up">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Problem Statement</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Indian agriculture faces significant challenges in predicting crop yields accurately. Farmers often rely on traditional methods and intuition, leading to suboptimal resource allocation, crop losses, and reduced income. There is a pressing need for a data-driven solution that can:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Predict crop yields based on multiple environmental and soil parameters",
              "Provide actionable optimization recommendations",
              "Help farmers make informed decisions about crop selection and resource allocation",
              "Reduce waste and improve agricultural productivity nationwide",
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="gradient-hero rounded-full h-2 w-2 mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
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

        {/* Team */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-5 text-center">Team Tech Titans</h2>
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
        </Card>
      </div>
    </div>
  );
};

export default About;
