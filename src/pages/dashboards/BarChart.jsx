export default function BarChart({ data, valueKey, labelKey, color = 'bg-blue-500', maxVal }) {
  const max = maxVal || Math.max(...data.map(d => d[valueKey]));

  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-xs text-slate-500 font-medium">
            {d[valueKey]}{valueKey === 'percentage' ? '%' : ''}
          </span>
          <div
            className={`w-full ${color} rounded-t-md transition-all duration-700`}
            style={{ height: `${(d[valueKey] / max) * 90}%`, minHeight: '4px' }}
          />
          <span className="text-xs text-slate-400">{d[labelKey]}</span>
        </div>
      ))}
    </div>
  );
}
