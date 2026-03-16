import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { TrendingUp, Sprout, CloudSun, BarChart3, Bug, Shield, Droplets, ThermometerSun } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const yieldData = [
  { crop: "Rice", yield: 2.8, prev: 2.5 },
  { crop: "Wheat", yield: 3.4, prev: 3.1 },
  { crop: "Maize", yield: 2.9, prev: 2.7 },
  { crop: "Cotton", yield: 1.7, prev: 1.5 },
  { crop: "Soybean", yield: 1.3, prev: 1.1 },
  { crop: "Potato", yield: 22.5, prev: 20.1 },
];

const trendData = [
  { year: "2019", yield: 2.2, detection: 45 },
  { year: "2020", yield: 2.4, detection: 120 },
  { year: "2021", yield: 2.3, detection: 280 },
  { year: "2022", yield: 2.6, detection: 520 },
  { year: "2023", yield: 2.8, detection: 890 },
  { year: "2024", yield: 3.1, detection: 1450 },
  { year: "2025", yield: 3.4, detection: 2100 },
];

const diseaseFrequency = [
  { month: "Jan", healthy: 85, diseased: 15 },
  { month: "Feb", healthy: 82, diseased: 18 },
  { month: "Mar", healthy: 78, diseased: 22 },
  { month: "Apr", healthy: 75, diseased: 25 },
  { month: "May", healthy: 80, diseased: 20 },
  { month: "Jun", healthy: 70, diseased: 30 },
  { month: "Jul", healthy: 65, diseased: 35 },
  { month: "Aug", healthy: 60, diseased: 40 },
  { month: "Sep", healthy: 68, diseased: 32 },
  { month: "Oct", healthy: 75, diseased: 25 },
  { month: "Nov", healthy: 82, diseased: 18 },
  { month: "Dec", healthy: 88, diseased: 12 },
];

const distributionData = [
  { name: "Rice", value: 28 },
  { name: "Wheat", value: 22 },
  { name: "Maize", value: 14 },
  { name: "Cotton", value: 10 },
  { name: "Tomato", value: 9 },
  { name: "Potato", value: 8 },
  { name: "Others", value: 9 },
];

const PIE_COLORS = [
  "hsl(142, 45%, 38%)",
  "hsl(38, 60%, 55%)",
  "hsl(25, 40%, 45%)",
  "hsl(200, 60%, 50%)",
  "hsl(0, 60%, 55%)",
  "hsl(280, 45%, 50%)",
  "hsl(150, 30%, 60%)",
];

const summaryCards = [
  { icon: TrendingUp, label: "Avg Yield Increase", value: "+12.5%", color: "text-primary", desc: "vs last year" },
  { icon: Bug, label: "Diseases Detected", value: "2,847", color: "text-destructive", desc: "total scans" },
  { icon: Shield, label: "Healthy Crops Found", value: "68%", color: "text-primary", desc: "of all scans" },
  { icon: Sprout, label: "Crops Analyzed", value: "11", color: "text-chart-green", desc: "species supported" },
];

const topDiseases = [
  { disease: "Rice Blast", crop: "Rice", cases: 342, severity: "High" },
  { disease: "Late Blight", crop: "Potato", cases: 289, severity: "High" },
  { disease: "Fall Armyworm", crop: "Maize", cases: 256, severity: "High" },
  { disease: "Yellow Rust", crop: "Wheat", cases: 198, severity: "Medium" },
  { disease: "Leaf Curl Virus", crop: "Tomato", cases: 176, severity: "High" },
];

const weatherAlerts = [
  { region: "Punjab", alert: "Heavy rain expected — monitor for Rice Blast", type: "warning" },
  { region: "Maharashtra", alert: "High humidity — increased Fall Armyworm risk", type: "danger" },
  { region: "Karnataka", alert: "Optimal conditions for sowing Rabi crops", type: "info" },
];

const Dashboard = () => {
  return (
    <div className="container py-10 md:py-16">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
          Analytics <span className="text-gradient-primary">Dashboard</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Comprehensive overview of crop health, disease trends, yield analytics, and weather-based risk assessment.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {summaryCards.map((card, i) => (
          <Card key={card.label} className="p-5 shadow-soft border-border animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <card.icon className={`h-5 w-5 ${card.color} mb-2`} />
            <div className="text-2xl font-serif font-bold text-foreground">{card.value}</div>
            <div className="text-sm text-muted-foreground">{card.label}</div>
            <div className="text-[10px] text-muted-foreground/60 mt-1">{card.desc}</div>
          </Card>
        ))}
      </div>

      {/* Weather Alerts */}
      <Card className="p-5 shadow-card border-border mb-6 animate-fade-up">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <CloudSun className="h-5 w-5 text-chart-gold" />
          Weather-Based Crop Alerts
        </h3>
        <div className="grid md:grid-cols-3 gap-3">
          {weatherAlerts.map((w, i) => (
            <div key={i} className={`p-3 rounded-lg border ${w.type === 'danger' ? 'border-destructive/30 bg-destructive/5' : w.type === 'warning' ? 'border-secondary/30 bg-secondary/5' : 'border-primary/30 bg-primary/5'}`}>
              <div className="flex items-center gap-2 mb-1">
                {w.type === 'danger' ? <Bug className="h-4 w-4 text-destructive" /> : w.type === 'warning' ? <CloudSun className="h-4 w-4 text-chart-gold" /> : <Sprout className="h-4 w-4 text-primary" />}
                <span className="text-sm font-semibold text-foreground">{w.region}</span>
              </div>
              <p className="text-xs text-muted-foreground">{w.alert}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6 shadow-card border-border">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Crop-wise Yield Comparison (tonnes/ha)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={yieldData.filter(d => d.yield < 10)}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(45, 15%, 85%)" />
              <XAxis dataKey="crop" tick={{ fontSize: 12, fill: "hsl(150, 10%, 40%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(150, 10%, 40%)" }} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(45, 15%, 85%)", fontSize: 13 }} />
              <Bar dataKey="prev" fill="hsl(45, 15%, 80%)" radius={[4, 4, 0, 0]} name="Previous Year" />
              <Bar dataKey="yield" fill="hsl(142, 45%, 28%)" radius={[4, 4, 0, 0]} name="Current Year" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 shadow-card border-border">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Disease Detection Trend (Monthly)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={diseaseFrequency}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(45, 15%, 85%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(150, 10%, 40%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(150, 10%, 40%)" }} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(45, 15%, 85%)", fontSize: 13 }} />
              <Area type="monotone" dataKey="healthy" stackId="1" stroke="hsl(142, 45%, 38%)" fill="hsl(142, 45%, 38%)" fillOpacity={0.3} name="Healthy %" />
              <Area type="monotone" dataKey="diseased" stackId="2" stroke="hsl(0, 60%, 55%)" fill="hsl(0, 60%, 55%)" fillOpacity={0.3} name="Diseased %" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6 shadow-card border-border">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Yield + Detection Growth Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(45, 15%, 85%)" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: "hsl(150, 10%, 40%)" }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12, fill: "hsl(150, 10%, 40%)" }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: "hsl(150, 10%, 40%)" }} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(45, 15%, 85%)", fontSize: 13 }} />
              <Line yAxisId="left" type="monotone" dataKey="yield" stroke="hsl(142, 45%, 28%)" strokeWidth={2.5} dot={{ fill: "hsl(142, 45%, 28%)", r: 4 }} name="Yield (t/ha)" />
              <Line yAxisId="right" type="monotone" dataKey="detection" stroke="hsl(38, 60%, 55%)" strokeWidth={2} dot={{ fill: "hsl(38, 60%, 55%)", r: 3 }} name="Detections" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 shadow-card border-border">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Crop Analysis Distribution</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={distributionData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={3}>
                {distributionData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(45, 15%, 85%)", fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {distributionData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                {d.name} ({d.value}%)
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Diseases */}
        <Card className="p-6 shadow-card border-border">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bug className="h-5 w-5 text-destructive" />
            Top Detected Diseases
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-2.5 font-medium">Disease</th>
                  <th className="text-left py-2.5 font-medium">Crop</th>
                  <th className="text-left py-2.5 font-medium">Cases</th>
                  <th className="text-left py-2.5 font-medium">Severity</th>
                </tr>
              </thead>
              <tbody>
                {topDiseases.map((row, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-2.5 font-medium text-foreground">{row.disease}</td>
                    <td className="py-2.5 text-muted-foreground">{row.crop}</td>
                    <td className="py-2.5 text-foreground font-medium">{row.cases}</td>
                    <td className="py-2.5">
                      <Badge variant={row.severity === "High" ? "destructive" : "secondary"} className="text-[10px]">
                        {row.severity}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Predictions */}
        <Card className="p-6 shadow-card border-border">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Recent Yield Predictions
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-2.5 font-medium">Crop</th>
                  <th className="text-left py-2.5 font-medium">State</th>
                  <th className="text-left py-2.5 font-medium">Area</th>
                  <th className="text-left py-2.5 font-medium">Yield</th>
                  <th className="text-left py-2.5 font-medium">Conf.</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { crop: "Rice", state: "Punjab", area: "12 ha", yield: "33.6t", confidence: "95%" },
                  { crop: "Wheat", state: "Haryana", area: "8 ha", yield: "27.2t", confidence: "92%" },
                  { crop: "Maize", state: "Karnataka", area: "5 ha", yield: "14.0t", confidence: "89%" },
                  { crop: "Cotton", state: "Gujarat", area: "15 ha", yield: "24.0t", confidence: "91%" },
                  { crop: "Soybean", state: "MP", area: "10 ha", yield: "12.0t", confidence: "87%" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-2.5 font-medium text-foreground">{row.crop}</td>
                    <td className="py-2.5 text-muted-foreground">{row.state}</td>
                    <td className="py-2.5 text-muted-foreground">{row.area}</td>
                    <td className="py-2.5 text-foreground font-medium">{row.yield}</td>
                    <td className="py-2.5">
                      <span className="text-primary font-medium">{row.confidence}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
