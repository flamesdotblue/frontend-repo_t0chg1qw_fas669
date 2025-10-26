import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import CropAdvisor from "./components/CropAdvisor";
import LearningCenter from "./components/LearningCenter";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-emerald-50/40 text-emerald-900">
      <Header />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-70 pointer-events-none" aria-hidden>
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-200 blur-3xl" />
            <div className="absolute top-40 -left-24 h-72 w-72 rounded-full bg-emerald-300/60 blur-3xl" />
          </div>
          <div className="max-w-6xl mx-auto px-4 pt-10">
            <div className="rounded-2xl bg-gradient-to-br from-white to-emerald-50 border border-emerald-100 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">Smart Crop & Soil Advisory System</h2>
                  <p className="text-emerald-700/80 max-w-2xl">A modern, animated dashboard that simulates weather, recommends crops from a mini dataset, and teaches best practices with interactive modules.</p>
                </div>
                <a href="#advisor" className="px-4 py-2 rounded-md bg-emerald-600 text-white font-medium shadow-sm hover:bg-emerald-700">Try Crop Advisor</a>
              </div>
            </div>
          </div>
        </section>

        <Dashboard />
        <CropAdvisor />
        <LearningCenter />
      </main>

      <Footer />
    </div>
  );
}
