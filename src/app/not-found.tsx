import Link from 'next/link';
import { Home, Search, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      
      <div className="max-w-3xl w-full text-center space-y-10 relative z-10">
        {/* 404 Text with Glitch Effect */}
        <div className="relative">
          <h1 className="text-[140px] sm:text-[200px] md:text-[280px] font-bold font-glitch leading-none glitch-effect" data-text="404">
            404
          </h1>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent blur-3xl -z-10" />
        </div>

        {/* Message Section */}
        <div className="space-y-5 animate-fade-in">
          <div className="flex items-center justify-center gap-2 text-primary">
            <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Page Not Found
            </h2>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            This page seems to have been moved to the archive. Let's navigate you back to productivity.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <Link href="/" className="w-full sm:w-auto group">
            <button className="inline-flex items-center justify-center h-12 px-8 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 w-full shadow-lg hover:shadow-primary/20 hover:scale-105">
              <Home className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Back to Home
            </button>
          </Link>
          
          <Link href="/board" className="w-full sm:w-auto group">
            <button className="inline-flex items-center justify-center h-12 px-8 rounded-lg text-sm font-semibold border-2 border-primary/20 bg-secondary/50 text-foreground hover:bg-secondary hover:border-primary/40 transition-all duration-300 w-full hover:scale-105">
              <Search className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Open Board
            </button>
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="pt-12 space-y-4">
          <div className="flex justify-center gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary/60 animate-pulse"
                style={{ animationDelay: `${i * 300}ms`, animationDuration: '1.5s' }}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground/60">
            Error Code: 404 • Page Not Found
          </p>
        </div>
      </div>
    </div>
  );
}
