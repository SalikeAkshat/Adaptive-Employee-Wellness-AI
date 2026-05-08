import { useState } from 'react';
import { Save, TrendingUp, AlertCircle } from 'lucide-react';

interface FormData {
  sleep_hours: number;
  steps: number;
  heart_rate: number;
  meetings: number;
  screen_time: number;
  focus_time: number;
  emails_sent: number;
}

export default function WellnessTracker() {
  const [formData, setFormData] = useState<FormData>({
    sleep_hours: 7,
    steps: 8000,
    heart_rate: 70,
    meetings: 3,
    screen_time: 6,
    focus_time: 4,
    emails_sent: 50
  });

  const [saved, setSaved] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const burnoutScore = calculateBurnoutRisk(formData);
    setPrediction(burnoutScore);
    setSaved(true);

    setTimeout(() => setSaved(false), 3000);
  };

  const calculateBurnoutRisk = (data: FormData): number => {
    let riskScore = 0;

    if (data.sleep_hours < 6) riskScore += 2;
    else if (data.sleep_hours < 7) riskScore += 1;

    if (data.steps < 5000) riskScore += 2;
    else if (data.steps < 8000) riskScore += 1;

    if (data.heart_rate > 85) riskScore += 2;
    else if (data.heart_rate > 80) riskScore += 1;

    if (data.meetings > 6) riskScore += 2;
    else if (data.meetings > 4) riskScore += 1;

    if (data.screen_time > 9) riskScore += 2;
    else if (data.screen_time > 7) riskScore += 1;

    if (data.focus_time < 2) riskScore += 2;
    else if (data.focus_time < 3) riskScore += 1;

    if (data.emails_sent > 100) riskScore += 1;

    return riskScore >= 5 ? 1 : 0;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Wellness Tracker</h1>
        <p className="text-slate-600">Log your daily metrics to monitor your wellbeing</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <InputField
              label="Sleep Hours"
              value={formData.sleep_hours}
              onChange={(v) => handleChange('sleep_hours', v)}
              min={0}
              max={12}
              step={0.5}
              unit="hours"
              icon="🌙"
            />
            <InputField
              label="Daily Steps"
              value={formData.steps}
              onChange={(v) => handleChange('steps', v)}
              min={0}
              max={30000}
              step={100}
              unit="steps"
              icon="👟"
            />
            <InputField
              label="Heart Rate"
              value={formData.heart_rate}
              onChange={(v) => handleChange('heart_rate', v)}
              min={40}
              max={150}
              step={1}
              unit="bpm"
              icon="❤️"
            />
            <InputField
              label="Meetings"
              value={formData.meetings}
              onChange={(v) => handleChange('meetings', v)}
              min={0}
              max={20}
              step={1}
              unit="meetings"
              icon="📅"
            />
            <InputField
              label="Screen Time"
              value={formData.screen_time}
              onChange={(v) => handleChange('screen_time', v)}
              min={0}
              max={16}
              step={0.5}
              unit="hours"
              icon="💻"
            />
            <InputField
              label="Focus Time"
              value={formData.focus_time}
              onChange={(v) => handleChange('focus_time', v)}
              min={0}
              max={12}
              step={0.5}
              unit="hours"
              icon="🎯"
            />
            <InputField
              label="Emails Sent"
              value={formData.emails_sent}
              onChange={(v) => handleChange('emails_sent', v)}
              min={0}
              max={300}
              step={1}
              unit="emails"
              icon="📧"
              className="md:col-span-2"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <Save className="h-5 w-5" />
            <span>Save & Analyze</span>
          </button>
        </form>

        {saved && (
          <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-medium">Data saved successfully!</span>
          </div>
        )}

        {prediction !== null && (
          <div className={`mt-6 p-6 rounded-xl border-2 ${
            prediction === 1
              ? 'bg-red-50 border-red-200'
              : 'bg-green-50 border-green-200'
          }`}>
            <div className="flex items-start space-x-3">
              <AlertCircle className={`h-6 w-6 mt-0.5 ${
                prediction === 1 ? 'text-red-600' : 'text-green-600'
              }`} />
              <div className="flex-1">
                <h3 className={`text-xl font-bold mb-2 ${
                  prediction === 1 ? 'text-red-900' : 'text-green-900'
                }`}>
                  Burnout Risk: {prediction === 1 ? 'High' : 'Low'}
                </h3>
                <p className={`${
                  prediction === 1 ? 'text-red-800' : 'text-green-800'
                }`}>
                  {prediction === 1
                    ? 'Your metrics indicate elevated stress levels. Consider improving sleep quality, increasing physical activity, and reducing screen time. Take regular breaks and prioritize self-care.'
                    : 'Great job! Your wellness metrics look healthy. Keep maintaining these positive habits for continued wellbeing.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <TipCard
          title="Optimal Sleep"
          description="Aim for 7-9 hours of quality sleep each night for optimal cognitive function and stress management."
        />
        <TipCard
          title="Stay Active"
          description="Target 8,000-10,000 steps daily to boost energy levels and reduce burnout risk."
        />
        <TipCard
          title="Balance Work"
          description="Maintain focus time above 3 hours and limit meetings to reduce workplace stress."
        />
      </div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: string) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
  icon: string;
  className?: string;
}

function InputField({ label, value, onChange, min, max, step, unit, icon, className = '' }: InputFieldProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        <span className="mr-2">{icon}</span>
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">
          {unit}
        </span>
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        step={step}
        className="w-full mt-2 accent-blue-600"
      />
    </div>
  );
}

interface TipCardProps {
  title: string;
  description: string;
}

function TipCard({ title, description }: TipCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
      <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}
