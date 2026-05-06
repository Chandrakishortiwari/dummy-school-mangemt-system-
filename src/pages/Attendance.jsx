import { useState } from 'react';
import { ChevronDown, Save, CheckCircle, XCircle, MinusCircle, CalendarCheck, BarChart3, Users, TrendingUp } from 'lucide-react';
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

const getAttendanceStats = (recordsList) => {
  const allDays = recordsList.flatMap(s => Object.values(s.records));
  const present = allDays.filter(d => d === 'P').length;
  const absent = allDays.filter(d => d === 'A').length;
  const leave = allDays.filter(d => d === 'L').length;
  const total = allDays.length || 1;

  return {
    present,
    absent,
    leave,
    total,
    presentPercent: Math.round((present / total) * 100),
    absentPercent: Math.round((absent / total) * 100),
    leavePercent: Math.round((leave / total) * 100),
  };
};

function AttendancePie({ stats }) {
  const chart = `conic-gradient(#10b981 0 ${stats.presentPercent}%, #ef4444 ${stats.presentPercent}% ${stats.presentPercent + stats.absentPercent}%, #f59e0b ${stats.presentPercent + stats.absentPercent}% ${stats.presentPercent + stats.absentPercent + stats.leavePercent}%, #e2e8f0 ${stats.presentPercent + stats.absentPercent + stats.leavePercent}% 100%)`;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Attendance Pie</p>
          <h2 className="mt-1 text-lg font-bold text-slate-800">Monthly split</h2>
        </div>
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <BarChart3 size={20} />
        </div>
      </div>
      <div className="mt-5 flex flex-col sm:flex-row items-center gap-5">
        <div className="relative min-w-40 min-h-40 rounded-full" style={{ background: chart }}>
          <div className="absolute inset-5 rounded-full bg-white flex flex-col items-center justify-center shadow-inner">
            <p className="text-3xl font-bold text-slate-900">{stats.presentPercent}%</p>
            <p className="text-xs font-semibold text-slate-500">Present</p>
          </div>
        </div>
        <div className="space-y-3 w-full">
          {[
            ['Present', stats.present, stats.presentPercent, 'bg-emerald-500'],
            ['Absent', stats.absent, stats.absentPercent, 'bg-red-500'],
            ['Leave', stats.leave, stats.leavePercent, 'bg-amber-500'],
          ].map(([label, count, percent, color]) => (
            <div key={label}>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="flex items-center gap-2 font-medium text-slate-600">
                  <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                  {label}
                </span>
                <span className="font-bold text-slate-800">{count} days - {percent}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DailyTrend({ data }) {
  const daily = workingDays.map(day => {
    const total = data.length || 1;
    const present = data.filter(s => s.records[day] === 'P').length;
    return {
      day: new Date(day).getDate(),
      percent: Math.round((present / total) * 100),
    };
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Daily Trend</p>
          <h2 className="mt-1 text-lg font-bold text-slate-800">Present percentage</h2>
        </div>
        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <TrendingUp size={20} />
        </div>
      </div>
      <div className="h-44 flex items-end gap-2">
        {daily.map(item => (
          <div key={item.day} className="flex-1 flex flex-col items-center gap-2 min-w-0">
            <div className="w-full rounded-t-lg bg-emerald-500/85 hover:bg-emerald-600 transition-colors" style={{ height: `${Math.max(item.percent, 8)}%` }} title={`${item.percent}% present`} />
            <span className="text-[10px] font-semibold text-slate-400">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, helper, className }) {
  return (
    <div className={`rounded-xl border p-4 shadow-sm ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white/80 flex items-center justify-center">
          <Icon size={20} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider opacity-75">{label}</p>
          <p className="text-2xl font-bold mt-0.5">{value}</p>
          {helper && <p className="text-xs mt-0.5 opacity-75">{helper}</p>}
        </div>
      </div>
    </div>
  );
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
  const stats = getAttendanceStats(relevantData);
  const averageAttendance = relevantData.length
    ? Math.round(relevantData.reduce((sum, s) => {
      const days = Object.values(s.records);
      return sum + Math.round((days.filter(d => d === 'P').length / days.length) * 100);
    }, 0) / relevantData.length)
    : 0;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 p-5 sm:p-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-blue-200">April 2026</p>
            <h1 className="text-2xl font-bold mt-1">
              {userStudentId ? `${userName || 'Student'} Attendance` : 'Attendance Dashboard'}
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              {userStudentId ? userClass : `${selectedClass} class overview`}
            </p>
          </div>
          {!userStudentId && (
            <div className="relative">
              <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 border border-white/20 rounded-lg text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                {classes.map(c => <option key={c}>{c}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          icon={Users}
          label={userStudentId ? 'Student' : 'Students'}
          value={userStudentId ? '1' : relevantData.length}
          helper="Records shown"
          className="bg-white text-slate-800 border-slate-200"
        />
        <SummaryCard
          icon={CalendarCheck}
          label="Working Days"
          value={workingDays.length}
          helper="April month"
          className="bg-blue-50 text-blue-800 border-blue-100"
        />
        <SummaryCard
          icon={CheckCircle}
          label="Present"
          value={`${stats.presentPercent}%`}
          helper={`${stats.present} present marks`}
          className="bg-emerald-50 text-emerald-800 border-emerald-100"
        />
        <SummaryCard
          icon={XCircle}
          label="Absent"
          value={`${stats.absentPercent}%`}
          helper={`${stats.absent} absent marks`}
          className="bg-red-50 text-red-800 border-red-100"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <AttendancePie stats={stats} />
        <DailyTrend data={relevantData} />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Performance Score</p>
            <h2 className="text-lg font-bold text-slate-800 mt-1">Average attendance: {averageAttendance}%</h2>
          </div>
          <StatusBadge status={averageAttendance >= 90 ? 'P' : averageAttendance >= 75 ? 'L' : 'A'} />
        </div>
        <div className="mt-4 h-3 rounded-full bg-slate-100 overflow-hidden">
          <div
            className={`h-full rounded-full ${averageAttendance >= 90 ? 'bg-emerald-500' : averageAttendance >= 75 ? 'bg-amber-500' : 'bg-red-500'}`}
            style={{ width: `${averageAttendance}%` }}
          />
        </div>
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
