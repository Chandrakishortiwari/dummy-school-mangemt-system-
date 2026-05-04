import { useState } from 'react';
import { Search, Filter, Plus, ChevronDown, User, Phone, Mail, X } from 'lucide-react';
import { students, classes } from '../data/dummyData';
import { useAuth } from '../context/AuthContext';

function StudentModal({ student, onClose }) {
  if (!student) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Student Profile</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600">
              {student.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-800">{student.name}</h4>
              <p className="text-sm text-slate-500">{student.rollNo} · {student.class}</p>
            </div>
            <span className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${student.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              {student.status}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ['Gender', student.gender],
              ['Date of Birth', student.dob],
              ['Admission Date', student.admissionDate],
              ['Section', student.section],
              ['Email', student.email],
              ['Phone', student.phone],
              ['Parent', student.parentName],
              ['Parent Phone', student.parentPhone],
            ].map(([label, val]) => (
              <div key={label} className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-400 font-medium mb-0.5">{label}</p>
                <p className="text-slate-700 font-medium">{val}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 rounded-lg p-3 text-sm">
            <p className="text-xs text-slate-400 font-medium mb-0.5">Address</p>
            <p className="text-slate-700">{student.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddStudentModal({ onClose }) {
  const [form, setForm] = useState({ name: '', rollNo: '', class: 'Class 10-A', gender: 'Male', email: '', phone: '', parentName: '' });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Add New Student</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"><X size={18} /></button>
        </div>
        <div className="p-6 grid grid-cols-2 gap-3">
          {[
            ['Full Name', 'name', 'text'],
            ['Roll No', 'rollNo', 'text'],
            ['Email', 'email', 'email'],
            ['Phone', 'phone', 'tel'],
            ['Parent Name', 'parentName', 'text'],
          ].map(([label, key, type]) => (
            <div key={key} className={key === 'name' ? 'col-span-2' : ''}>
              <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
              <input type={type} value={form[key]} onChange={e => setForm(v => ({...v, [key]: e.target.value}))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Class</label>
            <select value={form.class} onChange={e => setForm(v => ({...v, class: e.target.value}))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400">
              {classes.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Gender</label>
            <select value={form.gender} onChange={e => setForm(v => ({...v, gender: e.target.value}))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400">
              <option>Male</option><option>Female</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 p-6 pt-0">
          <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={onClose} className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">Add Student</button>
        </div>
      </div>
    </div>
  );
}

export default function Students() {
  const { currentUser } = useAuth();
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const isAdmin = currentUser?.role === 'admin';
  const isTeacher = currentUser?.role === 'teacher';

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchClass = classFilter === 'All' || s.class === classFilter;
    const matchStatus = statusFilter === 'All' || s.status === statusFilter;
    const matchTeacher = !isTeacher || s.class === currentUser.classAssigned;
    return matchSearch && matchClass && matchStatus && matchTeacher;
  });

  return (
    <div className="space-y-5">
      {selected && <StudentModal student={selected} onClose={() => setSelected(null)} />}
      {showAdd && <AddStudentModal onClose={() => setShowAdd(false)} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Students</h1>
          <p className="text-sm text-slate-500 mt-0.5">{filtered.length} student{filtered.length !== 1 ? 's' : ''} found</p>
        </div>
        {isAdmin && (
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            <Plus size={16} /> Add Student
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or roll no..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white" />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <select value={classFilter} onChange={e => setClassFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white text-slate-700">
              <option value="All">All Classes</option>
              {classes.map(c => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white text-slate-700">
              <option value="All">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Student', 'Roll No', 'Class', 'Gender', 'Contact', 'Status', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 flex-shrink-0">
                        {s.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{s.name}</p>
                        <p className="text-xs text-slate-400">{s.parentName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-medium">{s.rollNo}</td>
                  <td className="px-4 py-3 text-slate-600">{s.class}</td>
                  <td className="px-4 py-3 text-slate-600">{s.gender}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1 text-slate-500"><Phone size={11} /><span>{s.phone}</span></div>
                      <div className="flex items-center gap-1 text-slate-400"><Mail size={11} /><span>{s.email}</span></div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelected(s)} className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-400">No students found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
