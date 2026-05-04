import { useState } from 'react';
import { Plus, X, Check, ChevronDown, Filter } from 'lucide-react';
import { leaveRequests as initialLeaves } from '../data/dummyData';
import { useAuth } from '../context/AuthContext';

const statusColors = {
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
};

function ApplyLeaveModal({ onClose, onSubmit }) {
  const { currentUser } = useAuth();
  const [form, setForm] = useState({ type: 'Medical', from: '', to: '', reason: '' });

  const handleSubmit = () => {
    if (!form.from || !form.to || !form.reason) return;
    const fromDate = new Date(form.from);
    const toDate = new Date(form.to);
    const days = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;
    onSubmit({
      applicantId: currentUser.id,
      applicantName: currentUser.name,
      applicantRole: currentUser.role,
      class: currentUser.class || currentUser.classAssigned || '',
      type: form.type,
      from: form.from,
      to: form.to,
      days,
      reason: form.reason,
      status: 'pending',
      appliedOn: new Date().toISOString().split('T')[0],
      reviewedBy: null,
      reviewNote: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Apply for Leave</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Leave Type</label>
            <select value={form.type} onChange={e => setForm(v => ({...v, type: e.target.value}))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400">
              {['Medical', 'Personal', 'Vacation', 'Emergency'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">From Date</label>
              <input type="date" value={form.from} onChange={e => setForm(v => ({...v, from: e.target.value}))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">To Date</label>
              <input type="date" value={form.to} onChange={e => setForm(v => ({...v, to: e.target.value}))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Reason</label>
            <textarea value={form.reason} onChange={e => setForm(v => ({...v, reason: e.target.value}))} rows={3} placeholder="Reason for leave..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none" />
          </div>
        </div>
        <div className="flex gap-3 p-6 pt-0">
          <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={handleSubmit} className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">Submit</button>
        </div>
      </div>
    </div>
  );
}

function ReviewModal({ leave, onClose, onAction }) {
  const [note, setNote] = useState('');
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Review Leave Request</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Applicant</span><span className="font-medium text-slate-700">{leave.applicantName}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Role</span><span className="font-medium text-slate-700 capitalize">{leave.applicantRole}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Type</span><span className="font-medium text-slate-700">{leave.type}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Duration</span><span className="font-medium text-slate-700">{leave.from} to {leave.to} ({leave.days} day{leave.days > 1 ? 's' : ''})</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Reason</span><span className="font-medium text-slate-700 text-right max-w-xs">{leave.reason}</span></div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Review Note (optional)</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder="Add a note..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none" />
          </div>
        </div>
        <div className="flex gap-3 p-6 pt-0">
          <button onClick={() => { onAction(leave.id, 'rejected', note); onClose(); }}
            className="flex-1 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm font-medium transition-colors">
            Reject
          </button>
          <button onClick={() => { onAction(leave.id, 'approved', note); onClose(); }}
            className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Leave() {
  const { currentUser } = useAuth();
  const [leaves, setLeaves] = useState(initialLeaves);
  const [showApply, setShowApply] = useState(false);
  const [reviewLeave, setReviewLeave] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');

  const isAdmin = currentUser?.role === 'admin';
  const canApply = currentUser?.role !== 'admin';

  const myLeaves = canApply
    ? leaves.filter(l => l.applicantId === currentUser.id)
    : leaves;

  const filtered = myLeaves.filter(l => {
    const matchStatus = statusFilter === 'All' || l.status === statusFilter;
    const matchRole = roleFilter === 'All' || l.applicantRole === roleFilter;
    return matchStatus && matchRole;
  });

  const handleSubmit = (newLeave) => {
    setLeaves(prev => [...prev, { ...newLeave, id: prev.length + 1 }]);
  };

  const handleAction = (id, status, note) => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status, reviewedBy: 'Admin', reviewNote: note } : l));
  };

  const pending = myLeaves.filter(l => l.status === 'pending').length;
  const approved = myLeaves.filter(l => l.status === 'approved').length;
  const rejected = myLeaves.filter(l => l.status === 'rejected').length;

  return (
    <div className="space-y-5">
      {showApply && <ApplyLeaveModal onClose={() => setShowApply(false)} onSubmit={handleSubmit} />}
      {reviewLeave && <ReviewModal leave={reviewLeave} onClose={() => setReviewLeave(null)} onAction={handleAction} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Leave Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">{filtered.length} request{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        {canApply && (
          <button onClick={() => setShowApply(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            <Plus size={16} /> Apply Leave
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[['Pending', pending, 'bg-amber-50 border-amber-100 text-amber-700'], ['Approved', approved, 'bg-emerald-50 border-emerald-100 text-emerald-700'], ['Rejected', rejected, 'bg-red-50 border-red-100 text-red-700']].map(([label, count, cls]) => (
          <div key={label} className={`${cls} rounded-xl border p-4 text-center`}>
            <p className="text-2xl font-bold">{count}</p>
            <p className="text-xs font-medium opacity-80">{label}</p>
          </div>
        ))}
      </div>

      {isAdmin && (
        <div className="flex gap-3">
          {[
            { value: statusFilter, onChange: setStatusFilter, options: [['All', 'All Status'], ['pending', 'Pending'], ['approved', 'Approved'], ['rejected', 'Rejected']] },
            { value: roleFilter, onChange: setRoleFilter, options: [['All', 'All Roles'], ['student', 'Students'], ['teacher', 'Teachers']] },
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
      )}

      <div className="space-y-3">
        {filtered.map(l => (
          <div key={l.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {isAdmin && (
                    <span className="font-semibold text-slate-800">{l.applicantName}</span>
                  )}
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium border border-blue-100">{l.type}</span>
                  {isAdmin && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium capitalize">{l.applicantRole}</span>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[l.status]}`}>{l.status}</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600 mb-2">
                  <span>{l.from} — {l.to}</span>
                  <span className="font-medium text-slate-700">{l.days} day{l.days > 1 ? 's' : ''}</span>
                  {isAdmin && l.class && <span>{l.class}</span>}
                </div>
                <p className="text-sm text-slate-500">{l.reason}</p>
                {l.reviewNote && (
                  <p className="text-xs text-slate-400 mt-1.5 italic">Note: {l.reviewNote}</p>
                )}
                <p className="text-xs text-slate-400 mt-1.5">Applied: {l.appliedOn}{l.reviewedBy ? ` · Reviewed by ${l.reviewedBy}` : ''}</p>
              </div>
              {isAdmin && l.status === 'pending' && (
                <button
                  onClick={() => setReviewLeave(l)}
                  className="flex-shrink-0 px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Review
                </button>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 py-12 text-center text-slate-400">
            No leave requests found
          </div>
        )}
      </div>
    </div>
  );
}
