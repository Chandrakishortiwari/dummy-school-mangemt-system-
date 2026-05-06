import { CalendarCheck, CreditCard, BookOpen, TrendingUp, AlertCircle, Award, ClipboardList, Clock } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { attendanceData, feesData } from '../../data/dummyData';

function Donut({ value, label, color = '#10b981' }) {
  return (
    <div className="relative min-h-36 min-w-36 rounded-full" style={{ background: `conic-gradient(${color} 0 ${value}%, #e2e8f0 ${value}% 100%)` }}>
      <div className="absolute inset-5 rounded-full bg-white flex flex-col items-center justify-center shadow-inner">
        <p className="text-3xl font-bold text-slate-900">{value}%</p>
        <p className="text-xs font-semibold text-slate-500">{label}</p>
      </div>
    </div>
  );
}

export default function StudentDashboard({ user }) {
  const myFees = feesData.filter(f => f.studentId === user.id);
  const myAttendance = (attendanceData['2026-04'] || []).find(s => s.studentId === user.id);
  const days = myAttendance ? Object.values(myAttendance.records) : [];
  const presentDays = days.filter(d => d === 'P').length;
  const absentDays = days.filter(d => d === 'A').length;
  const leaveDays = days.filter(d => d === 'L').length;
  const pct = days.length ? Math.round((presentDays / days.length) * 100) : 0;
  const paidFees = myFees.filter(f => f.status === 'paid').length;
  const dueFees = myFees.filter(f => f.status !== 'paid').length;
  const totalFee = myFees.reduce((sum, f) => sum + f.amount, 0);
  const paidFee = myFees.reduce((sum, f) => sum + f.paid, 0);
  const feePct = totalFee ? Math.round((paidFee / totalFee) * 100) : 0;
  const learningScore = Math.round((pct + feePct + 86) / 3);
  const nextDueFee = myFees.find(f => f.status !== 'paid');
  const attendanceStatus = pct >= 90 ? 'Excellent' : pct >= 75 ? 'Needs consistency' : 'Needs attention';

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-emerald-900 p-6 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-blue-200">Student profile</p>
            <h1 className="mt-2 text-3xl font-bold">{user.name}</h1>
            <p className="text-sm text-slate-300 mt-2">{user.class} | Roll No: {user.rollNo}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
              <p className="text-xs text-slate-300">Attendance</p>
              <p className="text-2xl font-bold">{pct}%</p>
            </div>
            <div className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
              <p className="text-xs text-slate-300">Fee Paid</p>
              <p className="text-2xl font-bold">{feePct}%</p>
            </div>
            <div className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
              <p className="text-xs text-slate-300">Due</p>
              <p className="text-2xl font-bold">{dueFees}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5 text-emerald-950 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Learning Score</p>
            <Award size={20} className="text-emerald-700" />
          </div>
          <h2 className="mt-3 text-2xl font-bold">{learningScore}%</h2>
          <p className="mt-1 text-sm text-emerald-800">Attendance, fee discipline, and activity readiness</p>
        </div>
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-blue-950 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Attendance Status</p>
            <CalendarCheck size={20} className="text-blue-700" />
          </div>
          <h2 className="mt-3 text-lg font-bold">{attendanceStatus}</h2>
          <p className="mt-1 text-sm text-blue-800">{presentDays} present, {absentDays} absent, {leaveDays} leave</p>
        </div>
        <div className="rounded-xl border border-amber-100 bg-amber-50 p-5 text-amber-950 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Next Fee Action</p>
            <Clock size={20} className="text-amber-700" />
          </div>
          <h2 className="mt-3 text-lg font-bold">{nextDueFee ? nextDueFee.month : 'All clear'}</h2>
          <p className="mt-1 text-sm text-amber-800">{nextDueFee ? `Due date ${nextDueFee.dueDate}` : 'No pending fee record found'}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Attendance %" value={pct} suffix="%" icon={CalendarCheck} color="green" />
        <StatCard title="Present Days" value={presentDays} icon={CalendarCheck} color="blue" />
        <StatCard title="Fees Paid" value={paidFees} icon={CreditCard} color="teal" />
        <StatCard title="Fees Due" value={dueFees} icon={CreditCard} color="red" />
      </div>

      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800">Personal Action Plan</h3>
              <p className="text-xs text-slate-500 mt-1">Small steps for this week</p>
            </div>
            <ClipboardList size={20} className="text-slate-500" />
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              ['Attendance', pct >= 90 ? 'Maintain current rhythm' : 'Target 90% attendance', pct >= 90 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'],
              ['Fees', dueFees ? 'Clear pending fee item' : 'Fee record is clean', dueFees ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'],
              ['Study', 'Review class notes daily', 'bg-blue-50 text-blue-700'],
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
              <h3 className="font-semibold text-slate-800">Profile Details</h3>
              <p className="text-xs text-slate-500 mt-1">Student identity snapshot</p>
            </div>
            <BookOpen size={20} className="text-blue-600" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              ['Name', user.name],
              ['Class', user.class],
              ['Roll No', user.rollNo],
              ['Fee Status', dueFees ? `${dueFees} due` : 'Paid'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
                <p className="mt-1 text-sm font-bold text-slate-800">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-slate-800">Attendance Pie</h3>
              <p className="text-xs text-slate-500 mt-1">Present, absent, and leave split</p>
            </div>
            <TrendingUp size={20} className="text-emerald-600" />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Donut value={pct} label="Present" />
            <div className="space-y-3 w-full">
              {[
                ['Present', presentDays, 'bg-emerald-500'],
                ['Absent', absentDays, 'bg-red-500'],
                ['Leave', leaveDays, 'bg-amber-500'],
              ].map(([label, value, color]) => (
                <div key={label} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
                    {label}
                  </span>
                  <span className="text-sm font-bold text-slate-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-slate-800">Fee Progress</h3>
              <p className="text-xs text-slate-500 mt-1">Paid amount vs total fee</p>
            </div>
            <CreditCard size={20} className="text-blue-600" />
          </div>
          <div className="flex items-center gap-6">
            <Donut value={feePct} label="Paid" color="#2563eb" />
            <div className="flex-1 space-y-3">
              <div className="rounded-lg bg-blue-50 border border-blue-100 p-3">
                <p className="text-xs font-semibold text-blue-700">Paid Amount</p>
                <p className="text-xl font-bold text-blue-900">Rs {paidFee.toLocaleString()}</p>
              </div>
              <div className="rounded-lg bg-red-50 border border-red-100 p-3">
                <p className="text-xs font-semibold text-red-700">Pending Amount</p>
                <p className="text-xl font-bold text-red-900">Rs {(totalFee - paidFee).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Recent Fee Records</h3>
          <div className="space-y-2">
            {myFees.slice(-4).reverse().map(f => (
              <div key={f.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-700">{f.month}</p>
                  <p className="text-xs text-slate-400">Due: {f.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800">Rs. {f.amount.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    f.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                    f.status === 'overdue' ? 'bg-red-100 text-red-700' :
                    f.status === 'partial' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                  }`}>{f.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Attendance This Month</h3>
            {pct < 75 ? <AlertCircle size={18} className="text-red-500" /> : <BookOpen size={18} className="text-slate-500" />}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {myAttendance && Object.entries(myAttendance.records).map(([date, status]) => (
              <div key={date} title={date} className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-medium ${
                status === 'P' ? 'bg-emerald-100 text-emerald-700' :
                status === 'A' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {new Date(date).getDate()}
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-emerald-200" /><span className="text-xs text-slate-500">Present</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-red-200" /><span className="text-xs text-slate-500">Absent</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-amber-200" /><span className="text-xs text-slate-500">Leave</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
