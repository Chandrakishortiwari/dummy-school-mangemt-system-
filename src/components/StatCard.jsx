export default function StatCard({ title, value, icon: Icon, color, change, suffix = '' }) {
  const colors = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', icon: 'bg-blue-100' },
    green: { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: 'bg-emerald-100' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', icon: 'bg-orange-100' },
    red: { bg: 'bg-red-50', text: 'text-red-600', icon: 'bg-red-100' },
    teal: { bg: 'bg-teal-50', text: 'text-teal-600', icon: 'bg-teal-100' },
    slate: { bg: 'bg-slate-50', text: 'text-slate-600', icon: 'bg-slate-100' },
  };
  const c = colors[color] || colors.blue;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex sm:flex-row flex-col items-start gap-4 hover:shadow-md transition-shadow duration-200">
      <div className={`${c.icon} p-3 rounded-xl flex-shrink-0`}>
        <Icon size={22} className={c.text} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{title}</p>
        <p className="sm:text-2xl text-lg font-bold text-slate-800 leading-tight">
          {value}{suffix}
        </p>
        {change !== undefined && (
          <p className={`text-xs mt-1 font-medium ${change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% vs last month
          </p>
        )}
      </div>
    </div>
  );
}
