import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import Navbar from "../components/Navbar";

export default function Insights() {
  const data = [
    { day: "Mon", sleep: 7, steps: 8000 },
    { day: "Tue", sleep: 6, steps: 6000 },
    { day: "Wed", sleep: 5, steps: 4000 },
    { day: "Thu", sleep: 8, steps: 9000 },
    { day: "Fri", sleep: 6, steps: 7000 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="p-8">
        <h2 className="text-3xl font-bold text-cyan-400 mb-6">
          Weekly Wellness Insights
        </h2>
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="day" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="sleep" stroke="#00bcd4" strokeWidth={2} />
          <Line type="monotone" dataKey="steps" stroke="#8bc34a" strokeWidth={2} />
        </LineChart>
      </div>
    </div>
  );
}
