import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Camera, X, Leaf, CheckCircle2, TrendingUp, AlertTriangle, ShieldCheck, Bug, IndianRupee, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Disease {
  name: string;
  confidence: number;
  severity: "Low" | "Medium" | "High";
  description: string;
}

interface Pesticide {
  name: string;
  brand: string;
  type: string;
  dosage: string;
  cost: string;
  rating: number;
}

interface PredictionResult {
  cropDetected: string;
  healthStatus: "Healthy" | "Mild Issue" | "Diseased" | "Severely Affected";
  overallConfidence: number;
  diseases: Disease[];
  pesticides: Pesticide[];
  careTips: string[];
}

const cropDiseaseDB: Record<string, { diseases: Disease[]; pesticides: Pesticide[] }> = {
  rice: {
    diseases: [
      { name: "Rice Blast", confidence: 92, severity: "High", description: "Fungal disease causing diamond-shaped lesions on leaves, reducing grain yield significantly." },
      { name: "Brown Spot", confidence: 78, severity: "Medium", description: "Causes oval brown spots on leaves, often linked to nutrient-deficient soils." },
    ],
    pesticides: [
      { name: "Tricyclazole 75% WP", brand: "Baan (Dow)", type: "Fungicide", dosage: "0.6 g/L water", cost: "₹320 / 100g", rating: 4.5 },
      { name: "Carbendazim 50% WP", brand: "Bavistin (BASF)", type: "Fungicide", dosage: "1 g/L water", cost: "₹180 / 100g", rating: 4.2 },
      { name: "Isoprothiolane 40% EC", brand: "Fujione (Bayer)", type: "Fungicide", dosage: "1.5 ml/L water", cost: "₹550 / 250ml", rating: 4.0 },
    ],
  },
  wheat: {
    diseases: [
      { name: "Yellow Rust", confidence: 88, severity: "High", description: "Stripe-like yellow pustules on leaves. Spreads rapidly in cool, humid conditions." },
      { name: "Loose Smut", confidence: 72, severity: "Medium", description: "Replaces grain heads with black powdery spores, causing significant yield loss." },
    ],
    pesticides: [
      { name: "Propiconazole 25% EC", brand: "Tilt (Syngenta)", type: "Fungicide", dosage: "1 ml/L water", cost: "₹480 / 250ml", rating: 4.6 },
      { name: "Tebuconazole 25.9% EC", brand: "Folicur (Bayer)", type: "Fungicide", dosage: "1 ml/L water", cost: "₹620 / 250ml", rating: 4.4 },
      { name: "Mancozeb 75% WP", brand: "Dithane M-45", type: "Fungicide", dosage: "2.5 g/L water", cost: "₹200 / 250g", rating: 4.1 },
    ],
  },
  maize: {
    diseases: [
      { name: "Fall Armyworm", confidence: 95, severity: "High", description: "Devastating pest that feeds on leaves and cobs, spreading rapidly across fields." },
      { name: "Northern Leaf Blight", confidence: 80, severity: "Medium", description: "Cigar-shaped gray-green lesions on leaves, reducing photosynthesis." },
    ],
    pesticides: [
      { name: "Emamectin Benzoate 5% SG", brand: "Proclaim (Syngenta)", type: "Insecticide", dosage: "0.4 g/L water", cost: "₹450 / 100g", rating: 4.7 },
      { name: "Spinetoram 11.7% SC", brand: "Delegate (Dow)", type: "Insecticide", dosage: "0.5 ml/L water", cost: "₹780 / 100ml", rating: 4.5 },
      { name: "Chlorantraniliprole 18.5% SC", brand: "Coragen (FMC)", type: "Insecticide", dosage: "0.4 ml/L water", cost: "₹550 / 30ml", rating: 4.8 },
    ],
  },
  cotton: {
    diseases: [
      { name: "Pink Bollworm", confidence: 90, severity: "High", description: "Larvae bore into cotton bolls, destroying fibers and reducing quality." },
      { name: "Whitefly Infestation", confidence: 85, severity: "Medium", description: "Sap-sucking pest causing yellowing, leaf curl, and sooty mold." },
    ],
    pesticides: [
      { name: "Cypermethrin 25% EC", brand: "Cymbush (Syngenta)", type: "Insecticide", dosage: "1 ml/L water", cost: "₹280 / 250ml", rating: 4.0 },
      { name: "Acetamiprid 20% SP", brand: "Manik (UPL)", type: "Insecticide", dosage: "0.3 g/L water", cost: "₹350 / 100g", rating: 4.3 },
      { name: "Neem Oil 1500 PPM", brand: "Neem Azal", type: "Bio-pesticide", dosage: "3 ml/L water", cost: "₹220 / 250ml", rating: 3.8 },
    ],
  },
  tomato: {
    diseases: [
      { name: "Early Blight", confidence: 91, severity: "High", description: "Concentric ring-shaped brown lesions on older leaves, spreading upward." },
      { name: "Leaf Curl Virus", confidence: 82, severity: "High", description: "Transmitted by whiteflies; causes curling, yellowing, and stunted growth." },
    ],
    pesticides: [
      { name: "Mancozeb 75% WP", brand: "Dithane M-45", type: "Fungicide", dosage: "2.5 g/L water", cost: "₹200 / 250g", rating: 4.1 },
      { name: "Imidacloprid 17.8% SL", brand: "Confidor (Bayer)", type: "Insecticide", dosage: "0.3 ml/L water", cost: "₹380 / 100ml", rating: 4.4 },
      { name: "Copper Oxychloride 50% WP", brand: "Blitox (Tata)", type: "Fungicide", dosage: "3 g/L water", cost: "₹250 / 250g", rating: 4.0 },
    ],
  },
  potato: {
    diseases: [
      { name: "Late Blight", confidence: 94, severity: "High", description: "Water-soaked lesions turning brown-black; white mold underneath. Highly destructive." },
      { name: "Black Scurf", confidence: 70, severity: "Low", description: "Dark, irregular sclerotia on tuber surface affecting market value." },
    ],
    pesticides: [
      { name: "Metalaxyl 8% + Mancozeb 64% WP", brand: "Ridomil Gold (Syngenta)", type: "Fungicide", dosage: "2.5 g/L water", cost: "₹680 / 250g", rating: 4.7 },
      { name: "Cymoxanil 8% + Mancozeb 64% WP", brand: "Curzate M8 (DuPont)", type: "Fungicide", dosage: "3 g/L water", cost: "₹520 / 250g", rating: 4.3 },
      { name: "Chlorothalonil 75% WP", brand: "Kavach (Syngenta)", type: "Fungicide", dosage: "2 g/L water", cost: "₹350 / 250g", rating: 4.0 },
    ],
  },
};

const allCropKeys = Object.keys(cropDiseaseDB);

const simulateImageAnalysis = (): PredictionResult => {
  const randomCrop = allCropKeys[Math.floor(Math.random() * allCropKeys.length)];
  const data = cropDiseaseDB[randomCrop];
  const statuses: PredictionResult["healthStatus"][] = ["Healthy", "Mild Issue", "Diseased", "Severely Affected"];
  const status = statuses[1 + Math.floor(Math.random() * 3)]; // skip "Healthy" for demo

  const careTips: Record<string, string[]> = {
    rice: [
      "Maintain 2-3 cm standing water during tillering stage",
      "Apply potash fertilizer before panicle initiation",
      "Use yellow sticky traps for monitoring stem borers",
      "Ensure proper spacing (20x15 cm) for air circulation",
    ],
    wheat: [
      "Irrigate at crown root initiation (21 days after sowing)",
      "Apply first dose of nitrogen at sowing time",
      "Monitor for aphids during ear-head emergence",
      "Avoid late sowing to reduce rust incidence",
    ],
    maize: [
      "Earthing up at 30-35 days to support root anchorage",
      "Apply zinc sulfate at 25 kg/ha if deficiency observed",
      "Scout for armyworm early morning or late evening",
      "Ensure proper drainage to avoid waterlogging",
    ],
    cotton: [
      "Remove and destroy affected bolls immediately",
      "Install pheromone traps at 5/ha for monitoring",
      "Spray neem oil as preventive measure every 15 days",
      "Maintain field hygiene by removing crop debris",
    ],
    tomato: [
      "Stake plants to improve air circulation",
      "Mulch with straw to prevent soil-borne diseases",
      "Remove infected leaves immediately and destroy",
      "Use drip irrigation to avoid wetting foliage",
    ],
    potato: [
      "Hill up soil around plants to protect tubers from light",
      "Avoid overhead irrigation during humid weather",
      "Use certified disease-free seed tubers",
      "Apply prophylactic fungicide spray before disease onset",
    ],
  };

  return {
    cropDetected: randomCrop.charAt(0).toUpperCase() + randomCrop.slice(1),
    healthStatus: status,
    overallConfidence: Math.round(85 + Math.random() * 12),
    diseases: data.diseases,
    pesticides: data.pesticides,
    careTips: careTips[randomCrop] || careTips.rice,
  };
};

const severityConfig = {
  Low: { icon: ShieldCheck, className: "bg-primary/15 text-primary border-primary/30" },
  Medium: { icon: AlertTriangle, className: "bg-secondary/15 text-secondary-foreground border-secondary/30" },
  High: { icon: AlertTriangle, className: "bg-destructive/15 text-destructive border-destructive/30" },
};

const healthConfig: Record<string, string> = {
  Healthy: "bg-primary/15 text-primary",
  "Mild Issue": "bg-secondary/15 text-secondary-foreground",
  Diseased: "bg-destructive/15 text-destructive",
  "Severely Affected": "bg-destructive/20 text-destructive",
};

const Predict = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = () => {
    if (!image) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(simulateImageAnalysis());
      setLoading(false);
    }, 2500);
  };

  const clearImage = () => {
    setImage(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const renderStars = (rating: number) => {
    return "★".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "½" : "") + "☆".repeat(5 - Math.ceil(rating));
  };

  return (
    <div className="container py-10 md:py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
          Crop Disease <span className="text-gradient-primary">Detection</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Upload a photo of your crop leaf or plant — our AI will identify diseases and suggest effective pesticides with costs.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
        {/* Upload Section */}
        <Card className="lg:col-span-2 p-6 shadow-card border-border h-fit">
          <h3 className="font-serif text-xl font-semibold text-foreground mb-5 flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Upload Crop Image
          </h3>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />

          {!image ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-primary/30 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all min-h-[260px] group"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="h-7 w-7 text-primary" />
              </div>
              <p className="font-medium text-foreground mb-1">Click to upload</p>
              <p className="text-sm text-muted-foreground text-center">
                Take a photo or upload an image of your crop leaf, plant, or field
              </p>
              <p className="text-xs text-muted-foreground/60 mt-3">
                JPG, PNG, WEBP • Max 10MB
              </p>
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden border border-border">
              <img src={image} alt="Uploaded crop" className="w-full h-64 object-cover" />
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full p-1.5 hover:bg-background transition-colors"
              >
                <X className="h-4 w-4 text-foreground" />
              </button>
            </div>
          )}

          <Button
            onClick={handleAnalyze}
            disabled={!image || loading}
            className="w-full gradient-hero text-primary-foreground border-0 shadow-soft hover:opacity-90 transition-opacity mt-5"
          >
            {loading ? "Analyzing..." : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Analyze & Detect Diseases
              </>
            )}
          </Button>

          {image && !result && !loading && (
            <p className="text-xs text-muted-foreground text-center mt-3">
              Click analyze to detect diseases and get pesticide recommendations
            </p>
          )}
        </Card>

        {/* Results */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px] rounded-xl border border-border bg-card/50">
              <LoadingSpinner />
            </div>
          ) : !result ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] rounded-xl border border-dashed border-border bg-card/50 p-10 text-center">
              <Leaf className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <h3 className="font-serif text-xl text-muted-foreground mb-2">No Analysis Yet</h3>
              <p className="text-muted-foreground/70 text-sm max-w-sm">
                Upload a crop image and click "Analyze" to get disease detection results with pesticide suggestions.
              </p>
            </div>
          ) : (
            <>
              {/* Detection Summary */}
              <Card className="gradient-hero text-primary-foreground p-7 shadow-elevated border-0 animate-scale-in">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-primary-foreground/70 text-sm mb-1">Crop Detected</p>
                    <div className="text-3xl md:text-4xl font-serif font-bold">{result.cropDetected}</div>
                    <div className="mt-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${healthConfig[result.healthStatus]}`}>
                        {result.healthStatus}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-primary-foreground/70 mb-1">Confidence</div>
                    <div className="text-2xl font-serif font-bold">{result.overallConfidence}%</div>
                  </div>
                </div>
              </Card>

              {/* Diseases Detected */}
              <Card className="p-6 shadow-card border-border animate-fade-up" style={{ animationDelay: "0.1s" }}>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Bug className="h-5 w-5 text-destructive" />
                  Diseases Detected
                </h3>
                <div className="space-y-4">
                  {result.diseases.map((disease, i) => {
                    const sev = severityConfig[disease.severity];
                    return (
                      <div key={i} className="p-4 rounded-lg border border-border bg-muted/30">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-foreground">{disease.name}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {disease.confidence}% match
                            </Badge>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1 ${sev.className}`}>
                              <sev.icon className="h-3 w-3" />
                              {disease.severity}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{disease.description}</p>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Pesticide Suggestions */}
              <Card className="p-6 shadow-card border-border animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <IndianRupee className="h-5 w-5 text-primary" />
                  Recommended Pesticides & Costs
                </h3>
                <div className="space-y-4">
                  {result.pesticides.map((pest, i) => (
                    <div key={i} className="p-4 rounded-lg border border-border bg-card hover:shadow-soft transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">{pest.name}</h4>
                          <p className="text-xs text-muted-foreground">{pest.brand}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary text-lg">{pest.cost}</div>
                          <div className="text-xs text-secondary-foreground">{renderStars(pest.rating)}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">{pest.type}</Badge>
                        <Badge variant="outline" className="text-xs">Dosage: {pest.dosage}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Care Tips */}
              <Card className="p-6 shadow-card border-border animate-fade-up" style={{ animationDelay: "0.3s" }}>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Care & Prevention Tips
                </h3>
                <div className="space-y-3">
                  {result.careTips.map((tip, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/80">{tip}</p>
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
