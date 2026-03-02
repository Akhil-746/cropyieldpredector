import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, CheckCircle2, Leaf, TrendingUp, Droplets, ThermometerSun } from "lucide-react";

const crops = ["Rice", "Wheat", "Maize", "Sugarcane", "Cotton", "Soybean", "Groundnut", "Pulses"];
const seasons = ["Kharif", "Rabi", "Zaid"];
const soilTypes = ["Alluvial", "Black (Regur)", "Red & Yellow", "Laterite", "Desert (Arid)", "Mountain"];
const states = ["Andhra Pradesh", "Bihar", "Gujarat", "Haryana", "Karnataka", "Madhya Pradesh", "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu", "Uttar Pradesh", "West Bengal"];

interface PredictionResult {
  yield: number;
  confidence: number;
  recommendations: string[];
  riskLevel: string;
}

const simulatePrediction = (crop: string, area: number): PredictionResult => {
  const baseYields: Record<string, number> = {
    Rice: 2.5, Wheat: 3.2, Maize: 2.8, Sugarcane: 70, Cotton: 1.6, Soybean: 1.2, Groundnut: 1.8, Pulses: 0.9,
  };
  const base = baseYields[crop] || 2.0;
  const variation = 0.8 + Math.random() * 0.4;
  return {
    yield: Math.round(base * variation * area * 100) / 100,
    confidence: Math.round(88 + Math.random() * 8),
    riskLevel: Math.random() > 0.6 ? "Low" : Math.random() > 0.3 ? "Medium" : "High",
    recommendations: [
      `Optimal sowing window: ${crop === "Rice" || crop === "Maize" ? "June-July" : "October-November"}`,
      "Consider drip irrigation to improve water use efficiency by 30-40%",
      `Apply ${Math.round(80 + Math.random() * 40)} kg/ha nitrogen for best results`,
      "Monitor for pest activity during flowering stage",
    ],
  };
};

const Predict = () => {
  const [crop, setCrop] = useState("");
  const [season, setSeason] = useState("");
  const [soil, setSoil] = useState("");
  const [state, setState] = useState("");
  const [area, setArea] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [temperature, setTemperature] = useState("");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = () => {
    if (!crop || !area) return;
    setLoading(true);
    setTimeout(() => {
      setResult(simulatePrediction(crop, parseFloat(area)));
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="container py-10 md:py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
          Crop Yield <span className="text-gradient-primary">Prediction</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Enter your farming parameters to get an AI-powered yield forecast with optimization recommendations.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
        {/* Form */}
        <Card className="lg:col-span-2 p-6 shadow-card border-border">
          <h3 className="font-serif text-xl font-semibold text-foreground mb-5">Input Parameters</h3>
          <div className="space-y-4">
            <div>
              <Label className="text-foreground">Crop Type *</Label>
              <Select value={crop} onValueChange={setCrop}>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select crop" /></SelectTrigger>
                <SelectContent>
                  {crops.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-foreground">Season</Label>
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select season" /></SelectTrigger>
                <SelectContent>
                  {seasons.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-foreground">Soil Type</Label>
              <Select value={soil} onValueChange={setSoil}>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select soil" /></SelectTrigger>
                <SelectContent>
                  {soilTypes.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-foreground">State</Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select state" /></SelectTrigger>
                <SelectContent>
                  {states.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-foreground">Area (hectares) *</Label>
              <Input type="number" placeholder="e.g. 5" value={area} onChange={(e) => setArea(e.target.value)} className="mt-1.5" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-foreground">Rainfall (mm)</Label>
                <Input type="number" placeholder="e.g. 800" value={rainfall} onChange={(e) => setRainfall(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label className="text-foreground">Temp (°C)</Label>
                <Input type="number" placeholder="e.g. 28" value={temperature} onChange={(e) => setTemperature(e.target.value)} className="mt-1.5" />
              </div>
            </div>
            <Button
              onClick={handlePredict}
              disabled={!crop || !area || loading}
              className="w-full gradient-hero text-primary-foreground border-0 shadow-soft hover:opacity-90 transition-opacity mt-2"
            >
              {loading ? "Analyzing..." : "Predict Yield"} {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </Card>

        {/* Results */}
        <div className="lg:col-span-3 space-y-6">
          {!result ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] rounded-xl border border-dashed border-border bg-card/50 p-10 text-center">
              <Leaf className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <h3 className="font-serif text-xl text-muted-foreground mb-2">No Prediction Yet</h3>
              <p className="text-muted-foreground/70 text-sm max-w-sm">
                Fill in the parameters on the left and click "Predict Yield" to get your AI-powered forecast.
              </p>
            </div>
          ) : (
            <>
              {/* Main Result */}
              <Card className="gradient-hero text-primary-foreground p-7 shadow-elevated border-0 animate-scale-in">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-primary-foreground/70 text-sm mb-1">Predicted Yield for {crop}</p>
                    <div className="text-4xl md:text-5xl font-serif font-bold">
                      {result.yield} <span className="text-2xl font-sans font-normal text-primary-foreground/70">tonnes</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-primary-foreground/70 mb-1">Confidence</div>
                    <div className="text-2xl font-serif font-bold">{result.confidence}%</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-5 pt-5 border-t border-primary-foreground/20">
                  <div className="flex items-center gap-2">
                    <ThermometerSun className="h-4 w-4" />
                    <span className="text-sm">{temperature || "28"}°C</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4" />
                    <span className="text-sm">{rainfall || "800"}mm</span>
                  </div>
                  <div className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${
                    result.riskLevel === "Low"
                      ? "bg-primary-foreground/20"
                      : result.riskLevel === "Medium"
                      ? "bg-secondary/30"
                      : "bg-destructive/30"
                  }`}>
                    {result.riskLevel} Risk
                  </div>
                </div>
              </Card>

              {/* Recommendations */}
              <Card className="p-6 shadow-card border-border animate-fade-up" style={{ animationDelay: "0.15s" }}>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Optimization Recommendations
                </h3>
                <div className="space-y-3">
                  {result.recommendations.map((rec, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/80">{rec}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Predict;
