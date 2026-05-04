import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, GraduationCap, CalendarCheck,
  CreditCard, Bell,LogOut, BookOpen, ClipboardList, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = {
  admin: [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/students', icon: GraduationCap, label: 'Students' },
    { to: '/teachers', icon: Users, label: 'Teachers' },
    { to: '/classes', icon: BookOpen, label: 'Classes' },
    { to: '/attendance', icon: CalendarCheck, label: 'Attendance' },
    { to: '/fees', icon: CreditCard, label: 'Fees' },
    { to: '/notices', icon: Bell, label: 'Notices' },
    { to: '/leave', icon: ClipboardList, label: 'Leave' },
  ],
  teacher: [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/students', icon: GraduationCap, label: 'Students' },
    { to: '/attendance', icon: CalendarCheck, label: 'Attendance' },
    { to: '/notices', icon: Bell, label: 'Notices' },
    { to: '/leave', icon: ClipboardList, label: 'Leave' },
  ],
  student: [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/attendance', icon: CalendarCheck, label: 'My Attendance' },
    { to: '/fees', icon: CreditCard, label: 'My Fees' },
    { to: '/notices', icon: Bell, label: 'Notices' },
    { to: '/leave', icon: ClipboardList, label: 'Leave' },
  ],
  parent: [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/attendance', icon: CalendarCheck, label: "Child's Attendance" },
    { to: '/fees', icon: CreditCard, label: 'Fee Status' },
    { to: '/notices', icon: Bell, label: 'Notices' },
    { to: '/leave', icon: ClipboardList, label: 'Leave' },
  ],
};

export default function Sidebar({ open, onClose }) {
  const { currentUser, logout } = useAuth();
  const items = navItems[currentUser?.role] || [];

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={onClose} />
      )}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-30 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-700">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">EduDash</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-sm font-semibold flex-shrink-0">
              {currentUser?.avatar}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{currentUser?.name}</p>
              <p className="text-xs text-slate-400 capitalize">{currentUser?.role}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {items.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-slate-700">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-red-600/20 hover:text-red-400 transition-all duration-150"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
