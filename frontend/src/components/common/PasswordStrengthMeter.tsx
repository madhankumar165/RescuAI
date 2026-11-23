import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthMeterProps {
  password: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const checks = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: 'Contains uppercase letter', valid: /[A-Z]/.test(password) },
    { label: 'Contains number', valid: /[0-9]/.test(password) },
    { label: 'Contains special character', valid: /[^A-Za-z0-9]/.test(password) },
  ];

  const score = checks.filter((c) => c.valid).length;

  const getStrengthLabel = () => {
    if (score === 0) return { text: 'Weak', color: 'bg-slate-700', width: 'w-0' };
    if (score <= 1) return { text: 'Weak', color: 'bg-red-500', width: 'w-1/4' };
    if (score <= 2) return { text: 'Fair', color: 'bg-amber-500', width: 'w-2/4' };
    if (score <= 3) return { text: 'Good', color: 'bg-blue-500', width: 'w-3/4' };
    return { text: 'Strong', color: 'bg-emerald-500', width: 'w-full' };
  };

  const strength = getStrengthLabel();

  return (
    <div className="space-y-2 mt-2">
      <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
        <span>Password Strength: <strong className="text-slate-200">{strength.text}</strong></span>
        <span>{score} / 4</span>
      </div>

      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
        <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300 rounded-full`} />
      </div>

      <div className="grid grid-cols-2 gap-1.5 pt-1">
        {checks.map((c, i) => (
          <div key={i} className="flex items-center gap-1.5 text-[10px]">
            {c.valid ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <X className="w-3 h-3 text-slate-600" />
            )}
            <span className={c.valid ? 'text-slate-300' : 'text-slate-500'}>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
