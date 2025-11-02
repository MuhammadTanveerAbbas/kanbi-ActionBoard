import { Sparkles, Zap, Target } from "lucide-react";

export default function SolutionSection() {
  return (
    <section className="w-full py-12 sm:py-24 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary">
              Smart Task Intelligence
            </span>
          </div>
          <h2 className="text-2xl sm:text-5xl font-bold tracking-tight">
            Turn Chaos Into Clarity
          </h2>
          <p className="mt-3 text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch your scattered thoughts transform into organized action in
            seconds
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
          {/* Card 1 */}
          <div className="group relative bg-card border rounded-xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-xl font-bold mb-2">Smart Extraction</h3>
              <p className="text-xs sm:text-base text-muted-foreground">
                AI instantly identifies tasks, owners, and deadlines from any
                text or meeting notes
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-card border rounded-xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-xl font-bold mb-2">Instant Organization</h3>
              <p className="text-xs sm:text-base text-muted-foreground">
                Automatically builds a dynamic Kanban board with priorities and
                dependencies mapped
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-card border rounded-xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-xl font-bold mb-2">Actionable Insights</h3>
              <p className="text-xs sm:text-base text-muted-foreground">
                Get real time recommendations and track progress with predictive
                analytics
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
