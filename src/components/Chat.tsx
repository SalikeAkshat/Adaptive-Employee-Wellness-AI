import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your wellness AI assistant. I'm here to provide support, advice, and help you maintain a healthy work-life balance. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(input),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('stress') || lowerInput.includes('anxious')) {
      return "I understand you're feeling stressed. It's important to acknowledge these feelings. Try taking a few deep breaths - inhale for 4 counts, hold for 4, exhale for 4. Consider taking a short break, going for a walk, or practicing mindfulness. Would you like some specific stress-reduction techniques?";
    }

    if (lowerInput.includes('tired') || lowerInput.includes('sleep')) {
      return "Sleep is crucial for your wellbeing. Based on wellness research, aim for 7-9 hours of quality sleep. Try establishing a consistent bedtime routine, avoiding screens an hour before bed, and keeping your bedroom cool and dark. How many hours of sleep are you currently getting?";
    }

    if (lowerInput.includes('burnout') || lowerInput.includes('overwhelmed')) {
      return "Feeling overwhelmed is a sign your body needs attention. It's important to set boundaries and prioritize self-care. Consider talking to your manager about workload, delegate tasks where possible, and make sure you're taking regular breaks. Remember, your wellbeing comes first. What specific aspects of work are feeling most overwhelming?";
    }

    if (lowerInput.includes('exercise') || lowerInput.includes('activity')) {
      return "Regular physical activity is excellent for both physical and mental health! Even 30 minutes of moderate exercise daily can significantly reduce stress and improve mood. Try walking, yoga, or any activity you enjoy. The key is consistency. What types of physical activities do you enjoy?";
    }

    return "Thank you for sharing that with me. Your wellbeing is important, and I'm here to support you. Remember to listen to your body's signals and take breaks when needed. Is there anything specific about your wellness or work-life balance you'd like to discuss?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    "I'm feeling stressed",
    "Tips for better sleep",
    "Work-life balance advice",
    "How to prevent burnout"
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 h-[calc(100vh-5rem)]">
      <div className="bg-white rounded-2xl shadow-xl h-full flex flex-col border border-slate-200">
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white rounded-lg">
              <Bot className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Wellness AI Assistant</h2>
              <p className="text-blue-50 text-sm">Always here to support your wellbeing</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bot className="h-5 w-5 text-blue-600" />
              </div>
              <div className="bg-slate-100 rounded-2xl rounded-tl-sm p-4 max-w-xl">
                <Loader2 className="h-5 w-5 text-slate-400 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="px-6 pb-4">
            <p className="text-sm text-slate-600 mb-2 font-medium">Quick prompts:</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInput(prompt)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
          <div className="flex space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 font-medium"
            >
              <Send className="h-5 w-5" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MessageBubbleProps {
  message: Message;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`p-2 rounded-lg ${isUser ? 'bg-blue-100' : 'bg-slate-100'}`}>
        {isUser ? (
          <User className="h-5 w-5 text-blue-600" />
        ) : (
          <Bot className="h-5 w-5 text-slate-600" />
        )}
      </div>
      <div
        className={`rounded-2xl p-4 max-w-xl ${
          isUser
            ? 'bg-blue-600 text-white rounded-tr-sm'
            : 'bg-slate-100 text-slate-900 rounded-tl-sm'
        }`}
      >
        <p className="leading-relaxed">{message.text}</p>
        <p className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-slate-500'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}
