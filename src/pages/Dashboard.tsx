import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Sprout, CloudSun, BarChart3 } from "lucide-react";

const yieldData = [
  { crop: "Rice", yield: 2.8, prev: 2.5 },
  { crop: "Wheat", yield: 3.4, prev: 3.1 },
  { crop: "Maize", yield: 2.9, prev: 2.7 },
  { crop: "Sugarcane", yield: 72, prev: 68 },
  { crop: "Cotton", yield: 1.7, prev: 1.5 },
  { crop: "Soybean", yield: 1.3, prev: 1.1 },
];

const trendData = [
  { year: "2019", yield: 2.2 },
  { year: "2020", yield: 2.4 },
  { year: "2021", yield: 2.3 },
  { year: "2022", yield: 2.6 },
  { year: "2023", yield: 2.8 },
  { year: "2024", yield: 3.1 },
  { year: "2025", yield: 3.4 },
];

const distributionData = [
  { name: "Rice", value: 35 },
  { name: "Wheat", value: 28 },
  { name: "Maize", value: 15 },
  { name: "Cotton", value: 12 },
  { name: "Others", value: 10 },
];

const PIE_COLORS = [
  "hsl(142, 45%, 38%)",
  "hsl(38, 60%, 55%)",
  "hsl(25, 40%, 45%)",
  "hsl(200, 60%, 50%)",
  "hsl(0, 60%, 55%)",
];

const summaryCards = [
  { icon: TrendingUp, label: "Avg Yield Increase", value: "+12.5%", color: "text-primary" },
  { icon: Sprout, label: "Active Predictions", value: "1,247", color: "text-chart-green" },
  { icon: CloudSun, label: "Weather Alerts", value: "3", color: "text-chart-gold" },
  { icon: BarChart3, label: "Regions Covered", value: "28", color: "text-chart-sky" },
];

const Dashboard = () => {
  return (
    <div className="container py-10 md:py-16">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
          Analytics <span className="text-gradient-primary">Dashboard</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Overview of crop yield trends, regional data, and performance metrics.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {summaryCards.map((card, i) => (
          <Card key={card.label} className="p-5 shadow-soft border-border animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <card.icon className={`h-5 w-5 ${card.color} mb-2`} />
            <div className="text-2xl font-serif font-bold text-foreground">{card.value}</div>
            <div className="text-sm text-muted-foreground">{card.label}</div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Bar Chart */}
        <Card className="p-6 shadow-card border-border">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Crop-wise Yield (tonnes/ha)</h3>
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

        {/* Line Chart */}
        <Card className="p-6 shadow-card border-border">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Yield Trend (Rice - tonnes/ha)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(45, 15%, 85%)" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: "hsl(150, 10%, 40%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(150, 10%, 40%)" }} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(45, 15%, 85%)", fontSize: 13 }} />
              <Line type="monotone" dataKey="yield" stroke="hsl(142, 45%, 28%)" strokeWidth={2.5} dot={{ fill: "hsl(142, 45%, 28%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Pie + Table */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 shadow-card border-border">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Crop Distribution</h3>
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
                {d.name}
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2 p-6 shadow-card border-border">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Recent Predictions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-2.5 font-medium">Crop</th>
                  <th className="text-left py-2.5 font-medium">State</th>
                  <th className="text-left py-2.5 font-medium">Area (ha)</th>
                  <th className="text-left py-2.5 font-medium">Predicted Yield</th>
                  <th className="text-left py-2.5 font-medium">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { crop: "Rice", state: "Punjab", area: 12, yield: "33.6t", confidence: "95%" },
                  { crop: "Wheat", state: "Haryana", area: 8, yield: "27.2t", confidence: "92%" },
                  { crop: "Maize", state: "Karnataka", area: 5, yield: "14.0t", confidence: "89%" },
                  { crop: "Cotton", state: "Gujarat", area: 15, yield: "24.0t", confidence: "91%" },
                  { crop: "Soybean", state: "MP", area: 10, yield: "12.0t", confidence: "87%" },
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
