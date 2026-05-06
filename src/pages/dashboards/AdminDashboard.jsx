import { Users, GraduationCap, CalendarCheck, CreditCard, BookOpen, ClipboardList, TrendingUp, Bell, AlertTriangle, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { dashboardStats, feesData, leaveRequests, noticesData } from '../../data/dummyData';
import { useAuth } from '../../context/AuthContext';
import BarChart from './BarChart';

function DonutChart({ value, label, subLabel, color = '#2563eb', track = '#e2e8f0' }) {
  return (
    <div className="flex sm:flex-row flex-col  lg:items-center gap-5">
      <div>
      <div
        className="relative h-36 w-36 rounded-full"
        style={{ background: `conic-gradient(${color} 0 ${value}%, ${track} ${value}% 100%)` }}
      >
        <div className="absolute inset-5 rounded-full bg-white flex flex-col items-center justify-center shadow-inner">
          <p className="text-3xl font-bold text-slate-900">{value}%</p>
          <p className="text-xs font-semibold text-slate-500">{label}</p>
        </div>
      </div>
      </div>
      <div className='flex flex-col lg:justify-start'>
        <p className="text-sm font-semibold text-slate-800">{subLabel}</p>
        <p className="mt-2 text-sm leading-6 text-slate-500">School health is calculated from attendance, fee collection, and active operations.</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const pending = leaveRequests.filter(l => l.status === 'pending').length;
  const overdueCount = feesData.filter(f => f.status === 'overdue' || f.status === 'pending').length;
  const totalFee = feesData.reduce((sum, f) => sum + f.amount, 0);
  const paidFee = feesData.reduce((sum, f) => sum + f.paid, 0);
  const feeCollectionPct = totalFee ? Math.round((paidFee / totalFee) * 100) : 0;
  const schoolHealth = Math.round((dashboardStats.attendanceToday + feeCollectionPct + 88) / 3);
  const feeRiskList = feesData
    .filter(f => f.status === 'overdue' || f.status === 'pending' || f.status === 'partial')
    .slice(0, 5);
  const topClasses = [...dashboardStats.classStrength].sort((a, b) => b.students - a.students).slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 p-6 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-blue-200">School command center</p>
            <h1 className="mt-2 text-3xl font-bold">Good to see you, {currentUser?.name || 'Admin'}</h1>
            <p className="text-sm text-slate-300 mt-2">Live overview of attendance, finance, leaves, notices, and school activity.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Operations stable', 'April 2026 active', 'ERP synced'].map(item => (
                <span key={item} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-100 ring-1 ring-white/15">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              ['Attendance', `${dashboardStats.attendanceToday}%`],
              ['Fees', `${feeCollectionPct}%`],
              ['Health', `${schoolHealth}%`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
                <p className="text-xs text-slate-300">{label}</p>
                <p className="text-2xl font-bold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-blue-950 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Principal Brief</p>
            <ShieldCheck size={20} className="text-blue-700" />
          </div>
          <h2 className="mt-3 text-lg font-bold">Attendance is {dashboardStats.attendanceToday}% today</h2>
          <p className="mt-2 text-sm leading-6 text-blue-800">Keep fee follow-ups and pending leave approvals on priority before the day closes.</p>
        </div>
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5 text-emerald-950 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Finance Pulse</p>
            <CreditCard size={20} className="text-emerald-700" />
          </div>
          <h2 className="mt-3 text-lg font-bold">Rs {paidFee.toLocaleString()} collected</h2>
          <p className="mt-2 text-sm leading-6 text-emerald-800">{feeCollectionPct}% of listed fee amount is already collected.</p>
        </div>
        <div className="rounded-xl border border-amber-100 bg-amber-50 p-5 text-amber-950 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Today Focus</p>
            <Clock size={20} className="text-amber-700" />
          </div>
          <h2 className="mt-3 text-lg font-bold">{pending + overdueCount} items need attention</h2>
          <p className="mt-2 text-sm leading-6 text-amber-800">Review pending leaves, fee reminders, and high priority notices.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Students" value={dashboardStats.totalStudents} icon={GraduationCap} color="blue" change={3} />
        <StatCard title="Total Teachers" value={dashboardStats.totalTeachers} icon={Users} color="teal" change={0} />
        <StatCard title="Classes" value={dashboardStats.totalClasses} icon={BookOpen} color="slate" />
        <StatCard title="Today's Attendance" value={dashboardStats.attendanceToday} suffix="%" icon={CalendarCheck} color="green" change={2} />
        <StatCard title="Pending Leaves" value={pending} icon={ClipboardList} color="orange" />
        <StatCard title="Fee Overdue" value={overdueCount} icon={CreditCard} color="red" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-slate-800">School Health</h3>
              <p className="text-xs text-slate-500 mt-1">Overall operational score</p>
            </div>
            <TrendingUp size={20} className="text-blue-600" />
          </div>
          <DonutChart value={schoolHealth} label="Score" subLabel="Healthy operating range" color="#2563eb" />
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-1">Monthly Attendance</h3>
          <p className="text-xs text-slate-500 mb-4">Average attendance percentage by month</p>
          <BarChart data={dashboardStats.monthlyAttendance} valueKey="percentage" labelKey="month" color="bg-blue-500" maxVal={100} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-1">Fee Collection</h3>
          <p className="text-xs text-slate-500 mb-4">Collected vs pending (in thousands)</p>
          <div className="flex items-end gap-2 h-32">
            {dashboardStats.feeCollection.map((d, i) => {
              const total = d.collected + d.pending;
              const max = 1500000;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col rounded-t-md overflow-hidden" style={{ height: `${(total / max) * 90}%`, minHeight: '8px' }}>
                    <div className="bg-emerald-500 flex-1" style={{ height: `${(d.collected / total) * 100}%` }} />
                    <div className="bg-red-300" style={{ height: `${(d.pending / total) * 100}%` }} />
                  </div>
                  <span className="text-xs text-slate-400">{d.month}</span>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-emerald-500" /><span className="text-xs text-slate-500">Collected</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-red-300" /><span className="text-xs text-slate-500">Pending</span></div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800">Class Strength</h3>
              <p className="text-xs text-slate-500 mt-1">Students by class</p>
            </div>
            <Users size={20} className="text-slate-500" />
          </div>
          <div className="space-y-3">
            {dashboardStats.classStrength.map(c => (
              <div key={c.class}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-700 font-medium">Class {c.class}</span>
                  <span className="text-slate-500">{c.students} students</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${(c.students / 50) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800">Fee Risk Follow-ups</h3>
              <p className="text-xs text-slate-500 mt-1">Students needing payment reminders</p>
            </div>
            <ArrowRight size={18} className="text-slate-500" />
          </div>
          <div className="space-y-3">
            {feeRiskList.map(f => {
              const pendingAmount = f.amount - f.paid;
              return (
                <div key={f.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{f.studentName}</p>
                    <p className="text-xs text-slate-500">{f.class} - {f.month} - Due {f.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-red-700">Rs {pendingAmount.toLocaleString()}</p>
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold capitalize text-red-700">{f.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800">Top Class Load</h3>
              <p className="text-xs text-slate-500 mt-1">Largest active class groups</p>
            </div>
            <GraduationCap size={18} className="text-blue-600" />
          </div>
          <div className="space-y-3">
            {topClasses.map((item, index) => (
              <div key={item.class} className="rounded-xl bg-slate-50 p-4">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-slate-800">#{index + 1} Class {item.class}</span>
                  <span className="font-semibold text-slate-500">{item.students} students</span>
                </div>
                <div className="mt-3 h-2.5 rounded-full bg-white overflow-hidden">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: `${(item.students / 50) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800">Priority Queue</h3>
              <p className="text-xs text-slate-500 mt-1">Items that need admin attention</p>
            </div>
            <AlertTriangle size={20} className="text-amber-600" />
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              ['Pending Leaves', pending, 'bg-amber-50 text-amber-700 border-amber-100'],
              ['Fee Follow-ups', overdueCount, 'bg-red-50 text-red-700 border-red-100'],
              ['High Notices', noticesData.filter(n => n.priority === 'high').length, 'bg-blue-50 text-blue-700 border-blue-100'],
            ].map(([label, value, cls]) => (
              <div key={label} className={`rounded-xl border p-4 ${cls}`}>
                <p className="text-xs font-semibold uppercase tracking-wider opacity-80">{label}</p>
                <p className="mt-2 text-3xl font-bold">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Recent Notices</h3>
            <Bell size={18} className="text-slate-500" />
          </div>
          <div className="space-y-3">
            {noticesData.slice(0, 4).map(n => (
              <div key={n.id} className="flex gap-3 items-start">
                <span className={`mt-0.5 px-2 py-0.5 text-xs rounded-md font-medium flex-shrink-0 ${
                  n.priority === 'high' ? 'bg-red-100 text-red-600' :
                  n.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                }`}>{n.category}</span>
                <div>
                  <p className="text-sm font-medium text-slate-700">{n.title}</p>
                  <p className="text-xs text-slate-400">{n.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
