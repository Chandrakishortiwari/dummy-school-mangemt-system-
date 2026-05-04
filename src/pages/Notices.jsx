import { useState } from 'react';
import { Plus, X, Bell, Search, ChevronDown } from 'lucide-react';
import { noticesData } from '../data/dummyData';
import { useAuth } from '../context/AuthContext';

const priorityColors = {
  high: 'bg-red-100 text-red-600 border-red-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-slate-100 text-slate-600 border-slate-200',
};

const categories = ['All', 'Event', 'Meeting', 'Academic', 'Holiday', 'Training'];

function AddNoticeModal({ onClose }) {
  const { currentUser } = useAuth();
  const [form, setForm] = useState({ title: '', content: '', category: 'Academic', priority: 'medium', audience: 'all' });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Post New Notice</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Title</label>
            <input value={form.title} onChange={e => setForm(v => ({...v, title: e.target.value}))} placeholder="Notice title"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Content</label>
            <textarea value={form.content} onChange={e => setForm(v => ({...v, content: e.target.value}))} rows={4} placeholder="Notice details..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Category', key: 'category', options: ['Academic', 'Event', 'Meeting', 'Holiday', 'Training'] },
              { label: 'Priority', key: 'priority', options: ['high', 'medium', 'low'] },
              { label: 'Audience', key: 'audience', options: ['all', 'students', 'teachers'] },
            ].map(({ label, key, options }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
                <select value={form[key]} onChange={e => setForm(v => ({...v, [key]: e.target.value}))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 capitalize">
                  {options.map(o => <option key={o} value={o} className="capitalize">{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-3 p-6 pt-0">
          <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={onClose} className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">Post Notice</button>
        </div>
      </div>
    </div>
  );
}

export default function Notices() {
  const { currentUser } = useAuth();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAdd, setShowAdd] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const canPost = currentUser?.role === 'admin' || currentUser?.role === 'teacher';

  const filtered = noticesData.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'All' || n.category === categoryFilter;
    const matchAudience = n.audience === 'all' || n.audience === `${currentUser?.role}s`;
    return matchSearch && matchCategory && matchAudience;
  });

  return (
    <div className="space-y-5">
      {showAdd && <AddNoticeModal onClose={() => setShowAdd(false)} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Notices</h1>
          <p className="text-sm text-slate-500 mt-0.5">{filtered.length} notice{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        {canPost && (
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            <Plus size={16} /> Post Notice
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notices..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white" />
        </div>
        <div className="relative">
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white text-slate-700">
            {categories.map(c => <option key={c}>{c === 'All' ? 'All Categories' : c}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(n => (
          <div key={n.id}
            className={`bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-200 ${expanded === n.id ? 'shadow-md' : 'hover:shadow-sm'}`}>
            <div
              className="flex items-start gap-4 p-5 cursor-pointer"
              onClick={() => setExpanded(expanded === n.id ? null : n.id)}
            >
              <div className={`mt-0.5 p-2 rounded-lg flex-shrink-0 ${
                n.priority === 'high' ? 'bg-red-100' : n.priority === 'medium' ? 'bg-amber-100' : 'bg-slate-100'
              }`}>
                <Bell size={16} className={n.priority === 'high' ? 'text-red-600' : n.priority === 'medium' ? 'text-amber-600' : 'text-slate-500'} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap">
                  <h3 className="font-semibold text-slate-800 flex-1">{n.title}</h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${priorityColors[n.priority]}`}>
                      {n.priority}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-medium">
                      {n.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-slate-400">{n.date}</span>
                  <span className="text-xs text-slate-400">By {n.author}</span>
                  <span className="text-xs text-slate-400 capitalize">For: {n.audience}</span>
                </div>
                {expanded !== n.id && (
                  <p className="text-sm text-slate-500 mt-2 line-clamp-2">{n.content}</p>
                )}
              </div>
              <ChevronDown size={16} className={`text-slate-400 flex-shrink-0 mt-0.5 transition-transform duration-200 ${expanded === n.id ? 'rotate-180' : ''}`} />
            </div>
            {expanded === n.id && (
              <div className="px-5 pb-5 pt-0 border-t border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed mt-4">{n.content}</p>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 py-12 text-center text-slate-400">
            No notices found
          </div>
        )}
      </div>
    </div>
  );
}
