// import { useState } from "react";
// import { sendChatMessage } from "../api/api";
// import { Send } from "lucide-react";

// export default function Chatbot() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const handleSend = async () => {
//     if (!input.trim()) return;
//     const newMsgs = [...messages, { role: "user", content: input }];
//     setMessages(newMsgs);
//     setInput("");

//     const reply = await sendChatMessage(input);
//     setMessages([...newMsgs, { role: "ai", content: reply }]);
//   };

//   return (
//     <div className="fixed bottom-6 right-6 w-96 bg-slate-800 text-white rounded-2xl shadow-2xl flex flex-col border border-cyan-500/50">
//       <div className="p-4 font-bold text-cyan-400 border-b border-cyan-600/30">
//         💬 Wellness Assistant
//       </div>
//       <div className="flex-1 p-3 overflow-y-auto space-y-2">
//         {messages.map((msg, i) => (
//           <div key={i} className={`p-2 rounded-xl ${msg.role === "user" ? "bg-cyan-700/30 text-right" : "bg-gray-700/50"}`}>
//             {msg.content}
//           </div>
//         ))}
//       </div>
//       <div className="p-3 flex border-t border-cyan-700/30">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask your assistant..."
//           className="flex-1 bg-transparent border border-gray-600 rounded-lg p-2 outline-none text-sm"
//         />
//         <button onClick={handleSend} className="ml-2 bg-cyan-500 hover:bg-cyan-400 p-2 rounded-lg">
//           <Send size={16} />
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { sendChatMessage } from "../api/api";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await sendChatMessage(input);
      const botMsg = { sender: "bot", text: res.data.reply || "..." };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [...prev, { sender: "bot", text: "AI unavailable." }]);
    }
    setInput("");
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl text-center font-bold text-cyan-400 mb-4">
        Wellness Chatbot
      </h1>
      <div className="max-w-2xl mx-auto bg-gray-800/60 p-4 rounded-lg shadow-lg">
        <div className="h-80 overflow-y-auto space-y-2 mb-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-cyan-600 text-right"
                  : "bg-gray-700 text-left"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 bg-gray-700 rounded-lg p-2 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
