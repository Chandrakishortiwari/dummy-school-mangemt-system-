import { GraduationCap, CalendarCheck, BookOpen, Users, TrendingUp, AlertCircle, ClipboardList, Clock } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { attendanceData, students } from '../../data/dummyData';

function MiniDonut({ value, label }) {
  return (
    <div className="relative h-32 w-32 rounded-full" style={{ background: `conic-gradient(#10b981 0 ${value}%, #e2e8f0 ${value}% 100%)` }}>
      <div className="absolute inset-4 rounded-full bg-white flex flex-col items-center justify-center shadow-inner">
        <p className="text-3xl font-bold text-slate-900">{value}%</p>
        <p className="text-xs font-semibold text-slate-500">{label}</p>
      </div>
    </div>
  );
}

export default function TeacherDashboard({ user }) {
  const myStudents = students.filter(s => s.class === user.classAssigned);
  const todayKey = '2026-04-22';
  const classAttendance = (attendanceData['2026-04'] || []).filter(s => s.class === user.classAssigned);
  const present = classAttendance.filter(s => s.records[todayKey] === 'P').length;
  const absent = classAttendance.length - present;
  const todayPct = classAttendance.length ? Math.round((present / classAttendance.length) * 100) : 0;
  const monthlyTrend = classAttendance.map(s => {
    const days = Object.values(s.records);
    return {
      name: s.name,
      rollNo: s.rollNo,
      pct: days.length ? Math.round((days.filter(d => d === 'P').length / days.length) * 100) : 0,
    };
  });
  const focusStudents = monthlyTrend.filter(s => s.pct < 85).slice(0, 3);
  const classAverage = monthlyTrend.length
    ? Math.round(monthlyTrend.reduce((sum, item) => sum + item.pct, 0) / monthlyTrend.length)
    : 0;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-teal-900 via-slate-900 to-blue-900 p-6 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-teal-200">Teacher workspace</p>
            <h1 className="mt-2 text-3xl font-bold">Welcome back, {user.name}</h1>
            <p className="text-sm text-slate-300 mt-2">{user.classAssigned} - {user.subject}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
              <p className="text-xs text-slate-300">Students</p>
              <p className="text-2xl font-bold">{myStudents.length}</p>
            </div>
            <div className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
              <p className="text-xs text-slate-300">Present</p>
              <p className="text-2xl font-bold">{present}</p>
            </div>
            <div className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
              <p className="text-xs text-slate-300">Today</p>
              <p className="text-2xl font-bold">{todayPct}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-teal-100 bg-teal-50 p-5 text-teal-950 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Class Average</p>
            <TrendingUp size={20} className="text-teal-700" />
          </div>
          <h2 className="mt-3 text-2xl font-bold">{classAverage}%</h2>
          <p className="mt-1 text-sm text-teal-800">Monthly attendance strength</p>
        </div>
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-blue-950 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Next Period</p>
            <Clock size={20} className="text-blue-700" />
          </div>
          <h2 className="mt-3 text-lg font-bold">{user.subject} revision</h2>
          <p className="mt-1 text-sm text-blue-800">{user.classAssigned} - concept recap and worksheet review</p>
        </div>
        <div className="rounded-xl border border-amber-100 bg-amber-50 p-5 text-amber-950 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Focus Students</p>
            <AlertCircle size={20} className="text-amber-700" />
          </div>
          <h2 className="mt-3 text-2xl font-bold">{focusStudents.length}</h2>
          <p className="mt-1 text-sm text-amber-800">Need attendance attention this month</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="My Students" value={myStudents.length} icon={GraduationCap} color="blue" />
        <StatCard title="Present Today" value={present} icon={CalendarCheck} color="green" />
        <StatCard title="Absent Today" value={absent} icon={CalendarCheck} color="red" />
        <StatCard title="My Subject" value={user.subject} icon={BookOpen} color="teal" />
      </div>

      <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800">Class Action Plan</h3>
              <p className="text-xs text-slate-500 mt-1">Teaching priorities for today</p>
            </div>
            <ClipboardList size={20} className="text-slate-500" />
          </div>
          <div className="space-y-3">
            {[
              ['Review absentees', `${absent} students absent today`, 'bg-red-50 text-red-700'],
              ['Share worksheet', `${user.subject} practice for ${user.classAssigned}`, 'bg-blue-50 text-blue-700'],
              ['Parent note', focusStudents.length ? 'Follow up weak attendance cases' : 'No urgent attendance concern', 'bg-emerald-50 text-emerald-700'],
            ].map(([title, text, cls]) => (
              <div key={title} className={`rounded-xl px-4 py-3 ${cls}`}>
                <p className="text-sm font-bold">{title}</p>
                <p className="text-xs mt-1 opacity-80">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800">Students To Watch</h3>
              <p className="text-xs text-slate-500 mt-1">Attendance below 85%</p>
            </div>
            <Users size={20} className="text-amber-600" />
          </div>
          <div className="space-y-3">
            {(focusStudents.length ? focusStudents : monthlyTrend.slice(0, 3)).map(item => (
              <div key={item.name} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <div>
                  <p className="text-sm font-bold text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.rollNo}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${item.pct >= 90 ? 'bg-emerald-100 text-emerald-700' : item.pct >= 75 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                  {item.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-slate-800">Today Attendance</h3>
              <p className="text-xs text-slate-500 mt-1">Class presence ratio</p>
            </div>
            <TrendingUp size={20} className="text-emerald-600" />
          </div>
          <div className="flex items-center justify-center">
            <MiniDonut value={todayPct} label="Present" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-slate-800">Student Attendance Graph</h3>
              <p className="text-xs text-slate-500 mt-1">Monthly percentage by student</p>
            </div>
            <Users size={20} className="text-blue-600" />
          </div>
          <div className="space-y-3">
            {monthlyTrend.map(item => (
              <div key={item.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-600">{item.name}</span>
                  <span className="font-bold text-slate-700">{item.pct}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full rounded-full ${item.pct >= 90 ? 'bg-emerald-500' : item.pct >= 75 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4">Today's Class Attendance - {user.classAssigned}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Roll No</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {classAttendance.map(s => (
                <tr key={s.studentId} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-700">{s.name}</td>
                  <td className="py-2.5 px-3 text-slate-500">{s.rollNo}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      s.records[todayKey] === 'P' ? 'bg-emerald-100 text-emerald-700' :
                      s.records[todayKey] === 'A' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {s.records[todayKey] === 'P' ? 'Present' : s.records[todayKey] === 'A' ? 'Absent' : 'Leave'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
