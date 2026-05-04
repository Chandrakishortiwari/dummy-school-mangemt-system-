import { useState } from 'react';
import { Search, Plus, X, Phone, Mail, ChevronDown } from 'lucide-react';
import { teachers } from '../data/dummyData';
import { useAuth } from '../context/AuthContext';

function TeacherModal({ teacher, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Teacher Profile</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center text-xl font-bold text-teal-600">
              {teacher.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-800">{teacher.name}</h4>
              <p className="text-sm text-slate-500">{teacher.empId} · {teacher.subject}</p>
            </div>
            <span className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${teacher.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              {teacher.status}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ['Subject', teacher.subject],
              ['Class Assigned', teacher.classAssigned],
              ['Gender', teacher.gender],
              ['Date of Birth', teacher.dob],
              ['Qualification', teacher.qualification],
              ['Experience', teacher.experience],
              ['Join Date', teacher.joinDate],
              ['Salary', `₹${teacher.salary.toLocaleString()}`],
              ['Email', teacher.email],
              ['Phone', teacher.phone],
            ].map(([label, val]) => (
              <div key={label} className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-400 font-medium mb-0.5">{label}</p>
                <p className="text-slate-700 font-medium">{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AddTeacherModal({ onClose }) {
  const [form, setForm] = useState({ name: '', empId: '', subject: '', classAssigned: '', email: '', phone: '', qualification: '' });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Add New Teacher</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"><X size={18} /></button>
        </div>
        <div className="p-6 grid grid-cols-2 gap-3">
          {[
            ['Full Name', 'name', 'text'],
            ['Employee ID', 'empId', 'text'],
            ['Subject', 'subject', 'text'],
            ['Class Assigned', 'classAssigned', 'text'],
            ['Email', 'email', 'email'],
            ['Phone', 'phone', 'tel'],
            ['Qualification', 'qualification', 'text'],
          ].map(([label, key, type]) => (
            <div key={key} className={key === 'name' || key === 'qualification' ? 'col-span-2' : ''}>
              <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
              <input type={type} value={form[key]} onChange={e => setForm(v => ({...v, [key]: e.target.value}))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            </div>
          ))}
        </div>
        <div className="flex gap-3 p-6 pt-0">
          <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={onClose} className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">Add Teacher</button>
        </div>
      </div>
    </div>
  );
}

export default function Teachers() {
  const { currentUser } = useAuth();
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const subjects = ['All', ...Array.from(new Set(teachers.map(t => t.subject)))];

  const filtered = teachers.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.empId.toLowerCase().includes(search.toLowerCase());
    const matchSubject = subjectFilter === 'All' || t.subject === subjectFilter;
    return matchSearch && matchSubject;
  });

  return (
    <div className="space-y-5">
      {selected && <TeacherModal teacher={selected} onClose={() => setSelected(null)} />}
      {showAdd && <AddTeacherModal onClose={() => setShowAdd(false)} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Teachers</h1>
          <p className="text-sm text-slate-500 mt-0.5">{filtered.length} teacher{filtered.length !== 1 ? 's' : ''} found</p>
        </div>
        {currentUser?.role === 'admin' && (
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            <Plus size={16} /> Add Teacher
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or ID..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white" />
        </div>
        <div className="relative">
          <select value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white text-slate-700">
            {subjects.map(s => <option key={s}>{s === 'All' ? 'All Subjects' : s}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(t => (
          <div key={t.id} onClick={() => setSelected(t)}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-teal-100 flex items-center justify-center text-base font-bold text-teal-600 flex-shrink-0">
                {t.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-slate-800 truncate">{t.name}</h3>
                <p className="text-xs text-slate-500">{t.empId}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${t.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                {t.status}
              </span>
            </div>
            <div className="space-y-1.5 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-400 w-24">Subject</span>
                <span className="text-sm text-slate-700">{t.subject}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-400 w-24">Class</span>
                <span className="text-sm text-slate-700">{t.classAssigned}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-400 w-24">Experience</span>
                <span className="text-sm text-slate-700">{t.experience}</span>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-xs text-slate-500"><Mail size={12} />{t.email}</div>
              <div className="flex items-center gap-2 text-xs text-slate-500"><Phone size={12} />{t.phone}</div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 py-12 text-center text-slate-400">No teachers found</div>
        )}
      </div>
    </div>
  );
}
