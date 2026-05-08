// import { motion } from "framer-motion";

// export default function Navbar() {
//   return (
//     <motion.nav
//       className="bg-slate-800 bg-opacity-70 backdrop-blur-lg shadow-md p-4 flex justify-between items-center"
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <h1 className="text-2xl font-bold text-cyan-400">
//         Adaptive Wellness AI
//       </h1>
//       <div className="space-x-4">
//         <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg">
//           Dashboard
//         </button>
//         <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg">
//           Chat Support
//         </button>
//       </div>
//     </motion.nav>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 border-b border-cyan-400/30 shadow-lg">
      <h1 className="text-2xl font-bold text-cyan-400">Adaptive Wellness AI</h1>
      <div className="flex gap-6 text-gray-300">
        <Link to="/dashboard" className="hover:text-cyan-400">Dashboard</Link>
        <Link to="/insights" className="hover:text-cyan-400">Insights</Link>
        <Link to="/chatbot" className="hover:text-cyan-400">Chat</Link>
        <Link to="/login" className="hover:text-cyan-400">Logout</Link>
      </div>
    </nav>
  );
}
