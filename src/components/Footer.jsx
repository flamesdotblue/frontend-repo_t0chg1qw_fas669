import { Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-emerald-100 bg-gradient-to-b from-white to-emerald-50/40">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-sm text-emerald-800/80">© {new Date().getFullYear()} Smart Crop & Soil Advisory. Learn. Decide. Grow.</p>
        <div className="flex items-center gap-4 text-emerald-800/80">
          <a className="hover:text-emerald-700" href="#">Privacy</a>
          <a className="hover:text-emerald-700" href="#">Terms</a>
          <a className="hover:text-emerald-700" href="#"><Github className="h-4 w-4" /></a>
          <a className="hover:text-emerald-700" href="#"><Mail className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
}
