// import React from "react";
// import { AlertTriangle, CheckCircle2 } from "lucide-react";

// /**
//  * Props:
//  *  - risk: number (0..1) or integer (0/1) — if >=0 && <=1 treated as probability
//  *  - size: optional width class e.g. "w-full" or "w-72"
//  *  - onSuggest: optional callback when user clicks suggestion action
//  */
// export default function RiskMeter({ risk = 0, size = "w-full", onSuggest = null }) {
//   // normalize risk to 0..1
//   let r = risk;
//   if (r > 1) r = r >= 50 ? 1 : r / 100;
//   r = Math.max(0, Math.min(1, r));

//   const percent = Math.round(r * 100);
//   const isHigh = percent >= 60;
//   const color = isHigh ? "from-red-500 to-rose-600" : "from-emerald-400 to-emerald-500";
//   const label = isHigh ? "High" : percent >= 30 ? "Moderate" : "Low";
//   const advice = isHigh
//     ? "High burnout risk detected — consider a break, reduce meetings and sleep more."
//     : percent >= 30
//     ? "Moderate risk — monitor sleep and screen time; short breaks help."
//     : "Low risk — keep up healthy routines.";

//   return (
//     <div className={`glass p-4 rounded-2xl shadow ${size}`}>
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className={`p-3 rounded-lg ${isHigh ? "bg-red-600/10" : "bg-emerald-500/10"}`}>
//             {isHigh ? <AlertTriangle className="text-red-400" /> : <CheckCircle2 className="text-emerald-400" />}
//           </div>
//           <div>
//             <div className="text-sm text-gray-300">Burnout Risk</div>
//             <div className="text-xl font-semibold">{label} • {percent}%</div>
//           </div>
//         </div>
//         <div className="text-xs text-gray-400">Updated now</div>
//       </div>

//       {/* Gauge / progress */}
//       <div className="mt-4">
//         <div className="relative h-4 bg-white/6 rounded-full overflow-hidden">
//           <div
//             className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${color}`}
//             style={{ width: `${percent}%`, transition: "width 600ms ease" }}
//           />
//         </div>
//         <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
//           <span>Low</span>
//           <span>High</span>
//         </div>
//       </div>

//       {/* Advice */}
//       <p className="mt-4 text-sm text-gray-300">{advice}</p>

//       <div className="mt-4 flex gap-2">
//         <button
//           onClick={() => onSuggest && onSuggest("quick_tips")}
//           className="px-3 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-sm"
//         >
//           Quick Tips
//         </button>

//         <button
//           onClick={() => onSuggest && onSuggest("schedule_break")}
//           className={`px-3 py-2 rounded-md text-sm bg-gradient-to-r ${isHigh ? "from-red-500 to-rose-500" : "from-emerald-400 to-emerald-500"} text-white`}
//         >
//           {isHigh ? "Get Recovery Plan" : "Get Suggestions"}
//         </button>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { motion } from "framer-motion";

export default function RiskMeter({ risk, onSuggest }) {
  const riskLevel =
    risk > 0.7 ? "High" : risk > 0.4 ? "Medium" : "Low";
  const color =
    riskLevel === "High"
      ? "text-red-500"
      : riskLevel === "Medium"
      ? "text-yellow-400"
      : "text-green-400";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-gray-800/60 p-6 rounded-2xl shadow-xl text-center border border-cyan-400/30"
    >
      <h2 className="text-xl font-semibold mb-4 text-cyan-400">
        Wellness Risk Meter
      </h2>
      <div className={`text-4xl font-bold ${color}`}>{riskLevel}</div>
      <div className="mt-2 text-gray-400">({(risk * 100).toFixed(1)}%)</div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => onSuggest("break")}
          className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg shadow"
        >
          Recovery Tips
        </button>
        <button
          onClick={() => onSuggest("focus")}
          className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg shadow"
        >
          Focus Tips
        </button>
      </div>
    </motion.div>
  );
}
