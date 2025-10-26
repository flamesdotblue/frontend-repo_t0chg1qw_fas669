import { useEffect, useMemo, useRef, useState } from "react";
import { Droplets, Thermometer, CloudSun } from "lucide-react";

function StatCard({ icon: Icon, label, value, unit, color }) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white border border-emerald-100 shadow-sm hover:shadow-md transition-all">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="p-4 flex items-center gap-4">
        <div className={`h-12 w-12 rounded-lg grid place-items-center text-white ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-emerald-700/70 text-sm">{label}</p>
          <p className="text-2xl font-semibold text-emerald-900">
            {value}
            <span className="text-base font-medium text-emerald-700/70 ml-1">{unit}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    temp: 26,
    moisture: 48,
    humidity: 62,
  });

  const canvasRef = useRef(null);
  const dataRef = useRef({
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    temp: Array.from({ length: 24 }, () => 20 + Math.random() * 10),
    moisture: Array.from({ length: 24 }, () => 40 + Math.random() * 20),
    humidity: Array.from({ length: 24 }, () => 55 + Math.random() * 15),
  });

  const seasonalInsights = useMemo(
    () => [
      {
        title: "Kharif outlook",
        text: "Warm temps with moderate rain favor maize, rice, and soybean in most regions.",
      },
      {
        title: "Rabi outlook",
        text: "Cooler nights and steady moisture support wheat, mustard, and chickpea growth.",
      },
      {
        title: "Zaid outlook",
        text: "Short-season crops like watermelon and cucumber thrive with smart irrigation.",
      },
    ],
    []
  );

  useEffect(() => {
    const id = setInterval(() => {
      setStats((s) => ({
        temp: Math.round((s.temp + (Math.random() * 2 - 1)) * 10) / 10,
        moisture: Math.max(30, Math.min(80, Math.round((s.moisture + (Math.random() * 4 - 2)) * 10) / 10)),
        humidity: Math.max(40, Math.min(90, Math.round((s.humidity + (Math.random() * 4 - 2)) * 10) / 10)),
      }));

      const d = dataRef.current;
      d.temp.shift();
      d.moisture.shift();
      d.humidity.shift();
      d.temp.push(22 + Math.random() * 10);
      d.moisture.push(40 + Math.random() * 20);
      d.humidity.push(55 + Math.random() * 20);
      drawChart();
    }, 1500);
    drawChart();
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Padding & scale
    const pad = 32;
    const chartW = w - pad * 2;
    const chartH = h - pad * 2;

    // Axes
    ctx.strokeStyle = "#D1FAE5"; // emerald-100
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.stroke();

    const drawSeries = (arr, color, min, max) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      arr.forEach((v, i) => {
        const x = pad + (i / (arr.length - 1)) * chartW;
        const y = pad + (1 - (v - min) / (max - min)) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    };

    const d = dataRef.current;
    drawSeries(d.temp, "#059669", 10, 40); // emerald-600
    drawSeries(d.moisture, "#16A34A", 20, 100); // emerald-600/variant
    drawSeries(d.humidity, "#10B981", 20, 100); // emerald-500
  };

  return (
    <section id="dashboard" className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">Dashboard</h2>
          <p className="text-emerald-700/70">Live field conditions and seasonal insights</p>
        </div>
        <span className="text-xs text-emerald-700/60">Updated automatically</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard icon={Thermometer} label="Temperature" value={stats.temp} unit="°C" color="bg-emerald-600" />
        <StatCard icon={Droplets} label="Soil Moisture" value={stats.moisture} unit="%" color="bg-emerald-500" />
        <StatCard icon={CloudSun} label="Humidity" value={stats.humidity} unit="%" color="bg-emerald-700" />
      </div>

      <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-emerald-900">24h Conditions</p>
          <div className="flex gap-3 text-xs text-emerald-700/70">
            <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-emerald-600" /> Temp</span>
            <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Moisture</span>
            <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> Humidity</span>
          </div>
        </div>
        <div className="w-full">
          <canvas ref={canvasRef} width={900} height={260} className="w-full h-64" />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {seasonalInsights.map((s) => (
          <div key={s.title} className="rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-emerald-900 mb-1">{s.title}</p>
            <p className="text-sm text-emerald-700/80">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
