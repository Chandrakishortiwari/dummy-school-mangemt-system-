import { GraduationCap, CalendarCheck, BookOpen } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { attendanceData, students } from '../../data/dummyData';

export default function TeacherDashboard({ user }) {
  const myStudents = students.filter(s => s.class === user.classAssigned);
  const todayKey = '2026-04-22';
  const classAttendance = (attendanceData['2026-04'] || []).filter(s => s.class === user.classAssigned);
  const present = classAttendance.filter(s => s.records[todayKey] === 'P').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Teacher Dashboard</h1>
        <p className="text-sm text-slate-500 mt-0.5">Welcome back, {user.name} - {user.classAssigned}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="My Students" value={myStudents.length} icon={GraduationCap} color="blue" />
        <StatCard title="Present Today" value={present} icon={CalendarCheck} color="green" />
        <StatCard title="Absent Today" value={classAttendance.length - present} icon={CalendarCheck} color="red" />
        <StatCard title="My Subject" value={user.subject} icon={BookOpen} color="teal" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
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
