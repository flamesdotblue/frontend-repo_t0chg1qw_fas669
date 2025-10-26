import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Droplets, Recycle, TestTube } from "lucide-react";
import { useState } from "react";

function ModuleCard({ title, icon: Icon, summary, tips, quiz }) {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const correct = submitted && answer === quiz.correct;

  return (
    <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3 text-left">
          <div className="h-10 w-10 rounded-lg bg-emerald-600 text-white grid place-items-center">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-emerald-900">{title}</p>
            <p className="text-sm text-emerald-700/80">{summary}</p>
          </div>
        </div>
        <span className="text-emerald-700/60 text-sm">{open ? "Hide" : "Explore"}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-emerald-900">Quick tips</p>
                <ul className="text-sm text-emerald-700/80 list-disc pl-5 space-y-1">
                  {tips.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-emerald-900 flex items-center gap-2"><TestTube className="h-4 w-4" /> Mini quiz</p>
                <div className="text-sm text-emerald-700/80">
                  <p className="mb-2">{quiz.q}</p>
                  <div className="space-y-1">
                    {quiz.options.map((o, i) => (
                      <label key={i} className="flex items-center gap-2">
                        <input type="radio" name={title} value={o}
                          checked={answer === o}
                          onChange={() => { setAnswer(o); setSubmitted(false); }}
                        />
                        <span>{o}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <button onClick={() => setSubmitted(true)} className="px-3 py-1.5 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700">Submit</button>
                    {submitted && (
                      <span className={correct ? "text-emerald-700" : "text-red-600"}>
                        {correct ? "Correct!" : `Try again. Answer: ${quiz.correct}`}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LearningCenter() {
  const modules = [
    {
      title: "Soil Health Basics",
      icon: BookOpen,
      summary: "Understand organic matter, structure, and nutrients.",
      tips: [
        "Add compost to boost organic matter and microbial life.",
        "Avoid excessive tillage to preserve soil structure.",
        "Test soil annually for pH and macro/micronutrients.",
      ],
      quiz: {
        q: "Which practice best improves soil organic matter?",
        options: ["Deep plowing", "Adding compost", "Over-irrigation"],
        correct: "Adding compost",
      },
    },
    {
      title: "Crop Rotation",
      icon: Recycle,
      summary: "Alternate crop families to break pest cycles and balance nutrients.",
      tips: [
        "Rotate legumes with cereals to fix nitrogen naturally.",
        "Avoid planting the same family on the same plot consecutively.",
        "Use short-season cover crops between main seasons.",
      ],
      quiz: {
        q: "Why include legumes in rotation?",
        options: ["They need more fertilizer", "They fix nitrogen", "They love shade"],
        correct: "They fix nitrogen",
      },
    },
    {
      title: "Smart Irrigation",
      icon: Droplets,
      summary: "Match water to crop needs using soil moisture and weather.",
      tips: [
        "Irrigate early morning or late evening to reduce evaporation.",
        "Use drip or sprinkler to save water and target roots.",
        "Mulch to maintain moisture and suppress weeds.",
      ],
      quiz: {
        q: "Best time to irrigate for minimal evaporation?",
        options: ["Noon", "Early morning", "Afternoon"],
        correct: "Early morning",
      },
    },
  ];

  return (
    <section id="learning" className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">Learning Center</h2>
        <p className="text-emerald-700/70">Interactive modules to build resilient, productive farms</p>
      </div>

      <div className="space-y-4">
        {modules.map((m) => (
          <ModuleCard key={m.title} {...m} />
        ))}
      </div>
    </section>
  );
}
