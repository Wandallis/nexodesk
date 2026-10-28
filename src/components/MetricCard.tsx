import type { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  textColor: string;
  bgColor: string;
}

export function MetricCard({ title, value, icon, textColor, bgColor }: MetricCardProps) {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between transition hover:shadow-md">
      <div>
        <p className="text-xs sm:text-sm font-medium text-slate-500">{title}</p>
        <h3 className={`text-xl sm:text-2xl font-bold mt-1 ${textColor}`}>{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${bgColor}`}>
        {icon}
      </div>
    </div>
  );
}