// // import { useEffect, useState } from "react";
// // import { getLatestPrediction } from "../api/api";
// // import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
// // import { Activity, AlertTriangle } from "lucide-react";

// // export default function Dashboard() {
// //   const [data, setData] = useState(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const result = await getLatestPrediction();
// //       setData(result);
// //     };
// //     fetchData();
// //   }, []);

// //   if (!data) return <p className="text-center mt-20 text-gray-400">Loading data...</p>;

// //   const chartData = [
// //     { day: "Mon", wellness: 80 },
// //     { day: "Tue", wellness: 70 },
// //     { day: "Wed", wellness: 65 },
// //     { day: "Thu", wellness: 75 },
// //     { day: "Fri", wellness: 72 },
// //   ];

// //   return (
// //     <div className="p-6 grid md:grid-cols-2 gap-6">
// //       <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
// //         <h2 className="text-xl font-semibold flex items-center gap-2 text-cyan-400">
// //           <Activity /> Wellness Overview
// //         </h2>
// //         <ul className="mt-4 text-gray-300 space-y-2">
// //           <li>🧠 Burnout Risk: {data.predicted_label ? "High" : "Low"}</li>
// //           <li>💤 Sleep Hours: {data.sleep_hours}</li>
// //           <li>🏃‍♂️ Steps: {data.steps}</li>
// //           <li>❤️ Heart Rate: {data.heart_rate} bpm</li>
// //           <li>🖥️ Screen Time: {data.screen_time} hrs</li>
// //         </ul>
// //       </div>

// //       <div className={`p-6 rounded-2xl shadow-lg ${data.predicted_label ? "bg-red-900/40" : "bg-green-900/30"}`}>
// //         <h2 className="text-xl font-semibold flex items-center gap-2 text-cyan-300">
// //           <AlertTriangle /> Burnout Alert
// //         </h2>
// //         <p className="mt-3 text-gray-300">
// //           {data.predicted_label
// //             ? "⚠️ High burnout detected. Take a break, hydrate, and try a short meditation."
// //             : "✅ You're doing great! Keep maintaining a healthy work-life balance."}
// //         </p>

// //         <LineChart width={300} height={200} data={chartData} className="mt-6">
// //           <XAxis dataKey="day" stroke="#94a3b8" />
// //           <YAxis />
// //           <Tooltip />
// //           <Line type="monotone" dataKey="wellness" stroke="#06b6d4" strokeWidth={2} />
// //         </LineChart>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { Activity, Clock, Mail, Focus, Brain } from "lucide-react";
// import RiskMeter from "../components/RiskMeter";

// export default function Dashboard() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [suggestion, setSuggestion] = useState("");

//   // Fetch prediction from backend (replace with your backend URL)
//   const fetchPrediction = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:5000/api/predict/latest");
//       setData(res.data);
//     } catch (error) {
//       console.error("❌ Error fetching prediction:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle AI suggestion request
//   const handleSuggest = async (action) => {
//     setMessage("Thinking...");
//     try {
//       const res = await axios.post("http://127.0.0.1:5000/api/chat", {
//         message:
//           action === "schedule_break"
//             ? "Suggest a personalized burnout recovery plan."
//             : "Give short wellness tips to stay balanced.",
//       });
//       setSuggestion(res.data.reply);
//     } catch (err) {
//       console.error("AI Suggestion Error:", err);
//       setSuggestion("Unable to fetch suggestion from AI right now.");
//     } finally {
//       setMessage("");
//     }
//   };

//   useEffect(() => {
//     fetchPrediction();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-xl text-gray-400">
//         Loading your wellness data...
//       </div>
//     );
//   }

//   const riskValue = data?.predicted_prob ?? (data?.predicted_label ? 1 : 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
//       <motion.h1
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className="text-4xl font-bold mb-8 text-center"
//       >
//         Adaptive Wellness Dashboard
//       </motion.h1>

//       {/* Grid Layout */}
//       <div className="grid md:grid-cols-3 gap-8">
//         {/* Risk Meter */}
//         <RiskMeter risk={riskValue} onSuggest={handleSuggest} />

//         {/* Employee Metrics */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="md:col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
//         >
//           <MetricCard
//             icon={<Clock className="text-blue-400" />}
//             title="Sleep Hours"
//             value={`${data?.sleep_hours ?? 0} hrs`}
//           />
//           <MetricCard
//             icon={<Activity className="text-green-400" />}
//             title="Steps"
//             value={data?.steps ?? 0}
//           />
//           <MetricCard
//             icon={<Brain className="text-yellow-400" />}
//             title="Focus Time"
//             value={`${data?.focus_time ?? 0} hrs`}
//           />
//           <MetricCard
//             icon={<Mail className="text-rose-400" />}
//             title="Emails Sent"
//             value={data?.emails_sent ?? 0}
//           />
//           <MetricCard
//             icon={<Focus className="text-purple-400" />}
//             title="Meetings"
//             value={data?.meetings ?? 0}
//           />
//           <MetricCard
//             icon={<Activity className="text-cyan-400" />}
//             title="Heart Rate"
//             value={`${data?.heart_rate ?? 0} bpm`}
//           />
//         </motion.div>
//       </div>

//       {/* AI Suggestion Box */}
//       {message && (
//         <div className="mt-8 text-center text-gray-300 animate-pulse">{message}</div>
//       )}
//       {suggestion && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="mt-8 bg-slate-800/70 rounded-xl p-6 max-w-3xl mx-auto shadow-xl border border-white/10"
//         >
//           <h2 className="text-xl font-semibold mb-2">💡 AI Suggestion</h2>
//           <p className="text-gray-300 leading-relaxed">{suggestion}</p>
//         </motion.div>
//       )}
//     </div>
//   );
// }

// const MetricCard = ({ icon, title, value }) => (
//   <motion.div
//     whileHover={{ scale: 1.05 }}
//     className="bg-slate-800/60 p-4 rounded-2xl shadow-lg backdrop-blur-sm border border-white/10 flex flex-col justify-between"
//   >
//     <div className="flex items-center justify-between">
//       {icon}
//       <span className="text-sm text-gray-400">{title}</span>
//     </div>
//     <div className="text-2xl font-bold mt-2">{value}</div>
//   </motion.div>
// );


import React from "react";
import { motion } from "framer-motion";

export default function DashboardCard({ title, value, color }) {
  const colorMap = {
    blue: "text-blue-400",
    green: "text-green-400",
    yellow: "text-yellow-400",
    rose: "text-rose-400",
    purple: "text-purple-400",
    cyan: "text-cyan-400",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800/60 p-5 rounded-2xl shadow-lg backdrop-blur-sm border border-white/10"
    >
      <div className="text-sm text-gray-400">{title}</div>
      <div className={`text-2xl font-bold mt-2 ${colorMap[color]}`}>{value}</div>
    </motion.div>
  );
}
