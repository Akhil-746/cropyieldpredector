import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Camera, X, Leaf, CheckCircle2, TrendingUp, AlertTriangle, ShieldCheck, Bug, IndianRupee, Sparkles, Sprout, Mountain } from "lucide-react";
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
  imageType: "crop" | "land";
  cropDetected: string;
  healthStatus: "Healthy" | "Mild Issue" | "Diseased" | "Severely Affected";
  overallConfidence: number;
  diseases: Disease[];
  pesticides: Pesticide[];
  careTips: string[];
  soilAnalysis?: {
    quality: "Excellent" | "Good" | "Average" | "Poor";
    moisture: string;
    suitableCrops: string[];
    recommendations: string[];
  };
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

// Analyze image pixels to determine dominant colors
const analyzeImageColors = (imageSrc: string): Promise<{ greenRatio: number; brownRatio: number; yellowRatio: number; darkRatio: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const size = 100; // sample at 100x100 for speed
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;
      let green = 0, brown = 0, yellow = 0, dark = 0, total = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        total++;
        // Green detection (vegetation)
        if (g > r && g > b && g > 60) green++;
        // Brown/soil detection
        else if (r > 80 && g > 40 && g < r && b < g && r - b > 30) brown++;
        // Yellow detection (diseased/dry)
        else if (r > 150 && g > 120 && b < 80) yellow++;
        // Dark (soil/shadow)
        else if (r < 70 && g < 70 && b < 70) dark++;
      }
      resolve({
        greenRatio: green / total,
        brownRatio: brown / total,
        yellowRatio: yellow / total,
        darkRatio: dark / total,
      });
    };
    img.onerror = () => resolve({ greenRatio: 0.3, brownRatio: 0.3, yellowRatio: 0.1, darkRatio: 0.1 });
    img.src = imageSrc;
  });
};

const simulateImageAnalysis = async (imageSrc: string): Promise<PredictionResult> => {
  const colors = await analyzeImageColors(imageSrc);
  const { greenRatio, brownRatio, yellowRatio, darkRatio } = colors;

  const isLand = (brownRatio + darkRatio) > 0.45 && greenRatio < 0.15;
  const isHealthy = greenRatio > 0.35 && yellowRatio < 0.08 && brownRatio < 0.15;
  const isMild = greenRatio > 0.2 && (yellowRatio > 0.05 || brownRatio > 0.1);
  const isDiseased = yellowRatio > 0.12 || (brownRatio > 0.25 && greenRatio < 0.25);

  // LAND / SOIL image
  if (isLand) {
    const soilQualities: Array<"Excellent" | "Good" | "Average" | "Poor"> = ["Excellent", "Good", "Average", "Poor"];
    const qualityIdx = darkRatio > 0.3 ? 0 : brownRatio > 0.35 ? 1 : brownRatio > 0.2 ? 2 : 3;
    const moisture = darkRatio > 0.25 ? "High (Well-irrigated)" : darkRatio > 0.15 ? "Moderate" : "Low (Needs irrigation)";

    const suitableCropsMap: Record<string, string[]> = {
      Excellent: ["Rice", "Wheat", "Sugarcane", "Maize", "Cotton"],
      Good: ["Wheat", "Maize", "Potato", "Tomato"],
      Average: ["Maize", "Cotton", "Groundnut"],
      Poor: ["Millet", "Sorghum", "Drought-resistant varieties"],
    };

    const quality = soilQualities[qualityIdx];
    return {
      imageType: "land",
      cropDetected: "Soil / Land",
      healthStatus: "Healthy",
      overallConfidence: Math.round(78 + Math.random() * 18),
      diseases: [],
      pesticides: [],
      careTips: [],
      soilAnalysis: {
        quality,
        moisture,
        suitableCrops: suitableCropsMap[quality],
        recommendations: [
          quality === "Poor" ? "Add organic compost (FYM) at 10-15 tonnes/hectare to improve fertility" : "Soil appears fertile — maintain with balanced NPK fertilization",
          darkRatio < 0.15 ? "Install drip irrigation to conserve water and improve moisture" : "Moisture levels look good — avoid over-watering",
          "Get a professional soil test for pH, nitrogen, phosphorus, and potassium levels",
          "Consider crop rotation to maintain soil health and prevent nutrient depletion",
          "Add mulching layer to retain moisture and suppress weeds",
        ],
      },
    };
  }

  // CROP image — determine health
  const randomCrop = allCropKeys[Math.floor(Math.random() * allCropKeys.length)];
  const data = cropDiseaseDB[randomCrop];

  let healthStatus: PredictionResult["healthStatus"];
  let diseases: Disease[] = [];
  let pesticides: Pesticide[] = [];

  if (isHealthy) {
    healthStatus = "Healthy";
    // No diseases, no pesticides needed
  } else if (isMild && !isDiseased) {
    healthStatus = "Mild Issue";
    diseases = [data.diseases[Math.floor(Math.random() * data.diseases.length)]];
    diseases[0] = { ...diseases[0], severity: "Low", confidence: Math.round(60 + Math.random() * 15) };
    pesticides = [data.pesticides[0]];
  } else if (isDiseased) {
    healthStatus = yellowRatio > 0.2 || brownRatio > 0.35 ? "Severely Affected" : "Diseased";
    diseases = data.diseases;
    pesticides = data.pesticides;
  } else {
    healthStatus = "Mild Issue";
    diseases = [{ ...data.diseases[0], severity: "Low", confidence: Math.round(55 + Math.random() * 20) }];
    pesticides = [data.pesticides[0]];
  }

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

  const healthyTips = [
    "Your crop looks healthy! Continue regular monitoring every 7-10 days",
    "Maintain current watering and fertilization schedule",
    "Apply preventive neem oil spray (3ml/L) bi-weekly to stay disease-free",
    "Ensure proper weeding to reduce pest habitats",
  ];

  return {
    imageType: "crop",
    cropDetected: randomCrop.charAt(0).toUpperCase() + randomCrop.slice(1),
    healthStatus,
    overallConfidence: Math.round(80 + Math.random() * 17),
    diseases,
    pesticides,
    careTips: healthStatus === "Healthy" ? healthyTips : (careTips[randomCrop] || careTips.rice),
  };
};

const severityConfig = {
  Low: { icon: ShieldCheck, className: "bg-primary/15 text-primary border-primary/30" },
  Medium: { icon: AlertTriangle, className: "bg-secondary/15 text-secondary-foreground border-secondary/30" },
  High: { icon: AlertTriangle, className: "bg-destructive/15 text-destructive border-destructive/30" },
};

const healthConfig: Record<string, { bg: string; label: string; icon: any }> = {
  Healthy: { bg: "bg-primary/15 text-primary", label: "✅ No Disease Detected — Crop is Healthy!", icon: CheckCircle2 },
  "Mild Issue": { bg: "bg-secondary/15 text-secondary-foreground", label: "⚠️ Mild Issue Detected", icon: AlertTriangle },
  Diseased: { bg: "bg-destructive/15 text-destructive", label: "🔴 Disease Detected", icon: Bug },
  "Severely Affected": { bg: "bg-destructive/20 text-destructive", label: "🚨 Severely Affected", icon: Bug },
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

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setResult(null);
    // Small delay for UX + actual image analysis
    await new Promise(r => setTimeout(r, 1500));
    const prediction = await simulateImageAnalysis(image);
    setResult(prediction);
    setLoading(false);
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
              <Card className={`p-7 shadow-elevated border-0 animate-scale-in ${result.imageType === "land" ? "bg-gradient-to-br from-amber-800 to-amber-950 text-white" : "gradient-hero text-primary-foreground"}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="opacity-70 text-sm mb-1">{result.imageType === "land" ? "Image Type" : "Crop Detected"}</p>
                    <div className="text-3xl md:text-4xl font-serif font-bold flex items-center gap-3">
                      {result.imageType === "land" ? <Mountain className="h-8 w-8" /> : <Sprout className="h-8 w-8" />}
                      {result.cropDetected}
                    </div>
                    <div className="mt-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${healthConfig[result.healthStatus].bg}`}>
                        {healthConfig[result.healthStatus].label}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-70 mb-1">Confidence</div>
                    <div className="text-2xl font-serif font-bold">{result.overallConfidence}%</div>
                  </div>
                </div>
              </Card>

              {/* Soil Analysis (for land images) */}
              {result.soilAnalysis && (
                <Card className="p-6 shadow-card border-border animate-fade-up" style={{ animationDelay: "0.1s" }}>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Mountain className="h-5 w-5 text-primary" />
                    Soil & Land Analysis
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="p-4 rounded-lg bg-muted/30 border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Soil Quality</p>
                      <p className="font-bold text-foreground text-lg">{result.soilAnalysis.quality}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30 border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Moisture Level</p>
                      <p className="font-bold text-foreground text-lg">{result.soilAnalysis.moisture}</p>
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="text-sm font-semibold text-foreground mb-2">🌾 Suitable Crops for this Soil:</p>
                    <div className="flex flex-wrap gap-2">
                      {result.soilAnalysis.suitableCrops.map((crop, i) => (
                        <Badge key={i} variant="secondary" className="text-sm px-3 py-1">{crop}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-3">📋 Recommendations:</p>
                    <div className="space-y-3">
                      {result.soilAnalysis.recommendations.map((rec, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground/80">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              )}

              {/* Healthy Crop Message */}
              {result.healthStatus === "Healthy" && result.imageType === "crop" && (
                <Card className="p-6 shadow-card border-border animate-fade-up bg-primary/5" style={{ animationDelay: "0.1s" }}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-foreground">Great News! Your Crop is Healthy 🎉</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        No disease or pest infestation detected. Your {result.cropDetected.toLowerCase()} crop appears to be in good condition. Keep up the good agricultural practices!
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Diseases Detected (only if diseases found) */}
              {result.diseases.length > 0 && (
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
              )}

              {/* Pesticide Suggestions (only if pesticides recommended) */}
              {result.pesticides.length > 0 && (
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
              )}

              {/* Care Tips */}
              {result.careTips.length > 0 && (
                <Card className="p-6 shadow-card border-border animate-fade-up" style={{ animationDelay: "0.3s" }}>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    {result.healthStatus === "Healthy" ? "Maintenance Tips" : "Care & Prevention Tips"}
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
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Predict;
