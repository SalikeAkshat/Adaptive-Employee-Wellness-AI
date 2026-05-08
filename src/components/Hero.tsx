import { Activity, Brain, Heart, TrendingUp, MessageCircle, Shield } from 'lucide-react';

interface HeroProps {
  onNavigate: (view: 'dashboard' | 'chat' | 'tracker') => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16 pt-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl shadow-xl">
              <Activity className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight">
            Employee Wellness AI
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Empower your workforce with AI-driven wellness insights, burnout prevention, and personalized health recommendations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              View Dashboard
            </button>
            <button
              onClick={() => onNavigate('chat')}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border-2 border-blue-600"
            >
              Talk to AI Assistant
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<Brain className="h-8 w-8" />}
            title="AI-Powered Insights"
            description="Advanced machine learning models analyze wellness patterns and predict burnout risk before it happens"
            gradient="from-purple-500 to-pink-500"
          />
          <FeatureCard
            icon={<Heart className="h-8 w-8" />}
            title="Holistic Health Tracking"
            description="Monitor sleep, activity, stress levels, and work patterns for comprehensive wellness management"
            gradient="from-blue-500 to-cyan-500"
          />
          <FeatureCard
            icon={<MessageCircle className="h-8 w-8" />}
            title="24/7 Support Chat"
            description="Empathetic AI assistant provides personalized wellness advice and emotional support anytime"
            gradient="from-green-500 to-emerald-500"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16 border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Key Metrics We Track
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              label="Sleep Quality"
              description="Hours and patterns"
              color="text-blue-600"
            />
            <MetricCard
              label="Physical Activity"
              description="Steps and movement"
              color="text-green-600"
            />
            <MetricCard
              label="Work Balance"
              description="Meetings and focus time"
              color="text-orange-600"
            />
            <MetricCard
              label="Stress Indicators"
              description="Heart rate and screen time"
              color="text-red-600"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl shadow-xl p-8 text-white">
            <TrendingUp className="h-12 w-12 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Predictive Analytics</h3>
            <p className="text-blue-50 leading-relaxed">
              Our machine learning models analyze multiple data points to identify early warning signs of burnout,
              enabling proactive intervention and support.
            </p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-xl p-8 text-white">
            <Shield className="h-12 w-12 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Privacy First</h3>
            <p className="text-slate-300 leading-relaxed">
              All health data is encrypted and securely stored. You maintain complete control over your information
              with enterprise-grade security measures.
            </p>
          </div>
        </div>

        <div className="text-center bg-white rounded-2xl shadow-xl p-12 border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to Transform Your Wellness?
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Join thousands of employees who have improved their work-life balance and prevented burnout with our AI-powered platform
          </p>
          <button
            onClick={() => onNavigate('tracker')}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Start Tracking Now
          </button>
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

function FeatureCard({ icon, title, description, gradient }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-slate-200">
      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${gradient} text-white mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  description: string;
  color: string;
}

function MetricCard({ label, description, color }: MetricCardProps) {
  return (
    <div className="text-center p-4">
      <div className={`text-3xl font-bold ${color} mb-1`}>{label}</div>
      <div className="text-sm text-slate-600">{description}</div>
    </div>
  );
}
