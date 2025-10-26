import { useMemo, useState } from "react";
import { Sprout, Sun, Droplets, Thermometer, Leaf } from "lucide-react";

const CROPS = [
  {
    name: "Wheat",
    soils: ["loam", "clay loam"],
    pH: [6.0, 7.5],
    temp: [10, 25],
    rain: [300, 900],
    seasons: ["rabi"],
    desc: "Cool-season cereal grain suitable for well-drained loams.",
  },
  {
    name: "Rice",
    soils: ["clay", "silty clay", "clay loam"],
    pH: [5.5, 7.0],
    temp: [20, 35],
    rain: [1000, 2000],
    seasons: ["kharif"],
    desc: "Water-loving staple crop thriving in warm, wet conditions.",
  },
  {
    name: "Maize",
    soils: ["sandy loam", "loam"],
    pH: [5.8, 7.2],
    temp: [18, 32],
    rain: [400, 1000],
    seasons: ["kharif", "zaid"],
    desc: "Versatile crop with moderate water needs and warm temps.",
  },
  {
    name: "Soybean",
    soils: ["sandy loam", "loam"],
    pH: [6.0, 7.5],
    temp: [20, 30],
    rain: [500, 900],
    seasons: ["kharif"],
    desc: "Protein-rich legume that improves soil nitrogen.",
  },
  {
    name: "Chickpea",
    soils: ["loam", "sandy loam"],
    pH: [6.0, 8.0],
    temp: [10, 25],
    rain: [300, 700],
    seasons: ["rabi"],
    desc: "Drought-tolerant pulse suited for cooler seasons.",
  },
  {
    name: "Mustard",
    soils: ["loam", "sandy loam"],
    pH: [6.0, 7.5],
    temp: [10, 25],
    rain: [300, 450],
    seasons: ["rabi"],
    desc: "Oilseed crop tolerant to low temperatures.",
  },
  {
    name: "Watermelon",
    soils: ["sandy loam"],
    pH: [6.0, 7.5],
    temp: [22, 35],
    rain: [400, 600],
    seasons: ["zaid"],
    desc: "Short-duration fruit requiring warm weather and irrigation.",
  },
];

function scoreRange([min, max], value) {
  if (value >= min && value <= max) return 1.0;
  const tolerance = (max - min) * 0.15;
  if (value >= min - tolerance && value <= max + tolerance) return 0.7;
  return 0.3;
}

function getIconForCrop(name) {
  switch (name) {
    case "Rice":
      return Droplets;
    case "Wheat":
      return Leaf;
    case "Maize":
      return Sun;
    case "Soybean":
      return Sprout;
    case "Chickpea":
      return Sprout;
    case "Mustard":
      return Leaf;
    case "Watermelon":
      return Droplets;
    default:
      return Leaf;
  }
}

export default function CropAdvisor() {
  const [form, setForm] = useState({
    soil: "loam",
    ph: 6.8,
    temp: 26,
    rain: 650,
    season: "kharif",
  });

  const recommendations = useMemo(() => {
    const res = CROPS.map((c) => {
      const soilScore = c.soils.includes(form.soil) ? 1 : 0.6;
      const phScore = scoreRange(c.pH, Number(form.ph));
      const tScore = scoreRange(c.temp, Number(form.temp));
      const rScore = scoreRange(c.rain, Number(form.rain));
      const sScore = c.seasons.includes(form.season) ? 1 : 0.6;
      const total = (soilScore * 0.2 + phScore * 0.2 + tScore * 0.25 + rScore * 0.2 + sScore * 0.15);
      return { crop: c, confidence: Math.round(total * 100) };
    })
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 4);
    return res;
  }, [form]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <section id="advisor" className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">Crop Advisor</h2>
        <p className="text-emerald-700/70">Enter your field conditions to see tailored recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div>
              <label className="text-sm text-emerald-800">Soil type</label>
              <select value={form.soil} onChange={(e) => set("soil", e.target.value)} className="mt-1 w-full rounded-md border-emerald-200 focus:border-emerald-400 focus:ring-emerald-200">
                {[
                  "sandy loam",
                  "loam",
                  "clay loam",
                  "clay",
                  "silty clay",
                ].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-emerald-800">pH value</label>
              <input type="number" step="0.1" value={form.ph} onChange={(e) => set("ph", e.target.value)} className="mt-1 w-full rounded-md border-emerald-200 focus:border-emerald-400 focus:ring-emerald-200" />
            </div>
            <div>
              <label className="text-sm text-emerald-800 flex items-center gap-1"><Thermometer className="h-4 w-4" /> Temperature (°C)</label>
              <input type="number" value={form.temp} onChange={(e) => set("temp", e.target.value)} className="mt-1 w-full rounded-md border-emerald-200 focus:border-emerald-400 focus:ring-emerald-200" />
            </div>
            <div>
              <label className="text-sm text-emerald-800 flex items-center gap-1"><Droplets className="h-4 w-4" /> Rainfall (mm)</label>
              <input type="number" value={form.rain} onChange={(e) => set("rain", e.target.value)} className="mt-1 w-full rounded-md border-emerald-200 focus:border-emerald-400 focus:ring-emerald-200" />
            </div>
            <div>
              <label className="text-sm text-emerald-800">Season</label>
              <select value={form.season} onChange={(e) => set("season", e.target.value)} className="mt-1 w-full rounded-md border-emerald-200 focus:border-emerald-400 focus:ring-emerald-200">
                {["kharif", "rabi", "zaid"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-xs text-emerald-700/70 mt-3">Tip: Adjust inputs to compare scenarios. Recommendations update instantly.</p>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {recommendations.map(({ crop, confidence }) => {
            const Icon = getIconForCrop(crop.name);
            return (
              <div key={crop.name} className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-emerald-600 text-white grid place-items-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-900">{crop.name}</p>
                      <p className="text-sm text-emerald-700/80">{crop.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-emerald-700/70">Confidence</p>
                    <p className="text-xl font-semibold text-emerald-900">{confidence}%</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${confidence}%` }} />
                  </div>
                  <div className="mt-2 text-xs text-emerald-700/70 flex flex-wrap gap-3">
                    <span>Soils: {crop.soils.join(", ")}</span>
                    <span>pH: {crop.pH[0]}–{crop.pH[1]}</span>
                    <span>Temp: {crop.temp[0]}–{crop.temp[1]}°C</span>
                    <span>Rain: {crop.rain[0]}–{crop.rain[1]} mm</span>
                    <span>Season: {crop.seasons.join(" / ")}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
