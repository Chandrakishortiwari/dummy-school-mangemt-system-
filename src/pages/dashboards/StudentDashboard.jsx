import { CalendarCheck, CreditCard } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { attendanceData, feesData } from '../../data/dummyData';

export default function StudentDashboard({ user }) {
  const myFees = feesData.filter(f => f.studentId === user.id);
  const myAttendance = (attendanceData['2026-04'] || []).find(s => s.studentId === user.id);
  const days = myAttendance ? Object.values(myAttendance.records) : [];
  const presentDays = days.filter(d => d === 'P').length;
  const pct = days.length ? Math.round((presentDays / days.length) * 100) : 0;
  const paidFees = myFees.filter(f => f.status === 'paid').length;
  const dueFees = myFees.filter(f => f.status !== 'paid').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Student Dashboard</h1>
        <p className="text-sm text-slate-500 mt-0.5">{user.name} - {user.class} | Roll No: {user.rollNo}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Attendance %" value={pct} suffix="%" icon={CalendarCheck} color="green" />
        <StatCard title="Present Days" value={presentDays} icon={CalendarCheck} color="blue" />
        <StatCard title="Fees Paid" value={paidFees} icon={CreditCard} color="teal" />
        <StatCard title="Fees Due" value={dueFees} icon={CreditCard} color="red" />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
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
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Attendance This Month</h3>
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
