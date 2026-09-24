import { Spinner } from "@/components/atoms/Spinner";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-brand-cream">
      <Spinner size="lg" color="gold" />
      <span className="text-sm font-medium text-brand-gold uppercase tracking-widest animate-pulse">
        Loading
      </span>
    </div>
  );
}
