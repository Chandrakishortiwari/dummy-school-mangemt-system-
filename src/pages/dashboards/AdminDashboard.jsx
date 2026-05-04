import { Users, GraduationCap, CalendarCheck, CreditCard, BookOpen, ClipboardList } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { dashboardStats, feesData, leaveRequests, noticesData } from '../../data/dummyData';
import BarChart from './BarChart';

export default function AdminDashboard() {
  const pending = leaveRequests.filter(l => l.status === 'pending').length;
  const overdueCount = feesData.filter(f => f.status === 'overdue' || f.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1>
        <p className="text-sm text-slate-500 mt-0.5">Overview of school operations</p>
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
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-1">Monthly Attendance</h3>
          <p className="text-xs text-slate-500 mb-4">Average attendance percentage by month</p>
          <BarChart data={dashboardStats.monthlyAttendance} valueKey="percentage" labelKey="month" color="bg-blue-500" maxVal={100} />
        </div>
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
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Class Strength</h3>
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

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Recent Notices</h3>
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
