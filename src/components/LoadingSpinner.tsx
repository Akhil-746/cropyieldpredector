import { Loader2 } from "lucide-react";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center gap-3 py-8">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-4 border-muted" />
      <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-t-primary animate-spin" />
    </div>
    <p className="text-sm text-muted-foreground animate-pulse">Analyzing crop data...</p>
  </div>
);

export default LoadingSpinner;
