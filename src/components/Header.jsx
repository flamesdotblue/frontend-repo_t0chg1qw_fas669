import { Leaf, Sprout, BookOpen, BarChart3 } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-emerald-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-emerald-600 text-white grid place-items-center">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-emerald-800 leading-tight">
              Smart Crop & Soil Advisory
            </h1>
            <p className="text-xs text-emerald-700/70">Modern, data-guided farming</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-emerald-800">
          <a href="#dashboard" className="flex items-center gap-2 hover:text-emerald-600 transition-colors">
            <BarChart3 className="h-4 w-4" /> Dashboard
          </a>
          <a href="#advisor" className="flex items-center gap-2 hover:text-emerald-600 transition-colors">
            <Sprout className="h-4 w-4" /> Crop Advisor
          </a>
          <a href="#learning" className="flex items-center gap-2 hover:text-emerald-600 transition-colors">
            <BookOpen className="h-4 w-4" /> Learning Center
          </a>
        </nav>

        <a
          href="#advisor"
          className="md:inline-flex hidden px-4 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium shadow-sm hover:bg-emerald-700 transition-colors"
        >
          Get Recommendations
        </a>
      </div>
    </header>
  );
}
