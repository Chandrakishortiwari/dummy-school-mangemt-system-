import { useState } from 'react';
import { ChevronDown, Save, CheckCircle, XCircle, MinusCircle } from 'lucide-react';
import { attendanceData, students, classes } from '../data/dummyData';
import { useAuth } from '../context/AuthContext';

const workingDays = [
  '2026-04-01', '2026-04-02', '2026-04-03', '2026-04-04',
  '2026-04-07', '2026-04-08', '2026-04-09', '2026-04-10', '2026-04-11',
  '2026-04-14', '2026-04-15', '2026-04-16', '2026-04-17',
  '2026-04-21', '2026-04-22',
];

function StatusBadge({ status }) {
  if (status === 'P') return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">Present</span>;
  if (status === 'A') return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Absent</span>;
  if (status === 'L') return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Leave</span>;
  return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500">—</span>;
}

function TeacherAttendance({ user }) {
  const classStudents = students.filter(s => s.class === user.classAssigned);
  const today = '2026-04-22';
  const existingData = attendanceData['2026-04'] || [];

  const initialAttendance = {};
  classStudents.forEach(s => {
    const record = existingData.find(d => d.studentId === s.id);
    initialAttendance[s.id] = record?.records[today] || 'P';
  });

  const [attendance, setAttendance] = useState(initialAttendance);
  const [saved, setSaved] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);

  const toggle = (studentId, status) => {
    setAttendance(a => ({ ...a, [studentId]: status }));
    setSaved(false);
  };

  const markAll = (status) => {
    const updated = {};
    classStudents.forEach(s => { updated[s.id] = status; });
    setAttendance(updated);
    setSaved(false);
  };

  const handleSave = () => setSaved(true);

  const presentCount = Object.values(attendance).filter(v => v === 'P').length;
  const absentCount = Object.values(attendance).filter(v => v === 'A').length;
  const leaveCount = Object.values(attendance).filter(v => v === 'L').length;

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Mark Attendance</h1>
          <p className="text-sm text-slate-500 mt-0.5">{user.classAssigned} — {selectedDate}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
              {workingDays.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            <Save size={15} /> {saved ? 'Saved!' : 'Save'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[['Present', presentCount, 'text-emerald-600 bg-emerald-50'], ['Absent', absentCount, 'text-red-600 bg-red-50'], ['On Leave', leaveCount, 'text-amber-600 bg-amber-50']].map(([label, count, cls]) => (
          <div key={label} className={`${cls} rounded-xl p-4 text-center border border-current/10`}>
            <p className="text-2xl font-bold">{count}</p>
            <p className="text-xs font-medium opacity-80">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600">{classStudents.length} Students</span>
          <div className="flex gap-2">
            <button onClick={() => markAll('P')} className="px-3 py-1.5 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors">Mark All Present</button>
            <button onClick={() => markAll('A')} className="px-3 py-1.5 text-xs font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">Mark All Absent</button>
          </div>
        </div>
        <div className="divide-y divide-slate-50">
          {classStudents.map(s => (
            <div key={s.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
                  {s.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">{s.name}</p>
                  <p className="text-xs text-slate-400">{s.rollNo}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {[
                  { status: 'P', icon: CheckCircle, label: 'P', activeClass: 'bg-emerald-100 text-emerald-600 border-emerald-300' },
                  { status: 'A', icon: XCircle, label: 'A', activeClass: 'bg-red-100 text-red-600 border-red-300' },
                  { status: 'L', icon: MinusCircle, label: 'L', activeClass: 'bg-amber-100 text-amber-600 border-amber-300' },
                ].map(({ status, icon: Icon, label, activeClass }) => (
                  <button
                    key={status}
                    onClick={() => toggle(s.id, status)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      attendance[s.id] === status ? activeClass : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Icon size={13} /> {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ViewAttendance({ userStudentId, userName, userClass }) {
  const [selectedClass, setSelectedClass] = useState(userClass || 'Class 10-A');
  const monthData = attendanceData['2026-04'] || [];
  const relevantData = userStudentId
    ? monthData.filter(s => s.studentId === userStudentId)
    : monthData.filter(s => s.class === selectedClass);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Attendance Records</h1>
          <p className="text-sm text-slate-500 mt-0.5">April 2026</p>
        </div>
        {!userStudentId && (
          <div className="relative">
            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
              {classes.map(c => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider sticky left-0 bg-slate-50">Student</th>
                {workingDays.map(d => (
                  <th key={d} className="px-2 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap text-center">
                    {new Date(d).getDate()}
                  </th>
                ))}
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {relevantData.map(s => {
                const days = Object.values(s.records);
                const pct = Math.round((days.filter(d => d === 'P').length / days.length) * 100);
                return (
                  <tr key={s.studentId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 sticky left-0 bg-white hover:bg-slate-50">
                      <div>
                        <p className="font-medium text-slate-700 whitespace-nowrap">{s.name}</p>
                        <p className="text-xs text-slate-400">{s.rollNo}</p>
                      </div>
                    </td>
                    {workingDays.map(d => (
                      <td key={d} className="px-2 py-3 text-center">
                        <span className={`inline-block w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                          s.records[d] === 'P' ? 'bg-emerald-100 text-emerald-700' :
                          s.records[d] === 'A' ? 'bg-red-100 text-red-700' :
                          s.records[d] === 'L' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {s.records[d] || '—'}
                        </span>
                      </td>
                    ))}
                    <td className="px-4 py-3 text-center">
                      <span className={`font-semibold text-sm ${pct >= 90 ? 'text-emerald-600' : pct >= 75 ? 'text-amber-600' : 'text-red-600'}`}>
                        {pct}%
                      </span>
                    </td>
                  </tr>
                );
              })}
              {relevantData.length === 0 && (
                <tr><td colSpan={workingDays.length + 2} className="px-4 py-10 text-center text-slate-400">No attendance data found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function Attendance() {
  const { currentUser } = useAuth();

  if (currentUser?.role === 'teacher') {
    return <TeacherAttendance user={currentUser} />;
  }

  if (currentUser?.role === 'student') {
    return <ViewAttendance userStudentId={currentUser.id} userName={currentUser.name} userClass={currentUser.class} />;
  }

  if (currentUser?.role === 'parent') {
    return <ViewAttendance userStudentId={currentUser.childId} userName="Emma Wilson" userClass="Class 10-A" />;
  }

  return <ViewAttendance />;
}
