import { useState } from 'react';
import { Search, ChevronDown, Download, CreditCard } from 'lucide-react';
import { feesData, classes } from '../data/dummyData';
import { useAuth } from '../context/AuthContext';

const statusColors = {
  paid: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-slate-100 text-slate-600',
  overdue: 'bg-red-100 text-red-700',
  partial: 'bg-amber-100 text-amber-700',
};

const months = ['All Months', 'January 2026', 'February 2026', 'March 2026', 'April 2026'];

export default function Fees() {
  const { currentUser } = useAuth();
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('All');
  const [monthFilter, setMonthFilter] = useState('All Months');
  const [statusFilter, setStatusFilter] = useState('All');

  const isAdmin = currentUser?.role === 'admin';
  const isStudent = currentUser?.role === 'student';
  const isParent = currentUser?.role === 'parent';

  const filtered = feesData.filter(f => {
    const matchSearch = f.studentName.toLowerCase().includes(search.toLowerCase()) || f.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchClass = classFilter === 'All' || f.class === classFilter;
    const matchMonth = monthFilter === 'All Months' || f.month === monthFilter;
    const matchStatus = statusFilter === 'All' || f.status === statusFilter;
    const matchStudent = isStudent ? f.studentId === currentUser.id : isParent ? f.studentId === currentUser.childId : true;
    return matchSearch && matchClass && matchMonth && matchStatus && matchStudent;
  });

  const totalCollected = filtered.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.paid, 0);
  const totalPending = filtered.filter(f => f.status !== 'paid').reduce((sum, f) => sum + (f.amount - f.paid), 0);
  const totalAmount = filtered.reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            {isStudent || isParent ? 'Fee Records' : 'Fee Management'}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">{filtered.length} record{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        {isAdmin && (
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Download size={15} /> Export
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Total Amount</p>
          <p className="text-xl font-bold text-slate-800">₹{totalAmount.toLocaleString()}</p>
        </div>
        <div className="bg-emerald-50 rounded-xl border border-emerald-100 p-4">
          <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-1">Collected</p>
          <p className="text-xl font-bold text-emerald-700">₹{totalCollected.toLocaleString()}</p>
        </div>
        <div className="bg-red-50 rounded-xl border border-red-100 p-4">
          <p className="text-xs font-medium text-red-500 uppercase tracking-wider mb-1">Pending</p>
          <p className="text-xl font-bold text-red-700">₹{totalPending.toLocaleString()}</p>
        </div>
      </div>

      {!isStudent && !isParent && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: classFilter, onChange: setClassFilter, options: [['All', 'All Classes'], ...classes.map(c => [c, c])] },
              { value: monthFilter, onChange: setMonthFilter, options: months.map(m => [m, m]) },
              { value: statusFilter, onChange: setStatusFilter, options: [['All', 'All Status'], ['paid', 'Paid'], ['pending', 'Pending'], ['overdue', 'Overdue'], ['partial', 'Partial']] },
            ].map((sel, i) => (
              <div key={i} className="relative">
                <select value={sel.value} onChange={e => sel.onChange(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none bg-white text-slate-700">
                  {sel.options.map(([val, label]) => <option key={val} value={val}>{label}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {(!isStudent && !isParent) && <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student</th>}
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Month</th>
                {(!isStudent && !isParent) && <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Class</th>}
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Paid</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Due Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                {isAdmin && <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Transaction</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(f => (
                <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                  {(!isStudent && !isParent) && (
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-700">{f.studentName}</p>
                      <p className="text-xs text-slate-400">{f.rollNo}</p>
                    </td>
                  )}
                  <td className="px-4 py-3 font-medium text-slate-700">{f.month}</td>
                  {(!isStudent && !isParent) && <td className="px-4 py-3 text-slate-600">{f.class}</td>}
                  <td className="px-4 py-3 font-semibold text-slate-800">₹{f.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-600">₹{f.paid.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-600">{f.dueDate}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[f.status] || 'bg-slate-100 text-slate-600'}`}>
                      {f.status}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-3 text-xs text-slate-500 font-mono">{f.transactionId || '—'}</td>
                  )}
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-10 text-center text-slate-400">No fee records found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
